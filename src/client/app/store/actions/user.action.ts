import { factory } from '@cinerino/api-javascript-client';
import { Action } from '@ngrx/store';
import { IPrinter } from '../../models';

/**
 * Action types
 */
export enum ActionTypes {
    Delete = '[User] Delete',
    UpdateAll = '[User] Update All',
    UpdateLanguage = '[User] Update Language',
    SetVersion = '[User] Set Version',
}

/**
 * 削除
 */
export class Delete implements Action {
    public readonly type = ActionTypes.Delete;
    constructor(public payload?: {}) { }
}

/**
 * 設定更新
 */
export class UpdateAll implements Action {
    public readonly type = ActionTypes.UpdateAll;
    constructor(public payload: {
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
        pos?: factory.seller.IPOS;
        theater: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
        customerContact: factory.transaction.placeOrder.ICustomerProfile;
        printer: IPrinter;
    }) { }
}


/**
 * 言語更新
 */
export class UpdateLanguage implements Action {
    public readonly type = ActionTypes.UpdateLanguage;
    constructor(public payload: { language: string }) { }
}

/**
 * バージョン設定
 */
export class SetVersion implements Action {
    public readonly type = ActionTypes.SetVersion;
    constructor(public payload: { version: string }) { }
}

/**
 * Actions
 */
export type Actions =
    | Delete
    | UpdateAll
    | UpdateLanguage
    | SetVersion;
