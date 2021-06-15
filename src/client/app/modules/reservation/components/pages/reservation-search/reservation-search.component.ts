import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { ReservationDetailModalComponent } from '../../../../shared/components/parts/reservation/detail-modal/detail-modal.component';

@Component({
    selector: 'app-reservation-search',
    templateUrl: './reservation-search.component.html',
    styleUrls: ['./reservation-search.component.scss'],
})
export class ReservationSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public user: Observable<reducers.IUserState>;
    public reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    public nextReservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    public totalCount: number;
    public maxSize: number;
    public currentPage: number;
    public moment = moment;
    public reservationStatus = factory.chevre.reservationStatusType;
    public limit: number;
    public conditions: Models.Reservation.IReservationSearchConditions;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IReservationState>,
        private modal: BsModalService,
        private utilService: UtilService,
        private actionService: ActionService,
        private translate: TranslateService
    ) {}

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.reservations = [];
        this.totalCount = 20;
        this.maxSize = 1;
        this.currentPage = 1;
        this.limit = 20;
        this.actionService.reservation.delete();
    }

    /**
     * 検索
     */
    public async search() {
        try {
            this.currentPage = this.conditions.page;
            const params =
                Functions.Reservation.input2ReservationSearchCondition({
                    input: this.conditions,
                    theater: (await this.actionService.user.getData()).theater,
                    page: this.currentPage,
                    limit: this.limit,
                });
            // if (
            //     params.bookingFrom !== null &&
            //     params.bookingThrough !== null &&
            //     moment(params.bookingThrough).diff(
            //         moment(params.bookingFrom),
            //         'day'
            //     ) > 14
            // ) {
            //     // 予約日の範囲が14日以上
            //     throw new Error('reservation date wrong date range');
            // }
            this.reservations = (
                await this.actionService.reservation.search(params)
            ).data;
            this.nextReservations = (
                await this.actionService.reservation.search({
                    ...params,
                    page: this.currentPage + 1,
                })
            ).data;
            const totalCount =
                this.nextReservations.length === 0
                    ? this.currentPage * this.limit
                    : (this.currentPage + 1) * this.limit;
            this.totalCount =
                this.totalCount < totalCount ? totalCount : this.totalCount;
            const maxSize = this.totalCount / this.limit;
            const maxSizeLimit = 5;
            this.maxSize = maxSize > maxSizeLimit ? maxSizeLimit : maxSize;
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('reservation.search.alert.search'),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 検索条件変更
     */
    public async changeConditions(
        conditions: Models.Reservation.IReservationSearchConditions
    ) {
        this.conditions = conditions;
        this.totalCount = this.limit;
        this.maxSize = 1;
        await this.search();
    }

    /**
     * ページ変更
     */
    public async changePage(event: { page: number }) {
        this.conditions.page = event.page;
        await this.search();
    }

    /**
     * 詳細を表示
     */
    public openDetail(
        reservation: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>
    ) {
        this.modal.show(ReservationDetailModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: { reservation },
        });
    }
}
