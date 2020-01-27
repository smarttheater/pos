import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../../environments/environment';
import { IReservationTicket, Reservation } from '../../../../../../models/purchase/reservation';
import { PurchaseService, UtilService } from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';
import { MvtkCheckModalComponent } from '../../../../../shared/components/parts/mvtk/check-modal/check-modal.component';
import {
    PurchaseCinemaTicketModalComponent
} from '../../../../../shared/components/parts/purchase/cinema/ticket-modal/ticket-modal.component';

@Component({
    selector: 'app-purchase-cinema-ticket',
    templateUrl: './purchase-cinema-ticket.component.html',
    styleUrls: ['./purchase-cinema-ticket.component.scss']
})
export class PurchaseCinemaTicketComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private modal: BsModalService,
        private purchaseService: PurchaseService,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
    }

    /**
     * 確定
     */
    public async onSubmit() {
        const purchase = await this.purchaseService.getData();
        const transaction = purchase.transaction;
        const screeningEvent = purchase.screeningEvent;
        const reservations = purchase.reservations;
        if (transaction === undefined
            || screeningEvent === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        const unselectedReservations = reservations.filter((reservation) => {
            return (reservation.ticket === undefined);
        });
        if (unselectedReservations.length > 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.cinema.ticket.alert.unselected')
            });
            return;
        }
        const validResult = reservations.filter((reservation) => {
            const unitPriceSpecification = reservation.getUnitPriceSpecification();
            if (unitPriceSpecification === undefined
                || unitPriceSpecification.typeOf !== factory.chevre.priceSpecificationType.UnitPriceSpecification) {
                return false;
            }
            const filterResult = reservations.filter((targetReservation) => {
                return (reservation.ticket !== undefined
                    && targetReservation.ticket !== undefined
                    && reservation.ticket.ticketOffer.id === targetReservation.ticket.ticketOffer.id);
            });
            const value = (unitPriceSpecification.referenceQuantity.value === undefined)
                ? 1
                : unitPriceSpecification.referenceQuantity.value;

            return (filterResult.length % value !== 0);
        });
        if (validResult.length > 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.cinema.ticket.alert.ticketCondition')
            });
            return;
        }
        try {
            await this.purchaseService.temporaryReservation();
            if (!this.environment.PURCHASE_CART) {
                this.router.navigate(['/purchase/payment']);
                return;
            }
            this.router.navigate(['/purchase/cinema/cart']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 券種一覧表示
     */
    public openTicketList(reservation?: Reservation) {
        this.purchase.subscribe((purchase) => {
            this.modal.show(PurchaseCinemaTicketModalComponent, {
                class: 'modal-dialog-centered',
                initialState: {
                    screeningEventTicketOffers: purchase.screeningEventTicketOffers,
                    checkMovieTicketActions: purchase.checkMovieTicketActions,
                    reservations: purchase.reservations,
                    pendingMovieTickets: purchase.pendingMovieTickets,
                    cb: (ticket: IReservationTicket) => {
                        if (reservation === undefined) {
                            purchase.reservations.forEach(r => r.ticket = ticket);
                            this.purchaseService.selectTickets(purchase.reservations);
                            return;
                        }
                        reservation.ticket = ticket;
                        this.purchaseService.selectTickets([reservation]);
                    }
                },
            });
        }).unsubscribe();
    }

    /**
     * ムビチケ認証表示
     */
    public openMovieTicket() {
        this.modal.show(MvtkCheckModalComponent, {
            class: 'modal-dialog-centered'
        });
    }


}
