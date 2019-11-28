import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as json2csv from 'json2csv';
import * as moment from 'moment';
import { getTicketPrice, order2report } from '../functions';
import { CsvFormat } from '../models';
import { CinerinoService } from './cinerino.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    public static SPLIT_COUNT = 10000;

    constructor(
        private cinerino: CinerinoService,
        private utilService: UtilService
    ) { }

    /**
     * 注文情報CSVダウンロード
     */
    public async order(params: factory.order.ISearchConditions) {
        const url = '/storage/json/csv/order.json';
        const fields = await this.utilService.getJson<{ label: string, value: string }[]>(url);
        const opts = { fields, unwind: [] };
        await this.cinerino.getServices();
        const limit = 100;
        let page = 1;
        let roop = true;
        let orders: factory.order.IOrder[] = [];
        while (roop) {
            params.limit = limit;
            params.page = page;
            const searchResult = await this.cinerino.order.search(params);
            orders = orders.concat(searchResult.data);
            const lastPage = Math.ceil(searchResult.totalCount / limit);
            page++;
            roop = !(page > lastPage);
        }
        const data = order2report(orders);
        await this.splitDownload('order', data, opts, DownloadService.SPLIT_COUNT);
    }

    /**
     * 注文情報CSVダウンロード
     */
    public async orderStream(params: factory.order.ISearchConditions & {
        format: factory.encodingFormat.Application | factory.encodingFormat.Text;
        csvFormat: CsvFormat;
    }) {
        if (params.csvFormat === CsvFormat.Default) {
            window.open(`/download/order?params=${JSON.stringify(params)}`, '_blank');
            return;
        }
        const url = '/storage/json/csv/order.json';
        const fields = await this.utilService.getJson<{ label: string, value: string }[]>(url);
        const opts = { fields, unwind: [] };
        const decoder = new TextDecoder();
        await this.cinerino.getServices();
        const stream = await this.cinerino.order.download({ ...params, format: factory.encodingFormat.Application.json });
        const reader = await (<ReadableStream<any>>stream).getReader();
        let streamText = '';
        const readChunk = async (chunk: { done: boolean; value: any; }) => {
            if (chunk.done) {
                const data = order2report(JSON.parse(streamText));
                await this.splitDownload('order', data, opts, DownloadService.SPLIT_COUNT);
                return;
            }
            streamText += decoder.decode(chunk.value);
            await readChunk(await reader.read());
        };
        await readChunk(await reader.read());
    }

    /**
     * 予約情報CSVダウンロード
     */
    public async reservation(params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>) {
        const url = '/storage/json/csv/reservation.json';
        const fields = await this.utilService.getJson<{ label: string, value: string }[]>(url);
        const opts = { fields, unwind: [] };
        await this.cinerino.getServices();
        const limit = 100;
        let page = 1;
        let roop = true;
        let reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[] = [];
        while (roop) {
            params.limit = limit;
            params.page = page;
            const searchResult = await this.cinerino.reservation.search<factory.chevre.reservationType.EventReservation>(params);
            reservations = reservations.concat(searchResult.data);
            const lastPage = Math.ceil(searchResult.totalCount / limit);
            page++;
            roop = !(page > lastPage);
        }

        const data: any[] = [];
        reservations.forEach((reservation) => {
            const customData = {
                bookingTime: reservation.bookingTime,
                bookingTimeJST: moment(reservation.bookingTime).format('YYYY/MM/DD/HH:mm'),
                id: reservation.id,
                reservationNumber: reservation.reservationNumber,
                reservationStatus: reservation.reservationStatus,
                price: (typeof reservation.price === 'number' || reservation.price === undefined)
                    ? reservation.price
                    : getTicketPrice(<any>{ priceSpecification: { priceComponent: reservation.price.priceComponent } }).total,
                reservedTicket: reservation.reservedTicket,
                reservationFor: {
                    ...reservation.reservationFor,
                    startDateJST: moment(reservation.reservationFor.startDate).format('YYYY/MM/DD/HH:mm')
                },
                checkedIn: reservation.checkedIn,
                attended: reservation.attended
            };
            data.push(customData);
        });
        await this.splitDownload('reservation', data, opts, DownloadService.SPLIT_COUNT);
    }

    /**
     * 会員情報CSVダウンロード
     */
    public async person(params: {
        limit?: number;
        page?: number;
        id?: string;
        username?: string;
        email?: string;
        telephone?: string;
        givenName?: string;
        familyName?: string;
    }) {
        const url = '/storage/json/csv/person.json';
        const fields = await this.utilService.getJson<{ label: string, value: string }[]>(url);
        const opts = { fields, unwind: [] };
        await this.cinerino.getServices();
        const limit = 100;
        let page = 1;
        let roop = true;
        let persons: factory.person.IPerson[] = [];
        while (roop) {
            params.limit = limit;
            params.page = page;
            const searchResult = await this.cinerino.person.search(params);
            persons = persons.concat(searchResult.data);
            const lastPage = Math.ceil(searchResult.totalCount / limit);
            page++;
            roop = !(page > lastPage);
        }

        const data: any[] = [];
        persons.forEach((person) => {
            const customData = {
                id: person.id,
            };
            data.push(customData);
        });
        await this.splitDownload('person', data, opts, DownloadService.SPLIT_COUNT);
    }

    private async splitDownload(filename: string, data: any, opts: any, split: number) {
        const limit = Math.ceil(data.length / split);
        for (let i = 0; i < limit; i++) {
            const splitData = data.slice(i * split, ((i + 1) * split > data.length) ? data.length : (i + 1) * split);
            const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
            const csv = await json2csv.parseAsync(splitData, opts);
            const blob = new Blob([bom, csv], { 'type': 'text/csv' });
            this.download(blob, `${filename}${(limit > 1) ? `_${(i + 1)}` : ''}.csv`);
        }
    }

    private download(blob: Blob, fileName: string) {
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fileName);
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        }
    }
}
