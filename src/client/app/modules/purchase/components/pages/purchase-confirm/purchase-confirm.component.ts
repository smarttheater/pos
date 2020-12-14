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
    selector: 'app-purchase-confirm',
    templateUrl: './purchase-confirm.component.html',
    styleUrls: ['./purchase-confirm.component.scss']
})
export class PurchaseConfirmComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public moment: typeof moment = moment;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;
    public viewType = Models.Util.ViewType;
    public depositAmount: number;
    public amount: number;
    public environment = getEnvironment();
    public getCustomPaymentMethodTypeName = Functions.Purchase.getCustomPaymentMethodTypeName;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private actionService: ActionService,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.amount = 0;
        this.depositAmount = 0;
        this.purchase.subscribe((purchase) => {
            this.amount = Functions.Purchase.getAmount(purchase.authorizeSeatReservations);
        }).unsubscribe();
    }

    /**
     * 確定
     */
    public async onSubmit() {
        const purchaseData = await this.actionService.purchase.getData();
        const userData = await this.actionService.user.getData();
        const profile = userData.customerContact;
        const seller = purchaseData.seller;
        const paymentMethod = purchaseData.paymentMethod;
        if (paymentMethod === undefined
            || profile === undefined
            || seller === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        if (paymentMethod.typeOf === factory.paymentMethodType.Cash) {
            if (Number(this.depositAmount) < this.amount) {
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('purchase.confirm.alert.custody')
                });
                return;
            }
            await this.openDrawer();
        }
        try {
            if (purchaseData.pendingMovieTickets.length > 0) {
                await this.actionService.purchase.authorizeMovieTicket({ seller });
            }
            const deposit = Number(this.depositAmount);
            const additionalProperty: { name: string; value: string; }[] = [];
            if (paymentMethod.typeOf === factory.chevre.paymentMethodType.Cash) {
                // 現金
                additionalProperty.push({ name: 'depositAmount', value: String(deposit) });
                additionalProperty.push({ name: 'change', value: String(deposit - this.amount) });
            }
            await this.actionService.purchase.authorizeAnyPayment({
                amount: this.amount,
                additionalProperty
            });
            await this.actionService.purchase.registerContact(profile);
            await this.actionService.purchase.endTransaction({ seller, language: userData.language });
            this.router.navigate(['/purchase/complete']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 支払い金額変換
     */
    public changeDepositAmount(value: number) {
        this.depositAmount = value;
    }

    /**
     * ドロワーを開く
     */
    public async openDrawer() {
        try {
            const { paymentMethod } = await this.actionService.purchase.getData();
            const { printer, drawer } = await this.actionService.user.getData();
            if (paymentMethod === undefined
                || printer === undefined) {
                throw new Error('order or printer undefined').message;
            }
            if (drawer === undefined || !drawer) {
                return;
            }
            await this.actionService.order.openDrawer({ printer });
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('purchase.complete.alert.drawer')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${JSON.stringify(error)}</code>
                </div>`
            });
        }
    }

}
