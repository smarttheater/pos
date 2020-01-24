import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { sleep } from '../functions';
import { reservationAction } from '../store/actions';
import * as reducers from '../store/reducers';
import { CinerinoService } from './cinerino.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    public reservation: Observable<reducers.IReservationState>;
    public error: Observable<string | null>;
    constructor(
        private store: Store<reducers.IState>,
        private cinerinoService: CinerinoService,
        private utilService: UtilService
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
     * 注文検索
     */
    public async search(params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>) {
        try {
            this.utilService.loadStart({ process: 'reservationAction.Search' });
            await this.cinerinoService.getServices();
            const searchResult =
                await this.cinerinoService.reservation.search<factory.chevre.reservationType.EventReservation>(params);
            this.utilService.loadEnd();
            return searchResult;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 分割検索
     */
    public async splitSearch(params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>) {
        try {
            this.utilService.loadStart({ process: 'reservationAction.Search' });
            await this.cinerinoService.getServices();
            let reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[] = [];
            const splitDay = 1;
            const splitCount =
                Math.ceil(moment(params.bookingThrough).diff(moment(params.bookingFrom), 'days') / splitDay);
            for (let i = 0; i < splitCount; i++) {
                const limit = 10;
                let page = 1;
                let roop = true;
                const bookingThrough = moment(params.bookingThrough).add(-1 * splitDay * i, 'days').toDate();
                const bookingFrom =
                    (moment(params.bookingThrough).add(-1 * splitDay * (i + 1), 'days').toDate() > moment(params.bookingFrom).toDate())
                        ? moment(params.bookingThrough).add(-1 * splitDay * (i + 1), 'days').toDate()
                        : moment(params.bookingFrom).toDate();
                while (roop) {
                    params.limit = limit;
                    params.page = page;
                    const searchResult =
                        await this.cinerinoService.reservation
                            .search<factory.chevre.reservationType.EventReservation>({ ...params, bookingThrough, bookingFrom });
                    reservations = reservations.concat(searchResult.data);
                    page++;
                    roop = searchResult.data.length > 0;
                    await sleep(500);
                }
            }
            this.utilService.loadEnd();
            return { data: reservations, totalCount: reservations.length };
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }
}
