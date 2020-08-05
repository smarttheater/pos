import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { SeatStatus } from '../../../../../models/purchase/screen';
import { PurchaseService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-seat',
    template: ''
})
export class PurchaseSeatComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public environment = getEnvironment();
    public screeningEventSeats: factory.chevre.place.seat.IPlaceWithOffer[];
    public translateName: string;

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private translate: TranslateService,
        protected router: Router,
        protected purchaseService: PurchaseService
    ) { }

    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.translateName = (this.environment.VIEW_TYPE === 'cinema')
            ? 'purchase.cinema.seat' : 'purchase.event.seat';
        this.screeningEventSeats = [];
        try {
            const purchase = await this.purchaseService.getData();
            const screeningEvent = purchase.screeningEvent;
            const seller = purchase.seller;
            if (screeningEvent === undefined || seller === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const reservations = purchase.reservations;
            await this.resetSeats();
            reservations.forEach(r => {
                if (r.seat === undefined) {
                    return;
                }
                this.selectSeat({ seat: r.seat, status: Models.Purchase.Screen.SeatStatus.Default });
            });
            await this.purchaseService.getScreen({
                branchCode: { $eq: screeningEvent.location.branchCode },
                containedInPlace: {
                    branchCode: { $eq: screeningEvent.superEvent.location.branchCode }
                }
            });
            this.screeningEventSeats = await this.purchaseService.getScreeningEventSeats();
            await this.purchaseService.getTicketList({ seller });
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }


    /**
     * 座席選択
     */
    public selectSeat(data: {
        seat: Models.Purchase.Reservation.IReservationSeat,
        status: Models.Purchase.Screen.SeatStatus
    }) {
        if (data.status === SeatStatus.Default) {
            this.purchaseService.selectSeats([data.seat]);
        } else {
            this.purchaseService.cancelSeats([data.seat]);
        }
    }

    /**
     * 全席選択
     */
    public async allSelectSeats() {
        const seats: Models.Purchase.Reservation.IReservationSeat[] = [];
        const purchase = await this.purchaseService.getData();
        const screeningEventSeats = this.screeningEventSeats;
        screeningEventSeats.forEach((s) => {
            if (s.offers === undefined
                || s.offers[0].availability !== factory.chevre.itemAvailability.InStock
                || s.containedInPlace === undefined) {
                return;
            }
            seats.push({
                typeOf: s.typeOf,
                seatingType: (s.seatingType === undefined)
                    ? '' : s.seatingType,
                seatNumber: s.branchCode,
                seatRow: '',
                seatSection: (s.containedInPlace.branchCode === undefined) ? '' : s.containedInPlace.branchCode,
                offers: s.offers
            });
        });
        if (purchase.authorizeSeatReservation !== undefined
            && purchase.authorizeSeatReservation.result !== undefined
            && purchase.authorizeSeatReservation.result.responseBody.object.reservations !== undefined) {
            purchase.authorizeSeatReservation.result.responseBody.object.reservations.forEach((r) => {
                if (r.reservedTicket.ticketedSeat === undefined) {
                    return;
                }
                seats.push(r.reservedTicket.ticketedSeat);
            });
        }
        this.purchaseService.selectSeats(seats);
    }

    /**
     * 全席選択解除
     */
    public async resetSeats() {
        const seats: Models.Purchase.Reservation.IReservationSeat[] = [];
        const purchase = await this.purchaseService.getData();
        purchase.reservations.forEach((reservation) => {
            if (reservation.seat === undefined) {
                return;
            }
            seats.push(reservation.seat);
        });
        this.purchaseService.cancelSeats(seats);
    }

    /**
     * 自由席予約可能数計算
     */
    public remainingAttendeeCapacityValue(params: {
        screeningEventSeats: factory.chevre.place.seat.IPlaceWithOffer[];
        screeningEvent: factory.chevre.event.screeningEvent.IEvent;
        authorizeSeatReservations: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>[];
    }) {
        const screeningEventSeats = params.screeningEventSeats;
        const screeningEvent = params.screeningEvent;
        const values: number[] = [];
        if (screeningEvent === undefined) {
            return values;
        }
        let limit = Number(this.environment.PURCHASE_ITEM_MAX_LENGTH);
        if (new Models.Purchase.Performance(screeningEvent).isTicketedSeat()) {
            // イベント全体の残席数計算
            const screeningEventLimit = Functions.Purchase.getRemainingSeatLength({
                screeningEventSeats, screeningEvent
            });
            if (limit > screeningEventLimit) {
                limit = screeningEventLimit;
            }
        }
        for (let i = 0; i < limit; i++) {
            values.push(i + 1);
        }
        return values;
    }

    /**
     * 自由席選択
     */
    public async selectOpenSeating(event: Event) {
        if (event.target === null) {
            return;
        }
        const purchaseData = await this.purchaseService.getData();
        const value = Number((<HTMLSelectElement>event.target).value);
        const reservations = purchaseData.reservations;
        const screeningEventSeats = this.screeningEventSeats;
        const seats = Functions.Purchase.getEmptySeat({ reservations, screeningEventSeats });
        await this.resetSeats();
        const selectSeats: Models.Purchase.Reservation.IReservationSeat[] = [];
        for (let i = 0; i < value; i++) {
            selectSeats.push(seats[i]);
        }
        this.purchaseService.selectSeats(selectSeats);
    }

    /**
     * onSubmit
     */
    public async onSubmit() {
        const purchase = await this.purchaseService.getData();
        const reservations = purchase.reservations;
        const screeningEventTicketOffers = purchase.screeningEventTicketOffers;
        if (reservations.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(`${this.translateName}.alert.unselected`)
            });
            return;
        }
        if (reservations.length > Number(this.environment.PURCHASE_ITEM_MAX_LENGTH)) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    `${this.translateName}.alert.limit`,
                    { value: this.environment.PURCHASE_ITEM_MAX_LENGTH }
                )
            });
            return;
        }
        if (screeningEventTicketOffers.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(`${this.translateName}.alert.ticketNotfound`)
            });
            return;
        }
        try {
            await this.purchaseService.temporaryReservation({
                reservations,
                screeningEventSeats: this.screeningEventSeats
            });
            const navigate = (this.environment.VIEW_TYPE === 'cinema')
                ? '/purchase/cinema/ticket'
                : '/purchase/event/seat/ticket';
            this.router.navigate([navigate]);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `<p class="mb-4">${this.translate.instant(`${this.translateName}.alert.temporaryReservation`)}</p>
                <div class="p-3 bg-light-gray select-text">
                <code>${error}</code>
            </div>`});
        }
    }
}
