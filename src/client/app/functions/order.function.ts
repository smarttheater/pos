import { factory } from '@cinerino/sdk';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import * as qrcode from 'qrcode';
import { getEnvironment } from '../../environments/environment';
import { Order } from '../models';
import { IOrderSearchConditions } from '../models/order/search';
import { getItemPrice } from './purchase.function';
import { formatTelephone, getProject } from './util.function';

/**
 * 印刷イメージ作成
 */
export async function createPrintCanvas4Html(params: {
    view: string;
    order: factory.order.IOrder;
    pos?: factory.chevre.place.movieTheater.IPOS;
    qrcode?: string;
    index: number;
}) {
    // QR描画
    if (params.qrcode !== undefined) {
        params.qrcode = await qrcode.toDataURL(params.qrcode);
    }
    const template = await (<any>window).ejs.render(params.view, {
        moment,
        ...params,
        storageUrl: getProject().storageUrl
    }, { async: true });
    const div = document.createElement('div');
    div.className = 'position-absolute';
    div.style.top = '-9999px';
    div.innerHTML = template;
    document.body.appendChild(div);
    const canvas = await html2canvas(div, { width: div.clientWidth, scale: 1 });
    div.remove();
    return canvas;
}

/**
 * テスト印刷用イメージ作成
 */
export async function createTestPrintCanvas4Html(params: { view: string; }) {
    const view = params.view;
    const template = await (<any>window).ejs.render(view, { moment }, { async: true });
    const div = document.createElement('div');
    div.className = 'position-absolute';
    div.style.top = '-9999px';
    div.innerHTML = template;
    document.body.appendChild(div);
    const canvas = await html2canvas(div, { width: div.clientWidth, scale: 1 });
    div.remove();
    return canvas;
}

/**
 * カスタムQR作成
 */
export function createCustomQRCode(params: {
    qrcode: string;
    order: factory.order.IOrder;
    itemOffered: factory.chevre.reservation.IReservation<
        factory.chevre.reservationType.EventReservation
    >;
    index: number;
}) {
    let result = params.qrcode;
    const order = params.order;
    const itemOffered = params.itemOffered;
    const index = params.index;
    result = result
        .replace(/\{\{ orderDate \| YYMMDD \}\}/g, moment(order.orderDate).format('YYMMDD'));
    result = result
        .replace(/\{\{ confirmationNumber \}\}/g, order.confirmationNumber);
    result = result
        .replace(/\{\{ confirmationNumber \| [0-9] \}\}/g, (match) => {
            const digit = Number(match.replace(/\{\{ confirmationNumber \| ([0-9]) \}\}/, '$1'));
            return `000000000${order.confirmationNumber}`.slice(-1 * digit);
        });
    result = result
        .replace(/\{\{ index \}\}/g, String(index));
    result = result
        .replace(/\{\{ index \| [0-9] \}\}/g, (match) => {
            const digit = Number(match.replace(/\{\{ index \| ([0-9]) \}\}/, '$1'));
            return `000000000${String(index)}`.slice(-1 * digit);
        });
    result = result
        .replace(/\{\{ orderNumber \}\}/g, order.orderNumber);
    result = result
        .replace(
            /\{\{ startDate \| YYMMDD \}\}/g,
            moment(itemOffered.reservationFor.startDate).format('YYMMDD')
        );
    return result;
}

/**
 * QR作成
 */
