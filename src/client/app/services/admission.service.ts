import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { admissionAction } from '../store/actions';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class AdmissionService {
    public admission: Observable<reducers.IAdmissionState>;
    public error: Observable<string | null>;
    constructor(
        private actions: Actions,
        private store: Store<reducers.IState>,
    ) {
        this.admission = this.store.pipe(select(reducers.getAdmission));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * データ取得
     */
    public async getData() {
        return new Promise<reducers.IAdmissionState>((resolve) => {
            this.admission.subscribe((admission) => {
                resolve(admission);
            }).unsubscribe();
        });
    }

    /**
     * データ削除
     */
    public delete() {
        this.store.dispatch(admissionAction.remove());
    }

    /**
     * スケジュール選択
     */
    public selectScheduleDate(scheduleDate: string) {
        this.store.dispatch(admissionAction.selectScheduleDate({ scheduleDate }));
    }

    /**
     * QRコード初期化
     */
    public initializeQrcodeToken() {
        this.store.dispatch(admissionAction.initializeQrcodeToken());
    }

    /**
     * QRコード確認
     */
    public async checkQrcodeToken(code: string) {
        return new Promise<void>(async (resolve, reject) => {
            const { screeningEvent, specified, scheduleDate } = await this.getData();
            this.store.dispatch(admissionAction.check({
                code,
                screeningEvent,
                scheduleDate: moment(scheduleDate, 'YYYY-MM-DD').toDate(),
                specified
            }));
            const success = this.actions.pipe(
                ofType(admissionAction.checkSuccess.type),
                tap(() => resolve())
            );
            const fail = this.actions.pipe(
                ofType(admissionAction.checkFail.type),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * イベント取得
     */
    public async getScreeningEvent(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(admissionAction.getScreeningEvent({ screeningEvent }));
            const success = this.actions.pipe(
                ofType(admissionAction.getScreeningEventSuccess.type),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(admissionAction.getScreeningEventFail.type),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }
}
