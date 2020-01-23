import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IPrinter } from '../models';
import { userAction } from '../store/actions';
import * as reducers from '../store/reducers';
import { UtilService } from './util.service';

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
        this.store.dispatch(new userAction.Delete());
    }

    /**
     * すべて更新
     */
    public updateAll(params: {
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
        pos: factory.seller.IPOS;
        customerContact: factory.transaction.placeOrder.ICustomerProfile;
        printer: IPrinter;
    }) {
        this.store.dispatch(new userAction.UpdateAll(params));
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
        this.store.dispatch(new userAction.UpdateLanguage({ language }));
    }

    /**
     * バージョン確認
     */
    public async checkVersion() {
        this.utilService.loadStart();
        const query = `?date=${moment().toISOString()}`;
        const { version } = await this.utilService.getJson<{ version: string }>(`/api/version${query}`);
        const data = await this.getData();
        if (data.version === undefined) {
            this.store.dispatch(new userAction.SetVersion({ version }));
        }
        if (data.version !== undefined
            && data.version !== version) {
            this.store.dispatch(new userAction.SetVersion({ version }));
            location.reload();
        }
        this.utilService.loadEnd();
    }

}
