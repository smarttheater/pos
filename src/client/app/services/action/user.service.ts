import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Models } from '../..';
import { userAction } from '../../store/actions';
import * as reducers from '../../store/reducers';
import { UtilService } from '../util.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user: Observable<reducers.IUserState>;

    constructor(
        private store: Store<reducers.IState>,
        private translate: TranslateService,
        private utilService: UtilService
    ) {
        this.user = this.store.pipe(select(reducers.getUser));
    }

    /**
     * ユーザーデータ取得
     */
    public async getData() {
        return new Promise<reducers.IUserState>((resolve) => {
            this.user.subscribe((user) => {
                resolve(user);
            }).unsubscribe();
        });
    }

    /**
     * ユーザーデータ削除
     */
    public delete() {
        this.store.dispatch(userAction.remove());
    }

    /**
     * すべて更新
     */
    public updateAll(params: {
        theater: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
        pos?: factory.chevre.place.movieTheater.IPOS;
        entranceGate?: factory.chevre.place.movieTheater.IEntranceGate;
        customerContact: factory.transaction.placeOrder.ICustomerProfile;
        printer: Models.Util.Printer.IPrinter;
        drawer: boolean;
    }) {
        this.store.dispatch(userAction.updateAll(params));
    }

    /**
     * 言語更新
     */
    public updateLanguage(language: string) {
        const element = document.querySelector<HTMLSelectElement>('#language');
        if (element !== null) {
            element.value = language;
        }
        this.translate.use(language);
        const html = <HTMLElement>document.querySelector('html');
        html.setAttribute('lang', language);
        this.store.dispatch(userAction.updateLanguage({ language }));
    }

    /**
     * バージョン確認
     */
    public async checkVersion() {
        const query = `?date=${moment().toISOString()}`;
        const { version } = await this.utilService.getJson<{ version: string }>(`/api/version${query}`);
        const data = await this.getData();
        if (data.version === undefined) {
            this.store.dispatch(userAction.setVersion({ version }));
        }
        if (data.version !== undefined
            && data.version !== version) {
            this.store.dispatch(userAction.setVersion({ version }));
            location.reload();
        }
    }

}
