import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { BAD_REQUEST } from 'http-status';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, QRCodeService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-admission-check',
    templateUrl: './admission-check.component.html',
    styleUrls: ['./admission-check.component.scss']
})
export class AdmissionCheckComponent implements OnInit, OnDestroy {
    public admission: Observable<reducers.IAdmissionState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public updateLoop: any;
    public moment = moment;
    public inputCode: string;
    public environment = getEnvironment();
    public screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    public qrcodeToken?: {
        availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
        checkTokenActions: factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[] | string[];
        statusCode: number;
        error?: {
            message: string;
            inputCode: string;
        }
    };

    constructor(
        private store: Store<reducers.IState>,
        private actionService: ActionService,
        private qrcodeService: QRCodeService,
        private router: Router,
    ) { }

    public async ngOnInit() {
        this.inputCode = '';
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.admission = this.store.pipe(select(reducers.getAdmission));
        this.user = this.store.pipe(select(reducers.getUser));
        try {
            const { screeningEvent } = await this.actionService.admission.getData();
            this.screeningEvent = screeningEvent;
            if (screeningEvent !== undefined) {
                this.update();
            }
        } catch (error) {
            this.router.navigate(['/error']);
        }
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
            const { screeningEvent, scheduleDate } = await this.actionService.admission.getData();
            const { entranceGate } = await this.actionService.user.getData();
            if (scheduleDate === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const checkResult = await this.actionService.admission.checkQrcode({
                code,
                screeningEvent,
                scheduleDate: moment(scheduleDate, 'YYYY-MM-DD').toDate(),
                entranceGate
            });
            this.screeningEvent = checkResult.screeningEvent;
            this.qrcodeToken = checkResult.qrcodeToken;
        } catch (error) {
            console.error(error);
            this.qrcodeToken = {
                checkTokenActions: [],
                statusCode: (error.code) ? error.code : BAD_REQUEST,
                error: {
                    inputCode: code,
                    message: error.message,
                },
            };
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
            const { screeningEvent } = await this.actionService.admission.getData();
            if (screeningEvent === undefined) {
                return;
            }
            await this.actionService.admission.getScreeningEvent(screeningEvent);
        }, loopTime);
    }

}
