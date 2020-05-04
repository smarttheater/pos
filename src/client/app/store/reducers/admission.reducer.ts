import { factory } from '@cinerino/api-javascript-client';
import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import { IDecodeResult } from '../../models';
import { admissionAction } from '../actions';

export interface IAdmissionState {
    scheduleDate?: string;
    screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    screeningEventReservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    qrcodeToken?: {
        token?: string;
        decodeResult?: IDecodeResult;
        availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
        checkTokenActions: factory.action.check.token.IAction[];
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
            state.admissionData.screeningEventReservations = [];
            state.admissionData.specified = false;
            state.admissionData.qrcodeToken = undefined;
            state.admissionData.screeningEvent = undefined;
            return { ...state };
        }),
        on(admissionAction.selectScheduleDate, (state, payload) => {
            state.admissionData.scheduleDate = payload.scheduleDate;
            return { ...state, loading: true, process: '', error: null };
        }),
        on(admissionAction.getScreeningEvent, (state) => {
            return { ...state };
        }),
        on(admissionAction.getScreeningEventSuccess, (state, payload) => {
            const screeningEvent = payload.screeningEvent;
            state.admissionData.screeningEvent = screeningEvent;
            state.admissionData.specified = true;
            return { ...state, error: null };
        }),
        on(admissionAction.getScreeningEventFail, (state, payload) => {
            const error = payload.error;
            return { ...state, error: JSON.stringify(error) };
        }),
        on(admissionAction.initializeQrcodeToken, (state) => {
            const qrcodeToken = undefined;
            state.admissionData.qrcodeToken = qrcodeToken;
            return { ...state };
        }),
        on(admissionAction.check, (state) => {
            return { ...state, error: null, loading: true, process: 'admissionAction.Check' };
        }),
        on(admissionAction.checkSuccess, (state, payload) => {
            const qrcodeToken = payload.qrcodeToken;
            const screeningEvent = payload.screeningEvent;
            state.admissionData.qrcodeToken = qrcodeToken;
            if (screeningEvent !== undefined) {
                state.admissionData.screeningEvent = screeningEvent;
            }
            return { ...state, loading: false, process: '', error: null };
        }),
        on(admissionAction.checkFail, (state, payload) => {
            const error = payload.error;
            return { ...state, error: JSON.stringify(error), loading: false, process: '' };
        })
    )(initialState, action);
}
