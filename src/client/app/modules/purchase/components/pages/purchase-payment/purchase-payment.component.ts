import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { ViewType } from '../../../../../models';
import { PurchaseService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-payment',
    templateUrl: './purchase-payment.component.html',
    styleUrls: ['./purchase-payment.component.scss']
})
export class PurchasePaymentComponent implements OnInit {
    public user: Observable<reducers.IUserState>;
    public paymentMethodType = factory.paymentMethodType;
    public viewType: typeof ViewType = ViewType;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private utilService: UtilService,
        private purchaseService: PurchaseService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.user = this.store.pipe(select(reducers.getUser));
    }

    /**
     * 決済方法選択
     */
    public selectPaymentMethodType(
        paymentMethodType: factory.paymentMethodType,
        paymentMethodName?: 'RegiGrow'
    ) {
        this.user.subscribe((user) => {
            if (user.seller === undefined
                || user.seller.paymentAccepted === undefined) {
                this.router.navigate(['/error']);
                console.error('seller is undefined or paymentAccepted is undefined');
                return;
            }
            const findResult = user.seller.paymentAccepted
                .find(paymentAccepted => paymentAccepted.paymentMethodType === paymentMethodType);
            if (findResult === undefined) {
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('purchase.payment.alert.notCompatible')
                });
                return;
            }
            this.purchaseService.selectPaymentMethodType({ paymentMethodType, paymentMethodName });
            this.router.navigate(['/purchase/confirm']);
        }).unsubscribe();
    }

    /**
     * 表示判定
     */
    public isDisplay(paymentMethodType: factory.paymentMethodType | string) {
        const findResult = getEnvironment().PAYMENT_METHOD_TO_USE.find(p => p === paymentMethodType);
        return (findResult !== undefined);
    }

}
