import { factory } from '@cinerino/api-javascript-client';
import { IState } from '.';
import { masterAction } from '../actions';

/**
 * IMasterState
 */
export interface IMasterState {
    sellers: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>[];
    theaters: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom[];
    screeningEvents: factory.chevre.event.screeningEvent.IEvent[];
    projects: factory.project.IProject[];
}

export const masterInitialState: IMasterState = {
    sellers: [],
    theaters: [],
    screeningEvents: [],
    projects: []
};

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: masterAction.Actions): IState {
    switch (action.type) {
        case masterAction.ActionTypes.Delete: {
            state.masterData = {
                sellers: [],
                theaters: [],
                screeningEvents: [],
                projects: []
            };
            return { ...state };
        }
        case masterAction.ActionTypes.GetSellers: {
            return { ...state, loading: true, process: 'masterAction.GetSellers' };
        }
        case masterAction.ActionTypes.GetSellersSuccess: {
            const sellers = action.payload.sellers;
            state.masterData.sellers = sellers;
            return { ...state, loading: false, process: '', error: null };
        }
        case masterAction.ActionTypes.GetSellersFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        case masterAction.ActionTypes.GetTheaters: {
            return { ...state, loading: true, process: 'masterAction.GetTheaters' };
        }
        case masterAction.ActionTypes.GetTheatersSuccess: {
            const theaters = action.payload.theaters;
            state.masterData.theaters = theaters;
            return { ...state, loading: false, process: '', error: null };
        }
        case masterAction.ActionTypes.GetTheatersFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        case masterAction.ActionTypes.GetSchedule: {
            return { ...state, loading: true, process: 'masterAction.GetSchedule' };
        }
        case masterAction.ActionTypes.GetScheduleSuccess: {
            const screeningEvents = action.payload.screeningEvents;
            state.masterData.screeningEvents = screeningEvents;

            return { ...state, loading: false, process: '', error: null };
        }
        case masterAction.ActionTypes.GetScheduleFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        case masterAction.ActionTypes.GetProjects: {
            return { ...state, loading: true, process: 'masterAction.GetProjects' };
        }
        case masterAction.ActionTypes.GetProjectsSuccess: {
            const projects = action.payload.projects;
            state.masterData.projects = projects;

            return { ...state, loading: false, process: '', error: null };
        }
        case masterAction.ActionTypes.GetProjectsFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        default: {
            return state;
        }
    }
}
