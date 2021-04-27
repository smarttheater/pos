import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-customer-table',
    templateUrl: './customer-table.component.html',
    styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public moment = moment;
    public connectionType = Models.Util.Printer.ConnectionType;
    public environment = getEnvironment();
    @Output() public purchase = new EventEmitter<factory.chevre.organization.IOrganization>();
    @Input() public customers: factory.chevre.organization.IOrganization[];
    constructor(
        private store: Store<reducers.IOrderState>,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
    }

}
