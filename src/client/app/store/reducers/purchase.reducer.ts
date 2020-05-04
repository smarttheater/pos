import { factory } from '@cinerino/api-javascript-client';
import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import {
    isAvailabilityMovieTicket,
    sameMovieTicketFilter
} from '../../functions';
import { IMovieTicket, IReservation, IReservationTicket } from '../../models';
import { purchaseAction } from '../actions';

/**
 * IPurchaseState
 */
export interface IPurchaseState {
    /**
     * 販売者
     */
    seller?: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    /**
     * イベント
     */
    screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    /**
     * スケジュール日付
     */
    scheduleDate?: string;
    /**
     * 取引
     */
    transaction?: factory.transaction.placeOrder.ITransaction;
    /**
     * スクリーン
     */
    screen?: factory.chevre.place.screeningRoom.IPlace;
    /**
     * 予約
     */
    reservations: IReservation[];
    /**
     * 券種
     */
    screeningEventTicketOffers: factory.chevre.event.screeningEvent.ITicketOffer[];
    /**
     * 座席予約
     */
    authorizeSeatReservation?: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>;
    /**
     * 座席予約リスト
     */
    authorizeSeatReservations: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>[];
    /**
     * プロフィール
     */
    profile?: factory.person.IProfile;
    /**
     * クレジットカード決済
     */
    authorizeCreditCardPayments: factory.action.authorize.paymentMethod.creditCard.IAction[];
    /**
     * ムビチケ決済
     */
    authorizeMovieTicketPayments: factory.action.authorize.paymentMethod.movieTicket.IAction[];
    /**
     * GMOオブジェクト
     */
    gmoTokenObject?: any;
    /**
     * オーダーカウント
     */
    orderCount: number;
    /**
     * 注文
     */
    order?: factory.order.IOrder;
    /**
     * ムビチケ認証情報リスト
     */
    checkMovieTicketActions: factory.action.check.paymentMethod.movieTicket.IAction[];
    /**
     * ムビチケ認証情報
     */
    checkMovieTicketAction?: factory.action.check.paymentMethod.movieTicket.IAction;
    /**
     * 決済
     */
    authorizeAnyPayments: factory.action.authorize.paymentMethod.any.IAction<any>[];
    /**
     * 支払い方法
     */
    paymentMethod?: {
        typeOf: factory.paymentMethodType;
        category?: string;
    };
    /**
     * ムビチケ使用判定
     */
    isUsedMovieTicket: boolean;
    /**
     * 使用中ムビチケ
     */
    pendingMovieTickets: IMovieTicket[];
}

export const purchaseInitialState: IPurchaseState = {
    reservations: [],
    screeningEventTicketOffers: [],
    orderCount: 0,
    checkMovieTicketActions: [],
    authorizeSeatReservations: [],
    authorizeMovieTicketPayments: [],
    authorizeCreditCardPayments: [],
    authorizeAnyPayments: [],
    isUsedMovieTicket: false,
    pendingMovieTickets: []
};

