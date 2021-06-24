import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Models } from '../..';
import { purchaseAction } from '../../store/actions';
import * as reducers from '../../store/reducers';
import { CinerinoService } from '../cinerino.service';
import { UtilService } from '../util.service';
import { ActionEventService } from './purchase/event.service';
import { ActionPaymentService } from './purchase/payment.service';
import { ActionTransactionService } from './purchase/transaction.service';

@Injectable({
    providedIn: 'root',
})
export class PurchaseService {
    public purchase: Observable<reducers.IPurchaseState>;
    public error: Observable<string | null>;

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private cinerinoService: CinerinoService,
        public payment: ActionPaymentService,
        public transaction: ActionTransactionService,
        public event: ActionEventService
    ) {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * 購入データ取得
     */
    public async getData() {
        return new Promise<reducers.IPurchaseState>((resolve) => {
            this.purchase
                .subscribe((purchase) => {
                    resolve(purchase);
                })
                .unsubscribe();
        });
    }

    /**
     * 購入データ削除
     */
    public delete() {
        this.store.dispatch(purchaseAction.remove());
    }

    /**
     * 購入一時データ削除
     */
    public unsettledDelete() {
        this.store.dispatch(purchaseAction.unsettledDelete());
    }

    /**
     * 販売者取得
     */
    public async getSeller(params: { id: string }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.GetSeller',
            });
            await this.cinerinoService.getServices();
            const { id } = params;
            const seller = await this.cinerinoService.seller.findById({ id });
            this.store.dispatch(purchaseAction.setSeller({ seller }));
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * スケジュール日選択
     */
    public selectScheduleDate(scheduleDate: string) {
        this.store.dispatch(
            purchaseAction.selectScheduleDate({ scheduleDate })
        );
    }

    /**
     * スクリーン取得
     */
    public async getScreeningRoom(params: {
        limit?: number;
        page?: number;
        branchCode?: {
            $eq?: string;
        };
        containedInPlace?: {
            branchCode?: {
                $eq?: string;
            };
        };
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.GetScreeningRoom',
            });
            await this.cinerinoService.getServices();
            const searchResult = (
                await this.cinerinoService.place.searchScreeningRooms(params)
            ).data;
            this.store.dispatch(
                purchaseAction.setScreeningRoom({
                    screeningRoom: searchResult[0],
                })
            );
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 座席選択
     */
    public selectSeats(seats: Models.Purchase.Reservation.IReservationSeat[]) {
        this.store.dispatch(purchaseAction.selectSeats({ seats }));
    }

    /**
     * 座席選択解除
     */
    public cancelSeats(seats: Models.Purchase.Reservation.IReservationSeat[]) {
        this.store.dispatch(purchaseAction.cancelSeats({ seats }));
    }

    /**
     * チケット選択
     */
    public selectTickets(
        reservations: Models.Purchase.Reservation.IReservation[]
    ) {
        this.store.dispatch(purchaseAction.selectTickets({ reservations }));
    }

    /**
     * 決済方法取得
     */
    public selectPaymentMethodType(params: {
        typeOf: factory.paymentMethodType;
        category?: string;
    }) {
        this.store.dispatch(purchaseAction.selectPaymentMethodType(params));
    }

    /**
     * 顧客設定
     */
    public setCustomer(params: {
        customer: factory.chevre.organization.IOrganization;
    }) {
        this.store.dispatch(purchaseAction.setCustomer(params));
    }
}
