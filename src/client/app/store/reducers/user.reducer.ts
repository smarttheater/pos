import { factory } from '@cinerino/api-javascript-client';
import { IState } from '.';
import { IPrinter } from '../../models';
import { userAction } from '../actions';

export interface IUserState {
    /**
     * 販売者情報
     */
    seller?: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    /**
     * POS
     */
    pos?: factory.seller.IPOS;
    /**
     * 劇場
     */
    theater?: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
    /**
     * 購入者情報
     */
    customerContact?: factory.person.IProfile;
    /**
     * プリンター
     */
    printer?: IPrinter;
    /**
     * 言語
     */
    language: string;
    /**
     * バージョン
     */
    version?: string;
}

export const userInitialState: IUserState = {
    language: 'ja'
};

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: userAction.Actions): IState {
    switch (action.type) {
        case userAction.ActionTypes.Delete: {
            state.userData = userInitialState;
            return { ...state, loading: false, process: '' };
        }
        case userAction.ActionTypes.UpdateAll: {
            const customerContact = action.payload.customerContact;
            const seller = action.payload.seller;
            const pos = action.payload.pos;
            const theater = action.payload.theater;
            const printer = action.payload.printer;
            state.userData.customerContact = customerContact;
            state.userData.seller = seller;
            state.userData.pos = pos;
            state.userData.theater = theater;
            state.userData.printer = printer;

            return { ...state, loading: false, process: '' };
        }
        case userAction.ActionTypes.UpdateLanguage: {
            state.userData.language = action.payload.language;
            return { ...state };
        }
        case userAction.ActionTypes.SetVersion: {
            state.userData.version = action.payload.version;
            return { ...state };
        }
        default: {
            return state;
        }
    }
}
