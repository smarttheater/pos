import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Functions, Models } from '../..';
import { orderAction } from '../../store/actions';
import * as reducers from '../../store/reducers';
import { CinerinoService } from '../cinerino.service';
import { UtilService } from '../util.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public order: Observable<reducers.IOrderState>;
    public error: Observable<string | null>;
    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private cinerinoService: CinerinoService,
        private utilService: UtilService
    ) {
        this.order = this.store.pipe(select(reducers.getOrder));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * 注文データ取得
     */
    public async getData() {
        return new Promise<reducers.IOrderState>((resolve) => {
            this.order.subscribe((order) => {
                resolve(order);
            }).unsubscribe();
        });
    }

    /**
     * 注文データ削除
     */
    public delete() {
        this.store.dispatch(orderAction.remove());
    }

    /**
     * 注文検索
     */
    public async search(params: factory.order.ISearchConditions) {
        try {
            this.utilService.loadStart({ process: 'orderAction.Search' });
            await this.cinerinoService.getServices();
            const searchResult = await this.cinerinoService.order.search(params);
            this.utilService.loadEnd();
            return searchResult;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 分割検索
     */
    public async splitSearch(params: factory.order.ISearchConditions) {
        try {
            this.utilService.loadStart({ process: 'orderAction.Search' });
            await this.cinerinoService.getServices();
            let orders: factory.order.IOrder[] = [];
            const splitDay = 1;
            const splitCount =
                Math.ceil(moment(params.orderDateThrough).diff(moment(params.orderDateFrom), 'days') / splitDay);
            for (let i = 0; i < splitCount; i++) {
                const limit = 10;
                let page = 1;
                let roop = true;
                const orderDateThrough = moment(params.orderDateThrough).add(-1 * splitDay * i, 'days').toDate();
                const orderDateFrom =
                    (moment(params.orderDateThrough).add(-1 * splitDay * (i + 1), 'days').toDate() > moment(params.orderDateFrom).toDate())
                        ? moment(params.orderDateThrough).add(-1 * splitDay * (i + 1), 'days').toDate()
                        : moment(params.orderDateFrom).toDate();
                while (roop) {
                    params.limit = limit;
                    params.page = page;
                    const searchResult = await this.cinerinoService.order.search({ ...params, orderDateThrough, orderDateFrom });
                    orders = orders.concat(searchResult.data);
                    page++;
                    roop = searchResult.data.length === limit;
                    await Functions.Util.sleep(500);
                }
            }
            this.utilService.loadEnd();
            return { data: orders, totalCount: orders.length };
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 注文キャンセル
     */
    public async cancel(params: {
        orders: factory.order.IOrder[];
        language: string;
        pos?: factory.chevre.place.movieTheater.IPOS;
    }) {
        const identifier = (params.pos === undefined)
            ? []
            : [
                { name: 'posId', value: params.pos.id },
                { name: 'posName', value: params.pos.name }
            ];
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(orderAction.cancel({
                orders: params.orders,
                language: params.language,
                agent: { identifier }
            }));
            const success = this.actions.pipe(
                ofType(orderAction.cancelSuccess.type),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(orderAction.cancelFail.type),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 注文照会
     */
    public async inquiry(params: {
        confirmationNumber: string;
        customer: {
            email?: string;
            telephone?: string;
        }
    }) {
        return new Promise((resolve, reject) => {
            this.store.dispatch(orderAction.inquiry(params));
            const success = this.actions.pipe(
                ofType(orderAction.inquirySuccess.type),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(orderAction.inquiryFail.type),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 注文印刷
     */
    public async print(prams: {
        orders: factory.order.IOrder[];
        printer: Models.Util.Printer.IPrinter;
        pos?: factory.chevre.place.movieTheater.IPOS;
        timeout?: number;
    }) {
        return new Promise<void>((resolve, reject) => {
            const orders = prams.orders;
            const pos = prams.pos;
            const printer = prams.printer;
            this.store.dispatch(orderAction.print({ orders, pos, printer }));
            const success = this.actions.pipe(
                ofType(orderAction.printSuccess.type),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(orderAction.printFail.type),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 注文承認
     */
    public async authorize(order: factory.order.IOrder) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(orderAction.orderAuthorize({
                orderNumber: order.orderNumber,
                customer: {
                    telephone: order.customer.telephone
                }
            }));
            const success = this.actions.pipe(
                ofType(orderAction.orderAuthorizeSuccess.type),
                tap(() => { resolve(); })
            );

            const fail = this.actions.pipe(
                ofType(orderAction.orderAuthorizeFail.type),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

}
