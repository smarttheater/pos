import { Injectable } from '@angular/core';
import { EpsonPrinterService } from './epson/epson-printer.service';

@Injectable({
    providedIn: 'root'
})
export class EpsonEPOSService {
    constructor(
        public printer: EpsonPrinterService,
    ) { }

}
