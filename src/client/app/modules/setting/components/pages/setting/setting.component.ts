import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
    public user: Observable<reducers.IUserState>;
    public master: Observable<reducers.IMasterState>;
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public viewType = Models.Util.ViewType;
    public theaters: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom[];
    public environment = getEnvironment();
    public inputData: {
        app: {
            theater?: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
            pos?: factory.chevre.place.movieTheater.IPOS;
            entranceGate?: factory.chevre.place.movieTheater.IEntranceGate;
        };
        device: {
            printerType?: Models.Util.Printer.ConnectionType;
            printerIpAddress?: string;
            drawer?: string;
        };
        profile?: factory.person.IProfile;
    };
    public appForm: FormGroup;
    public deviceForm: FormGroup;
    public profileForm: FormGroup;

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private actionService: ActionService,
        private masterService: MasterService,
        private translate: TranslateService,
        private router: Router
    ) {}

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.user = this.store.pipe(select(reducers.getUser));
        this.error = this.store.pipe(select(reducers.getError));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.theaters = [];
        try {
            this.theaters = await this.masterService.searchMovieTheaters();
            const {
                theater,
                entranceGate,
                pos,
                printer,
                drawer,
                customerContact,
            } = await this.actionService.user.getData();
            this.inputData = {
                app: { theater, entranceGate, pos },
                device: {
                    printerType: printer?.connectionType,
                    printerIpAddress: printer?.ipAddress,
                    drawer: drawer === undefined || !drawer ? '0' : '1',
                },
                profile: customerContact,
            };
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }
    /**
     * 設定変更
     */
    public async onSubmit() {
        Object.keys(this.appForm.controls).forEach((key) => {
            this.appForm.controls[key].markAsTouched();
        });
        Object.keys(this.deviceForm.controls).forEach((key) => {
            this.deviceForm.controls[key].markAsTouched();
        });
        Object.keys(this.profileForm.controls).forEach((key) => {
            this.profileForm.controls[key].markAsTouched();
        });
        if (
            this.appForm.invalid ||
            this.deviceForm.invalid ||
            this.profileForm.invalid
        ) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('setting.alert.validation'),
            });
            return;
        }
        try {
            const theaterId = this.appForm.controls.theaterId.value;
            const posId = this.appForm.controls.posId.value;
            const entranceGateId = this.appForm.controls.entranceGateId.value;
            const theater = this.theaters.find((t) => t.id === theaterId);
            if (theater === undefined) {
                throw new Error('theater not found');
            }
            const pos =
                theater.hasPOS === undefined
                    ? undefined
                    : theater.hasPOS.find((p) => p.id === posId);
            const entranceGate =
                theater.hasEntranceGate === undefined
                    ? undefined
                    : theater.hasEntranceGate.find(
                          (e) => e.identifier === entranceGateId
                      );
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
            this.actionService.user.updateAll({
                theater,
                pos,
                entranceGate,
                customerContact: {
                    familyName:
                        this.profileForm.controls.familyName === undefined
                            ? undefined
                            : this.profileForm.controls.familyName.value,
                    givenName:
                        this.profileForm.controls.givenName === undefined
                            ? undefined
                            : this.profileForm.controls.givenName.value,
                    email:
                        this.profileForm.controls.email === undefined
                            ? undefined
                            : this.profileForm.controls.email.value,
                    telephone:
                        this.profileForm.controls.telephone === undefined
                            ? undefined
                            : this.profileForm.controls.telephone.value
                                  .e164Number,
                    // ? undefined : this.settingForm.controls.telephone.value,
                    age:
                        this.profileForm.controls.age === undefined
                            ? undefined
                            : this.profileForm.controls.age.value,
                    address:
                        this.profileForm.controls.address === undefined
                            ? undefined
                            : this.profileForm.controls.address.value,
                    gender:
                        this.profileForm.controls.gender === undefined
                            ? undefined
                            : this.profileForm.controls.gender.value,
                    additionalProperty,
                },
                printer: {
                    ipAddress: this.deviceForm.controls.printerIpAddress.value,
                    connectionType: this.deviceForm.controls.printerType.value,
                },
                drawer:
                    this.deviceForm.controls.drawer.value === '0'
                        ? false
                        : true,
            });
            this.utilService.openAlert({
                title: this.translate.instant('common.complete'),
                body: this.translate.instant('setting.alert.success'),
            });
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: '',
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 印刷
     */
    public async print() {
        const printer = {
            connectionType: this.deviceForm.controls.printerType.value,
            ipAddress: this.deviceForm.controls.printerIpAddress.value,
        };
        try {
            await this.actionService.order.print({ orders: [], printer });
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('setting.alert.print'),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * ドロワーを開く
     */
    public async openDrawer() {
        const printer = {
            connectionType: this.deviceForm.controls.printerType.value,
            ipAddress: this.deviceForm.controls.printerIpAddress.value,
        };
        try {
            await this.actionService.order.openDrawer({ printer });
        } catch (error) {
            this.utilService.loadEnd();
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('setting.alert.drawer'),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }
}
