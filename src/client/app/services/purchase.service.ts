import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { getEnvironment } from '../../environments/environment';
import { IReservation, IReservationSeat } from '../models';
import { purchaseAction } from '../store/actions';
import * as reducers from '../store/reducers';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    public purchase: Observable<reducers.IPurchaseState>;
    public error: Observable<string | null>;

    constructor(
        private actions: Actions,
        private store: Store<reducers.IState>,
        private utilService: UtilService
    ) {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * 購入データ取得
     */
    public async getData() {
        return new Promise<reducers.IPurchaseState>((resolve) => {
            this.purchase.subscribe((purchase) => {
                resolve(purchase);
            }).unsubscribe();
        });
    }


    /**
     * 購入データ削除
     */
    public delete() {
        this.store.dispatch(new purchaseAction.Delete());
    }

    /**
     * 購入一時データ削除
     */
    public unsettledDelete() {
        this.store.dispatch(new purchaseAction.UnsettledDelete());
    }

    /**
     * 販売者選択
     */
    public selectSeller() {

    }

    /**
     * スケジュール日選択
     */
    public selectScheduleDate(scheduleDate: string) {
        this.store.dispatch(new purchaseAction.SelectScheduleDate({ scheduleDate }));
    }

    /**
     * イベント取得
     */
    public async getScreeningEvent(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new purchaseAction.GetScreeningEvent({ screeningEvent }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetScreeningEventSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetScreeningEventFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 取引開始
     */
    public async startTransaction(params: {
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
        pos?: factory.seller.IPOS;
    }) {
        const environment = getEnvironment();
        const now = (await this.utilService.getServerTime()).date;
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new purchaseAction.StartTransaction({
                expires: moment(now).add(environment.PURCHASE_TRANSACTION_TIME, 'minutes').toDate(),
                seller: { typeOf: params.seller.typeOf, id: params.seller.id },
                object: {},
                agent: (params.pos === undefined)
                    ? undefined
                    : {
                        identifier: [
                            { name: 'posId', value: params.pos.id },
                            { name: 'posName', value: params.pos.name }
                        ]
                    }
            }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.StartTransactionSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.StartTransactionFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 取引中止
     */
    public async cancelTransaction() {
        const purchase = await this.getData();
        return new Promise<void>((resolve) => {
            const transaction = purchase.transaction;
            if (transaction === undefined) {
                resolve();
                return;
            }
            this.store.dispatch(new purchaseAction.CancelTransaction({ transaction }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CancelTransactionSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CancelTransactionFail),
                tap(() => { resolve(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * スクリーン情報取得
     */
    public getScreen(params: {
        test: false;
        screeningEvent: factory.chevre.event.screeningEvent.IEvent;
    } | {
        test: true;
        theaterCode: string;
        screenCode: string;
    }) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new purchaseAction.GetScreen(params));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetScreenSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetScreenFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 空席情報取得
     */
    public async getScreeningEventOffers() {
        const purchase = await this.getData();
        return new Promise<void>((resolve, reject) => {
            if (purchase.screeningEvent === undefined) {
                reject();
                return;
            }
            const screeningEvent = purchase.screeningEvent;
            this.store.dispatch(new purchaseAction.GetScreeningEventOffers({ screeningEvent }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetScreeningEventOffersSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetScreeningEventOffersFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 座席選択
     */
    public selectSeats(seats: IReservationSeat[]) {
        this.store.dispatch(new purchaseAction.SelectSeats({ seats }));
    }

    /**
     * 座席選択解除
     */
    public cancelSeats(seats: IReservationSeat[]) {
        this.store.dispatch(new purchaseAction.CancelSeats({ seats }));
    }

    /**
     * 券種一覧取得
     */
    public async getTicketList(
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>
    ) {
        const purchase = await this.getData();
        return new Promise<void>((resolve, reject) => {
            const screeningEvent = purchase.screeningEvent;
            if (screeningEvent === undefined) {
                reject();
                return;
            }
            this.store.dispatch(new purchaseAction.GetTicketList({ screeningEvent, seller }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetTicketListSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.GetTicketListFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * チケット選択
    */
    public selectTickets(reservations: IReservation[]) {
        this.store.dispatch(new purchaseAction.SelectTickets({ reservations }));
    }

    /**
     * 座席仮予約
     */
    public async temporaryReservation() {
        const purchase = await this.getData();
        return new Promise<void>((resolve, reject) => {
            const transaction = purchase.transaction;
            const screeningEvent = purchase.screeningEvent;
            if (transaction === undefined || screeningEvent === undefined) {
                reject();
                return;
            }
            const reservations = purchase.reservations.map((reservation) => {
                return {
                    seat: reservation.seat,
                    ticket: (reservation.ticket === undefined)
                        ? { ticketOffer: purchase.screeningEventTicketOffers[0] }
                        : reservation.ticket
                };
            });
            const authorizeSeatReservation = purchase.authorizeSeatReservation;
            this.store.dispatch(new purchaseAction.TemporaryReservation({
                transaction,
                screeningEvent,
                reservations,
                authorizeSeatReservation
            }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.TemporaryReservationSuccess),
                tap(() => { resolve(); })
            );

            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.TemporaryReservationFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 座席仮予約（座席選択なし）
     */
    public async temporaryReservationFreeSeat(reservations: IReservation[]) {
        const purchase = await this.getData();
        return new Promise<void>((resolve, reject) => {
            if (purchase.transaction === undefined || purchase.screeningEvent === undefined) {
                reject();
                return;
            }
            const transaction = purchase.transaction;
            const screeningEvent = purchase.screeningEvent;
            const screeningEventOffers = purchase.screeningEventOffers;
            this.store.dispatch(new purchaseAction.TemporaryReservationFreeSeat({
                transaction,
                screeningEvent,
                screeningEventOffers,
                reservations
            }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.TemporaryReservationFreeSeatSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.TemporaryReservationFreeSeatFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 座席仮予約取り消し
     */
    public async cancelTemporaryReservations(
        authorizeSeatReservations: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>[]
    ) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new purchaseAction.CancelTemporaryReservations({ authorizeSeatReservations }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CancelTemporaryReservationsSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CancelTemporaryReservationsFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 購入者情報登録
     */
    public async registerContact(contact: factory.person.IProfile) {
        const purchase = await this.getData();
        const transaction = purchase.transaction;
        return new Promise<void>((resolve, reject) => {
            if (transaction === undefined) {
                reject();
                return;
            }
            this.store.dispatch(new purchaseAction.RegisterContact({ transaction, contact }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.RegisterContactSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.RegisterContactFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * クレジットカード承認
     */
    public authorizeCreditCard() {

    }

    /**
     * ムビチケ承認
     */
    public async authorizeMovieTicket(params: {
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>
    }) {
        const purchase = await this.getData();
        return new Promise<void>((resolve, reject) => {
            if (purchase.transaction === undefined) {
                reject();
                return;
            }
            this.store.dispatch(new purchaseAction.AuthorizeMovieTicket({
                transaction: purchase.transaction,
                authorizeMovieTicketPayments: purchase.authorizeMovieTicketPayments,
                authorizeSeatReservations: purchase.authorizeSeatReservations,
                pendingMovieTickets: purchase.pendingMovieTickets,
                seller: params.seller
            }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.AuthorizeMovieTicketSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.AuthorizeMovieTicketFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * ムビチケ認証
     */
    public async checkMovieTicket(params: {
        movieTicket: { code: string; password: string; };
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>
    }) {
        const movieTicket = params.movieTicket;
        const seller = params.seller;
        const purchase = await this.getData();
        return new Promise<void>((resolve, reject) => {
            if (purchase.transaction === undefined || purchase.screeningEvent === undefined) {
                reject();
                return;
            }
            this.store.dispatch(new purchaseAction.CheckMovieTicket({
                transaction: purchase.transaction,
                movieTickets: [{
                    typeOf: factory.paymentMethodType.MovieTicket,
                    project: seller.project,
                    identifier: movieTicket.code, // 購入管理番号
                    accessCode: movieTicket.password // PINコード
                }],
                screeningEvent: purchase.screeningEvent
            }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CheckMovieTicketSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.CheckMovieTicketFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 取引確定
     */
    public async endTransaction(params: {
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
        language: string;
    }) {
        const purchase = await this.getData();
        const seller = params.seller;
        const language = params.language;
        return new Promise<void>((resolve, reject) => {
            if (purchase.transaction === undefined) {
                reject();
                return;
            }
            const transaction = purchase.transaction;
            const authorizeSeatReservations = purchase.authorizeSeatReservations;
            this.store.dispatch(new purchaseAction.EndTransaction({
                transaction, authorizeSeatReservations, seller, language
            }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.EndTransactionSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.EndTransactionFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * GMOトークン作成
     */
    public createGmoTokenObject() {

    }

    /**
     * 決済情報承認
     */
    public async authorizeAnyPayment(params: {
        amount: number;
        depositAmount?: number;
    }) {
        const purchase = await this.getData();
        return new Promise<void>((resolve, reject) => {
            if (purchase.transaction === undefined || purchase.paymentMethod === undefined) {
                reject();
                return;
            }
            const transaction = purchase.transaction;
            const amount = params.amount;
            const depositAmount = params.depositAmount;
            const additionalProperty = [];
            if (purchase.paymentMethod.paymentMethodType === factory.paymentMethodType.Cash
                && depositAmount !== undefined) {
                // 現金
                additionalProperty.push({ name: 'depositAmount', value: String(depositAmount) });
                additionalProperty.push({ name: 'change', value: String(depositAmount - amount) });
            }
            this.store.dispatch(new purchaseAction.AuthorizeAnyPayment({
                transaction: transaction,
                typeOf: purchase.paymentMethod.paymentMethodType,
                name: purchase.paymentMethod.paymentMethodName,
                amount,
                additionalProperty
            }));
            const success = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.AuthorizeAnyPaymentSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(purchaseAction.ActionTypes.AuthorizeAnyPaymentFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * 決済方法取得
     */
    public selectPaymentMethodType(params: {
        paymentMethodType: factory.paymentMethodType;
        paymentMethodName?: 'RegiGrow'
    }) {
        this.store.dispatch(new purchaseAction.SelectPaymentMethodType(params));
    }
}
