import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as json2csv from 'json2csv';
import { Functions } from '..';
import { ActionService } from './action.service';
import { CinerinoService } from './cinerino.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root',
})
export class DownloadService {
    public static SPLIT_COUNT = 50000;

    constructor(
        private cinerino: CinerinoService,
        private utilService: UtilService,
        private actionService: ActionService
    ) {}

    /**
     * 注文情報CSVダウンロード
     */
    public async order(params: factory.order.ISearchConditions) {
        try {
            this.utilService.loadStart({ process: 'load' });
            // カスタム
            const searchResult = await this.actionService.order.splitSearch(
                params
            );
            const path = `/json/csv/order.json`;
            const url = (await Functions.Util.isFile(
                `${Functions.Util.getProject().storageUrl}${path}`
            ))
                ? `${Functions.Util.getProject().storageUrl}${path}`
                : `/default${path}`;
            const fields = await this.utilService.getJson<
                { label: string; value: string }[]
            >(url);
            const opts = { fields, unwind: [] };
            const data = Functions.Order.order2report(searchResult.data);
            const csv = await json2csv.parseAsync(data, opts);
            const blob = Functions.Util.string2blob(csv, { type: 'text/csv' });
            const fileName = 'CustomOrderReport.csv';
            this.download(blob, fileName);
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 予約情報CSVダウンロード
     */
    public async reservation(
        params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>
    ) {
        try {
            this.utilService.loadStart({ process: 'load' });
            const searchResult =
                await this.actionService.reservation.splitSearch(params);
            const path = '/json/csv/reservation.json';
            const url = (await Functions.Util.isFile(
                `${Functions.Util.getProject().storageUrl}${path}`
            ))
                ? `${Functions.Util.getProject().storageUrl}${path}`
                : `/default${path}`;
            const fields = await this.utilService.getJson<
                { label: string; value: string }[]
            >(url);
            const opts = { fields, unwind: [] };
            const data = Functions.Reservation.reservation2report(
                searchResult.data
            );
            const csv = await json2csv.parseAsync(data, opts);
            const blob = Functions.Util.string2blob(csv, { type: 'text/csv' });
            const fileName = 'CustomReservationReport.csv';
            this.download(blob, fileName);
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
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
        const url = `${
            Functions.Util.getProject().storageUrl
        }/json/csv/person.json`;
        const fields = await this.utilService.getJson<
            { label: string; value: string }[]
        >(url);
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
            page++;
            roop = searchResult.data.length === limit;
        }

        const data: any[] = [];
        persons.forEach((person) => {
            const customData = {
                id: person.id,
            };
            data.push(customData);
        });
        await this.splitDownload(
            'person',
            data,
            opts,
            DownloadService.SPLIT_COUNT
        );
    }

    /**
     * ファイル分割ダウンロード
     */
    private async splitDownload(
        filename: string,
        data: any[],
        opts: any,
        split: number
    ) {
        const limit = Math.ceil(data.length / split);
        for (let i = 0; i < limit; i++) {
            const splitData = data.slice(
                i * split,
                (i + 1) * split > data.length ? data.length : (i + 1) * split
            );
            const csv = await json2csv.parseAsync(splitData, opts);
            const blob = Functions.Util.string2blob(csv, { type: 'text/csv' });
            const fileName = `${filename}${limit > 1 ? `_${i + 1}` : ''}.csv`;
            this.download(blob, fileName);
        }
    }

    /**
     * ダウンロード
     */
    public download(blob: Blob, fileName: string) {
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
