import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public moment = moment;
    public orderStatus = factory.orderStatus;
    public connectionType = Models.Util.Printer.ConnectionType;
    public environment = getEnvironment();
    public order2EventOrders = Functions.Purchase.order2EventOrders;
    @Output() public select = new EventEmitter<factory.order.IOrder>();
    @Output() public detail = new EventEmitter<factory.order.IOrder>();
    @Output() public print = new EventEmitter<factory.order.IOrder[]>();
    @Output() public receipt = new EventEmitter<factory.order.IOrder[]>();
    @Output() public return = new EventEmitter<factory.order.IOrder[]>();
    @Input() public orders: factory.order.IOrder[];
    @Input() public selectedOrders: factory.order.IOrder[];

    constructor(
        private store: Store<reducers.IOrderState>,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
    }

    public isSelected(order: factory.order.IOrder) {
        const findResult = this.selectedOrders.find(o => o.orderNumber === order.orderNumber);
        return findResult !== undefined;
    }

}
