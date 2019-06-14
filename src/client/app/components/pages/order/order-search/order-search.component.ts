import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService, BsModalService } from 'ngx-bootstrap';
import { CellHoverEvent } from 'ngx-bootstrap/datepicker/models';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { buildQueryString, orderToEventOrders } from '../../../../functions';
import { IOrderSearchConditions, OrderActions } from '../../../../models';
import { DownloadService, UtilService } from '../../../../services';
import { orderAction } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';
import { OrderDetailModalComponent, QrCodeModalComponent } from '../../../parts';

@Component({
    selector: 'app-order-search',
    templateUrl: './order-search.component.html',
    styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public isDownload: boolean;
    public error: Observable<string | null>;
    public order: Observable<reducers.IOrderState>;
    public user: Observable<reducers.IUserState>;
    public moment: typeof moment = moment;
    public orderStatus: typeof factory.orderStatus = factory.orderStatus;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;
    public limit: number;
    public conditions: IOrderSearchConditions;
    public confirmedConditions: IOrderSearchConditions;
    public selectedOrders: factory.order.IOrder[];
    public OrderActions: typeof OrderActions = OrderActions;
    public actionSelect: OrderActions | '';
    public buildQueryString = buildQueryString;
    public environment = environment;
    public orderToEventOrders = orderToEventOrders;
    @ViewChild('datepicker', { static: true })
    private datepicker: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IOrderState>,
        private actions: Actions,
        private modal: BsModalService,
        private router: Router,
        private util: UtilService,
        private translate: TranslateService,
        private download: DownloadService,
        private localeService: BsLocaleService,
    ) { }

    public ngOnInit() {
        this.isDownload = false;
        this.actionSelect = '';
        this.selectedOrders = [];
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.order = this.store.pipe(select(reducers.getOrder));
        this.user = this.store.pipe(select(reducers.getUser));
        this.limit = 20;
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
        this.store.dispatch(new orderAction.Delete());
    }

    public isSelected(order: factory.order.IOrder) {
        const findResult = this.selectedOrders.find(o => o.orderNumber === order.orderNumber);
        return findResult !== undefined;
    }

    public addOrder(order: factory.order.IOrder) {
        this.selectedOrders.push(order);
    }

    public removeOrder(order: factory.order.IOrder) {
        const findIndex = this.selectedOrders.findIndex(o => o.orderNumber === order.orderNumber);
        this.selectedOrders.splice(findIndex, 1);
    }

    /**
     * 検索パラメータへ変換
     */
    public async convertToSearchParams() {
        return new Promise<factory.order.ISearchConditions>((resolve) => {
            this.user.subscribe((user) => {
                const identifiers: factory.propertyValue.IPropertyValue<string>[] = [];
                if (this.confirmedConditions.posId !== '') {
                    identifiers.push({ name: 'posId', value: this.confirmedConditions.posId });
                }
                const params: factory.order.ISearchConditions = {
                    seller: {
                        typeOf: (user.seller === undefined)
                            ? undefined : user.seller.typeOf,
                        ids: (user.seller === undefined)
                            ? undefined : [user.seller.id]
                    },
                    customer: {
                        email: (this.confirmedConditions.customer.email === '')
                            ? undefined : this.confirmedConditions.customer.email,
                        telephone: (this.confirmedConditions.customer.telephone === '')
                            ? undefined : this.confirmedConditions.customer.telephone,
                        familyName: (this.confirmedConditions.customer.familyName === '')
                            ? undefined : this.confirmedConditions.customer.familyName,
                        givenName: (this.confirmedConditions.customer.givenName === '')
                            ? undefined : this.confirmedConditions.customer.givenName,
                        identifiers
                    },
                    orderStatuses: (this.confirmedConditions.orderStatus === '')
                        ? undefined : [this.confirmedConditions.orderStatus],
                    orderDateFrom: this.confirmedConditions.orderDateFrom,
                    orderDateThrough: (this.confirmedConditions.orderDateThrough === undefined)
                        ? undefined : moment(this.confirmedConditions.orderDateThrough).add(1, 'day').toDate(),
                    confirmationNumbers: (this.confirmedConditions.confirmationNumber === '')
                        ? undefined : [this.confirmedConditions.confirmationNumber],
                    orderNumbers: (this.confirmedConditions.orderNumber === '')
                        ? undefined : [this.confirmedConditions.orderNumber],
                    paymentMethods: (this.confirmedConditions.paymentMethodType === '')
                        ? undefined : { typeOfs: [this.confirmedConditions.paymentMethodType] },
                    acceptedOffers: {
                        itemOffered: {
                            reservationFor: {
                                startFrom: this.confirmedConditions.eventStartDateFrom,
                                startThrough: (this.confirmedConditions.eventStartDateThrough === undefined)
                                    ? undefined : moment(this.confirmedConditions.eventStartDateThrough).add(1, 'day').toDate(),
                            }
                        }
                    },
                    limit: this.limit,
                    page: this.confirmedConditions.page,
                    sort: {
                        orderDate: factory.sortType.Descending
                    }
                };
                resolve(params);
            }).unsubscribe();
        });
    }

    /**
     * 検索
     */
    public orderSearch(changeConditions: boolean, event?: { page: number }) {
        this.selectedOrders = [];
        if (event !== undefined) {
            this.confirmedConditions.page = event.page;
        }
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
        this.convertToSearchParams().then((params) => {
            this.store.dispatch(new orderAction.Search({ params }));
        });

        const success = this.actions.pipe(
            ofType(orderAction.ActionTypes.SearchSuccess),
            tap(() => { })
        );

        const fail = this.actions.pipe(
            ofType(orderAction.ActionTypes.SearchFail),
            tap(() => {
                this.util.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('order.search.alert.search')
                });
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
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
    }

    /**
     * 印刷確認
     */
    public printConfirm(orders: factory.order.IOrder[]) {
        this.util.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.print'),
            cb: () => {
                this.ptint(orders);
            }
        });
    }

    /**
     * キャンセル確認
     */
    public cancelConfirm(orders: factory.order.IOrder[]) {
        this.util.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.cancel'),
            cb: () => {
                this.cancel(orders);
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
     * キャンセル処理
     */
    public cancel(orders: factory.order.IOrder[]) {
        this.store.dispatch(new orderAction.Cancel({ orders }));

        const success = this.actions.pipe(
            ofType(orderAction.ActionTypes.CancelSuccess),
            tap(() => {
                this.orderSearch(false);
            })
        );

        const fail = this.actions.pipe(
            ofType(orderAction.ActionTypes.CancelFail),
            tap(() => {
                this.error.subscribe((error) => {
                    this.util.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `
                        <p class="mb-4">${this.translate.instant('order.search.alert.cancel')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                    });
                }).unsubscribe();
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * 印刷処理
     */
    public ptint(orders: factory.order.IOrder[]) {
        this.user.subscribe((user) => {
            if (user.pos === undefined
                || user.printer === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const pos = user.pos;
            const printer = user.printer;
            this.store.dispatch(new orderAction.Print({ orders, pos, printer }));
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(orderAction.ActionTypes.PrintSuccess),
            tap(() => { })
        );

        const fail = this.actions.pipe(
            ofType(orderAction.ActionTypes.PrintFail),
            tap(() => {
                this.error.subscribe((error) => {
                    this.util.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `<p class="mb-4">${this.translate.instant('order.search.alert.print')}</p>
                        <div class="p-3 bg-light-gray select-text">
                        <code>${error}</code>
                    </div>`
                    });
                }).unsubscribe();
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * 選択した注文へのアクション
     */
    public selecedtAction() {
        if (this.selectedOrders.length === 0) {
            this.util.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.search.alert.unselected')
            });
        }
        if (this.actionSelect === OrderActions.Cancel) {
            this.util.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.alert.cancel'),
                cb: () => {
                    this.cancel(this.selectedOrders);
                }
            });
        } else if (this.actionSelect === OrderActions.Print) {
            this.util.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.alert.print'),
                cb: () => {
                    this.ptint(this.selectedOrders);
                }
            });
        }
    }

    /**
     * QRコード表示
     */
    public openQrCode(order: factory.order.IOrder) {
        this.store.dispatch(new orderAction.OrderAuthorize({
            params: {
                orderNumber: order.orderNumber,
                customer: {
                    telephone: order.customer.telephone
                }
            }
        }));
        const success = this.actions.pipe(
            ofType(orderAction.ActionTypes.OrderAuthorizeSuccess),
            tap(() => {
                this.order.subscribe((orderData) => {
                    const authorizeOrder = orderData.order;
                    if (authorizeOrder === undefined) {
                        return;
                    }
                    this.modal.show(QrCodeModalComponent, {
                        class: 'modal-dialog-centered',
                        initialState: { order: authorizeOrder },
                    });
                }).unsubscribe();
            })
        );
        const fail = this.actions.pipe(
            ofType(orderAction.ActionTypes.OrderAuthorizeFail),
            tap(() => {
                this.util.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('order.search.alert.authorize')
                });
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * CSVダウンロード
     */
    public async downloadCsv() {
        this.isDownload = true;
        try {
            const params = await this.convertToSearchParams();
            await this.download.order(params);
        } catch (error) {
            console.error(error);
        }
        this.isDownload = false;
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
