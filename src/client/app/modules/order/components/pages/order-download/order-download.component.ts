import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, DownloadService, MasterService, UtilService } from '../../../../../services';
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
    public moment = moment;
    public orderStatus = factory.orderStatus;
    public paymentMethodType = factory.paymentMethodType;
    public conditions: Models.Order.Search.IOrderSearchConditions;
    public environment = getEnvironment();
    public order2EventOrders = Functions.Purchase.order2EventOrders;
    public paymentTypes: factory.chevre.categoryCode.ICategoryCode[];

    constructor(
        private store: Store<reducers.IOrderState>,
        private utilService: UtilService,
        private actionService: ActionService,
        private downloadService: DownloadService,
        private translate: TranslateService,
        private masterService: MasterService,
        private router: Router,
    ) { }

    public async ngOnInit() {
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
        this.paymentTypes = [];
        this.actionService.order.delete();
        try {
            this.paymentTypes = await this.masterService.searchCategoryCode({
                categorySetIdentifier: factory.chevre.categoryCode.CategorySetIdentifier.PaymentMethodType
            });
        } catch (error) {
            this.router.navigate(['/error']);
            return;
        }
    }

    /**
     * ダウンロード
     */
    public async download() {
        try {
            const params = Functions.Order.input2OrderSearchCondition({
                input: this.conditions,
                theater: (await this.actionService.user.getData()).theater,
            });
            await this.downloadService.order(params);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.download.alert.download')
            });
        }
    }

    /**
     * 条件変更
     */
    public async changeConditions(conditions: Models.Order.Search.IOrderSearchConditions) {
        this.conditions = conditions;
        await this.download();
    }

}