export function reducer(initialState: IState, action: Action) {
    return createReducer(
        initialState,
        on(purchaseAction.remove, state => {
            state.purchaseData = {
                reservations: [],
                screeningEventTicketOffers: [],
                orderCount: 0,
                checkMovieTicketActions: [],
                authorizeSeatReservations: [],
                authorizeMovieTicketPayments: [],
                authorizeCreditCardPayments: [],
                authorizeAnyPayments: [],
                isUsedMovieTicket: false,
                pendingMovieTickets: []
            };
            return { ...state };
        }),
        on(purchaseAction.unsettledDelete, state => {
            state.purchaseData.reservations = [];
            state.purchaseData.screeningEvent = undefined;
            state.purchaseData.screeningEventTicketOffers = [];
            state.purchaseData.authorizeSeatReservation = undefined;
            state.purchaseData.checkMovieTicketAction = undefined;
            state.purchaseData.isUsedMovieTicket = false;
            return { ...state };
        }),
        on(purchaseAction.getSeller, (state) => {
            return { ...state, loading: false, process: 'purchaseAction.GetSeller' };
        }),
        on(purchaseAction.getSellerSuccess, (state, payload) => {
            state.purchaseData.seller = payload.seller;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.getSellerFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.selectScheduleDate, (state, payload) => {
            const scheduleDate = payload.scheduleDate;
            return { ...state, purchaseData: { ...state.purchaseData, scheduleDate }, loading: true, process: '', error: null };
        }),
        on(purchaseAction.getScreeningEvent, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.GetScreeningEvent' };
        }),
        on(purchaseAction.getScreeningEventSuccess, (state, payload) => {
            state.purchaseData.screeningEvent = payload.screeningEvent;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.getScreeningEventFail, (state, payload) => {
            const error = payload.error;
            return { ...state, error: JSON.stringify(error), loading: false, process: '' };
        }),
        on(purchaseAction.startTransaction, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.StartTransaction' };
        }),
        on(purchaseAction.startTransactionSuccess, (state, payload) => {
            state.purchaseData.transaction = payload.transaction;
            state.purchaseData.authorizeAnyPayments = [];
            state.purchaseData.authorizeMovieTicketPayments = [];
            state.purchaseData.authorizeSeatReservations = [];
            state.purchaseData.pendingMovieTickets = [];
            state.purchaseData.checkMovieTicketActions = [];
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.getScreeningEventFail, (state, payload) => {
            const error = payload.error;
            return { ...state, error: JSON.stringify(error), loading: false, process: '' };
        }),
        on(purchaseAction.cancelTransaction, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.CancelTransaction' };
        }),
        on(purchaseAction.cancelTransactionSuccess, (state) => {
            state.purchaseData.transaction = undefined;
            state.purchaseData.authorizeAnyPayments = [];
            state.purchaseData.authorizeMovieTicketPayments = [];
            state.purchaseData.authorizeSeatReservations = [];
            state.purchaseData.pendingMovieTickets = [];
            state.purchaseData.checkMovieTicketActions = [];
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.cancelTransactionFail, (state, payload) => {
            const error = payload.error;
            state.purchaseData.transaction = undefined;
            state.purchaseData.authorizeAnyPayments = [];
            state.purchaseData.authorizeMovieTicketPayments = [];
            state.purchaseData.authorizeSeatReservations = [];
            state.purchaseData.pendingMovieTickets = [];
            state.purchaseData.checkMovieTicketActions = [];
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.getScreen, (state) => {
            state.purchaseData.screen = undefined;
            return { ...state, loading: true, process: 'purchaseAction.GetScreen' };
        }),
        on(purchaseAction.getScreenSuccess, (state, payload) => {
            const screen = payload.screen;
            state.purchaseData.screen = screen;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.cancelTransactionFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.selectSeats, (state, payload) => {
            const reservations = state.purchaseData.reservations;
            payload.seats.forEach((seat) => {
                reservations.push({ seat });
            });
            state.purchaseData.reservations = reservations;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.cancelSeats, (state, payload) => {
            const reservations: IReservation[] = [];
            const seats = payload.seats;
            state.purchaseData.reservations.forEach((reservation) => {
                const findResult = seats.find((seat) => {
                    return (reservation.seat !== undefined
                        && reservation.seat.seatNumber === seat.seatNumber
                        && reservation.seat.seatSection === seat.seatSection);
                });
                if (findResult === undefined) {
                    reservations.push(reservation);
                }
            });
            state.purchaseData.reservations = reservations;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.getTicketList, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.GetTicketList' };
        }),
        on(purchaseAction.getTicketListSuccess, (state, payload) => {
            const screeningEventTicketOffers = payload.screeningEventTicketOffers;
            const movieTicketTypeOffers = screeningEventTicketOffers.filter((offer) => {
                const movieTicketTypeChargeSpecifications = offer.priceSpecification.priceComponent.filter((priceComponent) => {
                    return (priceComponent.typeOf === factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification);
                });
                return (movieTicketTypeChargeSpecifications.length > 0);
            });
            state.purchaseData.screeningEventTicketOffers = screeningEventTicketOffers;
            state.purchaseData.isUsedMovieTicket = (movieTicketTypeOffers.length > 0);
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.getTicketListFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.selectTickets, (state, payload) => {
            const reservations: IReservation[] = [];
            const selectedReservations = payload.reservations;
            state.purchaseData.reservations.forEach((reservation) => {
                const findResult =
                    selectedReservations.find(selectedReservation => Object.is(reservation, selectedReservation));
                if (findResult === undefined) {
                    reservations.push(reservation);
                } else {
                    reservations.push(findResult);
                }
            });
            state.purchaseData.reservations = reservations;
            return { ...state };
        }),
        on(purchaseAction.temporaryReservation, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.TemporaryReservation' };
        }),
        on(purchaseAction.temporaryReservationSuccess, (state, payload) => {
            const addAuthorizeSeatReservation = payload.addAuthorizeSeatReservation;
            const removeAuthorizeSeatReservation = payload.removeAuthorizeSeatReservation;
            const reservations = state.purchaseData.reservations;
            state.purchaseData.authorizeSeatReservation = addAuthorizeSeatReservation;
            if (removeAuthorizeSeatReservation !== undefined) {
                // 削除
                const findAuthorizeSeatReservation = state.purchaseData.authorizeSeatReservations.findIndex(
                    target => target.id === removeAuthorizeSeatReservation.id
                );
                if (findAuthorizeSeatReservation > -1) {
                    state.purchaseData.authorizeSeatReservations.splice(findAuthorizeSeatReservation, 1);
                }
                const findPendingMovieTicket = state.purchaseData.pendingMovieTickets.findIndex(
                    target => target.id === removeAuthorizeSeatReservation.id
                );
                if (findPendingMovieTicket > -1) {
                    state.purchaseData.pendingMovieTickets.splice(findPendingMovieTicket, 1);
                }
            }
            // 追加
            state.purchaseData.authorizeSeatReservations.push(addAuthorizeSeatReservation);
            const movieTicketReservations = reservations.filter(r => r.ticket !== undefined && r.ticket.movieTicket !== undefined);
            if (movieTicketReservations.length > 0
                && addAuthorizeSeatReservation.result !== undefined
                && addAuthorizeSeatReservation.result.responseBody.object.reservations !== undefined) {
                const pendingReservations = addAuthorizeSeatReservation.result.responseBody.object.reservations;
                state.purchaseData.pendingMovieTickets.push({
                    id: addAuthorizeSeatReservation.id,
                    movieTickets: movieTicketReservations.map((r) => {
                        const pendingReservation = pendingReservations.find((p) => {
                            return (p.reservedTicket.ticketedSeat !== undefined
                                && r.seat !== undefined
                                && p.reservedTicket.ticketedSeat.seatNumber === r.seat.seatNumber
                                && p.reservedTicket.ticketedSeat.seatSection === r.seat.seatSection);
                        });
                        if (pendingReservation === undefined
                            || pendingReservation.reservedTicket.ticketedSeat === undefined) {
                            throw new Error('pendingReservation is undefined');
                        }
                        const movieTicket =
                            (<factory.paymentMethod.paymentCard.movieTicket.IMovieTicket>(<IReservationTicket>r.ticket).movieTicket);
                        movieTicket.serviceOutput = {
                            reservationFor: {
                                typeOf: factory.chevre.eventType.ScreeningEvent,
                                id: pendingReservation.reservationFor.id
                            },
                            reservedTicket: { ticketedSeat: pendingReservation.reservedTicket.ticketedSeat }
                        };
                        return movieTicket;
                    })
                });
            }
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.cancelTemporaryReservationsFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.cancelTemporaryReservations, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.CancelTemporaryReservations' };
        }),
        on(purchaseAction.cancelTemporaryReservationsSuccess, (state, payload) => {
            const authorizeSeatReservations = payload.authorizeSeatReservations;
            authorizeSeatReservations.forEach((authorizeSeatReservation) => {
                const findAuthorizeSeatReservation = state.purchaseData.authorizeSeatReservations.findIndex(
                    target => target.id === authorizeSeatReservation.id
                );
                if (findAuthorizeSeatReservation > -1) {
                    state.purchaseData.authorizeSeatReservations.splice(findAuthorizeSeatReservation, 1);
                }
                const findPendingMovieTicket = state.purchaseData.pendingMovieTickets.findIndex(
                    target => target.id === authorizeSeatReservation.id
                );
                if (findPendingMovieTicket > -1) {
                    state.purchaseData.pendingMovieTickets.splice(findPendingMovieTicket, 1);
                }
            });
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.cancelTemporaryReservationsFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.registerContact, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.RegisterContact' };
        }),
        on(purchaseAction.registerContactSuccess, (state, payload) => {
            const profile = payload.profile;
            state.purchaseData.profile = profile;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.registerContactFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.authorizeMovieTicket, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.AuthorizeMovieTicket' };
        }),
        on(purchaseAction.authorizeMovieTicketSuccess, (state, payload) => {
            state.purchaseData.authorizeMovieTicketPayments = payload.authorizeMovieTicketPayments;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.authorizeMovieTicketFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.checkMovieTicket, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.CheckMovieTicket' };
        }),
        on(purchaseAction.checkMovieTicketSuccess, (state, payload) => {
            const checkMovieTicketAction = payload.checkMovieTicketAction;
            const checkMovieTicketActions = state.purchaseData.checkMovieTicketActions;
            const sameMovieTicketFilterResults = sameMovieTicketFilter({
                checkMovieTicketAction, checkMovieTicketActions
            });
            if (sameMovieTicketFilterResults.length === 0
                && isAvailabilityMovieTicket(checkMovieTicketAction)) {
                state.purchaseData.checkMovieTicketActions.push(checkMovieTicketAction);
            }
            state.purchaseData.checkMovieTicketAction = checkMovieTicketAction;

            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.checkMovieTicketFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.endTransaction, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.EndTransaction' };
        }),
        on(purchaseAction.endTransactionSuccess, (state, payload) => {
            const order = payload.order;
            state.purchaseData = {
                reservations: [],
                screeningEventTicketOffers: [],
                orderCount: 0,
                authorizeSeatReservations: [],
                checkMovieTicketActions: [],
                authorizeCreditCardPayments: [],
                authorizeMovieTicketPayments: [],
                authorizeAnyPayments: [],
                isUsedMovieTicket: false,
                pendingMovieTickets: []
            };
            state.purchaseData.order = order;
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.endTransactionFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.authorizeAnyPayment, (state) => {
            return { ...state, loading: true, process: 'purchaseAction.AuthorizeAnyPayment' };
        }),
        on(purchaseAction.authorizeAnyPaymentSuccess, (state, payload) => {
            const authorizeAnyPayment = payload.authorizeAnyPayment;
            state.purchaseData.authorizeAnyPayments.push(authorizeAnyPayment);
            return { ...state, loading: false, process: '', error: null };
        }),
        on(purchaseAction.authorizeAnyPaymentFail, (state, payload) => {
            const error = payload.error;
            return { ...state, loading: false, process: '', error: JSON.stringify(error) };
        }),
        on(purchaseAction.selectPaymentMethodType, (state, payload) => {
            const paymentMethod = {
                typeOf: payload.typeOf,
                category: payload.category
            };
            state.purchaseData.paymentMethod = paymentMethod;

            return { ...state, loading: false, process: '', error: null };
        }),
    )(initialState, action);
}
