import { ISearchResult } from '@cinerino/api-abstract-client/lib/service';
import { factory } from '@cinerino/api-javascript-client';
import { Action } from '@ngrx/store';

/**
 * Action types
 */
export enum ActionTypes {
    Delete = '[Person] Delete',
    Search = '[Person] Search',
    SearchSuccess = '[Person] Search Success',
    SearchFail = '[Person] Search Fail'
}

/**
 * Delete
 */
export class Delete implements Action {
    public readonly type = ActionTypes.Delete;
    constructor(public payload?: {}) { }
}

/**
 * Search
 */
export class Search implements Action {
    public readonly type = ActionTypes.Search;
    constructor(public payload: {
        params: {
            limit?: number;
            page?: number;
            id?: string;
            username?: string;
            email?: string;
            telephone?: string;
            givenName?: string;
            familyName?: string;
        }
    }) { }
}

/**
 * SearchSuccess
 */
export class SearchSuccess implements Action {
    public readonly type = ActionTypes.SearchSuccess;
    constructor(public payload: {
        searchResult: ISearchResult<factory.person.IPerson[]>,
        limit: number;
    }) { }
}

/**
 * SearchFail
 */
export class SearchFail implements Action {
    public readonly type = ActionTypes.SearchFail;
    constructor(public payload: { error: Error }) { }
}


/**
 * Actions
 */
export type Actions =
    | Delete
    | Search
    | SearchSuccess
    | SearchFail;
