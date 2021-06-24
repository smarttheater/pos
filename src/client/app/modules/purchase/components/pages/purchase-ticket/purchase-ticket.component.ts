import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import {
    IReservation,
    IReservationTicket,
} from '../../../../../models/purchase/reservation';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { MovieTicketCheckModalComponent } from '../../../../shared/components/parts/movie-ticket/check-modal/check-modal.component';
import { PurchaseSeatTicketModalComponent } from '../../../../shared/components/parts/purchase/seat-ticket-modal/seat-ticket-modal.component';

@Component({
    selector: 'app-purchase-ticket',
    template: '',
})
export class PurchaseTicketComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public additionalTicketText: string;
    public environment = getEnvironment();
    public translateName: string;
    public isSelectedTicket: boolean;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private modal: BsModalService,
        private actionService: ActionService,
        private utilService: UtilService,
        private translate: TranslateService
    ) {}

    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.translateName =
            this.environment.VIEW_TYPE === 'cinema'
                ? 'purchase.cinema.ticket'
                : 'purchase.event.ticket';
        this.additionalTicketText = '';
        this.isSelectedTicket =
            (await this.getUnselectedTicketReservations()).length === 0;
    }

    /**
     * 券種未選択の予約取得
     */
    public async getUnselectedTicketReservations() {
        const { reservations } = await this.actionService.purchase.getData();
        return reservations.filter((reservation) => {
            return reservation.ticket === undefined;
        });
    }

    /**
     * 確定
     */
    public async onSubmit() {
        const { reservations, customer } =
            await this.actionService.purchase.getData();
        const validResult = reservations.filter((reservation) => {
            if (reservation.ticket === undefined) {
                return false;
            }
            const priceComponent =
                reservation.ticket.ticketOffer.priceSpecification
                    .priceComponent;
            const UnitPriceSpecification =
                factory.chevre.priceSpecificationType.UnitPriceSpecification;
            const unitPriceSpecifications = priceComponent.filter(
                (p) => p.typeOf === UnitPriceSpecification
            );
            const filterResult = reservations.filter((targetReservation) => {
                return (
                    reservation.ticket !== undefined &&
                    targetReservation.ticket !== undefined &&
                    reservation.ticket.ticketOffer.id ===
                        targetReservation.ticket.ticketOffer.id
                );
            });
            const findResult = unitPriceSpecifications.find(
                (unitPriceSpecification) => {
                    const value =
                        unitPriceSpecification.typeOf ===
                            UnitPriceSpecification &&
                        unitPriceSpecification.referenceQuantity.value !==
                            undefined
                            ? unitPriceSpecification.referenceQuantity.value
                            : 1;

                    return filterResult.length % value !== 0;
                }
            );

            return findResult !== undefined;
        });
        if (validResult.length > 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    `${this.translateName}.alert.ticketCondition`
                ),
            });
            return;
        }
        try {
            const additionalTicketText = this.additionalTicketText;
            const screeningEventSeats =
                await this.actionService.purchase.getScreeningEventSeats();
            await this.actionService.purchase.authorizeSeatReservation({
                reservations,
                additionalTicketText,
                screeningEventSeats,
            });
            if (
                customer !== undefined &&
                this.environment.VIEW_TYPE === Models.Util.ViewType.Cinema
            ) {
                this.router.navigate(['/purchase/input']);
                return;
            }
            const navigate =
                this.environment.VIEW_TYPE === 'cinema'
                    ? '/purchase/confirm'
                    : '/purchase/event/schedule';
            this.router.navigate([navigate]);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant(
                    `${this.translateName}.alert.temporaryReservation`
                )}</p>
                <div class="p-3 bg-light-gray select-text text-left">
                    <code>${
                        JSON.stringify(error) === '{}'
                            ? error
                            : JSON.stringify(error)
                    }</code>
                </div>`,
            });
        }
    }

    /**
     * 券種一覧表示
     */
    public async openTicketList(reservation?: IReservation) {
        const purchase = await this.actionService.purchase.getData();
        this.modal.show(PurchaseSeatTicketModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: {
                authorizeSeatReservation: purchase.authorizeSeatReservation,
                screeningEventTicketOffers: purchase.screeningEventTicketOffers,
                checkMovieTicketActions: purchase.checkMovieTicketActions,
                reservations: purchase.reservations,
                reservation: reservation,
                pendingMovieTickets: purchase.pendingMovieTickets,
                cb: async (ticket: IReservationTicket) => {
                    if (reservation === undefined) {
                        const reservations = Functions.Util.deepCopy<
                            IReservation[]
                        >(purchase.reservations);
                        reservations.forEach((r) => (r.ticket = ticket));
                        this.actionService.purchase.selectTickets(reservations);
                        this.isSelectedTicket =
                            (await this.getUnselectedTicketReservations())
                                .length === 0;
                        return;
                    }
                    this.actionService.purchase.selectTickets([
                        { ...reservation, ticket },
                    ]);
                    this.isSelectedTicket =
                        (await this.getUnselectedTicketReservations())
                            .length === 0;
                },
            },
        });
    }

    /**
     * ムビチケ認証表示
     */
    public openMovieTicket(
        paymentMethodType: factory.chevre.paymentMethodType
    ) {
        this.modal.show(MovieTicketCheckModalComponent, {
            initialState: {
                paymentMethodType,
            },
            class: 'modal-dialog-centered',
        });
    }
}
