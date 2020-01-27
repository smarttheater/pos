import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService, BsModalService } from 'ngx-bootstrap';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { getTicketPrice, iOSDatepickerTapBugFix } from '../../../../../functions';
import { IReservationSearchConditions } from '../../../../../models';
import { ReservationService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import {
    ReservationDetailModalComponent
} from '../../../../shared/components/parts/reservation/detail-modal/detail-modal.component';

@Component({
    selector: 'app-reservation-search',
    templateUrl: './reservation-search.component.html',
    styleUrls: ['./reservation-search.component.scss']
})
export class ReservationSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public user: Observable<reducers.IUserState>;
    public reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[][];
    public totalCount: number;
    public currentPage: number;
    public moment: typeof moment = moment;
    public reservationStatus = factory.chevre.reservationStatusType;
    public limit: number;
    public conditions: IReservationSearchConditions;
    public confirmedConditions: IReservationSearchConditions;
    public environment = getEnvironment();
    public getTicketPrice = getTicketPrice;
    @ViewChild('reservationDateFrom', { static: true }) private reservationDateFrom: BsDatepickerDirective;
    @ViewChild('reservationDateThrough', { static: true }) private reservationDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true }) private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true }) private eventStartDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IReservationState>,
        private modal: BsModalService,
        private localeService: BsLocaleService,
        private utilService: UtilService,
        private reservationService: ReservationService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.reservations = [];
        this.totalCount = 0;
        this.currentPage = 1;
        this.limit = 20;
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            reservationDateFrom: moment(today).add(-13, 'day').toDate(),
            reservationDateThrough: moment(today).toDate(),
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1
        };
        this.reservationService.delete();
    }

    /**
     * 検索パラメータへ変換
     */
    public async convertToSearchParams() {
        return new Promise<factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>>((resolve) => {
            this.user.subscribe(() => {
                const params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation> = {
                    typeOf: factory.chevre.reservationType.EventReservation,
                    bookingFrom: (this.confirmedConditions.reservationDateFrom === undefined)
                        ? undefined
                        : moment(moment(this.confirmedConditions.reservationDateFrom).format('YYYYMMDD')).toDate(),
                    bookingThrough: (this.confirmedConditions.reservationDateThrough === undefined)
                        ? undefined
                        : moment(moment(this.confirmedConditions.reservationDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
                    reservationFor: {
                        startFrom: (this.confirmedConditions.eventStartDateFrom === undefined)
                            ? undefined
                            : moment(moment(this.confirmedConditions.eventStartDateFrom).format('YYYYMMDD')).toDate(),
                        startThrough: (this.confirmedConditions.eventStartDateThrough === undefined)
                            ? undefined
                            : moment(moment(this.confirmedConditions.eventStartDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
                    },
                    ids: (this.confirmedConditions.id === '')
                        ? undefined : [this.confirmedConditions.id],
                    reservationStatuses: (this.confirmedConditions.reservationStatus === '')
                        ? undefined : [this.confirmedConditions.reservationStatus],
                    reservationNumbers: (this.confirmedConditions.reservationNumber === '')
                        ? undefined : [this.confirmedConditions.reservationNumber],
                    limit: this.limit,
                    page: this.confirmedConditions.page,
                    sort: {
                        // reservationDate: factory.sortType.Descending
                    }
                };
                resolve(params);
            }).unsubscribe();
        });
    }

    /**
     * 検索
     */
    public async reservationSearch(changeConditions: boolean, event?: { page: number }) {
        this.currentPage = 1;
        if (event !== undefined) {
            this.confirmedConditions.page = event.page;
        }
        // iOS bugfix
        this.conditions.id
            = (<HTMLInputElement>document.getElementById('id')).value;
        this.conditions.reservationNumber
            = (<HTMLInputElement>document.getElementById('reservationNumber')).value;
        if (changeConditions) {
            this.confirmedConditions = {
                reservationDateFrom: this.conditions.reservationDateFrom,
                reservationDateThrough: this.conditions.reservationDateThrough,
                eventStartDateFrom: this.conditions.eventStartDateFrom,
                eventStartDateThrough: this.conditions.eventStartDateThrough,
                id: this.conditions.id,
                reservationNumber: this.conditions.reservationNumber,
                reservationStatus: this.conditions.reservationStatus,
                page: 1
            };
        }
        try {
            this.totalCount = 0;
            this.reservations = [];
            const params = await this.convertToSearchParams();
            if (params.bookingFrom !== null
                && params.bookingThrough !== null
                && moment(params.bookingThrough).diff(moment(params.bookingFrom), 'day') > 14) {
                    // 予約日の範囲が14日以上
                    throw new Error('reservation date wrong date range');
                }
            const searchResult = await this.reservationService.splitSearch(params);
            this.totalCount = searchResult.totalCount;
            for (let i = 0; i < Math.ceil(searchResult.data.length / this.limit); i++) {
                this.reservations.push(searchResult.data.slice(
                    i * this.limit,
                    ((i + 1) * this.limit < searchResult.data.length) ? (i + 1) * this.limit : searchResult.data.length
                ));
            }
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('reservation.search.alert.search')
            });
        }
    }

    /**
     * 検索条件クリア
     */
    public searchConditionClear() {
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            reservationDateFrom: moment(today).add(-13, 'day').toDate(),
            reservationDateThrough: moment(today).toDate(),
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1
        };
        // iOS bugfix
        (<HTMLInputElement>document.getElementById('id')).value = '';
        (<HTMLInputElement>document.getElementById('reservationNumber')).value = '';
    }

    /**
     * 詳細を表示
     */
    public openDetail(reservation: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>) {
        this.modal.show(ReservationDetailModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: { reservation }
        });
    }

    /**
     * DatePicker設定
     */
    public setDatePicker() {
        this.user.subscribe((user) => {
            this.localeService.use(user.language);
        }).unsubscribe();
    }

    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    public onShowPicker(container: BsDatepickerContainerComponent) {
        iOSDatepickerTapBugFix(container, [
            this.reservationDateFrom,
            this.reservationDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough
        ]);
    }

}
