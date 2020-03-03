import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as libphonenumber from 'libphonenumber-js';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { connectionType, printers, ViewType } from '../../../../../models';
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
    public printers: typeof printers = printers;
    public connectionType: typeof connectionType = connectionType;
    public viewType: typeof ViewType = ViewType;
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
        const NAME_MAX_LENGTH = 12;
        const MAIL_MAX_LENGTH = 50;
        const TEL_MAX_LENGTH = 15;
        const TEL_MIN_LENGTH = 9;

        this.settingForm = this.formBuilder.group({
            theaterBranchCode: ['', [
                Validators.required
            ]],
            posId: ['', [
                Validators.required
            ]],
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
                (control: AbstractControl): ValidationErrors | null => {
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
                }
            ]],
            printerType: [''],
            printerIpAddress: ['']
        });
        const user = await this.userService.getData();
        if (user.theater !== undefined) {
            this.settingForm.controls.theaterBranchCode.setValue(user.theater.branchCode);
        }
        if (user.pos !== undefined) {
            this.changePosList();
            this.settingForm.controls.posId.setValue(user.pos.id);
        }
        if (user.customerContact !== undefined
            && user.customerContact.familyName !== undefined
            && user.customerContact.givenName !== undefined
            && user.customerContact.email !== undefined
            && user.customerContact.telephone !== undefined) {
            this.settingForm.controls.familyName.setValue(user.customerContact.familyName);
            this.settingForm.controls.givenName.setValue(user.customerContact.givenName);
            this.settingForm.controls.email.setValue(user.customerContact.email);
            this.settingForm.controls.telephone.setValue(new LibphonenumberFormatPipe().transform(user.customerContact.telephone));
        }
        if (user.printer !== undefined) {
            this.settingForm.controls.printerType.setValue(user.printer.connectionType);
            this.settingForm.controls.printerIpAddress.setValue(user.printer.ipAddress);
        }
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
            if (pos === undefined) {
                throw new Error('pos not found').message;
            }
            const theater = masterData.theaters.find(t => (t.branchCode === theaterBranchCode));
            if (theater === undefined) {
                throw new Error('theater not found').message;
            }
            this.userService.updateAll({
                seller,
                pos,
                theater,
                customerContact: {
                    familyName: this.settingForm.controls.familyName.value,
                    givenName: this.settingForm.controls.givenName.value,
                    email: this.settingForm.controls.email.value,
                    telephone: this.settingForm.controls.telephone.value
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
        if (this.settingForm.controls.printerType.value === connectionType.StarBluetooth) {
            this.settingForm.controls.printerIpAddress.setValue(this.translate.instant('setting.starBluetoothAddress'));
        }
    }

}
