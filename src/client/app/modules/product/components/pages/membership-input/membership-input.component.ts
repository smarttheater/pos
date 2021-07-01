import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-membership-input',
    templateUrl: './membership-input.component.html',
    styleUrls: ['./membership-input.component.scss'],
})
export class MembershipInputComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public profileForm?: FormGroup;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
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
            const { ticketOffer } = await this.actionService.purchase.getData();
            if (ticketOffer === undefined) {
                throw new Error('ticketOffer undefined');
            }
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 入力確定
     */
    public async onSubmit() {
        if (this.profileForm === undefined) {
            return;
        }
        // 購入者情報Form
        Object.keys(this.profileForm.controls).forEach((key) => {
            this.profileForm?.controls[key].markAsTouched();
            if (key === 'telephone') {
                return;
            }
            this.profileForm?.controls[key].setValue(
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
            const additionalProperty: { name: string; value: string }[] = [];
            Object.keys(this.profileForm.controls).forEach((key) => {
                if (!/additionalProperty/.test(key)) {
                    return;
                }
                additionalProperty.push({
                    name: key.replace('additionalProperty.', ''),
                    value: this.profileForm?.controls[key].value,
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
                    additionalProperty.length === 0
                        ? undefined
                        : additionalProperty,
            };
            await this.actionService.purchase.transaction.setProfile({
                profile,
            });
            await this.actionService.purchase.authorizeProduct();
            this.router.navigate(['/product/membership/confirm']);
        } catch (error) {
            this.router.navigate(['/error']);
        }
    }
}
