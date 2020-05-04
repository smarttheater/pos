import { factory } from '@cinerino/api-javascript-client';
import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import { masterAction } from '../actions';

/**
 * IMasterState
 */
export interface IMasterState {
    projects: factory.project.IProject[];
}

export const masterInitialState: IMasterState = {
    projects: []
};

export function reducer(initialState: IState, action: Action) {
    return createReducer(
        initialState,
        on(masterAction.remove, state => {
            state.masterData = {
                projects: []
            };
            return { ...state };
        }),
        on(masterAction.getProjects, (state) => {
            return { ...state, loading: true, process: 'masterAction.GetProjects' };
        }),
        on(masterAction.getProjectsSuccess, (state, payload) => {
            const projects = payload.projects;
            state.masterData.projects = projects;

            return { ...state, loading: false, process: '', error: null };
        }),
        on(masterAction.getProjectsFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
    )(initialState, action);
}
