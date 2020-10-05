import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
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
    public eventOrders: Functions.Purchase.IEventOrder[];
    public environment = getEnvironment();
    public qrcode?: string;
    public paymentMethodType = factory.paymentMethodType;
    public getCustomPaymentMethodTypeName = Functions.Purchase.getCustomPaymentMethodTypeName;
    public connectionType = Models.Util.Printer.ConnectionType;
    public createOrderLink = Functions.Order.createOrderLink;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private actionService: ActionService,
        private utilService: UtilService,
        private translate: TranslateService,
    ) { }

    public async ngOnInit() {
        this.eventOrders = [];
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        try {
            const { order } = await this.actionService.purchase.getData();
            if (order === undefined) {
                throw new Error('order not found').message;
            }
            this.eventOrders = Functions.Purchase.order2EventOrders({ order });
        } catch (error) {
            this.router.navigate(['/error']);
            return;
        }

        try {
            await this.regiGrowProcess();
            await this.openDrawer();
            await this.print();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * RegiGrow連携
     */
    public async regiGrowProcess() {
        try {
            const { order } = await this.actionService.purchase.getData();
            if (order === undefined) {
                throw new Error('order not found').message;
            }
            const isRegiGrow = order.paymentMethods.find(p => p.name === 'RegiGrow') !== undefined;
            const findResult = this.environment.PAYMENT_METHOD_CUSTOM.find(c => {
                return order.paymentMethods.find(p => {
                    return (p.typeOf === factory.paymentMethodType.Others
                        && p.name === c.category
                        && c.qrcode !== undefined);
                });
            });
            if (isRegiGrow
                || (findResult !== undefined && findResult.qrcode !== undefined)) {
                const qrcodeText = (isRegiGrow) ? this.environment.REGIGROW_QRCODE
                    : (findResult !== undefined && findResult.qrcode !== undefined) ? findResult.qrcode : '';
                this.qrcode = await Functions.Order.createCooperationQRCode({ order, qrcodeText });
            }
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('purchase.complete.alert.regiGrow')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error}</code>
                </div>`
            });
        }
    }

    /**
     * 印刷
     */
    public async print() {
        try {
            const purchase = await this.actionService.purchase.getData();
            const user = await this.actionService.user.getData();
            if (purchase.order === undefined
                || user.printer === undefined) {
                throw new Error('printer undefined');
            }
            const orders = [purchase.order];
            const pos = user.pos;
            const printer = user.printer;
            await this.actionService.order.print({ orders, pos, printer });
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

    /**
     * ドロワーを開く
     */
    public async openDrawer() {
        try {
            const { order } = await this.actionService.purchase.getData();
            const { printer, drawer } = await this.actionService.user.getData();
            if (order === undefined
                || printer === undefined) {
                throw new Error('order or printer undefined').message;
            }
            const isCash = order.paymentMethods.find(p => p.typeOf === factory.chevre.paymentMethodType.Cash);
            if (isCash === undefined
                || drawer === undefined
                || !drawer) {
                return;
            }
            await this.actionService.order.openDrawer({ printer });
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('purchase.complete.alert.drawer')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error}</code>
                </div>`
            });
        }
    }

    /**
     * 領収書印刷
     */
    public async printReceipt() {
        try {
            const purchase = await this.actionService.purchase.getData();
            const user = await this.actionService.user.getData();
            if (purchase.order === undefined
                || user.printer === undefined) {
                throw new Error('printer undefined');
            }
            const order = purchase.order;
            const pos = user.pos;
            const printer = user.printer;
            await this.actionService.order.printReceipt({ order, pos, printer });
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
