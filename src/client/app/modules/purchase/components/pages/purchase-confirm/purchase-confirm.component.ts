import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { getAmount, getCustomPaymentMethodTypeName } from '../../../../../functions';
import { ViewType } from '../../../../../models';
import { PurchaseService, UserService, UtilService } from '../../../../../services';
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
    public viewType: typeof ViewType = ViewType;
    public depositAmount: string;
    public amount: number;
    public environment = getEnvironment();
    public getCustomPaymentMethodTypeName = getCustomPaymentMethodTypeName;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private purchaseService: PurchaseService,
        private userService: UserService,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.amount = 0;
        this.depositAmount = '0';
        this.purchase.subscribe((purchase) => {
            this.amount = getAmount(purchase.authorizeSeatReservations);
        }).unsubscribe();
    }

    /**
     * 確定
     */
    public async onSubmit() {
        const purchaseData = await this.purchaseService.getData();
        const userData = await this.userService.getData();
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
        }
        try {
            if (purchaseData.pendingMovieTickets.length > 0) {
                await this.purchaseService.authorizeMovieTicket({ seller });
            }
            await this.purchaseService.authorizeAnyPayment({
                amount: this.amount,
                depositAmount: (paymentMethod.typeOf === factory.paymentMethodType.Cash)
                    ? Number(this.depositAmount) : undefined
            });
            await this.purchaseService.registerContact(profile);
            await this.purchaseService.endTransaction({ seller, language: userData.language });
            this.router.navigate(['/purchase/complete']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 支払い金額変換
     */
    public changeDepositAmount(value: string) {
        this.depositAmount = String(Number(value));
    }

}
