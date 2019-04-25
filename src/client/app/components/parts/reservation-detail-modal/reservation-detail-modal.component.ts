import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { getTicketPrice } from '../../../functions';

@Component({
    selector: 'app-reservation-detail-modal',
    templateUrl: './reservation-detail-modal.component.html',
    styleUrls: ['./reservation-detail-modal.component.scss']
})
export class ReservationDetailModalComponent implements OnInit {
    @Input() public reservation: factory.chevre.reservation.event.IReservation<factory.chevre.event.screeningEvent.IEvent>;
    public moment: typeof moment = moment;
    public getTicketPrice = getTicketPrice;
    constructor(
        public activeModal: NgbActiveModal,
        private elementRef: ElementRef
    ) { }

    public ngOnInit() {
        const element: HTMLElement = this.elementRef.nativeElement.querySelector('.scroll-vertical');
        setTimeout(() => {
            element.scrollTop = 0;
        }, 0);
    }

}
