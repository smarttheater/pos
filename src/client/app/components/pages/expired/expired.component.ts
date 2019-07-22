import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../services';

@Component({
    selector: 'app-expired',
    templateUrl: './expired.component.html',
    styleUrls: ['./expired.component.scss']
})
export class ExpiredComponent implements OnInit {

    constructor(
        private purchaseService: PurchaseService
    ) { }

    public ngOnInit() {
        this.purchaseService.delete();
    }

}