export function createQRCode(
    acceptedOffer: factory.order.IAcceptedOffer<factory.order.IItemOffered>,
    order: factory.order.IOrder,
    index: number
) {
    if (acceptedOffer.itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
        return undefined;
    }
    let result;
    const itemOffered = <factory.chevre.reservation.IReservation<
        factory.chevre.reservationType.EventReservation
    >>acceptedOffer.itemOffered;
    const environment = getEnvironment();
    if (environment.PRINT_QRCODE_TYPE === Order.Print.PrintQrcodeType.None) {
        // なし
        result = undefined;
    } else if (environment.PRINT_QRCODE_TYPE === Order.Print.PrintQrcodeType.Token) {
        // トークン
        result = itemOffered.reservedTicket.ticketToken;
    } else if (environment.PRINT_QRCODE_TYPE === Order.Print.PrintQrcodeType.Admission) {
        // 入場
        result = JSON.stringify({
            orderNumber: order.orderNumber,
            id: itemOffered.id
        });
    } else if (environment.PRINT_QRCODE_TYPE === Order.Print.PrintQrcodeType.Custom) {
        // カスタム文字列
        result = createCustomQRCode({
            qrcode: environment.PRINT_QRCODE_CUSTOM,
            order,
            itemOffered,
            index
        });
    }
    const additionalProperty = (itemOffered.reservationFor.workPerformed !== undefined
        && itemOffered.reservationFor.workPerformed.additionalProperty !== undefined
        && itemOffered.reservationFor.workPerformed.additionalProperty.length > 0)
        ? itemOffered.reservationFor.workPerformed.additionalProperty :
        (itemOffered.additionalProperty !== undefined
            && itemOffered.additionalProperty.length > 0) ?
            itemOffered.additionalProperty
            : undefined;
    if (additionalProperty !== undefined) {
        // 追加特性のqrcodeがfalseの場合QR非表示
        const isDisplayQrcode = additionalProperty.find(a => a.name === 'qrcode');
        if (isDisplayQrcode !== undefined && isDisplayQrcode.value === 'false') {
            result = undefined;
        }
    }
    return result;
}


/**
 * 連携用QR作成
 */
