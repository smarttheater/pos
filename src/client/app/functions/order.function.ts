import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import * as qrcode from 'qrcode';
import { getEnvironment } from '../../environments/environment';
import { IOrderSearchConditions, ITicketPrintData } from '../models';
import { getItemPrice } from './purchase.function';
import { formatTelephone, getProject } from './util.function';

/**
 * キャンバスへ描画
 */
async function drawCanvas(args: {
    printData: ITicketPrintData,
    data: {
        sellerNameJa: string;
        sellerNameEn: string;
        eventNameJa: string;
        eventNameEn: string;
        screenNameJa: string;
        screenNameEn: string;
        startDate: string;
        endDate: string;
        seatNumber?: string;
        ticketNameJa: string;
        ticketNameEn: string;
        price: number;
        posName: string
        confirmationNumber: string;
        orderNumber: string;
        ticketNumber: string;
        qrcode?: string;
        index: number
    }
}) {
    const printData = args.printData;
    const data = args.data;
    const canvas = document.createElement('canvas');
    const size = printData.size;
    canvas.width = size.width;
    canvas.height = size.height;
    const context = canvas.getContext('2d');
    if (context === null) {
        throw new Error('context is null');
    }
    const drawImage = (drawImageArgs: {
        image: HTMLImageElement;
        x: number;
        y: number;
        width: number;
        height: number;
    }) => {
        return new Promise((resolve, reject) => {
            drawImageArgs.image.onload = () => {
                context.drawImage(drawImageArgs.image, drawImageArgs.x, drawImageArgs.y, drawImageArgs.width, drawImageArgs.height);
                resolve();
            };
            drawImageArgs.image.onerror = (error) => {
                console.error(error);
                reject(error);
            };
        });
    };
    const changePosition = ((value: number | 'center' | 'left' | 'right' | 'top' | 'bottom') => {
        const position = [
            { key: 'center', value: canvas.width / 2 },
            { key: 'left', value: 0 },
            { key: 'right', value: canvas.width },
            { key: 'top', value: 0 },
            { key: 'bottom', value: canvas.height }
        ];
        const findResult = position.find((p) => p.key === value);
        if (findResult === undefined) {
            return (<number>value);
        }
        return findResult.value;
    });
    const font = `"Hiragino Sans", "Hiragino Kaku Gothic ProN", "游ゴシック  Medium", meiryo, sans-serif`;
    // 画像描画
    for (const image of printData.image) {
        const imageInstance = new Image();
        imageInstance.crossOrigin = 'anonymous';
        imageInstance.src = image.src.replace('/storage', getProject().storageUrl);
        await drawImage({
            image: imageInstance,
            x: image.x,
            y: image.y,
            width: image.width,
            height: image.height
        });
    }
    // テキスト描画
    for (const text of printData.text) {
        context.fillStyle = text.fillStyle;
        context.font = `${text.font.weight} ${text.font.size} ${(text.font.family === undefined) ? font : text.font.family}`;
        context.textAlign = text.textAlign;
        let value = '';
        if (text.name !== undefined) {
            switch (text.name) {
                case 'price':
                    value = `￥${data.price.toLocaleString()}`;
                    break;
                case 'date':
                    value = `(${moment().format('YYYY/MM/DD HH:mm')} 発券)`;
                    break;
                case 'startDate':
                case 'endDate':
                    value = `${moment(data[text.name]).format(text.value)}`;
                    break;
                case 'eventNameJa':
                case 'eventNameEn':
                    const eventName = data[text.name];
                    const limit = Math.floor(size.width / parseInt(text.font.size, 10));
                    if (eventName.length > limit) {
                        context.fillText(
                            eventName.slice(0, limit),
                            changePosition(text.fillText.x),
                            changePosition(text.fillText.y)
                        );
                        context.fillText(
                            (eventName.length - limit < limit)
                                ? eventName.slice(limit, eventName.length)
                                : eventName.slice(limit, limit * 2),
                            changePosition(text.fillText.x),
                            changePosition(text.fillText.y) + parseInt(text.font.size, 10) * 1.5
                        );
                    } else {
                        context.fillText(
                            eventName,
                            changePosition(text.fillText.x),
                            changePosition(text.fillText.y) + parseInt(text.font.size, 10) * 0.75
                        );
                    }
                    continue;
                default:
                    value = `${(text.value === undefined) ? '' : text.value}${(data[text.name] === undefined) ? '-' : data[text.name]}`;
            }
        } else if (text.value !== undefined) {
            value = text.value;
        } else {
            continue;
        }
        if (text.slice !== undefined) {
            // 文字制限
            value = value.slice(text.slice[0], text.slice[1]);
        }
        context.fillText(
            value,
            changePosition(text.fillText.x),
            changePosition(text.fillText.y)
        );
    }

    // QR描画
    if (data.qrcode !== undefined) {
        for (const qrCode of printData.qrCode) {
            const qrcodeCanvas = document.createElement('canvas');
            await qrcode.toCanvas(qrcodeCanvas, data.qrcode);
            context.drawImage(qrcodeCanvas, qrCode.x, qrCode.y, qrCode.width, qrCode.height);
        }
    }

    return canvas;
}

/**
 * 印刷イメージ作成
 */
