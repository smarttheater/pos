import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
    CountryISO,
    NgxIntlTelInputComponent,
    SearchCountryField,
    TooltipLabel,
} from 'ngx-intl-tel-input';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { LibphonenumberFormatPipe } from '../../../../shared/pipes/libphonenumber-format.pipe';

@Component({
    selector: 'app-purchase-input',
    templateUrl: './purchase-input.component.html',
    styleUrls: ['./purchase-input.component.scss'],
})
export class PurchaseInputComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public profileForm: FormGroup;
    public creditCardForm: FormGroup;
    public cardExpiration: {
        year: string[];
        month: string[];
    };
    public amount: number;
    public environment = getEnvironment();
    public viewType = Models.Util.ViewType;
    public usedCreditCard?: factory.chevre.paymentMethod.paymentCard.creditCard.ICheckedCard;
    public SearchCountryField = SearchCountryField;
    public TooltipLabel = TooltipLabel;
    public CountryISO = CountryISO;
    @ViewChild('intlTelInput') private intlTelInput: NgxIntlTelInputComponent;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private formBuilder: FormBuilder,
        private utilService: UtilService,
        private actionService: ActionService,
        private translate: TranslateService
    ) {}

    /**
     * 初期化
     */
    public async ngOnInit() {
        try {
            this.purchase = this.store.pipe(select(reducers.getPurchase));
            this.user = this.store.pipe(select(reducers.getUser));
            this.isLoading = this.store.pipe(select(reducers.getLoading));
            await this.createProfileForm();
            const { transaction, authorizeSeatReservations } =
                await this.actionService.purchase.getData();
            if (transaction === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            this.amount = Functions.Purchase.getAmount(
                authorizeSeatReservations
            );
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
        setTimeout(() => {
            if (this.intlTelInput === undefined) {
                return;
            }
            const findResult = this.intlTelInput.allCountries.find(
                (c) => c.iso2 === CountryISO.Japan
            );
            if (findResult === undefined) {
                return;
            }
            findResult.placeHolder = this.translate.instant(
                'form.placeholder.telephone'
            );
        }, 0);
    }

    /**
     * 購入情報フォーム作成
     */
    private async createProfileForm() {
        const profile = this.environment.PROFILE;
        this.profileForm = this.formBuilder.group({});
        profile.forEach((p) => {
            const validators: ValidatorFn[] = [];
            if (p.required !== undefined && p.required) {
                validators.push(Validators.required);
            }
            if (p.maxLength !== undefined) {
                validators.push(Validators.maxLength(p.maxLength));
            }
            if (p.minLength !== undefined) {
                validators.push(Validators.minLength(p.minLength));
            }
            if (p.pattern !== undefined) {
                validators.push(Validators.pattern(p.pattern));
            }
            if (p.key === 'familyName' || p.key === 'givenName') {
                validators.push((control: AbstractControl) => {
                    const field = control.root.get(p.key);
                    const language = document.documentElement.lang;
                    if (field !== null) {
                        if (field.value === '') {
                            return null;
                        }
                        if (
                            language === 'ja' &&
                            !new RegExp(/^[ァ-ヶー]+$/).test(field.value)
                        ) {
                            return { customPattern: true };
                        }
                        if (
                            language !== 'ja' &&
                            !new RegExp(/^[a-z]+$/).test(field.value)
                        ) {
                            return { customPattern: true };
                        }
                    }

                    return null;
                });
            }
            if (p.key === 'email') {
                validators.push(Validators.email);
            }
            this.profileForm.addControl(
                p.key,
                new FormControl(p.value, validators)
            );
        });
        const purchase = await this.actionService.purchase.getData();
        if (purchase.profile === undefined) {
            return;
        }
        Object.keys(purchase.profile).forEach((key) => {
            const value = (<any>purchase.profile)[key];
            if (
                value === undefined ||
                this.profileForm.controls[key] === undefined
            ) {
                return;
            }
            if (key === 'telephone') {
                this.profileForm.controls.telephone.setValue(
                    new LibphonenumberFormatPipe().transform(value)
                );
                return;
            }
            this.profileForm.controls[key].setValue(value);
        });
        const additionalProperty = purchase.profile.additionalProperty;
        if (additionalProperty === undefined) {
            return;
        }
        additionalProperty.forEach((a) => {
            const key = `additionalProperty.${a.name}`;
            const value = a.value;
            if (
                value === undefined ||
                this.profileForm.controls[key] === undefined
            ) {
                return;
            }
            this.profileForm.controls[key].setValue(value);
        });
    }

    /**
     * 入力確定
     */
    public async onSubmit() {
        // 購入者情報Form
        Object.keys(this.profileForm.controls).forEach((key) => {
            this.profileForm.controls[key].markAsTouched();
            if (key === 'telephone') {
                return;
            }
            this.profileForm.controls[key].setValue(
                (<HTMLInputElement>document.getElementById(key)).value
            );
        });
        if (this.profileForm.invalid) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.input.alert.customer'),
            });
            return;
        }
        try {
            const { customer } = await this.actionService.purchase.getData();
            const additionalProperty: { name: string; value: string }[] = [];
            Object.keys(this.profileForm.controls).forEach((key) => {
                if (!/additionalProperty/.test(key)) {
                    return;
                }
                additionalProperty.push({
                    name: key.replace('additionalProperty.', ''),
                    value: this.profileForm.controls[key].value,
                });
            });

            const profile = {
                givenName:
                    this.profileForm.controls.givenName === undefined
                        ? undefined
                        : this.profileForm.controls.givenName.value,
                familyName:
                    this.profileForm.controls.familyName === undefined
                        ? undefined
                        : this.profileForm.controls.familyName.value,
                telephone:
                    this.profileForm.controls.telephone === undefined
                        ? undefined
                        : this.profileForm.controls.telephone.value.e164Number,
                email:
                    this.profileForm.controls.email === undefined
                        ? undefined
                        : this.profileForm.controls.email.value,
                address:
                    this.profileForm.controls.address === undefined
                        ? undefined
                        : this.profileForm.controls.address.value,
                age:
                    this.profileForm.controls.age === undefined
                        ? undefined
                        : this.profileForm.controls.age.value,
                gender:
                    this.profileForm.controls.gender === undefined
                        ? undefined
                        : this.profileForm.controls.gender.value,
                additionalProperty:
                    additionalProperty.length === 0 ? [] : additionalProperty,
            };
            if (
                customer !== undefined &&
                customer.additionalProperty !== undefined
            ) {
                // 顧客情報の追加特性を継承
                profile.additionalProperty = [
                    ...profile.additionalProperty,
                    ...customer.additionalProperty,
                ];
            }
            await this.actionService.purchase.transaction.setProfile({
                profile,
            });
            this.router.navigate(['/purchase/confirm']);
        } catch (error) {
            this.router.navigate(['/error']);
        }
    }

    /**
     * 必須判定
     */
    public isRequired(key: String) {
        return (
            this.environment.PROFILE.find(
                (p) => p.key === key && p.required
            ) !== undefined
        );
    }

    /**
     * 購入者情報フォームのコントロールkeyを配列で返却
     */
    public getProfileFormKeys() {
        return Object.keys(this.profileForm.controls);
    }

    /**
     * プロフィール項目取得
     */
    public getProfileProperty(key: string) {
        return this.environment.PROFILE.find((p) => p.key === key);
    }

    /**
     * 追加特性項目取得
     */
    public getAdditionalProperty(key: string) {
        return this.environment.PROFILE.find(
            (p) => /additionalProperty/.test(p.key) && p.key === key
        );
    }
}
