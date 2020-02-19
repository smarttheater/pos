import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { AdmissionService, QRCodeService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-admission-check',
    templateUrl: './admission-check.component.html',
    styleUrls: ['./admission-check.component.scss']
})
export class AdmissionCheckComponent implements OnInit, OnDestroy {
    public admission: Observable<reducers.IAdmissionState>;
    public isLoading: Observable<boolean>;
    public updateLoop: any;
    public moment: typeof moment = moment;
    public inputCode: string;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private admissionService: AdmissionService,
        private utilService: UtilService,
        private qrcodeService: QRCodeService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.inputCode = '';
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.admission = this.store.pipe(select(reducers.getAdmission));
        this.admissionService.initializeQrcodeToken();
    }

    public ngOnDestroy() {
        clearInterval(this.updateLoop);
    }

    @HostListener('document:keypress', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent) {
        const KEY_ENTER = 'Enter';
        const KEY_ESCAPE = 'Escape';
        if (event.key === KEY_ENTER && this.inputCode.length > 0) {
            // 読み取り完了
            this.check(this.inputCode);
            this.inputCode = '';
        } else if (event.key !== KEY_ESCAPE) {
            this.inputCode += event.key;
        }
    }

    /**
     * QRコードから入場を確認
     * @param {string} code
     */
    public async check(code: string) {
        try {
            await this.admissionService.checkQrcodeToken(code);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('admission.check.alert.check')
            });
        }
    }

    public openQRCodeReader() {
        this.qrcodeService.openQRCodeReader({
            cb: async (data: string) => {
                await this.check(data);
            }
        });
    }

    public update() {
        const loopTime = 600000; // 10分に一回
        clearInterval(this.updateLoop);
        this.updateLoop = setInterval(async () => {
            const { screeningEvent } = await this.admissionService.getData();
            if (screeningEvent === undefined) {
                return;
            }
            await this.admissionService.getScreeningEvent(screeningEvent);
        }, loopTime);
    }

}