export async function createPrintCanvas(params: {
    printData: ITicketPrintData;
    acceptedOffer: factory.order.IAcceptedOffer<factory.order.IItemOffered>;
    order: factory.order.IOrder;
    pos?: factory.seller.IPOS;
    qrcode?: string;
    index: number;
}) {
    const acceptedOffer = params.acceptedOffer;
    const itemOffered = acceptedOffer.itemOffered;
    if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
        throw new Error('reservationType is not EventReservation');
    }
    const data = {
        sellerNameJa: itemOffered.reservationFor.superEvent.location.name.ja,
        sellerNameEn: itemOffered.reservationFor.superEvent.location.name.en,
        eventNameJa: itemOffered.reservationFor.name.ja,
        eventNameEn: itemOffered.reservationFor.name.en,
        screenNameJa: (itemOffered.reservationFor.location.address === undefined)
            ? itemOffered.reservationFor.location.name.ja
            : `${itemOffered.reservationFor.location.address.ja} ${itemOffered.reservationFor.location.name.ja}`,
        screenNameEn: (itemOffered.reservationFor.location.address === undefined)
            ? itemOffered.reservationFor.location.name.en
            : `${itemOffered.reservationFor.location.address.en} ${itemOffered.reservationFor.location.name.en}`,
        startDate: moment(itemOffered.reservationFor.startDate).toISOString(),
        endDate: moment(itemOffered.reservationFor.endDate).toISOString(),
        seatNumber: (itemOffered.reservedTicket.ticketedSeat === undefined
            || itemOffered.reservedTicket.ticketedSeat === null)
            ? undefined : itemOffered.reservedTicket.ticketedSeat.seatNumber,
        ticketNameJa: itemOffered.reservedTicket.ticketType.name.ja,
        ticketNameEn: itemOffered.reservedTicket.ticketType.name.en,
        price: (acceptedOffer.priceSpecification === undefined)
            ? 0 : getItemPrice({ priceComponents: (<any>acceptedOffer.priceSpecification).priceComponent }),
        posName: (params.pos === undefined) ? '' : params.pos.name,
        confirmationNumber: String(params.order.confirmationNumber),
        orderNumber: params.order.orderNumber,
        ticketNumber: itemOffered.id,
        qrcode: params.qrcode,
        index: params.index
    };
    const printData = params.printData;
    const canvas = await drawCanvas({ data, printData });

    return canvas;
}

/**
 * テスト印刷用イメージ作成
 */
export async function createTestPrintCanvas(args: { printData: ITicketPrintData }) {
    const printData = args.printData;
    const data = {
        sellerNameJa: 'テスト劇場',
        sellerNameEn: 'test theater',
        eventNameJa: (Math.floor(Math.random() * 11) < 5)
            ? 'テストイベント'
            : 'テスト1テスト2テスト3テスト4テスト5テスト6テスト7テスト8テスト9テスト10イベント',
        eventNameEn: (Math.floor(Math.random() * 11) < 5)
            ? 'test event'
            : 'test1 test2 test3 test4 test5 test6 test7 event',
        screenNameJa: 'テストスクリーン',
        screenNameEn: 'test screen',
        startDate: moment().toISOString(),
        endDate: moment().toISOString(),
        seatNumber: 'TEST-1',
        ticketNameJa: 'テストチケット123456',
        ticketNameEn: 'test ticket 123456',
        price: 1000,
        posName: 'test-01',
        confirmationNumber: '12345678',
        orderNumber: 'TEST-123456-123456',
        ticketNumber: 'TEST-123456-123456-00',
        qrcode: 'TEST-123456-123456',
        index: 0
    };
    const canvas = await drawCanvas({ printData, data });

    return canvas;
}

/**
 * RegiGrow連携用QRコード作成
 */
export async function createRegiGrowQrcode(order: factory.order.IOrder) {
    const canvas = document.createElement('canvas');
    const environment = getEnvironment();
    let qrcodeText = environment.REGIGROW_QRCODE;
    qrcodeText = qrcodeText
        .replace(/\{\{ orderNumber \}\}/g, order.orderNumber);
    qrcodeText = qrcodeText
        .replace(/\{\{ price \}\}/g, String(order.price));

    return new Promise<string>((resolve, reject) => {
        qrcode.toCanvas(canvas, qrcodeText).then(() => {
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
            const itemOffered = acceptedOffer.itemOffered;
            if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
                return;
            }
            const customData = {
                orderDate: order.orderDate,
                orderDateJST: moment(order.orderDate).format('YYYY/MM/DD/HH:mm'),
                orderNumber: order.orderNumber,
                orderStatus: order.orderStatus,
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
    seller?: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    page?: number;
    limit?: number;
}) {
    const input = params.input;
    const seller = params.seller;
    const page = params.page;
    const limit = params.limit;
    const identifiers: factory.propertyValue.IPropertyValue<string>[] = [];
    if (input.posId !== '') {
        identifiers.push({ name: 'posId', value: input.posId });
    }
    const result: factory.order.ISearchConditions = {
        seller: {
            ids: (seller === undefined) ? undefined : [seller.id]
        },
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
                }
            }
        },
        limit,
        page,
        sort: { orderDate: factory.sortType.Descending }
    };
    return result;
}
