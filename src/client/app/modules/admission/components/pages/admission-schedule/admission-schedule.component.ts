import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Functions } from '../../../../..';
import { AdmissionService, MasterService, UserService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';


@Component({
    selector: 'app-admission-schedule',
    templateUrl: './admission-schedule.component.html',
    styleUrls: ['./admission-schedule.component.scss']
})
export class AdmissionScheduleComponent implements OnInit, OnDestroy {
    @ViewChild('datepicker', { static: true }) private datepicker: BsDatepickerDirective;
    public admission: Observable<reducers.IAdmissionState>;
    public user: Observable<reducers.IUserState>;
    public screeningWorkEvents: Functions.Purchase.IScreeningEventWork[];
    public moment: typeof moment = moment;
    public scheduleDate: Date;
    private updateTimer: any;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private localeService: BsLocaleService,
        private admissionService: AdmissionService,
        private masterService: MasterService,
        private userService: UserService
    ) { }

    public async ngOnInit() {
        this.admission = this.store.pipe(select(reducers.getAdmission));
        this.user = this.store.pipe(select(reducers.getUser));
        this.screeningWorkEvents = [];
    }

    public ngOnDestroy() {
        clearTimeout(this.updateTimer);
    }

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
                this.scheduleDate = moment().toDate();
            }
            const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
            this.admissionService.selectScheduleDate(scheduleDate);

            const screeningEvents = await this.masterService.getSchedule({
                superEvent: { locationBranchCodes: [theater.branchCode] },
                startFrom: moment(scheduleDate).toDate(),
                startThrough: moment(scheduleDate).add(1, 'day').toDate()
            });
            this.screeningWorkEvents = Functions.Purchase.screeningEvents2WorkEvents({ screeningEvents });
            this.update();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * スケジュール選択
     */
    public async selectSchedule(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        try {
            await this.admissionService.getScreeningEvent(screeningEvent);
            this.router.navigate(['/admission/check']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 指定なしで確認
     */
    public notSpecified() {
        this.admissionService.delete();
        this.router.navigate(['/admission/check']);
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
