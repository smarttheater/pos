import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import * as decode from 'jwt-decode';
import * as moment from 'moment';
import { map, mergeMap } from 'rxjs/operators';
import { Functions, Models } from '../..';
import { getEnvironment } from '../../../environments/environment';
import { CinerinoService, UtilService } from '../../services';
import { admissionAction } from '../actions';

/**
 * AdmissionEffects
 */
@Injectable()
export class AdmissionEffects {

    constructor(
        private actions: Actions,
        private cinerino: CinerinoService,
        private utilService: UtilService,
    ) { }

    /**
     * getScreeningEvent
     */
    @Effect()
    public getScreeningEvent = this.actions.pipe(
        ofType(admissionAction.getScreeningEvent),
        map(action => action),
        mergeMap(async (payload) => {
            // console.log(payload);
            try {
                await this.cinerino.getServices();
                const screeningEvent = await this.cinerino.event.findById<factory.chevre.eventType.ScreeningEvent>({
                    id: payload.screeningEvent.id
                });
                return admissionAction.getScreeningEventSuccess({ screeningEvent });
            } catch (error) {
                return admissionAction.getScreeningEventFail({ error: error });
            }
        })
    );

    /**
     * check
     */
    @Effect()
    public check = this.actions.pipe(
        ofType(admissionAction.check),
        map(action => action),
        mergeMap(async (payload) => {
            // console.log(payload);
            const code = payload.code;
            const screeningEvent = payload.screeningEvent;
            const scheduleDate = payload.scheduleDate;
            const specified = payload.specified;
            const environment = getEnvironment();
            try {
                let qrcodeToken: {
                    availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
                    checkTokenActions: factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[] | string[];
                    statusCode: number;
                };
                if (environment.PRINT_QRCODE_TYPE === Models.Order.Print.PrintQrcodeType.Token) {
                    // トークン
                    qrcodeToken = await this.checkToken({ code, screeningEvent, scheduleDate });
                } else if (environment.PRINT_QRCODE_TYPE === Models.Order.Print.PrintQrcodeType.Admission) {
                    // 入場
                    qrcodeToken = await this.checkAdmission({
                        code, screeningEvent, scheduleDate
                    });
                } else {
                    throw new Error('PRINT_QRCODE_TYPE Error');
                }
                let findScreeningEventResult;
                if (qrcodeToken.availableReservation !== undefined && !specified) {
                    const id = qrcodeToken.availableReservation.reservationFor.id;
                    findScreeningEventResult = await this.cinerino.event.findById<factory.chevre.eventType.ScreeningEvent>({ id });
                }

                return admissionAction.checkSuccess({
                    qrcodeToken,
                    screeningEvent: findScreeningEventResult
                });
            } catch (error) {
                return admissionAction.checkSuccess({
                    qrcodeToken: {
                        checkTokenActions: [],
                        statusCode: (error.code === undefined) ? INTERNAL_SERVER_ERROR : error.code
                    }
                });
            }
        })
    );

    /**
     * チケットトークンでの認証
     */
    public async checkToken(params: {
        code: string;
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
        scheduleDate: Date;
    }) {
        const { code, screeningEvent, scheduleDate } = params;
        // 互換性維持
        const ticketToken = (code.split('@').length > 1)
            ? code.split('@')[1]
            : code;
        await this.cinerino.getServices();
        const { token } = await this.cinerino.token.getToken({ code: ticketToken });
        const decodeResult = decode<Models.Admission.IDecodeResult>(token);
        const reservationId = (code.split('@').length > 1)
            ? code.split('@')[0]
            : decodeResult.typeOfGood.id;
        const searchResult =
            await this.cinerino.reservation.search<factory.chevre.reservationType.EventReservation>({
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
            throw new Error('searchResult.data.length > 1 or searchResult.data.length === 0');
        }
        const availableReservation = searchResult.data[0];
        const checkTokenActions =
            (await this.cinerino.reservation.searchUseActions({
                object: { id: reservationId }
            })).data;

        // 利用可能判定
        const statusCode = OK;
        if (searchResult.data.length > 0) {
            // 互換性維持
            if ((code.split('@').length > 1)) {
                this.cinerino.reservation.useByToken({
                    object: { id: reservationId },
                    instrument: { token }
                });
            } else {
                this.cinerino.reservation.findScreeningEventReservationByToken({ token });
            }
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
    }) {
        const environment = getEnvironment();
        const { code, screeningEvent, scheduleDate } = params;
        const data: { orderNumber: string; id: string; } = JSON.parse(code);
        const orderNumber = data.orderNumber;
        const reservationId = data.id;
        await this.cinerino.getServices();
        const searchResult =
            await this.cinerino.reservation.search<factory.chevre.reservationType.EventReservation>({
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
            throw new Error('searchResult.data.length > 1 or searchResult.data.length === 0');
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
            await this.cinerino.getServices();
            const orderSearchResult = await this.cinerino.order.search({
                orderNumbers: [orderNumber]
            });
            if (orderSearchResult.data.length === 0) {
                throw new Error('order notfound');
            }
            const order = await this.cinerino.order.authorize({
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
            const { token } = await this.cinerino.token.getToken({ code: ticketToken });
            await this.cinerino.reservation.useByToken({
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
}
