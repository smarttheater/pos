import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { OK } from 'http-status';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Functions } from '../..';
import { getEnvironment } from '../../../environments/environment';
import { admissionAction } from '../../store/actions';
import * as reducers from '../../store/reducers';
import { CinerinoService } from '../cinerino.service';
import { UtilService } from '../util.service';

@Injectable({
    providedIn: 'root'
})
export class AdmissionService {
    public admission: Observable<reducers.IAdmissionState>;
    public error: Observable<string | null>;
    constructor(
        private actions: Actions,
        private store: Store<reducers.IState>,
        private cinerinoService: CinerinoService,
        private utilService: UtilService,
    ) {
        this.admission = this.store.pipe(select(reducers.getAdmission));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * データ取得
     */
    public async getData() {
        return new Promise<reducers.IAdmissionState>((resolve) => {
            this.admission.subscribe((admission) => {
                resolve(admission);
            }).unsubscribe();
        });
    }

    /**
     * データ削除
     */
    public delete() {
        this.store.dispatch(admissionAction.remove());
    }

    /**
     * スケジュール選択
     */
    public selectScheduleDate(scheduleDate: string) {
        this.store.dispatch(admissionAction.selectScheduleDate({ scheduleDate }));
    }

    /**
     * QRコードチェック
     */
    public async checkQrcode(params: {
        code: string;
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
        scheduleDate: Date;
        entranceGate?: factory.chevre.place.movieTheater.IEntranceGate;
    }) {
        try {
            this.utilService.loadStart({ process: 'admissionAction.Check' });
            const {
                code,
                screeningEvent,
                scheduleDate,
                entranceGate,
            } = params;
            let qrcodeToken: {
                availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
                checkTokenActions: factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[] | string[];
                statusCode: number;
            };
            if (/@/.test(code)) {
                // トークン
                qrcodeToken = await this.checkToken({ code, screeningEvent, scheduleDate, entranceGate });
            } else {
                // 入場
                qrcodeToken = await this.checkAdmission({ code, screeningEvent, scheduleDate, entranceGate });
            }
            let findScreeningEventResult;
            if (qrcodeToken.availableReservation !== undefined) {
                const id = qrcodeToken.availableReservation.reservationFor.id;
                findScreeningEventResult = await this.cinerinoService.event.findById<factory.chevre.eventType.ScreeningEvent>({ id });
            }
            this.utilService.loadEnd();
            return {
                qrcodeToken,
                screeningEvent: findScreeningEventResult
            };
        } catch (error) {
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * チケットトークンでの認証
     */
    public async checkToken(params: {
        code: string;
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
        scheduleDate: Date;
        entranceGate?: factory.chevre.place.movieTheater.IEntranceGate;
    }) {
        const { code, screeningEvent, scheduleDate, entranceGate } = params;
        const reservationId = code.split('@')[0];
        const ticketToken = code.split('@')[1];
        await this.cinerinoService.getServices();
        const { token } = await this.cinerinoService.token.getToken({ code: ticketToken });
        const searchResult =
            await this.cinerinoService.reservation.search<factory.chevre.reservationType.EventReservation>({
                typeOf: factory.chevre.reservationType.EventReservation,
                project: { ids: [Functions.Util.getProject().projectId] },
                reservationStatuses: [factory.chevre.reservationStatusType.ReservationConfirmed],
                reservationFor: {
                    typeOf: factory.chevre.eventType.ScreeningEvent,
                    id: (screeningEvent === undefined) ? undefined : screeningEvent.id,
                    startFrom: scheduleDate,
                    startThrough: moment(scheduleDate).add(1, 'day').add(-1, 'millisecond').toDate()
                },
                ids: [reservationId]
            });
        if (searchResult.data.length > 1
            || searchResult.data.length === 0) {
            throw new Error('Reservation not found');
        }
        const availableReservation = searchResult.data[0];
        const checkTokenActions =
            (await this.cinerinoService.reservation.searchUseActions({
                object: { id: reservationId }
            })).data.filter(d => {
                const location = (<any>d).location;
                if (entranceGate === undefined) {
                    return location === undefined;
                }
                return (location !== undefined
                    && location.identifier === entranceGate.identifier);
            });

        // 利用可能判定
        const statusCode = OK;
        if (searchResult.data.length > 0) {
            this.cinerinoService.reservation.useByToken({
                location: {
                    identifier: (entranceGate === undefined)
                        ? undefined : (typeof (entranceGate.identifier) !== 'string')
                            ? undefined : entranceGate.identifier
                },
                object: { id: reservationId },
                instrument: { token }
            });
        }

        return {
            availableReservation,
            checkTokenActions,
            statusCode,
        };
    }

    /**
     * 外部入場サービス連携での認証
     */
    public async checkAdmission(params: {
        code: string;
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
        scheduleDate: Date;
        entranceGate?: factory.chevre.place.movieTheater.IEntranceGate;
    }) {
        const environment = getEnvironment();
        const { code, screeningEvent, scheduleDate, entranceGate } = params;
        const data: { orderNumber: string; id: string; } = JSON.parse(code);
        const orderNumber = data.orderNumber;
        const reservationId = data.id;
        await this.cinerinoService.getServices();
        const searchResult =
            await this.cinerinoService.reservation.search<factory.chevre.reservationType.EventReservation>({
                typeOf: factory.chevre.reservationType.EventReservation,
                project: { ids: [Functions.Util.getProject().projectId] },
                reservationStatuses: [factory.chevre.reservationStatusType.ReservationConfirmed],
                reservationFor: {
                    typeOf: factory.chevre.eventType.ScreeningEvent,
                    id: (screeningEvent === undefined) ? undefined : screeningEvent.id,
                    startFrom: scheduleDate,
                    startThrough: moment(scheduleDate).add(1, 'day').add(-1, 'millisecond').toDate()
                },
                ids: [reservationId]
            });
        if (searchResult.data.length > 1
            || searchResult.data.length === 0) {
            throw new Error('Reservation not found');
        }
        const availableReservation = searchResult.data[0];
        // 外部API
        const admissionApiEndpoint = Functions.Util.getProject().admissionApiEndpoint;
        const admissionResult = await this.utilService.postJson<{
            result: { id: string; count: number; }
        }>(admissionApiEndpoint, {
            id: data.id
        });
        const checkTokenActions: string[] = [];
        for (let i = 0; i < admissionResult.result.count - 1; i++) {
            checkTokenActions.push(admissionResult.result.id);
        }

        // 利用可能判定
        const statusCode = OK;

        // 非同期
        const linkData = async () => {
            await this.cinerinoService.getServices();
            const orderSearchResult = await this.cinerinoService.order.search({
                orderNumbers: [orderNumber]
            });
            if (orderSearchResult.data.length === 0) {
                throw new Error('order notfound');
            }
            const order = await this.cinerinoService.order.authorize({
                object: {
                    orderNumber,
                    customer: {
                        telephone: orderSearchResult.data[0].customer.telephone
                    }
                },
                result: {
                    expiresInSeconds: Number(environment.ORDER_AUTHORIZE_CODE_EXPIRES)
                }
            });
            const ticketToken = order.code;
            if (ticketToken === undefined) {
                throw new Error('ticketToken undefined');
            }
            const { token } = await this.cinerinoService.token.getToken({ code: ticketToken });
            await this.cinerinoService.reservation.useByToken({
                location: {
                    identifier: (entranceGate === undefined)
                        ? undefined : (typeof (entranceGate.identifier) !== 'string')
                            ? undefined : entranceGate.identifier
                },
                object: { id: reservationId },
                instrument: { token }
            });
        };
        linkData().catch((error) => {
            console.error(error);
        });

        return {
            availableReservation,
            checkTokenActions,
            statusCode,
        };

    }

    /**
     * イベント取得
     */
    public async getScreeningEvent(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(admissionAction.getScreeningEvent({ screeningEvent }));
            const success = this.actions.pipe(
                ofType(admissionAction.getScreeningEventSuccess.type),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(admissionAction.getScreeningEventFail.type),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }
}
