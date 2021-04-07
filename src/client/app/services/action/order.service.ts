import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Functions, Models } from '../..';
import { getEnvironment } from '../../../environments/environment';
import { orderAction } from '../../store/actions';
import * as reducers from '../../store/reducers';
import { CinerinoService } from '../cinerino.service';
import { PrinterService } from '../printer.service';
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
        private utilService: UtilService,
        private printerService: PrinterService,
        private translate: TranslateService
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
            // console.log(params);
            this.utilService.loadStart({ process: 'orderAction.Search' });
            await this.cinerinoService.getServices();
            let orders: factory.order.IOrder[] = [];
            if (params.orderDate === undefined
                || params.orderDate.$gte === undefined
                || params.orderDate.$lte === undefined) {
                throw new Error('orderDate undefined');
            }
            params.orderDate.$lte = moment(params.orderDate.$lte).add(1, 'millisecond').toDate();
            const splitDay = 1;
            const splitCount =
                Math.ceil(moment(params.orderDate.$lte).diff(moment(params.orderDate.$gte), 'days') / splitDay);
            for (let i = 0; i < splitCount; i++) {
                const limit = 10;
                let page = 1;
                let roop = true;
                const orderDate = {
                    $gte:
                        // tslint:disable-next-line:max-line-length
                        (moment(params.orderDate.$lte).add(-1 * splitDay * (i + 1), 'days').toDate() > moment(params.orderDate.$gte).toDate())
                            ? moment(params.orderDate.$lte).add(-1 * splitDay * (i + 1), 'days').toDate()
                            : moment(params.orderDate.$gte).toDate(),
                    $lte: moment(params.orderDate.$lte).add(-1 * splitDay * i, 'days').add(-1, 'millisecond').toDate(),
                };
                while (roop) {
                    params.limit = limit;
                    params.page = page;
                    const searchResult = await this.cinerinoService.order.search({
                        ...params,
                        orderDate
                    });
                    orders = orders.concat(searchResult.data);
                    page++;
                    roop = searchResult.data.length === limit;
                    console.log('orderDate', orderDate);
                    await Functions.Util.sleep();
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
        return new Promise<void>((resolve, reject) => {
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
        const environment = getEnvironment();
        try {
            const orders = prams.orders;
            const printer = prams.printer;
            const pos = prams.pos;
            if (printer.connectionType === Models.Util.Printer.ConnectionType.None) {
                return;
            }
            if (environment.PRINT_LOADING) {
                this.utilService.loadStart({ process: 'orderAction.Print' });
            }
            await this.cinerinoService.getServices();
            const authorizeOrders: { order: factory.order.IOrder; code?: string; }[] = [];
            if (environment.PRINT_QRCODE_TYPE === Models.Order.Print.PrintQrcodeType.None) {
                for (const order of orders) {
                    authorizeOrders.push({ order });
                }
            } else if (environment.PRINT_QRCODE_TYPE === Models.Order.Print.PrintQrcodeType.Token) {
                for (const order of orders) {
                    authorizeOrders.push({ order, code: await this.authorizeOrder({ order }) });
                }
            } else {
                for (const order of orders) {
                    authorizeOrders.push({ order });
                    this.authorizeOrder({ order }).then().catch((error) => {
                        console.error(error);
                        this.utilService.openAlert({
                            title: this.translate.instant('common.error'),
                            body: `<p class="mb-4">${this.translate.instant('purchase.complete.alert.authorize')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${(JSON.stringify(error) === '{}') ? error : JSON.stringify(error)}</code>
                        </div>`
                        });
                    });
                }
            }
            const testFlg = authorizeOrders.length === 0;
            const path = `/ejs/print/ticket.ejs`;
            const url = (testFlg) ? '/default//ejs/print/test.ejs'
                : (await Functions.Util.isFile(`${Functions.Util.getProject().storageUrl}${path}`))
                    ? `${Functions.Util.getProject().storageUrl}${path}`
                    : `/default${path}`;
            const printData = await this.utilService.getText<string>(url);
            const canvasList: HTMLCanvasElement[] = [];
            if (testFlg) {
                const canvas = await Functions.Order.createTestPrintCanvas4Html({ view: <string>printData });
                canvasList.push(canvas);
            } else {
                for (const authorizeOrder of authorizeOrders) {
                    let index = 0;
                    for (const acceptedOffer of authorizeOrder.order.acceptedOffers) {
                        const qrcode = Functions.Order.createQRCode({
                            acceptedOffer,
                            order: authorizeOrder.order,
                            index,
                            code: authorizeOrder.code
                        });
                        const canvas = await Functions.Order.createPrintCanvas4Html({
                            view: <string>printData,
                            order: authorizeOrder.order,
                            pos,
                            qrcode,
                            index
                        });
                        canvasList.push(canvas);
                        index++;
                    }
                }
            }
            await this.printProcess({ printer, canvasList, pos });
            if (environment.PRINT_LOADING) {
                this.utilService.loadEnd();
            }
        } catch (error) {
            if (environment.PRINT_LOADING) {
                this.utilService.loadEnd();
            }
            throw error;
        }
    }

    /**
     * 領収書印刷
     */
    public async printReceipt(prams: {
        orders: factory.order.IOrder[];
        printer: Models.Util.Printer.IPrinter;
        pos?: factory.chevre.place.movieTheater.IPOS;
        timeout?: number;
    }) {
        const environment = getEnvironment();
        try {
            const orders = prams.orders;
            const printer = prams.printer;
            const pos = prams.pos;
            if (printer.connectionType === Models.Util.Printer.ConnectionType.None) {
                return;
            }
            if (environment.PRINT_LOADING) {
                this.utilService.loadStart({ process: 'orderAction.Print' });
            }
            const canvasList: HTMLCanvasElement[] = [];
            const paths = [
                `/ejs/print/receipt.ejs`,
                `/ejs/print/receipt_copy.ejs`
            ];
            for (const order of orders) {
                for (const path of paths) {
                    const url = (await Functions.Util.isFile(`${Functions.Util.getProject().storageUrl}${path}`))
                        ? `${Functions.Util.getProject().storageUrl}${path}`
                        : `/default${path}`;
                    const view = await this.utilService.getText<string>(url);
                    const canvas = await Functions.Order.createPrintCanvas4Html({
                        view: view, order, pos, index: 1
                    });
                    canvasList.push(canvas);
                }
            }
            await this.printProcess({ printer, canvasList, pos });
            if (environment.PRINT_LOADING) {
                this.utilService.loadEnd();
            }
        } catch (error) {
            if (environment.PRINT_LOADING) {
                this.utilService.loadEnd();
            }
            throw error;
        }
    }

    /**
     * 印刷処理
     */
    private async printProcess(params: {
        printer: Models.Util.Printer.IPrinter;
        canvasList: HTMLCanvasElement[];
        pos?: factory.chevre.place.movieTheater.IPOS;
    }) {
        const printer = params.printer;
        const canvasList = params.canvasList;
        const pos = params.pos;
        switch (printer.connectionType) {
            case Models.Util.Printer.ConnectionType.StarBluetooth:
            case Models.Util.Printer.ConnectionType.StarLAN:
                this.printerService.star.initialize({ printer, pos });
                await this.printerService.star.printProcess({ canvasList });
                break;
            case Models.Util.Printer.ConnectionType.Image:
                const domList = canvasList.map(canvas => `<div class="mb-3 p-4 border border-light-gray shadow-sm">
                <img class="w-100" src="${canvas.toDataURL()}" alt="">
                </div>`);
                this.utilService.openAlert({
                    title: '',
                    body: `<div class="px-5">${domList.join('\n')}</div>`
                });
                break;
            case Models.Util.Printer.ConnectionType.EpsonEPOS:
                await this.printerService.epson.init({ printer });
                await this.printerService.epson.print({ canvasList });
                await this.printerService.epson.disconnect();
                break;
            default:
                break;
        }
    }

    /**
     * 注文コード発行
     */
    private async authorizeOrder(params: {
        order: factory.order.IOrder;
    }) {
        const environment = getEnvironment();
        const order = params.order;
        const result = await Functions.Util.retry<string>({
            process: (async () => {
                const orderNumber = order.orderNumber;
                const customer = { telephone: order.customer.telephone };
                const { code } = await this.cinerinoService.order.authorize({
                    object: { orderNumber, customer },
                    result: {
                        expiresInSeconds: Number(environment.ORDER_AUTHORIZE_CODE_EXPIRES)
                    }
                });
                return code;
            }),
            interval: 2000,
            limit: 10
        });
        return result;
    }

    /**
     * ドロワーを開く
     */
    public async openDrawer(params: {
        printer: Models.Util.Printer.IPrinter;
    }) {
        try {
            this.utilService.loadStart({ process: 'load' });
            const printer = params.printer;
            switch (printer.connectionType) {
                case Models.Util.Printer.ConnectionType.StarBluetooth:
                case Models.Util.Printer.ConnectionType.StarLAN:
                    this.printerService.star.initialize({ printer });
                    await this.printerService.star.openDrawer();
                    break;
                case Models.Util.Printer.ConnectionType.EpsonEPOS:
                    await this.printerService.epson.init({ printer });
                    await this.printerService.epson.openDrawer();
                    await this.printerService.epson.disconnect();
                    break;
                default:
                    throw new Error('The printer settings are incorrect');
            }
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.loadEnd();
            throw error;
        }
    }

}
