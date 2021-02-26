import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { OK } from 'http-status';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Functions } from '../..';
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
            const qrcodeToken = await this.checkToken({ code, screeningEvent, scheduleDate, entranceGate });
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
