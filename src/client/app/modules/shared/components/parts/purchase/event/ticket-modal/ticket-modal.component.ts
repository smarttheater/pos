import { Component, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap';
import { getEnvironment } from '../../../../../../../../environments/environment';
import { getItemPrice, getItemReferenceQuantityValue, getRemainingSeatLength } from '../../../../../../../functions';
import { IReservationTicket, Performance } from '../../../../../../../models';

type IMovieTicketTypeChargeSpecification =
    factory.chevre.priceSpecification.IPriceSpecification<factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification>;

@Component({
    selector: 'app-purchase-event-ticket-modal',
    templateUrl: './ticket-modal.component.html',
    styleUrls: ['./ticket-modal.component.scss']
})
export class PurchaseEventTicketModalComponent implements OnInit {

    @Input() public screeningEventTicketOffers: factory.chevre.event.screeningEvent.ITicketOffer[];
    @Input() public screeningEventOffers: factory.chevre.place.movieTheater.IScreeningRoomSectionOffer[];
    @Input() public screeningEvent: factory.event.screeningEvent.IEvent;
    @Input() public cb: (reservationTickets: IReservationTicket[]) => void;
    public tickets: factory.chevre.event.screeningEvent.ITicketOffer[];
    public getItemPrice = getItemPrice;
    public getItemReferenceQuantityValue = getItemReferenceQuantityValue;
    public values: Number[];
    public selectedTickets: { [key: string]: string; };
    public moment: typeof moment = moment;
    public getRemainingSeatLength = getRemainingSeatLength;
    public performance: Performance;
    public environment = getEnvironment();

    constructor(
        public modal: BsModalRef
    ) { }

    /**
     * 初期化
     */
    public ngOnInit() {
        this.performance = new Performance(this.screeningEvent);
        this.tickets = [];
        this.tickets = this.screeningEventTicketOffers.filter((ticketOffer) => {
            const movieTicketTypeChargeSpecification =
                <IMovieTicketTypeChargeSpecification>ticketOffer.priceSpecification.priceComponent.find(
                    (c) => c.typeOf === factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification
                );
            return movieTicketTypeChargeSpecification === undefined;
        });
        this.values = [];
        let limit = Number(this.environment.PURCHASE_ITEM_MAX_LENGTH);
        if (new Performance(this.screeningEvent).isTicketedSeat()) {
            const remainingSeatLength = this.getRemainingSeatLength(this.screeningEventOffers, this.screeningEvent);
            limit = (limit > remainingSeatLength) ? remainingSeatLength : limit;
        }
        for (let i = 0; i < limit; i++) {
            this.values.push(i + 1);
        }
        const selectedTickets: { [key: string]: string; } = {};
        this.tickets.forEach((ticket) => {
            selectedTickets[ticket.id] = '0';
        });
        this.selectedTickets = selectedTickets;
    }

    /**
     * 閉じる
     */
    public close() {
        this.modal.hide();
        const reservationTickets = this.createReservationTickets();
        this.cb(reservationTickets);
    }

    /**
     * 予約チケット作成
     */
    public createReservationTickets() {
        const reservationTickets: IReservationTicket[] = [];
        Object.keys(this.selectedTickets).forEach((key) => {
            const value = Number(this.selectedTickets[key]);
            for (let i = 0; i < value; i++) {
                const findResult = this.screeningEventTicketOffers.find(s => s.id === key);
                if (findResult === undefined) {
                    break;
                }
                reservationTickets.push({ ticketOffer: findResult });
            }
        });

        return reservationTickets;
    }

}
