import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CinerinoService } from '../../services';
import { personAction } from '../actions';

/**
 * Person Effects
 */
@Injectable()
export class PersonEffects {

    constructor(
        private actions: Actions,
        private cinerino: CinerinoService
    ) { }

    /**
     * Search
     */
    @Effect()
    public search = this.actions.pipe(
        ofType<personAction.Search>(personAction.ActionTypes.Search),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                await this.cinerino.getServices();
                const params = payload.params;
                const searchResult = await this.cinerino.person.search(params);
                const limit = <number>params.limit;
                return new personAction.SearchSuccess({ searchResult, limit });
            } catch (error) {
                return new personAction.SearchFail({ error: error });
            }
        })
    );


}
