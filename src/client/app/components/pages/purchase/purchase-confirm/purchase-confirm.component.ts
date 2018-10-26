import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, AuthorizeAnyPayment, RegisterContact, Reserve } from '../../../../store/actions/purchase.action';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

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
    public depositAmount: number;
    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.depositAmount = 0;
    }

    public registerContact() {
        this.purchase.subscribe((purchase) => {
            this.user.subscribe((user) => {
                if (purchase.transaction === undefined
                    || user.customerContact === undefined) {
                    this.router.navigate(['/error']);
                    return;
                }
                const transaction = purchase.transaction;
                const contact = user.customerContact;
                this.store.dispatch(new RegisterContact({ transaction, contact }));
            }).unsubscribe();
        }).unsubscribe();
        const success = this.actions.pipe(
            ofType(ActionTypes.RegisterContactSuccess),
            tap(() => {
                this.reserve();
            })
        );

        const fail = this.actions.pipe(
            ofType(ActionTypes.RegisterContactFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public authorizeAnyPayment() {
        this.purchase.subscribe((purchase) => {
            if (purchase.transaction === undefined
                || purchase.paymentMethod === undefined
                || purchase.authorizeSeatReservation === undefined
                || purchase.authorizeSeatReservation.result === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const transaction = purchase.transaction;
            const paymentMethodType = purchase.paymentMethod.typeOf;
            const amount = purchase.authorizeSeatReservation.result.price;
            const additionalProperty = [];
            if (paymentMethodType === factory.paymentMethodType.Cash) {
                if (Number(this.depositAmount) < purchase.authorizeSeatReservation.result.price) {
                    this.openAlert({
                        title: 'エラー',
                        body: 'お預かり金額に誤りがあります。'
                    });
                    return;
                }
                additionalProperty.push({ name: 'depositAmount', value: Number(this.depositAmount) });
                additionalProperty.push({
                    name: 'change',
                    value: Number(this.depositAmount) - purchase.authorizeSeatReservation.result.price
                });
            }
            this.store.dispatch(new AuthorizeAnyPayment({
                params: {
                    transactionId: transaction.id,
                    typeOf: paymentMethodType,
                    amount: amount,
                    additionalProperty: additionalProperty
                }
            }));
        }).unsubscribe();
        const success = this.actions.pipe(
            ofType(ActionTypes.AuthorizeAnyPaymentSuccess),
            tap(() => {
                this.registerContact();
            })
        );

        const fail = this.actions.pipe(
            ofType(ActionTypes.AuthorizeAnyPaymentFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public reserve() {
        this.purchase.subscribe((purchase) => {
            if (purchase.transaction === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const transaction = purchase.transaction;
            this.store.dispatch(new Reserve({ transaction }));
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(ActionTypes.ReserveSuccess),
            tap(() => {
                this.router.navigate(['/purchase/complete']);
            })
        );

        const fail = this.actions.pipe(
            ofType(ActionTypes.ReserveFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public onSubmit() {
        this.authorizeAnyPayment();
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
