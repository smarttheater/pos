import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, DownloadService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-reservation-download',
    templateUrl: './reservation-download.component.html',
    styleUrls: ['./reservation-download.component.scss']
})
export class ReservationDownloadComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public user: Observable<reducers.IUserState>;
    public reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[][];
    public totalCount: number;
    public currentPage: number;
    public moment = moment;
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
        private store: Store<reducers.IOrderState>,
        private utilService: UtilService,
        private actionService: ActionService,
        private downloadService: DownloadService,
        private translate: TranslateService,
        private localeService: BsLocaleService,
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
            reservationDateFrom: moment(today).add(-4, 'month').toDate(),
            reservationDateThrough: moment(today).toDate(),
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1
        };
        this.actionService.reservation.delete();
    }

    /**
     * ダウンロード
     */
    public async reservationDownload(changeConditions: boolean) {
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
        this.utilService.loadStart({ process: 'load' });
        try {
            const params = Functions.Reservation.input2ReservationSearchCondition({
                input: this.confirmedConditions,
                theater: (await this.actionService.user.getData()).theater,
            });
            await this.downloadService.reservation(params);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('reservation.download.alert.download')
            });
        }
        this.utilService.loadEnd();
    }

    /**
     * 検索条件クリア
     */
    public downloadConditionClear() {
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            reservationDateFrom: moment(today).add(-4, 'month').toDate(),
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
