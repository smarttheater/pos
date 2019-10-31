import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { personAction } from '../store/actions';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    public order: Observable<reducers.IOrderState>;
    public error: Observable<string | null>;
    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions
    ) {
        this.order = this.store.pipe(select(reducers.getOrder));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * データ取得
     */
    public async getData() {
        return new Promise<reducers.IOrderState>((resolve) => {
            this.order.subscribe((order) => {
                resolve(order);
            }).unsubscribe();
        });
    }

    /**
     * データ削除
     */
    public delete() {
        this.store.dispatch(new personAction.Delete());
    }

    /**
     * 検索
     */
    public search(params: factory.order.ISearchConditions) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new personAction.Search({ params }));

            const success = this.actions.pipe(
                ofType(personAction.ActionTypes.SearchSuccess),
                tap(() => { resolve(); })
            );

            const fail = this.actions.pipe(
                ofType(personAction.ActionTypes.SearchFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

}
