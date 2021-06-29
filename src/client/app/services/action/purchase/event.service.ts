import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../..';
import { purchaseAction } from '../../../store/actions';
import * as reducers from '../../../store/reducers';
import { CinerinoService } from '../../cinerino.service';
import { UtilService } from '../../util.service';
import { ActionStoreService } from '../store.service';

@Injectable({
    providedIn: 'root',
})
export class ActionEventService {
    public error: Observable<string | null>;
    constructor(
        private store: Store<reducers.IState>,
        private cinerinoService: CinerinoService,
        private utilService: UtilService,
        private storeService: ActionStoreService
    ) {
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * イベント取得
     */
    public async getScreeningEvent(params: { id: string }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.GetScreeningEvent',
            });
            const { id } = params;
            await this.cinerinoService.getServices();
            const screeningEvent =
                await this.cinerinoService.event.findById<factory.chevre.eventType.ScreeningEvent>(
                    { id }
                );
            const searchMovie = (
                await this.cinerinoService.creativeWork.searchMovies({
                    identifier:
                        screeningEvent.workPerformed === undefined
                            ? undefined
                            : screeningEvent.workPerformed.identifier,
                })
            ).data[0];
            if (screeningEvent.workPerformed !== undefined) {
                screeningEvent.workPerformed.additionalProperty =
                    searchMovie.additionalProperty;
            }
            this.store.dispatch(
                purchaseAction.setScreeningEvent({ screeningEvent })
            );
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 空席情報取得
     */
    public async getScreeningEventSeats() {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.GetScreeningEventSeats',
            });
            const purchase = await this.storeService.getPurchaseData();
            if (purchase.screeningEvent === undefined) {
                throw new Error('purchase.screeningEvent === undefined');
            }
            const screeningEvent = purchase.screeningEvent;
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: factory.chevre.place.seat.IPlaceWithOffer[] = [];
            const isTicketedSeat = new Models.Purchase.Performance({
                screeningEvent,
            }).isTicketedSeat();
            if (!isTicketedSeat) {
                this.utilService.loadEnd();
                return result;
            }
            await this.cinerinoService.getServices();
            while (roop) {
                const searchResult =
                    await this.cinerinoService.event.searchSeats({
                        event: { id: screeningEvent.id },
                        page,
                        limit,
                    });
                result = [...result, ...searchResult.data];
                page++;
                roop = searchResult.data.length === limit;
                if (roop) {
                    await Functions.Util.sleep();
                }
            }
            this.utilService.loadEnd();
            return result;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 券種一覧取得
     */
    public async searchTicketOffers() {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.SearchTicketOffers',
            });
            const { screeningEvent, seller } =
                await this.storeService.getPurchaseData();
            const clientId = this.cinerinoService.auth.options.clientId;
            if (
                screeningEvent === undefined ||
                seller === undefined ||
                seller.id === undefined ||
                clientId === undefined
            ) {
                throw new Error(
                    'screeningEvent or seller or clientId undefined'
                );
            }
            await this.cinerinoService.getServices();
            const ticketOffers =
                await this.cinerinoService.event.searchTicketOffers({
                    event: { id: screeningEvent.id },
                    seller: {
                        typeOf: seller.typeOf,
                        id: seller.id,
                    },
                    store: {
                        id: clientId,
                    },
                });
            this.store.dispatch(
                purchaseAction.setTicketOffers({
                    ticketOffers,
                })
            );
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }
}
