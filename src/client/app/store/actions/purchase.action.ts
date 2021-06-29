import { factory } from '@cinerino/sdk';
import { createAction, props } from '@ngrx/store';
import { Functions, Models } from '../..';

const LABEL = '[Purchase]';

export const remove = createAction(`${LABEL} Remove`);

export const unsettledDelete = createAction(`${LABEL} unsettledDelete`);

export const selectScheduleDate = createAction(
    `${LABEL} selectScheduleDate`,
    props<{ scheduleDate: string }>()
);

export const setSeller = createAction(
    `${LABEL} setSeller`,
    props<{
        seller: factory.chevre.seller.ISeller;
    }>()
);

export const setScreeningEvent = createAction(
    `${LABEL} setScreeningEvent`,
    props<{
        screeningEvent: factory.chevre.event.screeningEvent.IEvent;
    }>()
);

export const setTransaction = createAction(
    `${LABEL} setTransaction`,
    props<{
        transaction: factory.transaction.placeOrder.ITransaction;
    }>()
);

export const cancelTransaction = createAction(`${LABEL} cancelTransaction`);

export const setScreeningRoom = createAction(
    `${LABEL} setScreeningRoom`,
    props<{ screeningRoom: factory.chevre.place.screeningRoom.IPlace }>()
);

export const selectSeats = createAction(
    `${LABEL} selectSeats`,
    props<{ seats: Models.Purchase.Reservation.IReservationSeat[] }>()
);

export const cancelSeats = createAction(
    `${LABEL} cancelSeats`,
    props<{ seats: Models.Purchase.Reservation.IReservationSeat[] }>()
);

export const setTicketOffers = createAction(
    `${LABEL} setTicketOffers`,
    props<{
        ticketOffers: factory.chevre.event.screeningEvent.ITicketOffer[];
    }>()
);

export const selectTickets = createAction(
    `${LABEL} selectTickets`,
    props<{ reservations: Models.Purchase.Reservation.IReservation[] }>()
);

export const setAuthorizeSeatReservation = createAction(
    `${LABEL} setAuthorizeSeatReservation`,
    props<{
        addAuthorizeSeatReservation: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier>;
        removeAuthorizeSeatReservation?: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier>;
    }>()
);

export const voidSeatReservation = createAction(
    `${LABEL} voidSeatReservation`,
    props<{
        authorizeSeatReservations: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>[];
    }>()
);

export const setProfile = createAction(
    `${LABEL} setProfile`,
    props<{ profile: factory.person.IProfile }>()
);

export const setAuthorizeMovieTicket = createAction(
    `${LABEL} authorizeMovieTicketSuccess`,
    props<{
        authorizeResults: factory.action.authorize.paymentMethod.any.IAction[];
    }>()
);

export const setCheckMovieTicket = createAction(
    `${LABEL} checkMovieTicketSuccess`,
    props<{
        checkMovieTicketAction: factory.action.check.paymentMethod.movieTicket.IAction;
    }>()
);

export const setOrder = createAction(
    `${LABEL} setOrder`,
    props<{ order: factory.order.IOrder }>()
);

export const createGmoTokenObject = createAction(
    `${LABEL} createGmoTokenObject`,
    props<{
        creditCard: {
            cardno: string;
            expire: string;
            holderName: string;
            securityCode: string;
        };
        seller: factory.chevre.seller.ISeller;
    }>()
);

export const createGmoTokenObjectSuccess = createAction(
    `${LABEL} createGmoTokenObjectSuccess`,
    props<{ gmoTokenObject: Functions.Purchase.IGmoTokenObject }>()
);

export const createGmoTokenObjectFail = createAction(
    `${LABEL} createGmoTokenObjectFail`,
    props<{ error: Error }>()
);

export const setauthorizeAnyPayment = createAction(
    `${LABEL} setauthorizeAnyPayment`,
    props<{
        authorizeResults: factory.action.authorize.paymentMethod.any.IAction[];
    }>()
);

export const selectPaymentMethodType = createAction(
    `${LABEL} selectPaymentMethodType`,
    props<{
        typeOf: factory.paymentMethodType;
        category?: string;
    }>()
);

export const setCustomer = createAction(
    `${LABEL} setCustomer`,
    props<{
        customer: factory.chevre.organization.IOrganization;
    }>()
);
