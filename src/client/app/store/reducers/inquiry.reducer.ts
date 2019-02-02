import { factory } from '@cinerino/api-javascript-client';
import { IState } from '.';
import { Actions, ActionTypes } from '../actions/inquiry.action';

export interface IInquiryState {
    order?: factory.order.IOrder;
}

export const inquiryInitialState: IInquiryState = {};

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.Delete: {
            state.inquiry = {};
            return { ...state };
        }
        case ActionTypes.Inquiry: {
            return { ...state, loading: true, process: '照会しています' };
        }
        case ActionTypes.InquirySuccess: {
            const order = action.payload.order;
            state.inquiry.order = order;
            return { ...state, loading: false, process: '', error: null };
        }
        case ActionTypes.InquiryFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        case ActionTypes.OrderAuthorize: {
            return { ...state, loading: true, process: 'QRコードを取得しています', };
        }
        case ActionTypes.OrderAuthorizeSuccess: {
            const authorizeOrder = action.payload.order;
            state.inquiry.order = authorizeOrder;

            return { ...state, loading: false, process: '', error: null };
        }
        case ActionTypes.OrderAuthorizeFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        case ActionTypes.Print: {
            return { ...state, loading: true, process: '印刷しています' };
        }
        case ActionTypes.PrintSuccess: {
            return { ...state, loading: false, process: '', error: null };
        }
        case ActionTypes.PrintFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        default: {
            return state;
        }
    }
}
