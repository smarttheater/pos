import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select } from '@ngrx/store';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { Functions } from '../../../../..';
import * as reducers from '../../../../../store/reducers';
import { OrderSearchComponent } from '../order-search/order-search.component';

@Component({
    selector: 'app-order-search-event',
    templateUrl: './order-search-event.component.html',
    styleUrls: ['./order-search-event.component.scss']
})
export class OrderSearchEventComponent extends OrderSearchComponent implements OnInit {
    @ViewChild('datepicker', { static: true }) private datepicker: BsDatepickerDirective;
    public scheduleDate: Date;
    public screeningEventsGroup: Functions.Purchase.IScreeningEventsGroup[];
    public screeningEvent: factory.chevre.event.screeningEvent.IEvent;

    public ngOnInit() {
        this.actionSelect = '';
        this.selectedOrders = [];
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.orders = [];
        this.maxSize = 1;
        this.currentPage = 1;
        this.limit = 20;
        this.totalCount = this.limit;
        this.screeningEventsGroup = [];
        this.scheduleDate = moment(moment().format('YYYYMMDD'), 'YYYYMMDD').toDate();
    }

    /**
     * 日付選択
     */
    public async selectDate(date?: Date | null) {
        if (date === undefined || date === null) {
            return;
        }
        this.scheduleDate = date;
        const user = await this.actionService.user.getData();
        const theater = user.theater;
        if (this.scheduleDate === undefined) {
            this.scheduleDate = moment()
                .add(this.environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE, 'day')
                .toDate();
        }
        const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
        if (theater === undefined) {
            return;
        }
        try {
            const creativeWorks = await this.masterService.searchMovies({
                offers: { availableFrom: moment(scheduleDate).toDate() }
            });
            const screeningEventSeries = (this.environment.PURCHASE_SCHEDULE_SORT === 'screeningEventSeries')
                ? await this.masterService.searchScreeningEventSeries({
                    location: {
                        branchCode: { $eq: theater.branchCode }
                    },
                    workPerformed: { identifiers: creativeWorks.map(c => c.identifier) }
                })
                : [];
            const screeningRooms = (this.environment.PURCHASE_SCHEDULE_SORT === 'screen')
                ? await this.masterService.searchScreeningRooms({
                    branchCode: { $eq: theater.branchCode }
                })
                : [];
            const screeningEvents = await this.masterService.searchScreeningEvent({
                superEvent: { locationBranchCodes: [theater.branchCode] },
                startFrom: moment(scheduleDate).toDate(),
                startThrough: moment(scheduleDate).add(1, 'day').add(-1, 'millisecond').toDate(),
                creativeWorks,
                screeningEventSeries,
                screeningRooms
            });
            this.screeningEventsGroup =
                Functions.Purchase.screeningEvents2ScreeningEventSeries({ screeningEvents });
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.searchEvent.alert.schedule')
            });
        }
    }

    /**
     * スケジュール選択
     */
    public async selectSchedule(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        this.screeningEvent = screeningEvent;
        this.changeConditions({
            confirmationNumber: '',
            orderNumber: '',
            customer: {
                familyName: '',
                givenName: '',
                email: '',
                telephone: ''
            },
            orderStatus: '',
            paymentMethodType: '',
            eventIds: [screeningEvent.id],
            posId: '',
            page: 1
        });
    }


    /**
     * Datepicker言語設定
     */
    public setDatePicker() {
        this.user.subscribe((user) => {
            this.localeService.use(user.language);
        }).unsubscribe();
    }

    /**
     * Datepicker開閉
     */
    public toggleDatepicker() {
        this.setDatePicker();
        this.datepicker.toggle();
    }

    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    public onShowPicker(container: BsDatepickerContainerComponent) {
        Functions.Util.iOSDatepickerTapBugFix(container, [
            this.datepicker
        ]);
    }
}
