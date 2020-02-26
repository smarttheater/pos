import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
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

    }

    /**
     * スケジュール選択
     */
    public selectScheduleDate(scheduleDate: string) {
        this.store.dispatch(new admissionAction.SelectScheduleDate({ scheduleDate }));
    }

    /**
     * QRコード初期化
     */
    public initializeQrcodeToken() {
        this.store.dispatch(new admissionAction.InitializeQrcodeToken());
    }

    /**
     * QRコード確認
     */
    public async checkQrcodeToken(code: string) {
        return new Promise<void>(async (resolve, reject) => {
            const { screeningEvent } = await this.getData();
            if (screeningEvent === undefined) {
                reject(new Error('screeningEvent === undefined'));
                return;
            }
            this.store.dispatch(new admissionAction.Check({ code, screeningEvent }));
            const success = this.actions.pipe(
                ofType(admissionAction.ActionTypes.CheckSuccess),
                tap(() => resolve())
            );
            const fail = this.actions.pipe(
                ofType(admissionAction.ActionTypes.CheckFail),
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
            this.store.dispatch(new admissionAction.GetScreeningEvent({ screeningEvent }));
            const success = this.actions.pipe(
                ofType(admissionAction.ActionTypes.GetScreeningEventSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(admissionAction.ActionTypes.GetScreeningEventFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }
}
