import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as libphonenumber from 'libphonenumber-js';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
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
    public environment = environment;

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
            sellerBranchCode: ['', [
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
            printerIpAddress: [''],
            isPurchaseCart: ['0', [
                Validators.required,
                Validators.pattern(/^[0-9]+$/)
            ]],
            viewType: ['', [
                Validators.required
            ]]
        });
        const user = await this.userService.getData();
        if (user.seller !== undefined
            && user.seller.location !== undefined) {
            this.settingForm.controls.sellerBranchCode.setValue(user.seller.location.branchCode);
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
        this.settingForm.controls.isPurchaseCart.setValue((user.isPurchaseCart) ? '1' : '0');
        this.settingForm.controls.viewType.setValue(user.viewType);
    }

    /**
     * POS変更
     */
    public changePosList() {
        this.settingForm.controls.posId.setValue('');
        const sellerBranchCode = this.settingForm.controls.sellerBranchCode.value;
        if (sellerBranchCode === '') {
            this.posList = [];
            return;
        }
        this.master.subscribe((master) => {
            const findTheater =
                master.sellers.find(theater =>
                    (theater.location !== undefined && theater.location.branchCode === sellerBranchCode)
                );
            if (findTheater === undefined) {
                this.posList = [];
                return;
            }
            this.posList = (findTheater.hasPOS === undefined) ? [] : findTheater.hasPOS;
        }).unsubscribe();
    }


    /**
     * 設定変更
     */
    public onSubmit() {
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
        this.master.subscribe((master) => {
            const findSeller = master.sellers.find((s) =>
                (s.location !== undefined && s.location.branchCode === this.settingForm.controls.sellerBranchCode.value));
            if (findSeller === undefined || findSeller.hasPOS === undefined) {
                return;
            }
            const findPos = findSeller.hasPOS.find((pos: any) => {
                return pos.id === this.settingForm.controls.posId.value;
            });
            if (findPos === undefined) {
                return;
            }
            this.userService.updateAll({
                seller: findSeller,
                pos: findPos,
                customerContact: {
                    familyName: this.settingForm.controls.familyName.value,
                    givenName: this.settingForm.controls.givenName.value,
                    email: this.settingForm.controls.email.value,
                    telephone: this.settingForm.controls.telephone.value
                },
                printer: {
                    ipAddress: this.settingForm.controls.printerIpAddress.value,
                    connectionType: this.settingForm.controls.printerType.value
                },
                isPurchaseCart: (this.settingForm.controls.isPurchaseCart.value === '1') ? true : false,
                viewType: this.settingForm.controls.viewType.value
            });
            this.utilService.openAlert({
                title: this.translate.instant('common.complete'),
                body: this.translate.instant('setting.alert.success')
            });

        }).unsubscribe();

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
