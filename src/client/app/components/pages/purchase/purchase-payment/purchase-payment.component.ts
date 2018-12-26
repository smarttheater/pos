import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectPaymentMethodType } from '../../../../store/actions/purchase.action';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-purchase-payment',
    templateUrl: './purchase-payment.component.html',
    styleUrls: ['./purchase-payment.component.scss']
})
export class PurchasePaymentComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
    }

    public selectPaymentMethodType(paymentMethodType: factory.paymentMethodType | string) {
        this.purchase.subscribe((purchase) => {
            if (purchase.movieTheater === undefined
                || purchase.movieTheater.paymentAccepted === undefined) {
                this.router.navigate(['/error']);
                console.error('movieTheater is undefined or paymentAccepted is undefined');
                return;
            }
            const findResult = purchase.movieTheater.paymentAccepted
            .find(paymentAccepted => paymentAccepted.paymentMethodType === paymentMethodType);
            if (findResult === undefined) {
                this.openAlert({title: 'エラー', body: '支払い方法が未対応です。'});
                return;
            }
            this.store.dispatch(new SelectPaymentMethodType({ paymentMethodType }));
            this.router.navigate(['/purchase/confirm']);
        }).unsubscribe();
    }

    public openAlert(args: {
        title: string;
        body: string;
    }) {
        const modalRef = this.modal.open(AlertModalComponent, {
            centered: true
        });
        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }

}
