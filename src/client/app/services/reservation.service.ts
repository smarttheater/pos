import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { reservationAction } from '../store/actions';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    public reservation: Observable<reducers.IReservationState>;
    public error: Observable<string | null>;
    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions
    ) {
        this.reservation = this.store.pipe(select(reducers.getReservation));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * 予約データ取得
     */
    public async getData() {
        return new Promise<reducers.IReservationState>((resolve) => {
            this.reservation.subscribe((reservation) => {
                resolve(reservation);
            }).unsubscribe();
        });
    }

    /**
     * 予約データ削除
     */
    public delete() {
        this.store.dispatch(new reservationAction.Delete());
    }

    /**
     * 予約検索
     */
    public search(
        params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>
    ) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new reservationAction.Search({ params }));
            const success = this.actions.pipe(
                ofType(reservationAction.ActionTypes.SearchSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(reservationAction.ActionTypes.SearchFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }
}
