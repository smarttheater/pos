import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
    authorizeSeatReservationToEvent,
    createMovieTicketsFromAuthorizeSeatReservation,
    formatTelephone,
    getProject,
    getTicketPrice,
    isTicketedSeatScreeningEvent
} from '../../functions';
import { IScreen } from '../../models';
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
        private http: HttpClient,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    /**
     * StartTransaction
     */
    @Effect()
    public startTransaction = this.actions.pipe(
        ofType<purchaseAction.StartTransaction>(purchaseAction.ActionTypes.StartTransaction),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                const params = payload;
                const selleId = params.seller.id;
                await this.cinerinoService.getServices();
                const passport = await this.cinerinoService.getPassport(selleId);
                params.object = { passport };
                const transaction = await this.cinerinoService.transaction.placeOrder.start(params);
                return new purchaseAction.StartTransactionSuccess({ transaction });
            } catch (error) {
                return new purchaseAction.StartTransactionFail({ error: error });
            }
        })
    );

    /**
     * CancelTransaction
     */
    @Effect()
    public cancelTransaction = this.actions.pipe(
        ofType<purchaseAction.CancelTransaction>(purchaseAction.ActionTypes.CancelTransaction),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                const transaction = payload.transaction;
                await this.cinerinoService.getServices();
                await this.cinerinoService.transaction.placeOrder.cancel({ id: transaction.id });
                return new purchaseAction.CancelTransactionSuccess();
            } catch (error) {
                return new purchaseAction.CancelTransactionFail({ error: error });
            }
        })
    );

    /**
     * getScreen
     */
    @Effect()
    public getScreen = this.actions.pipe(
        ofType<purchaseAction.GetScreen>(purchaseAction.ActionTypes.GetScreen),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                let theaterCode;
                let screenCode;
                let screeningEventOffers: factory.chevre.event.screeningEvent.IScreeningRoomSectionOffer[];
                if (payload.test) {
                    screeningEventOffers = [];
                    theaterCode = payload.theaterCode;
                    screenCode = `000${payload.screenCode}`.slice(-3);
                } else {
                    screeningEventOffers = await this.cinerinoService.event.searchOffers({
                        event: { id: payload.screeningEvent.id }
                    });
                    theaterCode = payload.screeningEvent.superEvent.location.branchCode;
                    screenCode = `000${payload.screeningEvent.location.branchCode}`.slice(-3);
                }
                const screen = await this.http.get<IScreen>(
                    `${getProject().storageUrl}/json/theater/${theaterCode}/${screenCode}.json?${moment().format('YYYYMMDDHHmm')}`
                ).toPromise();
                const objects = screen.objects.map((o) => {
                    return { ...o, image: o.image.replace('/storage', getProject().storageUrl) };
                });
                screen.objects = objects;
                const setting = await this.http.get<IScreen>(`${getProject().storageUrl}/json/theater/setting.json`).toPromise();
                const screenData = Object.assign(setting, screen);
                return new purchaseAction.GetScreenSuccess({ screeningEventOffers, screenData });
            } catch (error) {
                return new purchaseAction.GetScreenFail({ error: error });
            }
        })
    );

    /**
     * GetScreeningEventOffers
     */
    @Effect()
    public getScreeningEventOffers = this.actions.pipe(
        ofType<purchaseAction.GetScreeningEventOffers>(purchaseAction.ActionTypes.GetScreeningEventOffers),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                const screeningEvent = payload.screeningEvent;
                let screeningEventOffers: factory.chevre.event.screeningEvent.IScreeningRoomSectionOffer[] = [];
                if (isTicketedSeatScreeningEvent(screeningEvent)) {
                    screeningEventOffers = await this.cinerinoService.event.searchOffers({
                        event: { id: screeningEvent.id }
                    });
                }

                return new purchaseAction.GetScreeningEventOffersSuccess({ screeningEventOffers });
            } catch (error) {
                return new purchaseAction.GetScreeningEventOffersFail({ error: error });
            }
        })
    );

    /**
     * temporaryReservation
     */
    @Effect()
    public temporaryReservation = this.actions.pipe(
        ofType<purchaseAction.TemporaryReservation>(purchaseAction.ActionTypes.TemporaryReservation),
        map(action => action.payload),
        mergeMap(async (payload) => {
            const transaction = payload.transaction;
            const screeningEvent = payload.screeningEvent;
            const reservations = payload.reservations;
            try {
                await this.cinerinoService.getServices();
                if (payload.authorizeSeatReservation !== undefined) {
                    await this.cinerinoService.transaction.placeOrder.voidSeatReservation(payload.authorizeSeatReservation);
                }
                // サーバータイムを使用して販売期間判定
                const serverTime = await this.utilService.getServerTime();
                const nowDate = moment(serverTime.date).toDate();
                if (screeningEvent.offers === undefined) {
                    throw new Error('screeningEvent.offers undefined');
                }
                if (screeningEvent.offers.validFrom > nowDate
                    || screeningEvent.offers.validThrough < nowDate) {
                    throw new Error('Outside sales period');
                }
                const authorizeSeatReservation = await this.cinerinoService.transaction.placeOrder.authorizeSeatReservation({
                    object: {
                        event: {
                            id: screeningEvent.id
                        },
                        acceptedOffer: reservations.map((reservation) => {
                            if (reservation.ticket === undefined) {
                                throw new Error('ticket is undefined');
                            }
                            return {
                                id: reservation.ticket.ticketOffer.id,
                                ticketedSeat: reservation.seat,
                                additionalProperty: [] // ここにムビチケ情報を入れる
                            };
                        })
                    },
                    purpose: transaction
                });
                return new purchaseAction.TemporaryReservationSuccess({
                    addAuthorizeSeatReservation: authorizeSeatReservation,
                    removeAuthorizeSeatReservation: payload.authorizeSeatReservation
                });
            } catch (error) {
                return new purchaseAction.TemporaryReservationFail({ error: error });
            }
        })
    );

    /**
     * temporaryReservationFreeSeat
     */
    @Effect()
    public temporaryReservationFreeSeat = this.actions.pipe(
        ofType<purchaseAction.TemporaryReservationFreeSeat>(purchaseAction.ActionTypes.TemporaryReservationFreeSeat),
        map(action => action.payload),
        mergeMap(async (payload) => {
            const transaction = payload.transaction;
            const screeningEvent = payload.screeningEvent;
            const screeningEventOffers = payload.screeningEventOffers;
            const reservationTickets = payload.reservationTickets;
            const freeSeats: factory.chevre.reservation.ISeat<factory.chevre.reservationType.EventReservation>[] = [];
            try {
                await this.cinerinoService.getServices();
                if (isTicketedSeatScreeningEvent(screeningEvent)) {
                    for (const screeningEventOffer of screeningEventOffers) {
                        const section = screeningEventOffer.branchCode;
                        for (const containsPlace of screeningEventOffer.containsPlace) {
                            if (containsPlace.offers !== undefined
                                && containsPlace.offers[0].availability === factory.chevre.itemAvailability.InStock) {
                                freeSeats.push({
                                    typeOf: containsPlace.typeOf,
                                    seatingType: <any>containsPlace.seatingType,
                                    seatNumber: containsPlace.branchCode,
                                    seatRow: '',
                                    seatSection: section
                                });
                            }
                        }
                    }
                }
                const authorizeSeatReservation = await this.cinerinoService.transaction.placeOrder.authorizeSeatReservation({
                    object: {
                        event: {
                            id: screeningEvent.id
                        },
                        acceptedOffer: reservationTickets.map((ticket, index) => {
                            return {
                                id: ticket.ticketOffer.id,
                                ticketedSeat: (freeSeats.length > 0) ? freeSeats[index] : undefined,
                                additionalProperty: [] // ここにムビチケ情報を入れる
                            };
                        })
                    },
                    purpose: transaction
                });
                return new purchaseAction.TemporaryReservationFreeSeatSuccess({
                    addAuthorizeSeatReservation: authorizeSeatReservation
                });
            } catch (error) {
                return new purchaseAction.TemporaryReservationFreeSeatFail({ error: error });
            }
        })
    );

    /**
     * cancelTemporaryReservations
     */
    @Effect()
    public cancelTemporaryReservations = this.actions.pipe(
        ofType<purchaseAction.CancelTemporaryReservations>(purchaseAction.ActionTypes.CancelTemporaryReservations),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                const authorizeSeatReservations = payload.authorizeSeatReservations;
                await this.cinerinoService.getServices();
                for (const authorizeSeatReservation of authorizeSeatReservations) {
                    await this.cinerinoService.transaction.placeOrder.voidSeatReservation(authorizeSeatReservation);
                }

                return new purchaseAction.CancelTemporaryReservationsSuccess({ authorizeSeatReservations });
            } catch (error) {
                return new purchaseAction.CancelTemporaryReservationsFail({ error: error });
            }
        })
    );


    /**
     * getTicketList
     */
    @Effect()
    public getTicketList = this.actions.pipe(
        ofType<purchaseAction.GetTicketList>(purchaseAction.ActionTypes.GetTicketList),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                await this.cinerinoService.getServices();
                const clientId = this.cinerinoService.auth.options.clientId;
                const screeningEvent = payload.screeningEvent;
                const seller = payload.seller;
                let screeningEventTicketOffers = await this.cinerinoService.event.searchTicketOffers({
                    event: { id: screeningEvent.id },
                    seller: { typeOf: seller.typeOf, id: seller.id },
                    store: { id: clientId }
                });
                // 券種コード順（昇順）へソート
                screeningEventTicketOffers = screeningEventTicketOffers.sort((a, b) => {
                    if (a.identifier > b.identifier) { return 1; }
                    if (a.identifier < b.identifier) { return -1; }
                    return 0;
                });

                return new purchaseAction.GetTicketListSuccess({ screeningEventTicketOffers });
            } catch (error) {
                return new purchaseAction.GetTicketListFail({ error: error });
            }
        })
    );

    /**
     * registerContact
     */
    @Effect()
    public registerContact = this.actions.pipe(
        ofType<purchaseAction.RegisterContact>(purchaseAction.ActionTypes.RegisterContact),
        map(action => action.payload),
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
                return new purchaseAction.RegisterContactSuccess({ profile });
            } catch (error) {
                return new purchaseAction.RegisterContactFail({ error: error });
            }
        })
    );

    /**
     * authorizeCreditCard
     */
    @Effect()
    public authorizeCreditCard = this.actions.pipe(
        ofType<purchaseAction.AuthorizeCreditCard>(purchaseAction.ActionTypes.AuthorizeCreditCard),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                const gmoTokenObject = payload.gmoTokenObject;
                const amount = payload.amount;
                await this.cinerinoService.getServices();
                if (payload.authorizeCreditCardPayment !== undefined) {
                    await this.cinerinoService.payment.voidTransaction(payload.authorizeCreditCardPayment);
                }
                const transaction = payload.transaction;
                const creditCard = { token: gmoTokenObject.token };
                const authorizeCreditCardPaymentResult =
                    await this.cinerinoService.payment.authorizeCreditCard({
                        object: {
                            typeOf: factory.paymentMethodType.CreditCard,
                            amount,
                            method: <any>'1',
                            creditCard
                        },
                        purpose: transaction
                    });

                return new purchaseAction.AuthorizeCreditCardSuccess({ authorizeCreditCardPayment: authorizeCreditCardPaymentResult });
            } catch (error) {
                return new purchaseAction.AuthorizeCreditCardFail({ error: error });
            }
        })
    );

    /**
     * authorizeMovieTicket
     */
    @Effect()
    public authorizeMovieTicket = this.actions.pipe(
        ofType<purchaseAction.AuthorizeMovieTicket>(purchaseAction.ActionTypes.AuthorizeMovieTicket),
        map(action => action.payload),
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

                return new purchaseAction.AuthorizeMovieTicketSuccess({ authorizeMovieTicketPayments });
            } catch (error) {
                return new purchaseAction.AuthorizeMovieTicketFail({ error: error });
            }
        })
    );
    /**
     * checkMovieTicket
     */
    @Effect()
    public checkMovieTicket = this.actions.pipe(
        ofType<purchaseAction.CheckMovieTicket>(purchaseAction.ActionTypes.CheckMovieTicket),
        map(action => action.payload),
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

                return new purchaseAction.CheckMovieTicketSuccess({ checkMovieTicketAction });
            } catch (error) {
                return new purchaseAction.CheckMovieTicketFail({ error: error });
            }
        })
    );

    /**
     * EndTransaction
     */
    @Effect()
    public endTransaction = this.actions.pipe(
        ofType<purchaseAction.EndTransaction>(purchaseAction.ActionTypes.EndTransaction),
        map(action => action.payload),
        mergeMap(async (payload) => {
            const transaction = payload.transaction;
            const authorizeSeatReservations = payload.authorizeSeatReservations;
            const seller = payload.seller;
            try {
                await this.cinerinoService.getServices();
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
                    const view = await this.utilService.getText(`${getProject().storageUrl}/ejs/mail/complete/${payload.language}.ejs`);
                    params.email.template = await (<any>window).ejs.render(view, {
                        authorizeSeatReservations: authorizeSeatReservationToEvent({ authorizeSeatReservations }),
                        seller,
                        moment, formatTelephone, getTicketPrice
                    }, { async: true });
                }

                const result = await this.cinerinoService.transaction.placeOrder.confirm(params);
                return new purchaseAction.EndTransactionSuccess({ order: result.order });
            } catch (error) {
                await this.cinerinoService.transaction.placeOrder.cancel({
                    id: transaction.id
                });
                return new purchaseAction.EndTransactionFail({ error: error });
            }
        })
    );

    /**
     * AuthorizeAnyPayment
     */
    @Effect()
    public authorizeAnyPayment = this.actions.pipe(
        ofType<purchaseAction.AuthorizeAnyPayment>(purchaseAction.ActionTypes.AuthorizeAnyPayment),
        map(action => action.payload),
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
                return new purchaseAction.AuthorizeAnyPaymentSuccess({ authorizeAnyPayment });
            } catch (error) {
                return new purchaseAction.AuthorizeAnyPaymentFail({ error: error });
            }
        })
    );
}
