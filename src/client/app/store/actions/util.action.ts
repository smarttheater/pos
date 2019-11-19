import { Action } from '@ngrx/store';

/**
 * Action types
 */
export enum ActionTypes {
    LoadStart = '[Util] Load Start',
    LoadEnd = '[Util] Load End'
}

/**
 * LoadStart
 */
export class LoadStart implements Action {
    public readonly type = ActionTypes.LoadStart;
    constructor(public payload?: {}) { }
}

/**
 * LoadEnd
 */
export class LoadEnd implements Action {
    public readonly type = ActionTypes.LoadEnd;
    constructor(public payload?: {}) { }
}

/**
 * Actions
 */
export type Actions =
    | LoadStart
    | LoadEnd;
