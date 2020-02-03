import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { buildQueryString, input2OrderSearchCondition, iOSDatepickerTapBugFix, order2EventOrders } from '../../../../../functions';
import { CsvFormat, IOrderSearchConditions, OrderActions } from '../../../../../models';
import { DownloadService, OrderService, UserService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-order-download',
    templateUrl: './order-download.component.html',
    styleUrls: ['./order-download.component.scss']
})
export class OrderDownloadComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public order: Observable<reducers.IOrderState>;
    public user: Observable<reducers.IUserState>;
    public moment: typeof moment = moment;
    public orderStatus: typeof factory.orderStatus = factory.orderStatus;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;
    public conditions: IOrderSearchConditions;
    public confirmedConditions: IOrderSearchConditions;
    public selectedOrders: factory.order.IOrder[];
    public actionSelect: OrderActions | '';
    public buildQueryString = buildQueryString;
    public environment = getEnvironment();
    public encodingFormat = factory.encodingFormat;
    public order2EventOrders = order2EventOrders;
    public csvFormat = CsvFormat;
    @ViewChild('orderDateFrom', { static: true }) private orderDateFrom: BsDatepickerDirective;
    @ViewChild('orderDateThrough', { static: true }) private orderDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true }) private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true }) private eventStartDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IOrderState>,
        private utilService: UtilService,
        private orderService: OrderService,
        private downloadService: DownloadService,
        private translate: TranslateService,
        private localeService: BsLocaleService,
        private userService: UserService
    ) { }

    public ngOnInit() {
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
            page: 1
        };
        this.orderService.delete();
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
                page: 1
            };
        }
        this.utilService.loadStart();
        try {
            const params = input2OrderSearchCondition({
                input: this.confirmedConditions,
                seller: (await this.userService.getData()).seller,
            });
            await this.downloadService.order(params, CsvFormat.Custom);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.download.alert.download')
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
