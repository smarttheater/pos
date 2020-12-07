import { Injectable } from '@angular/core';
import { Functions, Models } from '../..';

@Injectable({
    providedIn: 'root'
})
export class EpsonPrinterService {
    private ePOSDevice: any;
    private device: any;

    constructor() { }

    public async init(params: {
        printer: Models.Util.Printer.IPrinter;
        timeout?: number;
    }) {
        this.device = undefined;
        this.ePOSDevice = new (<any>window).epson.ePOSDevice();
        await this.connect(params);
        this.device = (await this.createDevice()).data;
        // this.device.onstatuschange = (status: any) => {
        //     console.log(status);
        // };
    }

    /**
     * 接続
     */
    private async connect(params: {
        printer: Models.Util.Printer.IPrinter;
    }) {
        // 安全でないコンテンツを許可する必要があります
        return new Promise<string>((resolve, reject) => {
            const printer = params.printer;
            if (printer.ipAddress === '') {
                reject(new Error('IP address of the printer is not set'));
                return;
            }
            const url = new URL(`${location.protocol}${printer.ipAddress}`);
            this.ePOSDevice.connect(url.hostname, url.port, (data: string) => {
                if (data === 'OK' || data === 'SSL_CONNECT_OK') {
                    resolve(data);
                    return;
                }
                reject(new Error(data));
            });
        });
    }

    /**
     * 接続終了
     */
    public async disconnect() {
        this.ePOSDevice.disconnect();
    }

    /**
     * デバイス作成
     */
    private createDevice(params?: {
        deviceId: string;
        options: { crypto: boolean; buffer: boolean; }
    }) {
        return new Promise<{ data: any; code: string; }>((resolve, reject) => {
            const deviceId = (params === undefined) ? 'local_printer' : params.deviceId;
            const options = (params === undefined) ? { crypto: (location.protocol === 'https:'), buffer: false } : params.options;
            this.ePOSDevice.createDevice(
                deviceId,
                this.ePOSDevice.DEVICE_TYPE_PRINTER,
                options,
                (data: any, code: string) => {
                    if (data === null) {
                        reject(new Error(code));
                        return;
                    }
                    resolve({ data, code });
                }
            );
        });
    }

    /**
     * 印刷処理
     */
    public async print(params: {
        canvasList: HTMLCanvasElement[];
    }) {
        const canvasList = params.canvasList;
        for (const canvas of canvasList) {
            const mode = 'MODE_MONO';
            const cut = true;
            await Functions.Util.sleep(1500);
            this.device.print(canvas, cut, this.device[mode]);
        }
    }


}
