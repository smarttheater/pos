import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { changeTicketCountByOrder, createRegiGrowQrcode, getItemPrice, getItemReferenceQuantityValue, IEventOrder, order2EventOrders } from '../../../../../functions';
import { OrderService, PurchaseService, UserService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss']
})
export class PurchaseCompleteComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public moment: typeof moment = moment;
    public getItemPrice = getItemPrice;
    public getItemReferenceQuantityValue = getItemReferenceQuantityValue;
    public changeTicketCountByOrder = changeTicketCountByOrder;
    public eventOrders: IEventOrder[];
    public environment = getEnvironment();
    public regiGrow?: string;
    public paymentMethodType = factory.paymentMethodType;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private purchaseService: PurchaseService,
        private orderService: OrderService,
        private userService: UserService,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.eventOrders = [];
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.purchase.subscribe((purchase) => {
            if (purchase.order === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            if (purchase.order.paymentMethods.find(p => p.name === 'RegiGrow') !== undefined) {
                createRegiGrowQrcode(purchase.order).then((code) => {
                    this.regiGrow = code;
                }).catch((error) => {
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `
                        <p class="mb-4">${this.translate.instant('purchase.complete.alert.regiGrow')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                    });
                });
            }
            const order = purchase.order;
            this.eventOrders = order2EventOrders({ order });
        }).unsubscribe();
        this.print();
    }

    /**
     * 印刷
     */
    public async print() {
        try {
            const purchase = await this.purchaseService.getData();
            const user = await this.userService.getData();
            if (purchase.order === undefined
                || user.pos === undefined
                || user.printer === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const orders = [purchase.order];
            const pos = user.pos;
            const printer = user.printer;
            await this.orderService.print({ orders, pos, printer });
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('purchase.complete.alert.print')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error}</code>
                </div>`
            });
        }
    }

}
