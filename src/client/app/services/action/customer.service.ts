import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as reducers from '../../store/reducers';
import { CinerinoService } from '../cinerino.service';
import { UtilService } from '../util.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
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
     * 検索
     */
     public async search(params: {
        limit?: number;
        page?: number;
        name?: {
            $regex?: string;
        };
    }) {
        try {
            this.utilService.loadStart({ process: 'customerAction.Search' });
            await this.cinerinoService.getServices();
            const searchResult = await this.cinerinoService.customer.search(params);
            this.utilService.loadEnd();
            return searchResult;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }
}
