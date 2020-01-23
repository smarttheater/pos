import { factory } from '@cinerino/api-javascript-client';
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

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: reservationAction.Actions): IState {
    switch (action.type) {
        case reservationAction.ActionTypes.Delete: {
            state.reservationData = {
                reservations: [],
                totalCount: 0,
                pageCount: 1
            };
            return { ...state };
        }
        default: {
            return state;
        }
    }
}
