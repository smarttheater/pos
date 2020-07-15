import { factory } from '@cinerino/sdk';
import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import { reservationAction } from '../actions';

export interface IReservationState {
    reservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
    reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    totalCount: number;
    pageCount: number;
}

export const reservationInitialState: IReservationState = {
    reservations: [],
    totalCount: 0,
    pageCount: 1
};

export function reducer(initialState: IState, action: Action) {
    return createReducer(
        initialState,
        on(reservationAction.remove, state => {
            return { ...state, reservationData: {
                reservations: [],
                totalCount: 0,
                pageCount: 1
            } };
        }),
    )(initialState, action);
}
