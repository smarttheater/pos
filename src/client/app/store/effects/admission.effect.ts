import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import * as decode from 'jwt-decode';
import { map, mergeMap } from 'rxjs/operators';
import { getEnvironment } from '../../../environments/environment';
import { IDecodeResult } from '../../models';
import { CinerinoService } from '../../services';
import { admissionAction } from '../actions';

/**
 * AdmissionEffects
 */
@Injectable()
export class AdmissionEffects {

    constructor(
        private actions: Actions,
        private cinerino: CinerinoService,
    ) { }

    /**
     * getScreeningEvent
     */
    @Effect()
    public getScreeningEvent = this.actions.pipe(
        ofType<admissionAction.GetScreeningEvent>(admissionAction.ActionTypes.GetScreeningEvent),
        map(action => action.payload),
        mergeMap(async (payload) => {
            // console.log(payload);
            try {
                await this.cinerino.getServices();
                const screeningEvent = await this.cinerino.event.findById<factory.chevre.eventType.ScreeningEvent>({
                    id: payload.screeningEvent.id
                });
                return new admissionAction.GetScreeningEventSuccess({ screeningEvent });
            } catch (error) {
                return new admissionAction.GetScreeningEventFail({ error: error });
            }
        })
    );

    /**
     * check
     */
    @Effect()
    public check = this.actions.pipe(
        ofType<admissionAction.Check>(admissionAction.ActionTypes.Check),
        map(action => action.payload),
        mergeMap(async (payload) => {
            // console.log(payload);
            const code = payload.code;
            const screeningEvent = payload.screeningEvent;
            const environment = getEnvironment();
            try {
                await this.cinerino.getServices();
                const getTokenResult = await this.cinerino.admin.ownershipInfo.getToken({ code })
                    .catch((error) => {
                        console.error('getToken error');
                        throw error;
                    });
                const token = getTokenResult.token;
                const decodeResult = decode<IDecodeResult>(token);
                const checkTokenActionsResult =
                    await this.cinerino.admin.ownershipInfo.searchCheckTokenActions({ id: decodeResult.id });
                const checkTokenActions = checkTokenActionsResult.data;
                const limit = 100;
                let page = 1;
                let roop = true;
                let screeningEventReservations:
                    factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[] = [];
                while (roop) {
                    const searchResult =
                        await this.cinerino.reservation.search<factory.chevre.reservationType.EventReservation>({
                            typeOf: factory.chevre.reservationType.EventReservation,
                            page,
                            limit,
                            project: { ids: [environment.PROJECT_ID] },
                            reservationStatuses: [factory.chevre.reservationStatusType.ReservationConfirmed],
                            reservationFor: {
                                typeOf: factory.chevre.eventType.ScreeningEvent,
                                id: screeningEvent.id
                            },
                            ids: [decodeResult.typeOfGood.id]
                        });
                    screeningEventReservations =
                        screeningEventReservations.concat(searchResult.data);
                    page++;
                    roop = searchResult.data.length > 0;
                }

                // 利用可能判定
                const availableReservation = screeningEventReservations
                    .find((r) => r.id === decodeResult.typeOfGood.id);
                const statusCode = OK;
                if (availableReservation !== undefined) {
                    await this.cinerino.reservation.findScreeningEventReservationByToken({ token });
                }

                return new admissionAction.CheckSuccess({
                    token,
                    decodeResult,
                    availableReservation,
                    checkTokenActions,
                    statusCode
                });
            } catch (error) {
                return new admissionAction.CheckSuccess({
                    checkTokenActions: [],
                    statusCode: (error.code === undefined) ? INTERNAL_SERVER_ERROR : error.code
                });
            }
        })
    );
}
