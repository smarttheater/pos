import { Component, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap';
import { getEnvironment } from '../../../../../../../../environments/environment';
import { getRemainingSeatLength } from '../../../../../../../functions';
import { IReservation, IReservationSeat, Performance, SeatStatus } from '../../../../../../../models';

type IMovieTicketTypeChargeSpecification =
    factory.chevre.priceSpecification.IPriceSpecification<factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification>;


@Component({
    selector: 'app-purchase-event-seat-modal',
    templateUrl: './seat-modal.component.html',
    styleUrls: ['./seat-modal.component.scss']
})
export class PurchaseEventSeatModalComponent implements OnInit {
    @Input() public theater: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
    @Input() public screeningEventTicketOffers: factory.chevre.event.screeningEvent.ITicketOffer[];
    @Input() public screeningEventSeats: factory.chevre.place.seat.IPlaceWithOffer[];
    @Input() public screeningEvent: factory.event.screeningEvent.IEvent;
    @Input() public screen: factory.chevre.place.screeningRoom.IPlace;
    @Input() public cb: (params: {
        reservations: IReservation[];
    }) => void;
    public reservations: IReservation[];
    public tickets: factory.chevre.event.screeningEvent.ITicketOffer[];
    public selectedTickets: {
        id: string;
        count: number;
        addOn: { id: string; }[];
    }[];
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
        this.reservations = [];
        // if (this.reservations[0].seat !== undefined) {
        //     this.reservations[0].seat.seatNumber
        // }
        this.performance = new Performance(this.screeningEvent);
        this.tickets = this.screeningEventTicketOffers.filter((ticketOffer) => {
            const movieTicketTypeChargeSpecification =
                <IMovieTicketTypeChargeSpecification>ticketOffer.priceSpecification.priceComponent.find(
                    (c) => c.typeOf === factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification
                );
            return movieTicketTypeChargeSpecification === undefined;
        });
        const selectedTickets: {
            id: string;
            count: number;
            addOn: { id: string; }[];
        }[] = [];
        this.tickets.forEach((ticket) => {
            if (ticket.id === undefined) {
                return;
            }
            selectedTickets.push({ id: ticket.id, count: 0, addOn: [] });
        });
        this.selectedTickets = selectedTickets;
    }

    /**
     * 予約可能数計算
     */
    public remainingAttendeeCapacityValue(screeningEventTicketOffer: factory.chevre.event.screeningEvent.ITicketOffer) {
        const values = [];
        const screeningEvent = this.screeningEvent;
        const screeningEventSeats = this.screeningEventSeats;
        let limit = Number(this.environment.PURCHASE_ITEM_MAX_LENGTH);
        if (screeningEvent.remainingAttendeeCapacity !== undefined
            && limit > screeningEvent.remainingAttendeeCapacity) {
            limit = screeningEvent.remainingAttendeeCapacity;
        }
        if (new Performance(screeningEvent).isTicketedSeat()) {
            // イベント全体の残席数計算
            const screeningEventLimit = getRemainingSeatLength({
                screeningEvent,
                screeningEventSeats
            });
            if (limit > screeningEventLimit) {
                limit = screeningEventLimit;
            }
            // 券種ごとの残席数で計算
            if (screeningEvent.aggregateOffer !== undefined
                && screeningEvent.aggregateOffer.offers !== undefined) {
                const findResult =
                    screeningEvent.aggregateOffer.offers.find(o => o.id === screeningEventTicketOffer.id);
                if (findResult !== undefined
                    && findResult.remainingAttendeeCapacity !== undefined
                    && limit > findResult.remainingAttendeeCapacity) {
                    limit = findResult.remainingAttendeeCapacity;
                }
            }
        }
        for (let i = 0; i < limit; i++) {
            values.push(i + 1);
        }
        return values;
    }

    /**
     * 閉じる
     */
    public close() {
        this.modal.hide();
    }

    /**
     * 座席選択
     */
    public selectSeat(data: { seat: IReservationSeat, status: SeatStatus }) {
        const status = data.status;
        const seat = data.seat;
        if (status === SeatStatus.Default) {
            this.reservations.push({ seat });
            return;
        }
        const reservations: IReservation[] = [];
        this.reservations.forEach((r) => {
            if (r.seat !== undefined
                && r.seat.seatNumber === seat.seatNumber
                && r.seat.seatSection === seat.seatSection) {
                return;
            }
            reservations.push(r);
        });
        this.reservations = reservations;
    }

}
