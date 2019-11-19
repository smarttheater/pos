import { IState } from '.';
import { utilAction } from '../actions';


/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(state: IState, action: utilAction.Actions): IState {
    switch (action.type) {
        case utilAction.ActionTypes.LoadStart: {
            return { ...state, loading: true, process: 'load' };
        }
        case utilAction.ActionTypes.LoadEnd: {
            return { ...state, loading: false, process: '' };
        }
        default: {
            return state;
        }
    }
}
