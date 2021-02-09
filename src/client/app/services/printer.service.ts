import { Injectable } from '@angular/core';
import { EpsonPrinterService } from './printer/epson/epson-printer.service';
import { StarPrintService } from './printer/star/star-print.service';

@Injectable({
    providedIn: 'root'
})
export class PrinterService {

    constructor(
        public epson: EpsonPrinterService,
        public star: StarPrintService,
    ) { }
}
