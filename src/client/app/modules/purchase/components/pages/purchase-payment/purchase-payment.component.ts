import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-payment',
    templateUrl: './purchase-payment.component.html',
    styleUrls: ['./purchase-payment.component.scss']
})
export class PurchasePaymentComponent implements OnInit {
    public user: Observable<reducers.IUserState>;
    public paymentMethodType = factory.paymentMethodType;
    public viewType = Models.Util.ViewType;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private utilService: UtilService,
        private actionService: ActionService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.user = this.store.pipe(select(reducers.getUser));
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
            if (seller === undefined
                || seller.paymentAccepted === undefined) {
                throw new Error('seller is undefined or paymentAccepted is undefined');
            }
            const findResult = seller.paymentAccepted
                .find(paymentAccepted => paymentAccepted.paymentMethodType === typeOf);
            if (findResult === undefined) {
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('purchase.payment.alert.notCompatible')
                });
                return;
            }
            this.actionService.purchase.selectPaymentMethodType({ typeOf, category });
            this.router.navigate(['/purchase/confirm']);
        } catch (error) {
            this.router.navigate(['/error']);
            console.error(error);
        }
    }

    /**
     * 表示判定
     */
    public isDisplay(paymentMethodType: factory.paymentMethodType | string) {
        const findResult = this.environment.PAYMENT_METHOD_TO_USE.find(p => p === paymentMethodType);
        return (findResult !== undefined);
    }

}
