import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { getTicketPrice, IEventOrder, orderToEventOrders } from '../../../../functions';
import { UtilService } from '../../../../services';
import { orderAction } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-inquiry-confirm',
    templateUrl: './inquiry-confirm.component.html',
    styleUrls: ['./inquiry-confirm.component.scss']
})
export class InquiryConfirmComponent implements OnInit {
    public order: Observable<reducers.IOrderState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public moment: typeof moment = moment;
    public getTicketPrice = getTicketPrice;
    public eventOrders: IEventOrder[];
    public orderStatus: typeof factory.orderStatus = factory.orderStatus;
    public environment = environment;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private util: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.eventOrders = [];
        this.order = this.store.pipe(select(reducers.getOrder));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.order.subscribe((value) => {
            if (value.order === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const order = value.order;
            this.eventOrders = orderToEventOrders({ order });
        }).unsubscribe();
    }

    /**
     * キャンセル確認
     */
    public cancelConfirm() {
        this.util.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('inquiry.confirm.confirm.cancel'),
            cb: async () => {
                try {
                    await this.cancel();
                    await this.inquiry();
                } catch (error) {
                    this.error.subscribe((error) => {
                        this.util.openAlert({
                            title: this.translate.instant('common.error'),
                            body: `
                            <p class="mb-4">${this.translate.instant('inquiry.confirm.alert.cancel')}</p>
                                <div class="p-3 bg-light-gray select-text">
                                <code>${JSON.stringify(error)}</code>
                            </div>`
                        });
                    }).unsubscribe();
                }
            }
        });
    }

    /**
     * キャンセル処理
     */
    public cancel() {
        return new Promise((resolve, reject) => {
            this.order.subscribe((orderData) => {
                const order = orderData.order;
                if (order === undefined) {
                    reject({error: 'order undefined'});
                    return;
                }
                this.store.dispatch(new orderAction.Cancel({ orders: [order] }));
            }).unsubscribe();
            const success = this.actions.pipe(
                ofType(orderAction.ActionTypes.CancelSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(orderAction.ActionTypes.CancelFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 照会
     */
    private inquiry() {
        return new Promise((resolve, reject) => {
            this.order.subscribe((orderData) => {
                const order = orderData.order;
                if (order === undefined) {
                    reject({error: 'order undefined'});
                    return;
                }
                this.store.dispatch(new orderAction.Inquiry({
                    confirmationNumber: order.confirmationNumber,
                    customer: { telephone: order.customer.telephone }
                }));
            }).unsubscribe();
            const success = this.actions.pipe(
                ofType(orderAction.ActionTypes.InquirySuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(orderAction.ActionTypes.InquiryFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    public print() {
        this.order.subscribe((inquiry) => {
            this.user.subscribe((user) => {
                if (inquiry.order === undefined
                    || user.pos === undefined
                    || user.printer === undefined) {
                    this.router.navigate(['/error']);
                    return;
                }
                const orders = [inquiry.order];
                const pos = user.pos;
                const printer = user.printer;
                this.store.dispatch(new orderAction.Print({ orders, pos, printer }));
            }).unsubscribe();
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(orderAction.ActionTypes.PrintSuccess),
            tap(() => { })
        );

        const fail = this.actions.pipe(
            ofType(orderAction.ActionTypes.PrintFail),
            tap(() => {
                this.error.subscribe((error) => {
                    this.util.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `
                        <p class="mb-4">${this.translate.instant('inquiry.confirm.alert.print')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                    });
                }).unsubscribe();
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}
