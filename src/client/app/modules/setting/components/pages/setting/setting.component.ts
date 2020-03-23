import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as libphonenumber from 'libphonenumber-js';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { ConnectionType, printers, ViewType } from '../../../../../models';
import { MasterService, OrderService, UserService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { LibphonenumberFormatPipe } from '../../../../shared/pipes/libphonenumber-format.pipe';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    public settingForm: FormGroup;
    public user: Observable<reducers.IUserState>;
    public master: Observable<reducers.IMasterState>;
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public posList: { id: string; name: string; typeOf: string; }[];
    public printers = printers;
    public connectionType = ConnectionType;
    public viewType = ViewType;
    public environment = getEnvironment();

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private userService: UserService,
        private masterService: MasterService,
        private orderService: OrderService,
        private translate: TranslateService,
        private router: Router
    ) { }

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.user = this.store.pipe(select(reducers.getUser));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.error = this.store.pipe(select(reducers.getError));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.posList = [];
        try {
            await this.masterService.getSellers();
            await this.masterService.getTheaters();
            const userData = await this.userService.getData();
            const masterData = await this.masterService.getData();
            if (userData.seller !== undefined
                && userData.pos !== undefined
                && userData.customerContact !== undefined
                && userData.printer !== undefined
                && userData.theater === undefined) {
                // 互換性担保
                const seller = userData.seller;
                const findResult = masterData.theaters.find(t => {
                    return (seller.location !== undefined
                        && t.branchCode === seller.location.branchCode);
                });
                const theater = (findResult === undefined) ? masterData.theaters[0] : findResult;
                this.userService.updateAll({
                    seller: userData.seller,
                    pos: userData.pos,
                    theater: theater,
                    customerContact: userData.customerContact,
                    printer: userData.printer
                });
            }
            await this.createSettlingForm();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * フォーム作成
     */
    private async createSettlingForm() {
        const profile = this.environment.PROFILE;
        this.settingForm = this.formBuilder.group({
            theaterBranchCode: ['', [Validators.required]],
            posId: [''],
            printerType: [ConnectionType.None],
            printerIpAddress: ['']
        });
        profile.forEach(p => {
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
            if (p.key === 'email') {
                validators.push(Validators.email);
            }
            if (p.key === 'telephone') {
                validators.push((control: AbstractControl) => {
                    const field = control.root.get('telephone');
                    if (field !== null) {
                        if (field.value === '') {
                            return null;
                        }
                        const parsedNumber = (new RegExp(/^\+/).test(field.value))
                            ? libphonenumber.parse(field.value)
                            : libphonenumber.parse(field.value, 'JP');
                        if (parsedNumber.phone === undefined) {
                            return { telephone: true };
                        }
                        const isValid = libphonenumber.isValidNumber(parsedNumber);
                        if (!isValid) {
                            return { telephone: true };
                        }
                    }

                    return null;
                });
            }
            this.settingForm.addControl(p.key, new FormControl(p.value, validators));
        });
        const user = await this.userService.getData();
        if (user.theater !== undefined) {
            this.settingForm.controls.theaterBranchCode.setValue(user.theater.branchCode);
        }
        if (user.pos !== undefined) {
            this.changePosList();
            this.settingForm.controls.posId.setValue(user.pos.id);
        }
        const customerContact = user.customerContact;
        if (customerContact !== undefined) {
            Object.keys(customerContact).forEach(key => {
                const value = (<any>customerContact)[key];
                if (value === undefined || this.settingForm.controls[key] === undefined) {
                    return;
                }
                if (key === 'telephone') {
                    this.settingForm.controls.telephone
                        .setValue(new LibphonenumberFormatPipe().transform(value));
                    return;
                }
                this.settingForm.controls[key].setValue(value);
            });
        }
        if (user.printer !== undefined) {
            this.settingForm.controls.printerType.setValue(user.printer.connectionType);
            this.settingForm.controls.printerIpAddress.setValue(user.printer.ipAddress);
        }
        console.log(this.settingForm);
    }

    /**
     * POS変更
     */
    public changePosList() {
        this.settingForm.controls.posId.setValue('');
        const theaterBranchCode = this.settingForm.controls.theaterBranchCode.value;
        if (theaterBranchCode === '') {
            this.posList = [];
            return;
        }
        this.master.subscribe((master) => {
            const findResult =
                master.sellers.find(s => (s.location !== undefined && s.location.branchCode === theaterBranchCode));
            if (findResult === undefined) {
                this.posList = [];
                return;
            }
            this.posList = (findResult.hasPOS === undefined) ? [] : findResult.hasPOS;
        }).unsubscribe();
    }


    /**
     * 設定変更
     */
    public async onSubmit() {
        Object.keys(this.settingForm.controls).forEach((key) => {
            this.settingForm.controls[key].markAsTouched();
        });
        if (this.settingForm.invalid) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('setting.alert.validation')
            });
            return;
        }
        try {
            const masterData = await this.masterService.getData();
            const theaterBranchCode = this.settingForm.controls.theaterBranchCode.value;
            const posId = this.settingForm.controls.posId.value;
            const seller = masterData.sellers.find(s => (s.location !== undefined && s.location.branchCode === theaterBranchCode));
            if (seller === undefined || seller.hasPOS === undefined) {
                throw new Error('seller not found').message;
            }
            const pos = seller.hasPOS.find(p => p.id === posId);
            const theater = masterData.theaters.find(t => (t.branchCode === theaterBranchCode));
            if (theater === undefined) {
                throw new Error('theater not found').message;
            }
            this.userService.updateAll({
                seller,
                pos,
                theater,
                customerContact: {
                    familyName: (this.settingForm.controls.familyName === undefined)
                        ? undefined : this.settingForm.controls.familyName.value,
                    givenName: (this.settingForm.controls.givenName === undefined)
                        ? undefined : this.settingForm.controls.givenName.value,
                    email: (this.settingForm.controls.email === undefined)
                        ? undefined : this.settingForm.controls.email.value,
                    telephone: (this.settingForm.controls.telephone === undefined)
                        ? undefined : this.settingForm.controls.telephone.value,
                    age: (this.settingForm.controls.age === undefined)
                        ? undefined : this.settingForm.controls.age.value,
                    address: (this.settingForm.controls.address === undefined)
                        ? undefined : this.settingForm.controls.address.value,
                    gender: (this.settingForm.controls.gender === undefined)
                        ? undefined : this.settingForm.controls.gender.value
                },
                printer: {
                    ipAddress: this.settingForm.controls.printerIpAddress.value,
                    connectionType: this.settingForm.controls.printerType.value
                }
            });
            this.utilService.openAlert({
                title: this.translate.instant('common.complete'),
                body: this.translate.instant('setting.alert.success')
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 印刷
     */
    public async print() {
        const printer = {
            connectionType: this.settingForm.controls.printerType.value,
            ipAddress: this.settingForm.controls.printerIpAddress.value
        };
        try {
            await this.orderService.print({ orders: [], printer });
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('setting.alert.print')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error}</code>
                </div>`
            });
        }
    }

    /**
     * プリンター変更
     */
    public changePrinterType() {
        if (this.settingForm.controls.printerType.value === ConnectionType.StarBluetooth) {
            this.settingForm.controls.printerIpAddress.setValue(this.translate.instant('setting.starBluetoothAddress'));
        }
    }

}
