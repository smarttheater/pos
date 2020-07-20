import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ReservationService, UserService, UtilService } from '../../../../../services';
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
    public reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    public nextReservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    public totalCount: number;
    public maxSize: number;
    public currentPage: number;
    public moment: typeof moment = moment;
    public reservationStatus = factory.chevre.reservationStatusType;
    public limit: number;
    public conditions: Models.Reservation.IReservationSearchConditions;
    public confirmedConditions: Models.Reservation.IReservationSearchConditions;
    public environment = getEnvironment();
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
        private translate: TranslateService,
        private userService: UserService
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.reservations = [];
        this.totalCount = 20;
        this.maxSize = 1;
        this.currentPage = 1;
        this.limit = 20;
        this.searchConditionClear();
        this.reservationService.delete();
    }

    /**
     * 検索条件変更
     */
    private changeConditions() {
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
        this.reservations = [];
        this.totalCount = 20;
        this.maxSize = 1;
        this.currentPage = 1;
    }

    /**
     * 検索
     */
    public async reservationSearch(changeConditions: boolean, event?: { page: number }) {
        this.currentPage = 1;
        if (event !== undefined) {
            this.currentPage = event.page;
            this.confirmedConditions.page = event.page;
        }
        // iOS bugfix
        this.conditions.id
            = (<HTMLInputElement>document.getElementById('id')).value;
        this.conditions.reservationNumber
            = (<HTMLInputElement>document.getElementById('reservationNumber')).value;
        if (changeConditions) {
            this.changeConditions();
        }
        try {
            const params = Functions.Reservation.input2ReservationSearchCondition({
                input: this.confirmedConditions,
                theater: (await this.userService.getData()).theater,
                page: this.currentPage,
                limit: this.limit
            });
            if (params.bookingFrom !== null
                && params.bookingThrough !== null
                && moment(params.bookingThrough).diff(moment(params.bookingFrom), 'day') > 14) {
                // 予約日の範囲が14日以上
                throw new Error('reservation date wrong date range').message;
            }
            this.reservations = (await this.reservationService.search(params)).data;
            this.nextReservations = (await this.reservationService.search({ ...params, page: (this.currentPage + 1) })).data;
            const totalCount = (this.nextReservations.length === 0)
                ? this.currentPage * this.limit : (this.currentPage + 1) * this.limit;
            this.totalCount = (this.totalCount < totalCount) ? totalCount : this.totalCount;
            const maxSize = this.totalCount / this.limit;
            const maxSizeLimit = 5;
            this.maxSize = (maxSize > maxSizeLimit) ? maxSizeLimit : maxSize;
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
        Functions.Util.iOSDatepickerTapBugFix(container, [
            this.reservationDateFrom,
            this.reservationDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough
        ]);
    }

}
