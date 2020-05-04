import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { getEnvironment } from '../../../../../../../environments/environment';

@Component({
    selector: 'app-reservation-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class ReservationDetailModalComponent implements OnInit {
    @Input() public reservation: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
    public moment: typeof moment = moment;
    public environment = getEnvironment();

    constructor(
        public modal: BsModalRef,
        private elementRef: ElementRef
    ) { }

    public ngOnInit() {
        const element: HTMLElement = this.elementRef.nativeElement.querySelector('.scroll-vertical');
        setTimeout(() => {
            element.scrollTop = 0;
        }, 0);
    }

}
