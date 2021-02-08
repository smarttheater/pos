import { factory } from '@cinerino/sdk';
import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import { Models } from '../..';
import { userAction } from '../actions';

export interface IUserState {
    /**
     * 劇場
     */
    theater?: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
    /**
     * POS
     */
    pos?: factory.chevre.place.movieTheater.IPOS;
    /**
     * 入場ゲート
     */
    entranceGate?: factory.chevre.place.movieTheater.IEntranceGate;
    /**
     * 購入者情報
     */
    customerContact?: factory.person.IProfile;
    /**
     * プリンター
     */
    printer?: Models.Util.Printer.IPrinter;
    /**
     * ドロワー
     */
    drawer?: boolean;
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

export function reducer(initialState: IState, action: Action) {
    return createReducer(
        initialState,
        on(userAction.remove, state => {
            return {
                ...state,
                userData: {
                    language: 'ja'
                }, loading: false, process: ''
            };
        }),
        on(userAction.updateAll, (state, payload) => {
            const theater = payload.theater;
            const pos = payload.pos;
            const entranceGate = payload.entranceGate;
            const customerContact = payload.customerContact;
            const printer = payload.printer;
            const drawer = payload.drawer;

            return {
                ...state, userData: {
                    ...state.userData,
                    theater,
                    pos,
                    entranceGate,
                    customerContact,
                    printer,
                    drawer
                }, loading: false, process: ''
            };
        }),
        on(userAction.updateLanguage, (state, payload) => {
            const language = payload.language;
            return { ...state, userData: { ...state.userData, language } };
        }),
        on(userAction.setVersion, (state, payload) => {
            const version = payload.version;
            return { ...state, userData: { ...state.userData, version } };
        }),
    )(initialState, action);
}
