import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UtilService } from '../../../../services';
import { SelectPaymentMethodType } from '../../../../store/actions/purchase.action';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-purchase-payment',
    templateUrl: './purchase-payment.component.html',
    styleUrls: ['./purchase-payment.component.scss']
})
export class PurchasePaymentComponent implements OnInit {
    public user: Observable<reducers.IUserState>;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private util: UtilService
    ) { }

    public ngOnInit() {
        this.user = this.store.pipe(select(reducers.getUser));
    }

    public selectPaymentMethodType(paymentMethodType: factory.paymentMethodType | string) {
        this.user.subscribe((user) => {
            if (user.movieTheater === undefined
                || user.movieTheater.paymentAccepted === undefined) {
                this.router.navigate(['/error']);
                console.error('movieTheater is undefined or paymentAccepted is undefined');
                return;
            }
            const findResult = user.movieTheater.paymentAccepted
                .find(paymentAccepted => paymentAccepted.paymentMethodType === paymentMethodType);
            if (findResult === undefined) {
                this.util.openAlert({ title: 'エラー', body: '支払い方法が未対応です。' });
                return;
            }
            this.store.dispatch(new SelectPaymentMethodType({ paymentMethodType }));
            this.router.navigate(['/purchase/confirm']);
        }).unsubscribe();
    }

}
