import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { BAD_REQUEST, TOO_MANY_REQUESTS } from 'http-status';
import * as moment from 'moment';
import {
    BsDatepickerContainerComponent,
    BsDatepickerDirective,
    BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Functions } from '../../../../../..';
import { getEnvironment } from '../../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';

@Component({
    selector: 'app-purchase-event-date',
    templateUrl: './purchase-event-date.component.html',
    styleUrls: ['./purchase-event-date.component.scss'],
})
export class PurchaseEventDateComponent implements OnInit, OnDestroy {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public master: Observable<reducers.IMasterState>;
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public screeningEvents: factory.chevre.event.screeningEvent.IEvent[];
    public screeningEventsGroup: Functions.Purchase.IScreeningEventsGroup[];
    public moment = moment;
    private updateTimer: any;
    public scheduleDate: Date;
    public environment = getEnvironment();
    @ViewChild('datepicker', { static: true })
    private datepicker: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private actionService: ActionService,
        private masterService: MasterService,
        private localeService: BsLocaleService,
        private utilService: UtilService
    ) {}

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.error = this.store.pipe(select(reducers.getError));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.screeningEventsGroup = [];
        if (this.scheduleDate === undefined) {
            this.scheduleDate = moment()
                .add(
                    this.environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE,
                    'day'
                )
                .toDate();
        }
        try {
            if (
                (await this.actionService.purchase.getData()).transaction ===
                undefined
            ) {
                return;
            }
            await this.actionService.purchase.cancelTransaction();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 破棄
     */
    public ngOnDestroy() {
        clearTimeout(this.updateTimer);
    }

    /**
     * 更新
     */
    private update() {
        if (this.updateTimer !== undefined) {
            clearTimeout(this.updateTimer);
        }
        const time = 600000; // 10 * 60 * 1000
        this.updateTimer = setTimeout(async () => {
            await this.getSchedule();
        }, time);
    }

    /**
     * 日付選択
     */
    public async selectDate(date?: Date | null) {
        if (date === undefined || date === null) {
            return;
        }
        this.scheduleDate = date;
        if (this.scheduleDate === undefined || this.scheduleDate === null) {
            this.scheduleDate = moment()
                .add(
                    this.environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE,
                    'day'
                )
                .toDate();
        }
        const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
        this.actionService.purchase.selectScheduleDate(scheduleDate);
        try {
            await this.getSchedule();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * スケジュール取得
     */
    public async getSchedule() {
        const { theater } = await this.actionService.user.getData();
        if (theater === undefined) {
            throw new Error('theater undefined');
        }
        const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
        const creativeWorks = await this.masterService.searchMovies({
            offers: { availableFrom: moment(scheduleDate).toDate() },
        });
        const screeningEventSeries =
            this.environment.PURCHASE_SCHEDULE_SORT === 'screeningEventSeries'
                ? await this.masterService.searchScreeningEventSeries({
                      location: {
                          branchCode: { $eq: theater.branchCode },
                      },
                      workPerformed: {
                          identifiers: creativeWorks.map((c) => c.identifier),
                      },
                  })
                : [];
        const screeningRooms =
            this.environment.PURCHASE_SCHEDULE_SORT === 'screen'
                ? await this.masterService.searchScreeningRooms({
                      branchCode: { $eq: theater.branchCode },
                  })
                : [];
        this.screeningEvents = await this.masterService.searchScreeningEvent({
            superEvent: { locationBranchCodes: [theater.branchCode] },
            startFrom: moment(scheduleDate).toDate(),
            startThrough: moment(scheduleDate)
                .add(1, 'day')
                .add(-1, 'millisecond')
                .toDate(),
            creativeWorks,
            screeningEventSeries,
            screeningRooms,
        });
        const now = moment(
            (await this.utilService.getServerTime()).date
        ).toDate();
        this.screeningEventsGroup =
            Functions.Purchase.screeningEvents2ScreeningEventSeries({
                screeningEvents: this.screeningEvents,
                now,
            });
        this.update();
    }

    /**
     * 次へ
     */
    public async onSubmit() {
        try {
            const user = await this.actionService.user.getData();
            if (user.theater === undefined) {
                throw new Error('user.theater === undefined');
            }
            const screeningEvent = this.screeningEvents.find(
                (s) =>
                    s.offers !== undefined &&
                    s.offers.seller !== undefined &&
                    s.offers.seller.id !== undefined
            );
            if (
                screeningEvent === undefined ||
                screeningEvent.offers === undefined ||
                screeningEvent.offers.seller === undefined ||
                screeningEvent.offers.seller.id === undefined
            ) {
                throw new Error('screeningEvent.offers.seller === undefined');
            }
            await this.actionService.purchase.getSeller(
                screeningEvent.offers.seller.id
            );
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
        try {
            const purchase = await this.actionService.purchase.getData();
            const user = await this.actionService.user.getData();
            if (purchase.seller === undefined) {
                throw new Error('seller undefined');
            }
            await this.actionService.purchase.startTransaction({
                seller: purchase.seller,
                pos: user.pos,
                customer: purchase.customer,
            });
            this.router.navigate(['/purchase/event/schedule']);
        } catch (error) {
            console.error(error);
            try {
                const errorObject = JSON.parse(error);
                if (errorObject.status === TOO_MANY_REQUESTS) {
                    this.router.navigate(['/congestion']);
                    return;
                }
                if (errorObject.status === BAD_REQUEST) {
                    this.router.navigate(['/maintenance']);
                    return;
                }
                this.router.navigate(['/error']);
            } catch (error2) {
                console.error(error2);
                this.router.navigate(['/error']);
            }
        }
    }

    /**
     * Datepicker言語設定
     */
    public setDatePicker() {
        this.user
            .subscribe((user) => {
                this.localeService.use(user.language);
            })
            .unsubscribe();
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
        Functions.Util.iOSDatepickerTapBugFix(container, [this.datepicker]);
    }
}
