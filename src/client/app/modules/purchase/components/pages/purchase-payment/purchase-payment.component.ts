import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-payment',
    templateUrl: './purchase-payment.component.html',
    styleUrls: ['./purchase-payment.component.scss'],
})
export class PurchasePaymentComponent implements OnInit {
    public user: Observable<reducers.IUserState>;
    public paymentMethodType = factory.chevre.paymentMethodType;
    public payments: {
        paymentAccepted: factory.chevre.seller.IPaymentAccepted;
        categoryCode: factory.chevre.categoryCode.ICategoryCode;
    }[];
    public viewType = Models.Util.ViewType;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private utilService: UtilService,
        private actionService: ActionService,
        private masterService: MasterService,
        private translate: TranslateService
    ) {}

    public async ngOnInit() {
        this.user = this.store.pipe(select(reducers.getUser));
        this.payments = [];
        try {
            const { seller } = await this.actionService.purchase.getData();
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
            const paymentTypes = await this.masterService.searchCategoryCode({
                categorySetIdentifier:
                    factory.chevre.categoryCode.CategorySetIdentifier
                        .PaymentMethodType,
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
                });
            });
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 決済方法選択
     */
    public async selectPaymentMethodType(
        typeOf: factory.paymentMethodType,
        category?: string
    ) {
        try {
            const seller = (await this.actionService.purchase.getData()).seller;
            if (seller === undefined || seller.paymentAccepted === undefined) {
                throw new Error(
                    'seller is undefined or paymentAccepted is undefined'
                );
            }
            const findResult = seller.paymentAccepted.find(
                (paymentAccepted) =>
                    paymentAccepted.paymentMethodType === typeOf
            );
            if (findResult === undefined) {
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant(
                        'purchase.payment.alert.notCompatible'
                    ),
                });
                return;
            }
            this.actionService.purchase.selectPaymentMethodType({
                typeOf,
                category,
            });
            this.router.navigate(['/purchase/confirm']);
        } catch (error) {
            this.router.navigate(['/error']);
            console.error(error);
        }
    }
}