export async function createCooperationQRCode(params: {
    order: factory.order.IOrder;
    qrcodeText: string;
}) {
    const order = params.order;
    const qrcodeText = params.qrcodeText;
    const canvas = document.createElement('canvas');
    const text = qrcodeText
        .replace(/\{\{ orderNumber \}\}/g, order.orderNumber)
        .replace(/\{\{ price \}\}/g, String(order.price));

    return new Promise<string>((resolve, reject) => {
        qrcode.toCanvas(canvas, text).then(() => {
            resolve(canvas.toDataURL());
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

/**
 * 取引追加情報取得
 */
export function getTransactionAgentIdentifier(order: factory.order.IOrder, key: string) {
    if (order.customer.identifier === undefined || typeof order.customer.identifier === 'string') {
        return;
    }
    return order.customer.identifier.find(i => i.name === key);
}

/**
 * 注文データCSV変換
 */
export function order2report(orders: factory.order.IOrder[]) {
    const data: any[] = [];
    orders.forEach((order) => {
        order.acceptedOffers.forEach((acceptedOffer) => {
            if (acceptedOffer.itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
                return;
            }
            const itemOffered = <factory.chevre.reservation.IReservation<
                factory.chevre.reservationType.EventReservation
            >>acceptedOffer.itemOffered;
            const customData = {
                orderDate: order.orderDate,
                orderDateJST: moment(order.orderDate).format('YYYY/MM/DD/HH:mm'),
                orderNumber: order.orderNumber,
                orderStatus: order.orderStatus,
                dateReturnedJST: (order.dateReturned === undefined)
                    ? undefined
                    : moment(order.dateReturned).format('YYYY/MM/DD/HH:mm'),
                confirmationNumber: order.confirmationNumber,
                price: order.price,
                seller: order.seller,
                paymentMethodsNames: order.paymentMethods.map(m => m.name).join(','),
                customer: {
                    ...order.customer,
                    formatTelephone: formatTelephone((<string>order.customer.telephone)),
                    pos: {
                        name: (getTransactionAgentIdentifier(order, 'posName') === undefined)
                            ? { name: '', value: '' }
                            : (<factory.propertyValue.IPropertyValue<string>>getTransactionAgentIdentifier(order, 'posName'))
                    },
                    liny: {
                        id: (getTransactionAgentIdentifier(order, 'linyId') === undefined)
                            ? { name: '', value: '' }
                            : (<factory.propertyValue.IPropertyValue<string>>getTransactionAgentIdentifier(order, 'linyId'))
                    }
                },
                itemOffered: {
                    id: itemOffered.id,
                    price: getItemPrice({ priceComponents: (<any>acceptedOffer.priceSpecification).priceComponent }),
                    reservedTicket: itemOffered.reservedTicket,
                    reservationFor: {
                        ...itemOffered.reservationFor,
                        startDateJST: moment(itemOffered.reservationFor.startDate).format('YYYY/MM/DD/HH:mm')
                    }
                }
            };
            data.push(customData);
        });
    });
    return data;
}

/**
 * 入力データを検索条件へ変換
 */
export function input2OrderSearchCondition(params: {
    input: IOrderSearchConditions;
    theater?: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
    page?: number;
    limit?: number;
}) {
    const input = params.input;
    const theater = params.theater;
    const page = params.page;
    const limit = params.limit;
    const identifiers: factory.propertyValue.IPropertyValue<string>[] = [];
    if (input.posId !== '') {
        identifiers.push({ name: 'posId', value: input.posId });
    }
    const result: factory.order.ISearchConditions = {
        customer: {
            // email: (input.customer.email === '') ? undefined : input.customer.email,
            // telephone: (input.customer.telephone === '') ? undefined : input.customer.telephone,
            // familyName: (input.customer.familyName === '') ? undefined : input.customer.familyName,
            // givenName: (input.customer.givenName === '') ? undefined : input.customer.givenName,
            email: {
                $eq: (input.customer.email === '') ? undefined : input.customer.email,
            },
            telephone: (input.customer.telephone === '') ? undefined : input.customer.telephone,
            familyName: {
                $eq: (input.customer.familyName === '') ? undefined : input.customer.familyName,
            },
            givenName: {
                $eq: (input.customer.givenName === '') ? undefined : input.customer.givenName,
            },
            identifiers
        },
        orderStatuses: (input.orderStatus === '')
            ? undefined : [input.orderStatus],
        orderDateFrom: (input.orderDateFrom === undefined)
            ? undefined
            : moment(moment(input.orderDateFrom).format('YYYYMMDD')).toDate(),
        orderDateThrough: (input.orderDateThrough === undefined)
            ? undefined
            : moment(moment(input.orderDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
        confirmationNumbers: (input.confirmationNumber === '')
            ? undefined : [input.confirmationNumber],
        orderNumbers: (input.orderNumber === '')
            ? undefined : [input.orderNumber],
        paymentMethods: (input.paymentMethodType === '')
            ? undefined : { typeOfs: [input.paymentMethodType] },
        acceptedOffers: {
            itemOffered: {
                reservationFor: {
                    inSessionFrom: (input.eventStartDateFrom === undefined)
                        ? undefined
                        : moment(moment(input.eventStartDateFrom).format('YYYYMMDD')).toDate(),
                    inSessionThrough: (input.eventStartDateThrough === undefined)
                        ? undefined
                        : moment(moment(input.eventStartDateThrough)
                            .format('YYYYMMDD')).add(1, 'day').toDate(),
                    superEvent: {
                        location: { branchCodes: (theater === undefined) ? [] : [theater.branchCode] }
                    }
                }
            }
        },
        limit,
        page,
        sort: { orderDate: factory.sortType.Descending }
    };
    return result;
}

/**
 * 注文連携リンク作成
 */
export function createOrderLink(
    order: factory.order.IOrder,
    link: {
        name: { ja: string; en: string; };
        url: string; params: { key: string; value?: string; }[];
    }
) {
    const params: string[] = [];
    link.params.forEach(p => {
        const value = (p.value === undefined) ? (<any>order)[p.key] : p.value;
        params.push(`${p.key}=${value}`);
    });
    return (params.length > 0) ? `${link.url}?${params.join('&')}` : link.url;
}
