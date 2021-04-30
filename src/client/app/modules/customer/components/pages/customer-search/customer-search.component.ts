import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { CustomerDetailModalComponent } from '../../../../shared/components/parts/customer/detail-modal/detail-modal.component';

@Component({
    selector: 'app-customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public customers: factory.chevre.organization.IOrganization[];
    public nextCustomers: factory.chevre.organization.IOrganization[];
    public totalCount: number;
    public maxSize: number;
    public currentPage: number;
    public moment = moment;
    public limit: number;
    public conditions: Models.Customer.Search.ICustomerSearchConditions;
    public environment = getEnvironment();

    constructor(
        protected store: Store<reducers.IOrderState>,
        protected utilService: UtilService,
        protected actionService: ActionService,
        protected translate: TranslateService,
        protected localeService: BsLocaleService,
        protected router: Router,
        protected modal: BsModalService,
    ) { }

    public async ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.customers = [];
        this.maxSize = 1;
        this.currentPage = 1;
        this.limit = 20;
        this.totalCount = this.limit;
    }

    /**
     * 検索
     */
    public async search() {
        try {
            this.currentPage = this.conditions.page;
            const params = Functions.Customer.input2CustomerSearchCondition({
                input: this.conditions,
                page: this.currentPage,
                limit: this.limit
            });
            this.customers = (await this.actionService.customer.search(params)).data;
            this.nextCustomers = (await this.actionService.customer.search({ ...params, page: (this.currentPage + 1) })).data;
            const totalCount = (this.nextCustomers.length === 0)
                ? this.currentPage * this.limit : (this.currentPage + 1) * this.limit;
            this.totalCount = (this.totalCount < totalCount) ? totalCount : this.totalCount;
            const maxSize = this.totalCount / this.limit;
            const maxSizeLimit = 5;
            this.maxSize = (maxSize > maxSizeLimit) ? maxSizeLimit : maxSize;
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('customer.search.alert.search')
            });
        }
    }

    /**
     * 条件変更
     */
    public async changeConditions(conditions: Models.Customer.Search.ICustomerSearchConditions) {
        this.conditions = conditions;
        this.totalCount = this.limit;
        this.maxSize = 1;
        await this.search();
    }

    /**
     * ページ変更
     */
    public async changePage(event: { page: number }) {
        this.conditions.page = event.page;
        await this.search();
    }

    /**
     * 購入
     */
    public async toPurchase(customer: factory.chevre.organization.IOrganization) {
        try {
            const purchase = await this.actionService.purchase.getData();
            if (purchase.transaction !== undefined) {
                await this.actionService.purchase.cancelTransaction();
            }
            this.actionService.purchase.delete();
            this.actionService.purchase.setCustomer({ customer });
            if (this.environment.VIEW_TYPE === Models.Util.ViewType.Cinema) {
                this.router.navigate(['/purchase/cinema/schedule']);
                return;
            }
            this.router.navigate(['/purchase/event/date']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 詳細を表示
     */
     public openDetail(customer: factory.chevre.organization.IOrganization) {
        this.modal.show(CustomerDetailModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: {
                customer,
            }
        });
    }

}

