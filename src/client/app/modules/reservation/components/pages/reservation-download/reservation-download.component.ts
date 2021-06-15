import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import {
    ActionService,
    DownloadService,
    UtilService,
} from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-reservation-download',
    templateUrl: './reservation-download.component.html',
    styleUrls: ['./reservation-download.component.scss'],
})
export class ReservationDownloadComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public user: Observable<reducers.IUserState>;
    public reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[][];
    public moment = moment;
    public conditions: Models.Reservation.IReservationSearchConditions;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IOrderState>,
        private utilService: UtilService,
        private actionService: ActionService,
        private downloadService: DownloadService,
        private translate: TranslateService
    ) {}

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.reservations = [];
        this.actionService.reservation.delete();
    }

    /**
     * ダウンロード
     */
    public async download() {
        try {
            const params =
                Functions.Reservation.input2ReservationSearchCondition({
                    input: this.conditions,
                    theater: (await this.actionService.user.getData()).theater,
                });
            await this.downloadService.reservation(params);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'reservation.download.alert.download'
                ),
            });
        }
        this.utilService.loadEnd();
    }

    /**
     * 条件変更
     */
    public async changeConditions(
        conditions: Models.Reservation.IReservationSearchConditions
    ) {
        this.conditions = conditions;
        await this.download();
    }
}
