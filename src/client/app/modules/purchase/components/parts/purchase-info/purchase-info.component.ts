import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { getItemPrice, getItemReferenceQuantityValue } from '../../../../../functions';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-info',
    templateUrl: './purchase-info.component.html',
    styleUrls: ['./purchase-info.component.scss']
})
export class PurchaseInfoComponent implements OnInit {
    @Input() public purchase: reducers.IPurchaseState;
    public moment: typeof moment = moment;
    public getItemPrice = getItemPrice;
    public getItemReferenceQuantityValue = getItemReferenceQuantityValue;

    constructor() { }

    public ngOnInit() {
    }

}
