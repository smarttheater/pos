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
                    token?: string;
                    decodeResult?: Models.Admission.IDecodeResult;
                    availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
                    checkTokenActions: factory.action.check.token.IAction[];
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

    public async checkToken(params: {
        code: string;
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
        scheduleDate: Date;
    }) {
        const { code, screeningEvent, scheduleDate } = params;
        await this.cinerino.getServices();
        const { token } = await this.cinerino.admin.ownershipInfo.getToken({ code });
        const decodeResult = decode<Models.Admission.IDecodeResult>(token);
        const checkTokenActions =
            (await this.cinerino.admin.ownershipInfo.searchCheckTokenActions({ id: decodeResult.id })).data;
        const searchResult =
            await this.cinerino.reservation.search<factory.chevre.reservationType.EventReservation>({
                typeOf: factory.chevre.reservationType.EventReservation,
                project: { ids: [Functions.Util.getProject().projectId] },
                reservationStatuses: [factory.chevre.reservationStatusType.ReservationConfirmed],
                reservationFor: {
                    typeOf: factory.chevre.eventType.ScreeningEvent,
                    id: (screeningEvent === undefined) ? undefined : screeningEvent.id,
                    startFrom: scheduleDate,
                    startThrough: moment(scheduleDate).add(1, 'day').toDate()
                },
                ids: [decodeResult.typeOfGood.id]
            });
        if (searchResult.data.length > 1
            || searchResult.data.length === 0) {
            throw new Error('searchResult.data.length > 1 or searchResult.data.length === 0');
        }
        const availableReservation = searchResult.data[0];

        // 利用可能判定
        const statusCode = OK;
        if (searchResult.data.length > 0) {
            this.cinerino.reservation.findScreeningEventReservationByToken({ token });
        }

        return {
            token,
            decodeResult,
            availableReservation,
            checkTokenActions,
            statusCode,
        };

    }

    public async checkAdmission(params: {
        code: string;
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
        scheduleDate: Date;
    }) {
        const { code, screeningEvent, scheduleDate } = params;
        const data: {
            orderNumber: string;
            reservationNumber: string;
            id: string;
        } = JSON.parse(code);
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
                    startThrough: moment(scheduleDate).add(1, 'day').toDate()
                },
                ids: [data.id]
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
        const checkTokenActions: any[] = [];
        for (let i = 0; i < admissionResult.result.count - 1; i++) {
            checkTokenActions.push(admissionResult.result.id);
        }

        // 利用可能判定
        const statusCode = OK;

        // 非同期
        this.checkAdmissionAsync({
            ...data, isReserved: (availableReservation !== undefined)
        }).catch((error) => {
            console.error(error);
        });

        return {
            availableReservation,
            checkTokenActions,
            statusCode,
        };

    }

    public async checkAdmissionAsync(params: {
        orderNumber: string;
        reservationNumber: string;
        id: string;
        isReserved: boolean;
    }) {
        await this.cinerino.getServices();
        const searchResult = await this.cinerino.order.search({
            orderNumbers: [params.orderNumber]
        });
        if (searchResult.data.length === 0) {
            throw new Error('order notfound');
        }
        const order = await this.cinerino.order.authorizeOwnershipInfos({
            orderNumber: params.orderNumber,
            customer: {
                telephone: searchResult.data[0].customer.telephone
            }
        });
        const findResult = order.acceptedOffers.find(a => {
            if (a.itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
                return false;
            }
            const i = <factory.chevre.reservation.IReservation<
                factory.chevre.reservationType.EventReservation
            >>a.itemOffered;
            return (i.id === params.id);
        });
        if (findResult === undefined) {
            throw new Error('itemOffered notfound');
        }
        const itemOffered = <factory.chevre.reservation.IReservation<
            factory.chevre.reservationType.EventReservation
        >>findResult.itemOffered;
        const code = itemOffered.reservedTicket.ticketToken;
        if (code === undefined) {
            throw new Error('code undefined');
        }
        const { token } = await this.cinerino.admin.ownershipInfo.getToken({ code });
        await this.cinerino.reservation.findScreeningEventReservationByToken({ token });
        // const decodeResult = decode<Models.Admission.IDecodeResult>(token);
        // const checkTokenActions =
        //     (await this.cinerino.admin.ownershipInfo.searchCheckTokenActions({ id: decodeResult.id })).data;
    }
}
