import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { map, mergeMap } from 'rxjs/operators';
import { getEnvironment } from '../../../environments/environment';
import {
    authorizeSeatReservation2Event,
    createMovieTicketsFromAuthorizeSeatReservation,
    formatTelephone,
    getItemPrice,
    getProject,
    getTicketPrice,
    isFile,
    selectAvailableSeat
} from '../../functions';
import { Performance } from '../../models';
import { CinerinoService, UtilService } from '../../services';
import { purchaseAction } from '../actions';

/**
 * Purchase Effects
 */
@Injectable()
export class PurchaseEffects {

    constructor(
        private actions: Actions,
        private cinerinoService: CinerinoService,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    /**
     * GetSeller
     */
    @Effect()
    public getSeller = this.actions.pipe(
        ofType(purchaseAction.getSeller),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                const id = payload.id;
                const seller = await this.cinerinoService.seller.findById({ id });
                return purchaseAction.getSellerSuccess({ seller });
            } catch (error) {
                return purchaseAction.getSellerFail({ error: error });
            }
        })
    );

    /**
     * StartTransaction
     */
    @Effect()
    public startTransaction = this.actions.pipe(
        ofType(purchaseAction.startTransaction),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                const params = payload;
                const selleId = params.seller.id;
                await this.cinerinoService.getServices();
                const passport = await this.cinerinoService.getPassport(selleId);
                params.object = { passport };
                const transaction = await this.cinerinoService.transaction.placeOrder.start(params);
                return purchaseAction.startTransactionSuccess({ transaction });
            } catch (error) {
                return purchaseAction.startTransactionFail({ error: error });
            }
        })
    );

    /**
     * CancelTransaction
     */
    @Effect()
    public cancelTransaction = this.actions.pipe(
        ofType(purchaseAction.cancelTransaction),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                const transaction = payload.transaction;
                await this.cinerinoService.getServices();
                await this.cinerinoService.transaction.placeOrder.cancel({ id: transaction.id });
                return purchaseAction.cancelTransactionSuccess();
            } catch (error) {
                return purchaseAction.cancelTransactionFail({ error: error });
            }
        })
    );

    /**
     * getScreen
     */
    @Effect()
    public getScreen = this.actions.pipe(
        ofType(purchaseAction.getScreen),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                const searchResult = (await this.cinerinoService.place.searchScreeningRooms(payload)).data;
                return purchaseAction.getScreenSuccess({ screen: searchResult[0] });
            } catch (error) {
                return purchaseAction.getScreenFail({ error: error });
            }
        })
    );

    /**
     * GetScreeningEvent
     */
    @Effect()
    public getScreeningEvent = this.actions.pipe(
        ofType(purchaseAction.getScreeningEvent),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                const screeningEvent =
                    await this.cinerinoService.event.findById<factory.chevre.eventType.ScreeningEvent>({ id: payload.screeningEvent.id });
                const searchMovie = (await this.cinerinoService.creativeWork.searchMovies({
                    identifier: (screeningEvent.workPerformed === undefined)
                        ? undefined : screeningEvent.workPerformed.identifier
                })).data[0];
                if (screeningEvent.workPerformed !== undefined) {
                    screeningEvent.workPerformed.additionalProperty = searchMovie.additionalProperty;
                }
                return purchaseAction.getScreeningEventSuccess({ screeningEvent });
            } catch (error) {
                return purchaseAction.getScreeningEventFail({ error: error });
            }
        })
    );

    /**
     * temporaryReservation
     */
    @Effect()
    public temporaryReservation = this.actions.pipe(
        ofType(purchaseAction.temporaryReservation),
        map(action => action),
        mergeMap(async (payload) => {
            const transaction = payload.transaction;
            const screeningEvent = payload.screeningEvent;
            const reservations = payload.reservations;
            const screeningEventSeats = payload.screeningEventSeats;
            const additionalTicketText = payload.additionalTicketText;
            try {
                await this.cinerinoService.getServices();
                if (payload.authorizeSeatReservation !== undefined) {
                    await this.cinerinoService.transaction.placeOrder
                        .voidSeatReservation(payload.authorizeSeatReservation);
                }
                const availableSeats = selectAvailableSeat({ reservations, screeningEventSeats });
                if (new Performance(screeningEvent).isTicketedSeat()
                    && availableSeats.length !== reservations.length) {
                    throw new Error('Out of stock').message;
                }
                const authorizeSeatReservation =
                    <factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>>
                    await this.cinerinoService.transaction.placeOrder.authorizeSeatReservation({
                        object: {
                            event: { id: screeningEvent.id },
                            acceptedOffer: reservations.map((r, index) => {
                                if (r.ticket === undefined || r.ticket.ticketOffer.id === undefined) {
                                    throw new Error('ticket or ticket.ticketOffer.id is undefined').message;
                                }
                                return {
                                    id: r.ticket.ticketOffer.id,
                                    addOn: (r.ticket.addOn === undefined)
                                        ? undefined
                                        : r.ticket.addOn.filter(a => a.id !== undefined).map(a => ({ id: <string>a.id })),
                                    additionalProperty: [],
                                    itemOffered: {
                                        serviceOutput: {
                                            typeOf: factory.chevre.reservationType.EventReservation,
                                            additionalProperty: (screeningEvent.workPerformed === undefined
                                                || screeningEvent.workPerformed.additionalProperty === undefined)
                                                ? [] : [...screeningEvent.workPerformed.additionalProperty],
                                            additionalTicketText: additionalTicketText,
                                            reservedTicket: {
                                                typeOf: 'Ticket',
                                                ticketedSeat: (new Performance(screeningEvent).isTicketedSeat())
                                                    ? availableSeats[index] : undefined,
                                            },
                                            subReservation: (new Performance(screeningEvent).isTicketedSeat())
                                                ? availableSeats[index].subReservations.map(s => {
                                                    return {
                                                        reservedTicket: { typeOf: 'Ticket', ticketedSeat: s }
                                                    };
                                                })
                                                : undefined
                                        }
                                    }
                                };
                            })
                        },
                        purpose: transaction
                    });
                return purchaseAction.temporaryReservationSuccess({
                    addAuthorizeSeatReservation: authorizeSeatReservation,
                    removeAuthorizeSeatReservation: payload.authorizeSeatReservation
                });
            } catch (error) {
                return purchaseAction.temporaryReservationFail({ error: error });
            }
        })
    );

    /**
     * cancelTemporaryReservations
     */
    @Effect()
    public cancelTemporaryReservations = this.actions.pipe(
        ofType(purchaseAction.cancelTemporaryReservations),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                const authorizeSeatReservations = payload.authorizeSeatReservations;
                await this.cinerinoService.getServices();
                for (const authorizeSeatReservation of authorizeSeatReservations) {
                    await this.cinerinoService.transaction.placeOrder.voidSeatReservation(authorizeSeatReservation);
                }

                return purchaseAction.cancelTemporaryReservationsSuccess({ authorizeSeatReservations });
            } catch (error) {
                return purchaseAction.cancelTemporaryReservationsFail({ error: error });
            }
        })
    );


    /**
     * getTicketList
     */
    @Effect()
    public getTicketList = this.actions.pipe(
        ofType(purchaseAction.getTicketList),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                const clientId = this.cinerinoService.auth.options.clientId;
                const screeningEvent = payload.screeningEvent;
                const seller = payload.seller;
                const screeningEventTicketOffers = await this.cinerinoService.event.searchTicketOffers({
                    event: { id: screeningEvent.id },
                    seller: { typeOf: seller.typeOf, id: seller.id },
                    store: { id: clientId }
                });

                return purchaseAction.getTicketListSuccess({ screeningEventTicketOffers });
            } catch (error) {
                return purchaseAction.getTicketListFail({ error: error });
            }
        })
    );

    /**
     * registerContact
     */
    @Effect()
    public registerContact = this.actions.pipe(
        ofType(purchaseAction.registerContact),
        map(action => action),
        mergeMap(async (payload) => {
            const transaction = payload.transaction;
            const profile = payload.contact;
            if (profile.telephone !== undefined) {
                profile.telephone = formatTelephone(profile.telephone);
            }
            try {
                await this.cinerinoService.getServices();
                await this.cinerinoService.transaction.placeOrder.setProfile({
                    id: transaction.id,
                    agent: profile
                });
                return purchaseAction.registerContactSuccess({ profile });
            } catch (error) {
                return purchaseAction.registerContactFail({ error: error });
            }
        })
    );

    /**
     * authorizeMovieTicket
     */
    @Effect()
    public authorizeMovieTicket = this.actions.pipe(
        ofType(purchaseAction.authorizeMovieTicket),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                if (payload.authorizeMovieTicketPayments.length > 0) {
                    for (const authorizeMovieTicketPayment of payload.authorizeMovieTicketPayments) {
                        await this.cinerinoService.payment.voidTransaction(authorizeMovieTicketPayment);
                    }
                }
                const transaction = payload.transaction;
                const pendingMovieTickets = payload.pendingMovieTickets;
                const authorizeSeatReservations = payload.authorizeSeatReservations;
                const authorizeMovieTicketPayments: factory.action.authorize.paymentMethod.movieTicket.IAction[] = [];
                const seller = payload.seller;
                for (const authorizeSeatReservation of authorizeSeatReservations) {
                    const movieTickets = createMovieTicketsFromAuthorizeSeatReservation({
                        authorizeSeatReservation, pendingMovieTickets, seller
                    });
                    const movieTicketIdentifiers: {
                        identifier: string;
                        movieTickets: factory.paymentMethod.paymentCard.movieTicket.IMovieTicket[]
                    }[] = [];
                    movieTickets.forEach((movieTicket) => {
                        const findResult = movieTicketIdentifiers.find((movieTicketIdentifier) => {
                            return (movieTicketIdentifier.identifier === movieTicket.identifier);
                        });
                        if (findResult === undefined) {
                            movieTicketIdentifiers.push({
                                identifier: movieTicket.identifier, movieTickets: [movieTicket]
                            });
                            return;
                        }
                        findResult.movieTickets.push(movieTicket);
                    });
                    for (const movieTicketIdentifier of movieTicketIdentifiers) {
                        const authorizeMovieTicketPaymentResult =
                            await this.cinerinoService.payment.authorizeMovieTicket({
                                object: {
                                    typeOf: factory.paymentMethodType.MovieTicket,
                                    amount: 0,
                                    movieTickets: movieTicketIdentifier.movieTickets
                                },
                                purpose: transaction
                            });
                        authorizeMovieTicketPayments.push(authorizeMovieTicketPaymentResult);
                    }
                }

                return purchaseAction.authorizeMovieTicketSuccess({ authorizeMovieTicketPayments });
            } catch (error) {
                return purchaseAction.authorizeMovieTicketFail({ error: error });
            }
        })
    );
    /**
     * checkMovieTicket
     */
    @Effect()
    public checkMovieTicket = this.actions.pipe(
        ofType(purchaseAction.checkMovieTicket),
        map(action => action),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                const screeningEvent = payload.screeningEvent;
                const movieTickets = payload.movieTickets;
                const checkMovieTicketAction = await this.cinerinoService.payment.checkMovieTicket({
                    typeOf: factory.paymentMethodType.MovieTicket,
                    movieTickets: movieTickets.map((movieTicket) => {
                        return {
                            ...movieTicket,
                            serviceType: '', // 情報空でよし
                            serviceOutput: {
                                reservationFor: {
                                    typeOf: screeningEvent.typeOf,
                                    id: screeningEvent.id
                                },
                                reservedTicket: {
                                    ticketedSeat: {
                                        typeOf: factory.chevre.placeType.Seat,
                                        seatingType: <any>'', // 情報空でよし
                                        seatNumber: '', // 情報空でよし
                                        seatRow: '', // 情報空でよし
                                        seatSection: '' // 情報空でよし
                                    }
                                }
                            }
                        };
                    }),
                    seller: {
                        typeOf: payload.transaction.seller.typeOf,
                        id: payload.transaction.seller.id
                    }
                });

                return purchaseAction.checkMovieTicketSuccess({ checkMovieTicketAction });
            } catch (error) {
                return purchaseAction.checkMovieTicketFail({ error: error });
            }
        })
    );

    /**
     * EndTransaction
     */
    @Effect()
    public endTransaction = this.actions.pipe(
        ofType(purchaseAction.endTransaction),
        map(action => action),
        mergeMap(async (payload) => {
            const transaction = payload.transaction;
            const authorizeSeatReservations = payload.authorizeSeatReservations;
            const seller = payload.seller;
            try {
                await this.cinerinoService.getServices();
                const environment = getEnvironment();
                const params: factory.transaction.placeOrder.IConfirmParams & {
                    sendEmailMessage?: boolean;
                    email?: factory.creativeWork.message.email.ICustomization;
                } = {
                    id: transaction.id,
                    sendEmailMessage: true,
                    email: {
                        sender: {
                            name: (this.translate.instant('email.purchase.complete.sender.name') === '')
                                ? undefined : this.translate.instant('email.purchase.complete.sender.name'),
                            email: (this.translate.instant('email.purchase.complete.sender.email') === '')
                                ? undefined : this.translate.instant('email.purchase.complete.sender.email')
                        },
                        toRecipient: {
                            name: (this.translate.instant('email.purchase.complete.toRecipient.name') === '')
                                ? undefined : this.translate.instant('email.purchase.complete.toRecipient.name'),
                            email: (this.translate.instant('email.purchase.complete.toRecipient.email') === '')
                                ? undefined : this.translate.instant('email.purchase.complete.toRecipient.email')
                        },
                        about: (this.translate.instant('email.purchase.complete.about') === '')
                            ? undefined : this.translate.instant('email.purchase.complete.about'),
                        template: undefined
                    }
                };
                if (environment.PURCHASE_COMPLETE_MAIL_CUSTOM && params.email !== undefined) {
                    // 完了メールをカスタマイズ
                    const path = `/ejs/mail/complete/${payload.language}.ejs`;
                    const url = (await isFile(`${getProject().storageUrl}${path}`))
                        ? `${getProject().storageUrl}${path}`
                        : `/default${path}`;
                    const view = await this.utilService.getText(url);
                    params.email.template = await (<any>window).ejs.render(view, {
                        authorizeSeatReservations: authorizeSeatReservation2Event({ authorizeSeatReservations }),
                        seller,
                        moment, formatTelephone, getItemPrice, getTicketPrice
                    }, { async: true });
                }

                const result = await this.cinerinoService.transaction.placeOrder.confirm(params);
                return purchaseAction.endTransactionSuccess({ order: result.order });
            } catch (error) {
                await this.cinerinoService.transaction.placeOrder.cancel({
                    id: transaction.id
                });
                return purchaseAction.endTransactionFail({ error: error });
            }
        })
    );

    /**
     * AuthorizeAnyPayment
     */
    @Effect()
    public authorizeAnyPayment = this.actions.pipe(
        ofType(purchaseAction.authorizeAnyPayment),
        map(action => action),
        mergeMap(async (payload) => {
            const transaction = payload.transaction;
            const typeOf = payload.typeOf;
            const amount = payload.amount;
            const name = payload.name;
            const additionalProperty = payload.additionalProperty;
            try {
                await this.cinerinoService.getServices();
                const authorizeAnyPayment =
                    await this.cinerinoService.payment.authorizeAnyPayment({
                        object: { typeOf, name, amount, additionalProperty },
                        purpose: transaction
                    });
                return purchaseAction.authorizeAnyPaymentSuccess({ authorizeAnyPayment });
            } catch (error) {
                return purchaseAction.authorizeAnyPaymentFail({ error: error });
            }
        })
    );
}
