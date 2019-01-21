import { factory } from '@cinerino/api-javascript-client';
import { IState } from '.';
import { Actions, ActionTypes } from '../actions/user.action';

export interface IUserState {
    movieTheaters: factory.organization.IOrganization<factory.organizationType.MovieTheater>[];
    movieTheater?: factory.organization.IOrganization<factory.organizationType.MovieTheater>;
    pos?: factory.organization.IPOS;
    customerContact?: factory.transaction.placeOrder.ICustomerContact;
    printer?: { ipAddress: string; };
}

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.Delete: {
            return { ...state, loading: false, process: '' };
        }
        case ActionTypes.UpdateAll: {
            const customerContact = action.payload.customerContact;
            const movieTheater = action.payload.movieTheater;
            const pos = action.payload.pos;
            const printer = action.payload.printer;
            state.user.customerContact = customerContact;
            state.user.movieTheater = movieTheater;
            state.user.pos = pos;
            state.user.printer = printer;

            return { ...state, loading: false, process: '' };
        }
        case ActionTypes.GetTheaters: {
            return { ...state, loading: true, process: '処理しています' };
        }
        case ActionTypes.GetTheatersSuccess: {
            const movieTheaters = action.payload.movieTheaters;
            return {
                ...state, loading: false, process: '', error: null, user: {
                    ...state.user, movieTheaters
                }
            };
        }
        case ActionTypes.GetTheatersFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        default: {
            return state;
        }
    }
}
