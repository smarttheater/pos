import { factory } from '@cinerino/sdk';
import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import { orderAction } from '../actions';

export interface IOrderState {
    order?: factory.order.IOrder;
}

export const orderInitialState: IOrderState = {};

export function reducer(initialState: IState, action: Action) {
    return createReducer(
        initialState,
        on(orderAction.remove, state => {
            return { ...state, orderData: {} };
        }),
        on(orderAction.cancel, (state) => {
            return { ...state, loading: true, process: 'orderAction.Cancel' };
        }),
        on(orderAction.cancelSuccess, (state) => {
            return { ...state, loading: false, process: '', error: null };
        }),
        on(orderAction.cancelFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: (error.message) ? error.message :  JSON.stringify(error) };
        }),
        on(orderAction.inquiry, (state) => {
            return { ...state, loading: true, process: 'orderAction.Inquiry' };
        }),
        on(orderAction.inquirySuccess, (state, payload) => {
            const order = payload.order;
            return { ...state, orderData: { ...state.orderData, order }, loading: false, process: '', error: null };
        }),
        on(orderAction.inquiryFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: (error.message) ? error.message :  JSON.stringify(error) };
        }),
    )(initialState, action);
}
