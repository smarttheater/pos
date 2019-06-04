import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as libphonenumber from 'libphonenumber-js';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { UtilService } from '../../../../services';
import { purchaseAction } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-purchase-input',
    templateUrl: './purchase-input.component.html',
    styleUrls: ['./purchase-input.component.scss']
})
export class PurchaseInputComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public isLoading: Observable<boolean>;
    public customerContactForm: FormGroup;
    public paymentForm: FormGroup;
    public cardExpiration: {
        year: string[];
        month: string[];
    };
    public amount: number;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private util: UtilService,
        private formBuilder: FormBuilder,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.amount = 0;
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.purchase.subscribe((purchase) => {
            if (purchase.authorizeSeatReservation === undefined
                || purchase.authorizeSeatReservation.result === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            this.amount = purchase.authorizeSeatReservation.result.price;
        }).unsubscribe();
        this.createCustomerContactForm();
        this.createPaymentForm();
    }

    private createCustomerContactForm() {
        const NAME_MAX_LENGTH = 12;
        const MAIL_MAX_LENGTH = 50;
        const TEL_MAX_LENGTH = 11;
        const TEL_MIN_LENGTH = 9;
        this.customerContactForm = this.formBuilder.group({
            familyName: ['', [
                Validators.required,
                Validators.maxLength(NAME_MAX_LENGTH),
                Validators.pattern(/^[ァ-ヶー]+$/)
            ]],
            givenName: ['', [
                Validators.required,
                Validators.maxLength(NAME_MAX_LENGTH),
                Validators.pattern(/^[ァ-ヶー]+$/)
            ]],
            email: ['', [
                Validators.required,
                Validators.maxLength(MAIL_MAX_LENGTH),
                Validators.email
            ]],
            telephone: ['', [
                Validators.required,
                Validators.maxLength(TEL_MAX_LENGTH),
                Validators.minLength(TEL_MIN_LENGTH),
                Validators.pattern(/^[0-9]+$/),
                (control: AbstractControl): ValidationErrors | null => {
                    const field = control.root.get('telephone');
                    if (field !== null) {
                        const parsedNumber = libphonenumber.parse(field.value, 'JP');
                        if (parsedNumber.phone === undefined) {
                            return { telephone: true };
                        }
                        const isValid = libphonenumber.isValidNumber(parsedNumber);
                        if (!isValid) {
                            return { telephone: true };
                        }
                    }

                    return null;
                }
            ]]
        });
    }

    private createPaymentForm() {
        this.cardExpiration = {
            year: [],
            month: []
        };
        for (let i = 0; i < 12; i++) {
            this.cardExpiration.month.push(`0${String(i + 1)}`.slice(-2));
        }
        for (let i = 0; i < 10; i++) {
            this.cardExpiration.year.push(moment().add(i, 'year').format('YYYY'));
        }
        this.paymentForm = this.formBuilder.group({
            cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            cardExpirationMonth: [this.cardExpiration.month[0], [Validators.required]],
            cardExpirationYear: [this.cardExpiration.year[0], [Validators.required]],
            securityCode: ['', [Validators.required]],
            holderName: ['', [Validators.required]]
        });
    }

    public onSubmit() {
        Object.keys(this.customerContactForm.controls).forEach((key) => {
            this.customerContactForm.controls[key].markAsTouched();
        });
        Object.keys(this.paymentForm.controls).forEach((key) => {
            this.paymentForm.controls[key].markAsTouched();
        });
        this.customerContactForm.controls.familyName.setValue((<HTMLInputElement>document.getElementById('familyName')).value);
        this.customerContactForm.controls.givenName.setValue((<HTMLInputElement>document.getElementById('givenName')).value);
        this.customerContactForm.controls.email.setValue((<HTMLInputElement>document.getElementById('email')).value);
        this.customerContactForm.controls.telephone.setValue((<HTMLInputElement>document.getElementById('telephone')).value);
        if (this.amount > 0) {
            this.paymentForm.controls.cardNumber.setValue((<HTMLInputElement>document.getElementById('cardNumber')).value);
            this.paymentForm.controls.securityCode.setValue((<HTMLInputElement>document.getElementById('securityCode')).value);
            this.paymentForm.controls.holderName.setValue((<HTMLInputElement>document.getElementById('holderName')).value);
        }
        if (this.customerContactForm.invalid) {
            this.util.openAlert({
                title: this.translate.instant('common.error'),
                body: '購入者情報に誤りがあります。'
            });
            return;
        }
        if (this.amount > 0 && this.paymentForm.invalid) {
            this.util.openAlert({
                title: this.translate.instant('common.error'),
                body: '決済情報に誤りがあります。'
            });
            return;
        }

        this.registerContact();
    }

    /**
     * registerContact
     */
    private registerContact() {
        this.purchase.subscribe((purchase) => {
            if (purchase.transaction === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const transaction = purchase.transaction;
            const contact = {
                givenName: this.customerContactForm.controls.givenName.value,
                familyName: this.customerContactForm.controls.familyName.value,
                telephone: this.customerContactForm.controls.telephone.value,
                email: this.customerContactForm.controls.email.value,
            };
            this.store.dispatch(new purchaseAction.RegisterContact({ transaction, contact }));
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.RegisterContactSuccess),
            tap(() => {
                this.purchase.subscribe((purchase) => {
                    if (purchase.authorizeSeatReservation !== undefined
                        && purchase.authorizeSeatReservation.result !== undefined
                        && purchase.authorizeSeatReservation.result.price > 0) {
                        this.createGmoTokenObject();
                    } else {
                        this.router.navigate(['/purchase/confirm']);
                    }
                }).unsubscribe();
            })
        );

        const fail = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.RegisterContactFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * createGmoTokenObject
     */
    private createGmoTokenObject() {
        this.purchase.subscribe((purchase) => {
            if (purchase.seller === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            this.store.dispatch(new purchaseAction.CreateGmoTokenObject({
                seller: purchase.seller,
                creditCard: {
                    cardno: this.paymentForm.controls.cardNumber.value,
                    expire: `${this.paymentForm.controls.cardExpirationYear.value}${this.paymentForm.controls.cardExpirationMonth.value}`,
                    holderName: this.paymentForm.controls.holderName.value,
                    securityCode: this.paymentForm.controls.securityCode.value
                }
            }));
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.CreateGmoTokenObjectSuccess),
            tap(() => {
                this.router.navigate(['/purchase/confirm']);
            })
        );

        const fail = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.CreateGmoTokenObjectFail),
            tap(() => {
                this.util.openAlert({
                    title: this.translate.instant('common.error'),
                    body: 'クレジットカード情報を確認してください。'
                });
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}
