import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-customer-condition',
    templateUrl: './customer-condition.component.html',
    styleUrls: ['./customer-condition.component.scss']
})
export class CustomerConditionComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public moment = moment;
    public limit: number;
    public conditions: {
        name: string;
        page: number;
    };
    public environment = getEnvironment();
    public connectionType = Models.Util.Printer.ConnectionType;
    @Output() public changeConditions = new EventEmitter<{
        name: string;
        page: number;
    }>();
    @Input() public name: string;
    @Input() public orderDateValidation?: boolean;
    @Input() public paymentTypes: factory.chevre.categoryCode.ICategoryCode[];

    constructor(
        private store: Store<reducers.IOrderState>,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.clear();
    }

    /**
     * 検索
     */
    public async submit() {
        // iOS bugfix
        Object.keys(this.conditions).forEach(key => {
            if (key === 'name') {
                this.conditions[key] = (<HTMLInputElement>document.getElementById(key)).value;
                return;
            }
        });
        this.changeConditions.emit(this.conditions);
    }

    /**
     * 検索条件クリア
     */
    public clear() {
        this.conditions = {
            name: '',
            page: 1
        };
        // iOS bugfix
        Object.keys(this.conditions).forEach(key => {
            if (document.getElementById(key) === null) {
                return;
            }
            (<HTMLInputElement>document.getElementById(key)).value = '';
        });
    }

}
