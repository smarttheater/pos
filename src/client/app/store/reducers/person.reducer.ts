import { factory } from '@cinerino/api-javascript-client';
import { IState } from '.';
import { personAction } from '../actions';

export interface IPersonState {
    person?: factory.person.IPerson;
    persons: factory.person.IPerson[];
    totalCount: number;
    pageCount: number;
}

export const personInitialState: IPersonState = {
    persons: [],
    totalCount: 0,
    pageCount: 1
};

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: personAction.Actions): IState {
    switch (action.type) {
        case personAction.ActionTypes.Delete: {
            state.personData = {
                persons: [],
                totalCount: 0,
                pageCount: 1
            };
            return { ...state };
        }
        case personAction.ActionTypes.Search: {
            return { ...state, loading: true, process: 'personAction.Search' };
        }
        case personAction.ActionTypes.SearchSuccess: {
            const searchResult = action.payload.searchResult;
            const limit = action.payload.limit;
            state.personData.persons = searchResult.data;
            state.personData.totalCount = searchResult.totalCount;
            state.personData.pageCount = Math.ceil(searchResult.totalCount / limit);
            return { ...state, loading: false, process: '', error: null };
        }
        case personAction.ActionTypes.SearchFail: {
            const error = action.payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }
        default: {
            return state;
        }
    }
}
