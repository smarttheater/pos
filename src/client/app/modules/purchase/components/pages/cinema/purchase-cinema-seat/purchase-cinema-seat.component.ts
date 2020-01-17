import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../../environments/environment';
import { IReservationSeat, SeatStatus } from '../../../../../../models';
import { PurchaseService, UserService, UtilService } from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';

@Component({
    selector: 'app-purchase-cinema-seat',
    templateUrl: './purchase-cinema-seat.component.html',
    styleUrls: ['./purchase-cinema-seat.component.scss']
})
export class PurchaseCinemaSeatComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private utilService: UtilService,
        private userService: UserService,
        private purchaseService: PurchaseService,
        private translate: TranslateService
    ) { }

    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        try {
            const purchase = await this.purchaseService.getData();
            const user = await this.userService.getData();
            const screeningEvent = purchase.screeningEvent;
            const seller = user.seller;
            if (screeningEvent === undefined || seller === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            await this.purchaseService.getScreen({ screeningEvent, test: false });
            await this.purchaseService.getTicketList(seller);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }


    /**
     * selectSeat
     */
    public selectSeat(data: {
        seat: IReservationSeat,
        status: SeatStatus
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
        const seats: IReservationSeat[] = [];
        const purchase = await this.purchaseService.getData();
        const screeningEventOffers = purchase.screeningEventOffers;
        screeningEventOffers.forEach((screeningEventOffer) => {
            screeningEventOffer.containsPlace.forEach((containsPlace) => {
                if (containsPlace.offers === undefined
                    || containsPlace.offers[0].availability !== factory.chevre.itemAvailability.InStock) {
                    return;
                }
                seats.push({
                    typeOf: containsPlace.typeOf,
                    seatingType: (containsPlace.seatingType === undefined)
                        ? <any>'' : containsPlace.seatingType,
                    seatNumber: containsPlace.branchCode,
                    seatRow: '',
                    seatSection: screeningEventOffer.branchCode
                });
            });
        });
        if (purchase.authorizeSeatReservation !== undefined
            && purchase.authorizeSeatReservation.instrument !== undefined) {
            if (purchase.authorizeSeatReservation.instrument.identifier === factory.service.webAPI.Identifier.Chevre) {
                // chevre
                purchase.authorizeSeatReservation.object.acceptedOffer.forEach((offer) => {
                    const chevreOffer = <factory.action.authorize.offer.seatReservation.IAcceptedOffer4chevre>offer;
                    if (chevreOffer.ticketedSeat === undefined) {
                        return;
                    }
                    seats.push(chevreOffer.ticketedSeat);
                });
            }
        }
        this.purchaseService.selectSeats(seats);
    }

    /**
     * 全席選択解除
     */
    public async resetSeats() {
        const seats: IReservationSeat[] = [];
        const purchase = await this.purchaseService.getData();
        purchase.reservations.forEach((reservation) => {
            seats.push(reservation.seat);
        });
        this.purchaseService.cancelSeats(seats);
    }

    /**
     * onSubmit
     */
    public async onSubmit() {
        const purchase = await this.purchaseService.getData();
        if (purchase.reservations.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.cinema.seat.alert.unselected')
            });
            return;
        }
        if (purchase.reservations.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.cinema.seat.alert.limit',
                    { value: this.environment.PURCHASE_ITEM_MAX_LENGTH }
                )
            });
            return;
        }
        try {
            await this.purchaseService.temporaryReservation();
            this.router.navigate(['/purchase/cinema/ticket']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }
}
