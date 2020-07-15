import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { BAD_REQUEST, TOO_MANY_REQUESTS } from 'http-status';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Functions } from '../../../../../..';
import { getEnvironment } from '../../../../../../../environments/environment';
import { MasterService, PurchaseService, UserService } from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';

@Component({
    selector: 'app-purchase-event-schedule',
    templateUrl: './purchase-event-schedule.component.html',
    styleUrls: ['./purchase-event-schedule.component.scss']
})
export class PurchaseEventScheduleComponent implements OnInit, OnDestroy {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public master: Observable<reducers.IMasterState>;
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public screeningEvents: factory.chevre.event.screeningEvent.IEvent[];
    public screeningWorkEvents: Functions.Purchase.IScreeningEventWork[];
    public moment: typeof moment = moment;
    private updateTimer: any;
    public scheduleDate: Date;
    public environment = getEnvironment();
    @ViewChild('datepicker', { static: true }) private datepicker: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private purchaseService: PurchaseService,
        private masterService: MasterService,
        private userService: UserService,
        private localeService: BsLocaleService
    ) { }

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.error = this.store.pipe(select(reducers.getError));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.screeningWorkEvents = [];
        if (this.scheduleDate === undefined) {
            this.scheduleDate = moment()
                .add(this.environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE, 'day')
                .toDate();
        }
        try {
            if ((await this.purchaseService.getData()).transaction === undefined) {
                return;
            }
            await this.purchaseService.cancelTransaction();
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
        this.updateTimer = setTimeout(() => {
            this.selectDate();
        }, time);
    }

    /**
     * 日付選択
     */
    public async selectDate(date?: Date | null) {
        if (date !== undefined && date !== null) {
            this.scheduleDate = date;
        }
        try {
            const user = await this.userService.getData();
            const theater = user.theater;
            if (theater === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            if (this.scheduleDate === undefined || this.scheduleDate === null) {
                this.scheduleDate = moment()
                    .add(this.environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE, 'day')
                    .toDate();
            }
            const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
            this.purchaseService.selectScheduleDate(scheduleDate);
            this.screeningEvents = await this.masterService.getSchedule({
                superEvent: { locationBranchCodes: [theater.branchCode] },
                startFrom: moment(scheduleDate).toDate(),
                startThrough: moment(scheduleDate).add(1, 'day').toDate()
            });
            this.screeningWorkEvents = Functions.Purchase.screeningEvents2WorkEvents({ screeningEvents: this.screeningEvents });
            this.update();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 次へ
     */
    public async onSubmit() {
        try {
            const user = await this.userService.getData();
            if (user.theater === undefined) {
                throw new Error('user.theater === undefined');
            }
            const screeningEvent = this.screeningEvents
                .find(s => s.offers !== undefined && s.offers.seller !== undefined && s.offers.seller.id !== undefined);
            if (screeningEvent === undefined
                || screeningEvent.offers === undefined
                || screeningEvent.offers.seller === undefined
                || screeningEvent.offers.seller.id === undefined) {
                throw new Error('screeningEvent.offers.seller === undefined');
            }
            await this.purchaseService.getSeller(screeningEvent.offers.seller.id);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
        try {
            const purchase = await this.purchaseService.getData();
            const user = await this.userService.getData();
            await this.purchaseService.startTransaction({
                seller: <factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>>purchase.seller,
                pos: user.pos
            });
            this.router.navigate(['/purchase/event/ticket']);
        } catch (error) {
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
        }
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
