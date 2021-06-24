import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-confirm',
    templateUrl: './purchase-confirm.component.html',
    styleUrls: ['./purchase-confirm.component.scss'],
})
export class PurchaseConfirmComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public moment = moment;
    public chargeAmount: number;
    public amount: number;
    public environment = getEnvironment();
    public paymentMethod?: factory.chevre.categoryCode.ICategoryCode;
    public viewType = Models.Util.ViewType;
    public payments: {
        paymentAccepted: factory.chevre.seller.IPaymentAccepted;
        categoryCode: factory.chevre.categoryCode.ICategoryCode;
        selected: boolean;
        value: number;
    }[];
    public paymentMethodType = factory.chevre.paymentMethodType;
    public customPaymentMethodType = Models.Purchase.Payment.PaymentMethodType;
    public isValid: boolean;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private actionService: ActionService,
        private utilService: UtilService,
        private translate: TranslateService,
        private masterService: MasterService
    ) {}

    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.amount = 0;
        this.chargeAmount = 0;
        this.payments = [];
        this.isValid = true;
        try {
            const { authorizeSeatReservations, seller } =
                await this.actionService.purchase.getData();
            this.amount = Functions.Purchase.getAmount(
                authorizeSeatReservations
            );
            this.isValid = this.amount !== 0;
            this.chargeAmount = 0 - this.amount;
            const paymentTypes = await this.masterService.searchCategoryCode({
                categorySetIdentifier:
                    factory.chevre.categoryCode.CategorySetIdentifier
                        .PaymentMethodType,
            });
            if (seller === undefined || seller.paymentAccepted === undefined) {
                throw new Error('seller or seller.paymentAccepted undefined');
            }
            const paymentAccepted = seller.paymentAccepted.filter((p) => {
                return (
                    p.paymentMethodType !==
                        factory.chevre.paymentMethodType.MGTicket &&
                    p.paymentMethodType !==
                        factory.chevre.paymentMethodType.MovieTicket &&
                    p.paymentMethodType !== 'Account'
                );
            });
            paymentAccepted.forEach((p) => {
                const categoryCode = paymentTypes.find(
                    (c) => c.codeValue === p.paymentMethodType
                );
                if (categoryCode === undefined) {
                    return;
                }
                this.payments.push({
                    paymentAccepted: p,
                    categoryCode,
                    selected: false,
                    value: 0,
                });
            });
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 確定
     */
    public async onSubmit() {
        const { pendingMovieTickets, profile } =
            await this.actionService.purchase.getData();
        const { language, customerContact, theater } =
            await this.actionService.user.getData();
        if (customerContact === undefined || theater === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        const cash = this.payments.find(
            (p) =>
                p.paymentAccepted.paymentMethodType ===
                this.customPaymentMethodType.Cash
        );
        if (cash !== undefined && cash.value > 0) {
            await this.openDrawer();
        }
        try {
            if (pendingMovieTickets.length > 0) {
                await this.actionService.purchase.payment.authorizeMovieTicket();
            }
            await this.actionService.purchase.payment.authorizeAnyPayment({
                data: this.payments
                    .filter((p) => p.selected)
                    .map((p) => {
                        const additionalProperty = [];
                        if (
                            p.paymentAccepted.paymentMethodType ===
                            Models.Purchase.Payment.PaymentMethodType.Cash
                        ) {
                            additionalProperty.push({
                                name: 'depositAmount',
                                value: String(p.value),
                            });
                            additionalProperty.push({
                                name: 'change',
                                value: String(this.chargeAmount),
                            });
                        }
                        const amount =
                            p.paymentAccepted.paymentMethodType ===
                            Models.Purchase.Payment.PaymentMethodType.Cash
                                ? Number(p.value) - this.chargeAmount
                                : Number(p.value);
                        return {
                            amount,
                            additionalProperty,
                            paymentMethod: p.paymentAccepted.paymentMethodType,
                        };
                    }),
            });
            if (profile === undefined) {
                await this.actionService.purchase.setProfile({
                    profile: customerContact,
                });
            }
            await this.actionService.purchase.confirmTransaction({
                theater,
                language,
            });
            this.router.navigate(['/purchase/complete']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * ドロワーを開く
     */
    public async openDrawer() {
        try {
            const { printer, drawer } = await this.actionService.user.getData();
            if (printer === undefined) {
                throw new Error('printer undefined');
            }
            if (drawer === undefined || !drawer) {
                return;
            }
            await this.actionService.order.openDrawer({ printer });
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.complete.alert.drawer'),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 金額変更
     */
    public changeValue(params: { chargeAmount: number; isValid: boolean }) {
        this.chargeAmount = params.chargeAmount;
        this.isValid = params.isValid;
    }
}
