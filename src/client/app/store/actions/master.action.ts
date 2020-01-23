import { factory } from '@cinerino/api-javascript-client';
import { Action } from '@ngrx/store';

/**
 * Action types
 */
export enum ActionTypes {
    Delete = '[Master] Delete',
    GetSellers = '[Master] Get Sellers',
    GetSellersSuccess = '[Master] Get Sellers Success',
    GetSellersFail = '[Master] Get Sellers Fail',
    GetSchedule = '[Master] Get Schedule',
    GetScheduleSuccess = '[Master] Get Schedule Success',
    GetScheduleFail = '[Master] Get Schedule Fail',
    GetProjects = '[Master] Get Projects',
    GetProjectsSuccess = '[Master] Get Projects Success',
    GetProjectsFail = '[Master] Get Projects Fail'
}

/**
 * Delete
 */
export class Delete implements Action {
    public readonly type = ActionTypes.Delete;
    constructor(public payload?: {}) { }
}

/**
 * GetSellers
 */
export class GetSellers implements Action {
    public readonly type = ActionTypes.GetSellers;
    constructor(public payload?: factory.seller.ISearchConditions) { }
}

/**
 * GetSellersSuccess
 */
export class GetSellersSuccess implements Action {
    public readonly type = ActionTypes.GetSellersSuccess;
    constructor(public payload: { sellers: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>[] }) { }
}

/**
 * GetSellersFail
 */
export class GetSellersFail implements Action {
    public readonly type = ActionTypes.GetSellersFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * GetSchedule
 */
export class GetSchedule implements Action {
    public readonly type = ActionTypes.GetSchedule;
    constructor(public payload: {
        superEvent: {
            ids?: string[];
            locationBranchCodes?: string[];
            workPerformedIdentifiers?: string[];
        };
        startFrom: Date;
        startThrough: Date;
    }) { }
}

/**
 * GetScheduleSuccess
 */
export class GetScheduleSuccess implements Action {
    public readonly type = ActionTypes.GetScheduleSuccess;
    constructor(public payload: {
        screeningEvents: factory.chevre.event.screeningEvent.IEvent[];
        scheduleDate: string;
    }) { }
}

/**
 * GetScheduleFail
 */
export class GetScheduleFail implements Action {
    public readonly type = ActionTypes.GetScheduleFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * GetProjects
 */
export class GetProjects implements Action {
    public readonly type = ActionTypes.GetProjects;
    constructor(public payload?: {}) { }
}

/**
 * GetProjectsSuccess
 */
export class GetProjectsSuccess implements Action {
    public readonly type = ActionTypes.GetProjectsSuccess;
    constructor(public payload: {
        projects: factory.project.IProject[]
    }) { }
}

/**
 * GetProjectsFail
 */
export class GetProjectsFail implements Action {
    public readonly type = ActionTypes.GetProjectsFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * Actions
 */
export type Actions =
    | Delete
    | GetSellers
    | GetSellersSuccess
    | GetSellersFail
    | GetSchedule
    | GetScheduleSuccess
    | GetScheduleFail
    | GetProjects
    | GetProjectsSuccess
    | GetProjectsFail;
