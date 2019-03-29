import { factory } from '@cinerino/api-javascript-client';
import { IState } from '.';
import { IDecodeResult } from '../../models';
import { admissionAction } from '../actions';

export interface IAdmissionState {
    scheduleDate?: string;
    screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    screeningEventReservations: factory.chevre.reservation.event.IReservation<factory.chevre.event.screeningEvent.IEvent>[];
    qrcodeToken?: {
        token?: string;
        decodeResult?: IDecodeResult;
        availableReservation?: factory.chevre.reservation.event.ISearchConditions;
        checkTokenActions: factory.action.check.token.IAction[];
        statusCode: number;
    };
    // usentList: {
    //     token: string;
    //     decodeResult: IDecodeResult;
    // }[];
}

export const admissionInitialState: IAdmissionState = {
    screeningEventReservations: [],
    // usentList: []
};

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: admissionAction.Actions): IState {
    switch (action.type) {
        case admissionAction.ActionTypes.Delete: {
            state.admissionData = {
                screeningEventReservations: [],
                // usentList: []
            };
            return { ...state };
        }
        case admissionAction.ActionTypes.SelectScheduleDate: {
            const scheduleDate = action.payload.scheduleDate;
            state.admissionData.scheduleDate = scheduleDate;
            return { ...state, loading: true, process: { ja: '', en: '' }, error: null };
        }
        case admissionAction.ActionTypes.SelectSchedule: {
            const screeningEvent = action.payload.screeningEvent;
            state.admissionData.screeningEvent = screeningEvent;
            return { ...state, loading: false, process: { ja: '', en: '' } };
        }
        case admissionAction.ActionTypes.SelectScreeningEvent: {
            const screeningEvent = action.payload.screeningEvent;
            state.admissionData.screeningEvent = screeningEvent;
            return { ...state, loading: false,  process: { ja: '', en: '' }, error: null };
        }
        case admissionAction.ActionTypes.GetScreeningEvent: {
            return { ...state };
        }
        case admissionAction.ActionTypes.GetScreeningEventSuccess: {
            const screeningEvent = action.payload.screeningEvent;
            state.admissionData.screeningEvent = screeningEvent;
            return { ...state, error: null };
        }
        case admissionAction.ActionTypes.GetScreeningEventFail: {
            const error = action.payload.error;
            return { ...state, error: JSON.stringify(error) };
        }
        // case admissionAction.ActionTypes.GetScreeningEventReservations: {
        //     return { ...state, loading: true, process: '予約情報を取得しています' };
        // }
        // case admissionAction.ActionTypes.GetScreeningEventReservationsSuccess: {
        //     state.admissionData.screeningEventReservations = action.payload.screeningEventReservations;
        //     return { ...state, loading: false, error: null };
        // }
        // case admissionAction.ActionTypes.GetScreeningEventReservationsFail: {
        //     const error = action.payload.error;
        //     return { ...state, error: JSON.stringify(error) };
        // }
        case admissionAction.ActionTypes.InitializeQrcodeToken: {
            const qrcodeToken = undefined;
            state.admissionData.qrcodeToken = qrcodeToken;
            return { ...state };
        }
        // case admissionAction.ActionTypes.ConvertQrcodeToToken: {
        //     return { ...state, loading: true, process: 'QRコードをトークンへ変換しています', error: null };
        // }
        // case admissionAction.ActionTypes.ConvertQrcodeToTokenSuccess: {
        //     const qrcodeToken = action.payload;
        //     state.admissionData.qrcodeToken = qrcodeToken;
        //     return { ...state, loading: false, process: { ja: '', en: '' }, error: null };
        // }
        // case admissionAction.ActionTypes.ConvertQrcodeToTokenFail: {
        //     const error = action.payload.error;
        //     return { ...state, loading: false, process: { ja: '', en: '' }, error: JSON.stringify(error) };
        // }
        // case admissionAction.ActionTypes.Admission: {
        //     return { ...state, error: null };
        // }
        // case admissionAction.ActionTypes.AdmissionSuccess: {
        //     const decodeResult = action.payload.decodeResult;
        //     const usentList = state.admissionData.usentList.filter(usent => usent.decodeResult.id !== decodeResult.id);
        //     state.admissionData.usentList = usentList;
        //     return { ...state, error: null };
        // }
        // case admissionAction.ActionTypes.AdmissionFail: {
        //     const error = action.payload.error;
        //     const token = action.payload.token;
        //     const decodeResult = action.payload.decodeResult;
        //     const findResult = state.admissionData.usentList.find(usent => usent.decodeResult.id === decodeResult.id);
        //     if (findResult === undefined) {
        //         state.admissionData.usentList.push({ token, decodeResult });
        //     }

        //     return { ...state, error: JSON.stringify(error) };
        // }
        case admissionAction.ActionTypes.Check: {
            return { ...state, error: null, loading: true, process: { ja: 'QRコード情報をを確認しています', en: 'Checking the QR code information' } };
        }
        case admissionAction.ActionTypes.CheckSuccess: {
            const qrcodeToken = action.payload;
            state.admissionData.qrcodeToken = qrcodeToken;
            return { ...state, loading: false, process: { ja: '', en: '' }, error: null };
        }
        case admissionAction.ActionTypes.CheckFail: {
            const error = action.payload.error;

            return { ...state, error: JSON.stringify(error), loading: false, process: { ja: '', en: '' } };
        }
        default: {
            return state;
        }
    }
}
