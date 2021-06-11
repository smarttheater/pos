import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-reservation-table',
    templateUrl: './reservation-table.component.html',
    styleUrls: ['./reservation-table.component.scss'],
})
export class ReservationTableComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public moment = moment;
    public connectionType = Models.Util.Printer.ConnectionType;
    public environment = getEnvironment();
    @Output() public detail = new EventEmitter<
        factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>
    >();
    @Input()
    public reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];

    constructor(private store: Store<reducers.IOrderState>) {}

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
    }
}
