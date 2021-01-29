import { factory } from '@cinerino/sdk';
import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import { admissionAction } from '../actions';

export interface IAdmissionState {
    scheduleDate?: string;
    screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    screeningEventReservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    qrcodeToken?: {
        availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
        checkTokenActions: factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[] | string[];
        statusCode: number;
    };
    specified: boolean;
}

export const admissionInitialState: IAdmissionState = {
    screeningEventReservations: [],
    specified: false
};

export function reducer(initialState: IState, action: Action) {
    return createReducer(
        initialState,
        on(admissionAction.remove, state => {
            return {
                ...state, admissionData: {
                    screeningEventReservations: [],
                    specified: false,
                    qrcodeToken: undefined,
                    screeningEvent: undefined
                }
            };
        }),
        on(admissionAction.selectScheduleDate, (state, payload) => {
            const scheduleDate = payload.scheduleDate;
            return {
                ...state, admissionData: {
                    ...state.admissionData,
                    scheduleDate
                }, loading: false, process: '', error: null
            };
        }),
        on(admissionAction.getScreeningEvent, (state) => {
            return { ...state };
        }),
        on(admissionAction.getScreeningEventSuccess, (state, payload) => {
            const screeningEvent = payload.screeningEvent;
            return {
                ...state,
                admissionData: {
                    ...state.admissionData,
                    screeningEvent,
                    specified: false
                }, error: null
            };
        }),
        on(admissionAction.getScreeningEventFail, (state, payload) => {
            const error = payload.error;
            return { ...state, error: JSON.stringify(error) };
        }),
    )(initialState, action);
}
