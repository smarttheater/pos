import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IPrinter, ViewType } from '../models';
import { userAction } from '../store/actions';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user: Observable<reducers.IUserState>;

    constructor(
        private store: Store<reducers.IState>,
        private translate: TranslateService
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
        isPurchaseCart: boolean;
        viewType: ViewType;
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

}
