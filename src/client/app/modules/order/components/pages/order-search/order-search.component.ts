import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService, BsModalService } from 'ngx-bootstrap';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { createRandomString, input2OrderSearchCondition, iOSDatepickerTapBugFix, order2EventOrders } from '../../../../../functions';
import { ConnectionType, IOrderSearchConditions, OrderActions } from '../../../../../models';
import { OrderService, UserService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { OrderDetailModalComponent } from '../../../../shared/components/parts/order/detail-modal/detail-modal.component';

@Component({
    selector: 'app-order-search',
    templateUrl: './order-search.component.html',
    styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public user: Observable<reducers.IUserState>;
    public orders: factory.order.IOrder[];
    public nextOrders: factory.order.IOrder[];
    public totalCount: number;
    public currentPage: number;
    public moment: typeof moment = moment;
    public orderStatus: typeof factory.orderStatus = factory.orderStatus;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;
    public limit: number;
    public conditions: IOrderSearchConditions;
    public confirmedConditions: IOrderSearchConditions;
    public selectedOrders: factory.order.IOrder[];
    public OrderActions: typeof OrderActions = OrderActions;
    public actionSelect: OrderActions | '';
    public environment = getEnvironment();
    public order2EventOrders = order2EventOrders;
    public connectionType = ConnectionType;
    @ViewChild('orderDateFrom', { static: true }) private orderDateFrom: BsDatepickerDirective;
    @ViewChild('orderDateThrough', { static: true }) private orderDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true }) private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true }) private eventStartDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IOrderState>,
        private modal: BsModalService,
        private router: Router,
        private utilService: UtilService,
        private userService: UserService,
        private orderService: OrderService,
        private translate: TranslateService,
        private localeService: BsLocaleService,
    ) { }

    public ngOnInit() {
        this.actionSelect = '';
        this.selectedOrders = [];
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.orders = [];
        this.totalCount = 100000;
        this.currentPage = 1;
        this.limit = 20;
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            orderDateFrom: moment(today).add(-13, 'day').toDate(),
            orderDateThrough: moment(today).toDate(),
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
            posId: '',
            page: 1
        };
        this.orderService.delete();
    }

    /**
     * 選択判定
     */
    public isSelected(order: factory.order.IOrder) {
        const findResult = this.selectedOrders.find(o => o.orderNumber === order.orderNumber);
        return findResult !== undefined;
    }

    /**
     * 選択中へ変更
     */
    public addOrder(order: factory.order.IOrder) {
        this.selectedOrders.push(order);
    }

    /**
     * 選択中解除
     */
    public removeOrder(order: factory.order.IOrder) {
        const findIndex = this.selectedOrders.findIndex(o => o.orderNumber === order.orderNumber);
        this.selectedOrders.splice(findIndex, 1);
    }

    /**
     * 検索
     */
    public async orderSearch(changeConditions: boolean, event?: { page: number }) {
        this.currentPage = 1;
        this.selectedOrders = [];
        if (event !== undefined) {
            this.currentPage = event.page;
            this.confirmedConditions.page = event.page;
        }
        // iOS bugfix
        this.conditions.confirmationNumber
            = (<HTMLInputElement>document.getElementById('confirmationNumber')).value;
        this.conditions.orderNumber
            = (<HTMLInputElement>document.getElementById('orderNumber')).value;
        this.conditions.customer.familyName
            = (<HTMLInputElement>document.getElementById('familyName')).value;
        this.conditions.customer.givenName
            = (<HTMLInputElement>document.getElementById('givenName')).value;
        this.conditions.customer.email
            = (<HTMLInputElement>document.getElementById('email')).value;
        this.conditions.customer.telephone
            = (<HTMLInputElement>document.getElementById('telephone')).value;
        if (changeConditions) {
            this.confirmedConditions = {
                orderDateFrom: this.conditions.orderDateFrom,
                orderDateThrough: this.conditions.orderDateThrough,
                confirmationNumber: this.conditions.confirmationNumber,
                orderNumber: this.conditions.orderNumber,
                customer: {
                    familyName: this.conditions.customer.familyName,
                    givenName: this.conditions.customer.givenName,
                    email: this.conditions.customer.email,
                    telephone: this.conditions.customer.telephone
                },
                orderStatus: this.conditions.orderStatus,
                paymentMethodType: this.conditions.paymentMethodType,
                eventStartDateFrom: this.conditions.eventStartDateFrom,
                eventStartDateThrough: this.conditions.eventStartDateThrough,
                posId: this.conditions.posId,
                page: 1
            };
        }
        try {
            const params = input2OrderSearchCondition({
                input: this.confirmedConditions,
                theater: (await this.userService.getData()).theater,
                page: this.currentPage,
                limit: this.limit
            });
            if (params.orderDateFrom !== null
                && params.orderDateThrough !== null
                && moment(params.orderDateThrough).diff(moment(params.orderDateFrom), 'day') > 14) {
                // 購入日の範囲が14日以上
                throw new Error('order date wrong date range').message;
            }
            this.orders = (await this.orderService.search(params)).data;
            this.nextOrders = (await this.orderService.search({ ...params, page: (this.currentPage + 1) })).data;
            this.totalCount = (this.nextOrders.length === 0) ? this.currentPage * this.limit : 100000;
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.search.alert.search')
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
            orderDateFrom: moment(today).add(-13, 'day').toDate(),
            orderDateThrough: moment(today).toDate(),
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
            posId: '',
            page: 1
        };
        // iOS bugfix
        (<HTMLInputElement>document.getElementById('confirmationNumber')).value = '';
        (<HTMLInputElement>document.getElementById('orderNumber')).value = '';
        (<HTMLInputElement>document.getElementById('familyName')).value = '';
        (<HTMLInputElement>document.getElementById('givenName')).value = '';
        (<HTMLInputElement>document.getElementById('email')).value = '';
        (<HTMLInputElement>document.getElementById('telephone')).value = '';
    }

    /**
     * 印刷確認
     */
    public printConfirm(orders: factory.order.IOrder[]) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.print'),
            cb: async () => {
                try {
                    const user = await this.userService.getData();
                    if (user.pos === undefined || user.printer === undefined) {
                        this.router.navigate(['/error']);
                        return;
                    }
                    const pos = user.pos;
                    const printer = user.printer;
                    await this.orderService.print({ orders, pos, printer });
                } catch (error) {
                    console.error(error);
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `<p class="mb-4">${this.translate.instant('order.search.alert.print')}</p>
                        <div class="p-3 bg-light-gray select-text">
                        <code>${error}</code>
                    </div>`
                    });
                }
            }
        });
    }

    /**
     * キャンセル確認
     */
    public cancelConfirm(orders: factory.order.IOrder[]) {
        const code = createRandomString(6, /[^0-9]/g);
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.cancel', { value: code }),
            code,
            cb: async () => {
                try {
                    const userData = await this.userService.getData();
                    await this.orderService.cancel({ orders, language: userData.language });
                    this.orderSearch(false, { page: this.confirmedConditions.page });
                } catch (error) {
                    console.error(error);
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `
                        <p class="mb-4">${this.translate.instant('order.search.alert.cancel')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                    });
                }
            }
        });
    }

    /**
     * 詳細を表示
     */
    public openDetail(order: factory.order.IOrder) {
        this.modal.show(OrderDetailModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: { order }
        });
    }

    /**
     * 選択した注文へのアクション
     */
    public selectedAction() {
        if (this.selectedOrders.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.search.alert.unselected')
            });
            return;
        }
        if (this.actionSelect === OrderActions.Cancel) {
            const code = createRandomString(6, /[^0-9]/g);
            this.utilService.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.confirm.cancel', { value: code }),
                code,
                cb: async () => {
                    try {
                        const userData = await this.userService.getData();
                        await this.orderService.cancel({
                            orders: this.selectedOrders,
                            language: userData.language
                        });
                        this.orderSearch(false, { page: this.confirmedConditions.page });
                    } catch (error) {
                        console.error(error);
                        this.utilService.openAlert({
                            title: this.translate.instant('common.error'),
                            body: `
                            <p class="mb-4">${this.translate.instant('order.search.alert.cancel')}</p>
                                <div class="p-3 bg-light-gray select-text">
                                <code>${error}</code>
                            </div>`
                        });
                    }
                }
            });
        } else if (this.actionSelect === OrderActions.Print) {
            this.utilService.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.confirm.print'),
                cb: async () => {
                    try {
                        const user = await this.userService.getData();
                        if (user.pos === undefined || user.printer === undefined) {
                            this.router.navigate(['/error']);
                            return;
                        }
                        const pos = user.pos;
                        const printer = user.printer;
                        const orders = this.selectedOrders;
                        await this.orderService.print({ orders, pos, printer });
                    } catch (error) {
                        console.error(error);
                        this.utilService.openAlert({
                            title: this.translate.instant('common.error'),
                            body: `<p class="mb-4">${this.translate.instant('order.search.alert.print')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                        });
                    }
                }
            });
        }
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
            this.orderDateFrom,
            this.orderDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough
        ]);
    }

}
