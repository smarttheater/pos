import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BAD_REQUEST, TOO_MANY_REQUESTS } from 'http-status';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap';
import { CellHoverEvent } from 'ngx-bootstrap/datepicker/models';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { IScreeningEventWork, screeningEventsToWorkEvents } from '../../../../../functions';
import { masterAction, purchaseAction } from '../../../../../store/actions';
import * as reducers from '../../../../../store/reducers';

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
    public screeningWorkEvents: IScreeningEventWork[];
    public moment: typeof moment = moment;
    private updateTimer: any;
    public scheduleDate: Date;
    public environment = environment;
    @ViewChild('datepicker', { static: true })
    private datepicker: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
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
        this.screeningWorkEvents = [];
        if (this.scheduleDate === undefined) {
            this.scheduleDate = moment()
                .add(environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE, 'day')
                .toDate();
        }
        try {
            await this.cancelTransaction();
            this.selectDate();
        } catch (error) {
            this.router.navigate(['/error']);
        }
    }

    /**
     * 破棄
     */
    public ngOnDestroy() {
        clearTimeout(this.updateTimer);
    }

    /**
     * 取引中止
     */
    private async cancelTransaction() {
        return new Promise<void>((resolve) => {
            this.purchase.subscribe((purchase) => {
                const transaction = purchase.transaction;
                if (transaction === undefined) {
                    resolve();
                    return;
                }
                this.store.dispatch(new purchaseAction.CancelTransaction({ transaction }));
                const success = this.actions.pipe(
                    ofType(purchaseAction.ActionTypes.CancelTransactionSuccess),
                    tap(() => { resolve(); })
                );
                const fail = this.actions.pipe(
                    ofType(purchaseAction.ActionTypes.CancelTransactionFail),
                    tap(() => { resolve(); })
                );
                race(success, fail).pipe(take(1)).subscribe();
            }).unsubscribe();
        });
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
    public selectDate(date?: Date | null) {
        if (date !== undefined && date !== null) {
            this.scheduleDate = date;
        }
        this.user.subscribe((user) => {
            const seller = user.seller;
            if (seller === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            if (this.scheduleDate === undefined || this.scheduleDate === null) {
                this.scheduleDate = moment()
                    .add(environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE, 'day')
                    .toDate();
            }
            const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
            this.store.dispatch(new purchaseAction.SelectScheduleDate({ scheduleDate }));
            this.store.dispatch(new masterAction.GetSchedule({
                superEvent: {
                    locationBranchCodes: (seller.location === undefined || seller.location.branchCode === undefined)
                        ? [] : [seller.location.branchCode]
                },
                startFrom: moment(scheduleDate).toDate(),
                startThrough: moment(scheduleDate).add(1, 'day').toDate()
            }));
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(masterAction.ActionTypes.GetScheduleSuccess),
            tap(() => {
                this.master.subscribe((master) => {
                    const screeningEvents = master.screeningEvents;
                    this.screeningWorkEvents = screeningEventsToWorkEvents({ screeningEvents });
                    this.update();
                }).unsubscribe();
            })
        );

        const fail = this.actions.pipe(
            ofType(masterAction.ActionTypes.GetScheduleFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * 仮予約削除
     */
    private async cancelTemporaryReservations() {
        return new Promise((resolve, reject) => {
            this.purchase.subscribe((purchase) => {
                const authorizeSeatReservations = purchase.authorizeSeatReservations;
                this.store.dispatch(new purchaseAction.CancelTemporaryReservations({ authorizeSeatReservations }));
            }).unsubscribe();
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CancelTemporaryReservationsSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CancelTemporaryReservationsFail),
                tap(() => { this.error.subscribe((error) => reject(error)).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 取引開始
     */
    private async startTransaction() {
        return new Promise((resolve, reject) => {
            this.user.subscribe((user) => {
                if (user.seller === undefined) {
                    reject(null);
                    return;
                }
                this.store.dispatch(new purchaseAction.StartTransaction({
                    params: {
                        expires: moment().add(environment.PURCHASE_TRANSACTION_TIME, 'minutes').toDate(),
                        seller: { typeOf: user.seller.typeOf, id: user.seller.id },
                        object: {},
                        agent: (user.pos === undefined)
                            ? undefined
                            : {
                                identifier: [
                                    { name: 'posId', value: user.pos.id },
                                    { name: 'posName', value: user.pos.name }
                                ]
                            }
                    }
                }));
            }).unsubscribe();
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.StartTransactionSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.StartTransactionFail),
                tap(() => { this.error.subscribe((error) => reject(error)).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 次へ
     */
    public async onSubmit() {
        try {
            await this.cancelTemporaryReservations();
            await this.startTransaction();
            this.router.navigate(['/purchase/event/ticket']);
        } catch (error) {
            if (error === null) {
                this.router.navigate(['/error']);
                return;
            }
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
        const dayHoverHandler = container.dayHoverHandler;
        const hoverWrapper = (event: CellHoverEvent) => {
            const { cell, isHovered } = event;
            if ((isHovered &&
                !!navigator.platform &&
                /iPad|iPhone|iPod/.test(navigator.platform)) &&
                'ontouchstart' in window
            ) {
                (<any>this.datepicker)._datepickerRef.instance.daySelectHandler(cell);
            }

            return dayHoverHandler(event);
        };
        container.dayHoverHandler = hoverWrapper;
    }

}
