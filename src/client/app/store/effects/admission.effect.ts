import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import * as decode from 'jwt-decode';
import * as moment from 'moment';
import { map, mergeMap } from 'rxjs/operators';
import { getProject } from '../../functions';
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
            try {
                await this.cinerino.getServices();
                const { token } = await this.cinerino.admin.ownershipInfo.getToken({ code });
                const decodeResult = decode<IDecodeResult>(token);
                const checkTokenActions =
                    (await this.cinerino.admin.ownershipInfo.searchCheckTokenActions({ id: decodeResult.id })).data;
                const searchResult =
                    await this.cinerino.reservation.search<factory.chevre.reservationType.EventReservation>({
                        typeOf: factory.chevre.reservationType.EventReservation,
                        project: { ids: [getProject().projectId] },
                        reservationStatuses: [factory.chevre.reservationStatusType.ReservationConfirmed],
                        reservationFor: {
                            typeOf: factory.chevre.eventType.ScreeningEvent,
                            id: (screeningEvent === undefined) ? undefined : screeningEvent.id,
                            startFrom: scheduleDate,
                            startThrough: moment(scheduleDate).add(1, 'day').toDate()
                        },
                        ids: [decodeResult.typeOfGood.id]
                    });

                // 利用可能判定
                const statusCode = OK;
                if (searchResult.data.length > 0) {
                    await this.cinerino.reservation.findScreeningEventReservationByToken({ token });
                }
                let findScreeningEventResult;
                if (searchResult.data.length > 0 && !specified) {
                    const id = searchResult.data[0].reservationFor.id;
                    findScreeningEventResult = await this.cinerino.event.findById<factory.chevre.eventType.ScreeningEvent>({ id });
                }

                return admissionAction.checkSuccess({
                    qrcodeToken: {
                        token,
                        decodeResult,
                        availableReservation: searchResult.data[0],
                        checkTokenActions,
                        statusCode,
                    },
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
}
