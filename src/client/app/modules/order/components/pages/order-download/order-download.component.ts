import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { buildQueryString, iOSDatepickerTapBugFix, orderToEventOrders } from '../../../../../functions';
import { IOrderDownloadConditions, OrderActions } from '../../../../../models';
import { DownloadService, OrderService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-order-download',
    templateUrl: './order-download.component.html',
    styleUrls: ['./order-download.component.scss']
})
export class OrderDownloadComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public isDownload: boolean;
    public error: Observable<string | null>;
    public order: Observable<reducers.IOrderState>;
    public user: Observable<reducers.IUserState>;
    public moment: typeof moment = moment;
    public orderStatus: typeof factory.orderStatus = factory.orderStatus;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;
    public conditions: IOrderDownloadConditions;
    public confirmedConditions: IOrderDownloadConditions;
    public selectedOrders: factory.order.IOrder[];
    public OrderActions: typeof OrderActions = OrderActions;
    public actionSelect: OrderActions | '';
    public buildQueryString = buildQueryString;
    public environment = environment;
    public encodingFormat = factory.encodingFormat;
    public orderToEventOrders = orderToEventOrders;
    @ViewChild('orderDateFrom', { static: true })
    private orderDateFrom: BsDatepickerDirective;
    @ViewChild('orderDateThrough', { static: true })
    private orderDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true })
    private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true })
    private eventStartDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IOrderState>,
        private utilService: UtilService,
        private orderService: OrderService,
        private downloadService: DownloadService,
        private translate: TranslateService,
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
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            orderDateFrom: moment(today).add(-4, 'month').toDate(),
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
            format: factory.encodingFormat.Application.json,
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
     * 検索パラメータへ変換
     */
    public async convertToSearchParams() {
        return new Promise<factory.order.ISearchConditions & {
            format: factory.encodingFormat.Application | factory.encodingFormat.Text;
        }>((resolve) => {
            this.user.subscribe((user) => {
                const identifiers: factory.propertyValue.IPropertyValue<string>[] = [];
                if (this.confirmedConditions.posId !== '') {
                    identifiers.push({ name: 'posId', value: this.confirmedConditions.posId });
                }
                const params: factory.order.ISearchConditions & {
                    format: factory.encodingFormat.Application | factory.encodingFormat.Text;
                } = {
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
                    orderDateFrom: (this.confirmedConditions.orderDateFrom === undefined)
                        ? undefined
                        : <any>moment(moment(this.confirmedConditions.orderDateFrom).format('YYYYMMDD')).toISOString(),
                    orderDateThrough: (this.confirmedConditions.orderDateThrough === undefined)
                        ? undefined
                        : <any>moment(moment(this.confirmedConditions.orderDateThrough)
                            .add(1, 'day').format('YYYYMMDD')).add(1, 'day').toISOString(),
                    confirmationNumbers: (this.confirmedConditions.confirmationNumber === '')
                        ? undefined : [this.confirmedConditions.confirmationNumber],
                    orderNumbers: (this.confirmedConditions.orderNumber === '')
                        ? undefined : [this.confirmedConditions.orderNumber],
                    paymentMethods: (this.confirmedConditions.paymentMethodType === '')
                        ? undefined : { typeOfs: [this.confirmedConditions.paymentMethodType] },
                    acceptedOffers: {
                        itemOffered: {
                            reservationFor: {
                                inSessionFrom: (this.confirmedConditions.eventStartDateFrom === undefined)
                                    ? undefined
                                    : <any>moment(moment(this.confirmedConditions.eventStartDateFrom).format('YYYYMMDD')).toISOString(),
                                inSessionThrough: (this.confirmedConditions.eventStartDateThrough === undefined)
                                    ? undefined
                                    : <any>moment(moment(this.confirmedConditions.eventStartDateThrough)
                                        .format('YYYYMMDD')).add(1, 'day').toISOString(),

                            }
                        }
                    },
                    sort: {
                        orderDate: factory.sortType.Descending
                    },
                    format: this.confirmedConditions.format
                };
                resolve(params);
            }).unsubscribe();
        });
    }

    /**
     * ダウンロード
     */
    public async orderDownload(changeConditions: boolean) {
        this.selectedOrders = [];
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
                format: this.conditions.format,
            };
        }
        try {
            const params = await this.convertToSearchParams();
            await this.downloadService.orderStream(params);
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
    public downloadConditionClear() {
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            orderDateFrom: moment(today).add(-4, 'month').toDate(),
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
            format: factory.encodingFormat.Text.csv
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
