import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PurchaseService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    public error: Observable<string | null>;
    constructor(
        private store: Store<reducers.IState>,
        private purchaseService: PurchaseService
    ) { }

    public ngOnInit() {
        this.error = this.store.pipe(select(reducers.getError));
        this.purchaseService.delete();
    }

}
