import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
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
    public maxSize: number;
    public currentPage: number;
    public moment: typeof moment = moment;
    public orderStatus: typeof factory.orderStatus = factory.orderStatus;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;
    public limit: number;
    public conditions: Models.Order.Search.IOrderSearchConditions;
    public confirmedConditions: Models.Order.Search.IOrderSearchConditions;
    public selectedOrders: factory.order.IOrder[];
    public OrderActions = Models.Order.Action.OrderActions;
    public actionSelect: Models.Order.Action.OrderActions | '';
    public environment = getEnvironment();
    public order2EventOrders = Functions.Purchase.order2EventOrders;
    public connectionType = Models.Util.Printer.ConnectionType;
    @ViewChild('orderDateFrom', { static: true }) private orderDateFrom: BsDatepickerDirective;
    @ViewChild('orderDateThrough', { static: true }) private orderDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true }) private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true }) private eventStartDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IOrderState>,
        private modal: BsModalService,
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
        this.totalCount = 20;
        this.maxSize = 1;
        this.currentPage = 1;
        this.limit = 20;
        this.searchConditionClear();
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
     * 検索条件変更
     */
    private changeConditions() {
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
        this.orders = [];
        this.totalCount = 20;
        this.maxSize = 1;
        this.currentPage = 1;
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
            this.changeConditions();
        }
        try {
            const params = Functions.Order.input2OrderSearchCondition({
                input: this.confirmedConditions,
                theater: (await this.userService.getData()).theater,
                page: this.currentPage,
                limit: this.limit
            });
            this.orders = (await this.orderService.search(params)).data;
            this.nextOrders = (await this.orderService.search({ ...params, page: (this.currentPage + 1) })).data;
            const totalCount = (this.nextOrders.length === 0)
                ? this.currentPage * this.limit : (this.currentPage + 1) * this.limit;
            this.totalCount = (this.totalCount < totalCount) ? totalCount : this.totalCount;
            const maxSize = this.totalCount / this.limit;
            const maxSizeLimit = 5;
            this.maxSize = (maxSize > maxSizeLimit) ? maxSizeLimit : maxSize;
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
        this.conditions = {
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
                    if (user.printer === undefined) {
                        throw new Error('printer undefined');
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
        const code = Functions.Util.createRandomString(6, /[^0-9]/g);
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
        if (this.actionSelect === Models.Order.Action.OrderActions.Cancel) {
            const code = Functions.Util.createRandomString(6, /[^0-9]/g);
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
        } else if (this.actionSelect === Models.Order.Action.OrderActions.Print) {
            this.utilService.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.confirm.print'),
                cb: async () => {
                    try {
                        const user = await this.userService.getData();
                        if (user.printer === undefined) {
                            throw new Error('printer undefined');
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
        Functions.Util.iOSDatepickerTapBugFix(container, [
            this.orderDateFrom,
            this.orderDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough
        ]);
    }

}
