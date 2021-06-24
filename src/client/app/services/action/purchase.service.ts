import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions, Models } from '../..';
import { getEnvironment } from '../../../environments/environment';
import { purchaseAction } from '../../store/actions';
import * as reducers from '../../store/reducers';
import { CinerinoService } from '../cinerino.service';
import { UtilService } from '../util.service';
import { ActionPaymentService } from './payment.service';

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
        private translate: TranslateService,
        public payment: ActionPaymentService
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
     * 取引開始
     */
    public async startTransaction(params: {
        pos?: factory.chevre.place.movieTheater.IPOS;
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.StartTransaction',
            });
            const environment = getEnvironment();
            const { pos } = params;
            const { seller, customer } = await this.getData();
            if (seller === undefined || seller.id === undefined) {
                throw new Error('seller or seller.id undefined');
            }
            const now = (await this.utilService.getServerTime()).date;
            const agent = {
                identifier: [
                    ...environment.PURCHASE_TRANSACTION_IDENTIFIER,
                    {
                        name: 'userAgent',
                        value:
                            navigator && navigator.userAgent !== undefined
                                ? navigator.userAgent
                                : '',
                    },
                    {
                        name: 'appVersion',
                        value:
                            navigator && navigator.appVersion !== undefined
                                ? navigator.appVersion
                                : '',
                    },
                ],
            };
            if (pos !== undefined) {
                agent.identifier.push({ name: 'posId', value: pos.id });
                agent.identifier.push({ name: 'posName', value: pos.name });
            }
            await this.cinerinoService.getServices();
            const passport = await this.cinerinoService.getPassport({
                scope: `Transaction:PlaceOrder:${seller.id}`,
            });
            const transaction =
                await this.cinerinoService.transaction.placeOrder.start({
                    expires: moment(now)
                        .add(environment.PURCHASE_TRANSACTION_TIME, 'minutes')
                        .toDate(),
                    seller: {
                        typeOf: seller.typeOf,
                        id: seller.id,
                    },
                    object: {
                        passport,
                        customer:
                            customer === undefined || customer.id === undefined
                                ? undefined
                                : { id: customer.id },
                    },
                    agent,
                });
            this.store.dispatch(purchaseAction.setTransaction({ transaction }));
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 取引中止
     */
    public async cancelTransaction() {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.CancelTransaction',
            });
            const { transaction } = await this.getData();
            if (transaction === undefined) {
                return;
            }
            await this.cinerinoService.transaction.placeOrder.cancel({
                id: transaction.id,
            });
            this.store.dispatch(purchaseAction.cancelTransaction());
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 取引確定
     */
    public async confirmTransaction(params: {
        language: string;
        theater: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.ConfirmTransaction',
            });
            const environment = getEnvironment();
            const { language, theater } = params;
            const { transaction, authorizeSeatReservations, seller } =
                await this.getData();
            if (
                transaction === undefined ||
                seller === undefined ||
                theater === undefined
            ) {
                throw new Error('transaction or seller or theater undefined');
            }
            const authorizeEventSeatReservations =
                Functions.Purchase.authorizeSeatReservation2Event({
                    authorizeSeatReservations,
                });
            await this.cinerinoService.getServices();

            const email = {
                ...this.createCompleteMailHeader({ theater, language }),
                template: undefined,
            };
            if (environment.PURCHASE_COMPLETE_MAIL_CUSTOM) {
                // 完了メールをカスタマイズ
                const path = `/ejs/mail/complete/${language}.ejs`;
                const url = (await Functions.Util.isFile(
                    `${Functions.Util.getProject().storageUrl}${path}`
                ))
                    ? `${Functions.Util.getProject().storageUrl}${path}`
                    : `/default${path}`;
                const view = await this.utilService.getText(url);
                email.template = await (<any>window).ejs.render(
                    view,
                    {
                        authorizeSeatReservations:
                            authorizeEventSeatReservations,
                        seller,
                        theater,
                        moment,
                        formatTelephone: Functions.Util.formatTelephone,
                        getItemPrice: Functions.Purchase.getItemPrice,
                        getTicketPrice: Functions.Purchase.getTicketPrice,
                        projectId: Functions.Util.getProject().projectId,
                    },
                    { async: true }
                );
            }
            const result =
                await this.cinerinoService.transaction.placeOrder.confirm({
                    id: transaction.id,
                    sendEmailMessage: true,
                    email,
                });
            const order = result.order;
            try {
                await this.cinerinoService.order.placeOrder({
                    object: {
                        orderNumber: order.orderNumber,
                        confirmationNumber: order.confirmationNumber,
                    },
                    purpose: {
                        typeOf: factory.transactionType.PlaceOrder,
                        id: transaction.id,
                    },
                });
                await this.cinerinoService.delivery.sendOrder({
                    object: {
                        orderNumber: order.orderNumber,
                    },
                });
            } catch (error) {
                console.error(error);
            }

            this.store.dispatch(purchaseAction.setOrder({ order }));
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 完了メールヘッダー生成
     */
    private createCompleteMailHeader(params: {
        theater: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
        language: string;
    }) {
        return {
            sender: {
                name:
                    this.translate.instant(
                        'email.purchase.complete.sender.name'
                    ) === ''
                        ? params.theater.name.ja
                        : this.translate.instant(
                              'email.purchase.complete.sender.name'
                          ),
                email:
                    this.translate.instant(
                        'email.purchase.complete.sender.email'
                    ) === ''
                        ? undefined
                        : this.translate.instant(
                              'email.purchase.complete.sender.email'
                          ),
            },
            toRecipient: {
                name:
                    this.translate.instant(
                        'email.purchase.complete.toRecipient.name'
                    ) === ''
                        ? undefined
                        : this.translate.instant(
                              'email.purchase.complete.toRecipient.name'
                          ),
                email:
                    this.translate.instant(
                        'email.purchase.complete.toRecipient.email'
                    ) === ''
                        ? undefined
                        : this.translate.instant(
                              'email.purchase.complete.toRecipient.email'
                          ),
            },
            about:
                this.translate.instant('email.purchase.complete.about') === ''
                    ? undefined
                    : this.translate.instant('email.purchase.complete.about'),
        };
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
     * 空席情報取得
     */
    public async getScreeningEventSeats() {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.GetScreeningEventSeats',
            });
            const purchase = await this.getData();
            if (purchase.screeningEvent === undefined) {
                throw new Error('purchase.screeningEvent === undefined');
            }
            const screeningEvent = purchase.screeningEvent;
            const limit = 100;
            let page = 1;
            let roop = true;
            let result: factory.chevre.place.seat.IPlaceWithOffer[] = [];
            if (
                !new Models.Purchase.Performance({
                    screeningEvent,
                }).isTicketedSeat()
            ) {
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
     * 券種一覧取得
     */
    public async searchTicketOffers() {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.SearchTicketOffers',
            });
            const { screeningEvent, seller } = await this.getData();
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

    /**
     * チケット選択
     */
    public selectTickets(
        reservations: Models.Purchase.Reservation.IReservation[]
    ) {
        this.store.dispatch(purchaseAction.selectTickets({ reservations }));
    }

    /**
     * 座席仮予約
     */
    public async authorizeSeatReservation(params: {
        reservations: Models.Purchase.Reservation.IReservation[];
        additionalTicketText?: string;
        screeningEventSeats: factory.chevre.place.seat.IPlaceWithOffer[];
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.AuthorizeSeatReservation',
            });
            const { additionalTicketText, screeningEventSeats } = params;
            const {
                transaction,
                authorizeSeatReservation,
                screeningEvent,
                screeningEventTicketOffers,
            } = await this.getData();
            const reservations = params.reservations.map((r) => {
                return {
                    seat: r.seat,
                    ticket:
                        r.ticket === undefined
                            ? { ticketOffer: screeningEventTicketOffers[0] }
                            : r.ticket,
                };
            });
            if (transaction === undefined || screeningEvent === undefined) {
                throw new Error('transaction or screeningEvent undefined');
            }
            await this.cinerinoService.getServices();
            if (authorizeSeatReservation !== undefined) {
                await this.cinerinoService.transaction.placeOrder.voidSeatReservation(
                    authorizeSeatReservation
                );
            }
            const availableSeats = Functions.Purchase.selectAvailableSeat({
                reservations,
                screeningEventSeats,
            });
            const isTicketedSeat = new Models.Purchase.Performance({
                screeningEvent,
            }).isTicketedSeat();
            if (
                isTicketedSeat &&
                availableSeats.length !== reservations.length
            ) {
                throw new Error('Out of stock');
            }
            const authorizeResult =
                await this.cinerinoService.transaction.placeOrder.authorizeSeatReservation(
                    {
                        object: {
                            reservationFor: { id: screeningEvent.id },
                            acceptedOffer: reservations.map((r, index) => {
                                if (
                                    r.ticket === undefined ||
                                    r.ticket.ticketOffer.id === undefined
                                ) {
                                    throw new Error(
                                        'ticket or ticket.ticketOffer.id is undefined'
                                    );
                                }
                                return {
                                    id: r.ticket.ticketOffer.id,
                                    addOn:
                                        r.ticket.addOn === undefined
                                            ? undefined
                                            : r.ticket.addOn
                                                  .filter(
                                                      (a) => a.id !== undefined
                                                  )
                                                  .map((a) => ({
                                                      id: <string>a.id,
                                                  })),
                                    additionalProperty: [],
                                    itemOffered: {
                                        serviceOutput: {
                                            typeOf: factory.chevre
                                                .reservationType
                                                .EventReservation,
                                            additionalProperty:
                                                screeningEvent.workPerformed ===
                                                    undefined ||
                                                screeningEvent.workPerformed
                                                    .additionalProperty ===
                                                    undefined
                                                    ? []
                                                    : [
                                                          ...screeningEvent.workPerformed.additionalProperty.filter(
                                                              (a) =>
                                                                  a.value !== ''
                                                          ),
                                                      ],
                                            additionalTicketText:
                                                additionalTicketText,
                                            reservedTicket: {
                                                typeOf: 'Ticket',
                                                ticketedSeat: isTicketedSeat
                                                    ? availableSeats[index]
                                                    : undefined,
                                            },
                                            subReservation: isTicketedSeat
                                                ? availableSeats[
                                                      index
                                                  ].subReservations.map(
                                                      (ticketedSeat) => ({
                                                          reservedTicket: {
                                                              typeOf: 'Ticket',
                                                              ticketedSeat,
                                                          },
                                                      })
                                                  )
                                                : undefined,
                                        },
                                    },
                                };
                            }),
                        },
                        purpose: transaction,
                    }
                );
            this.store.dispatch(
                purchaseAction.setAuthorizeSeatReservation({
                    addAuthorizeSeatReservation: authorizeResult,
                    removeAuthorizeSeatReservation: authorizeSeatReservation,
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
     * 座席仮予約取り消し
     */
    public async voidSeatReservation(params: {
        authorizeSeatReservations: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>[];
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.VoidSeatReservation',
            });
            const { authorizeSeatReservations } = params;
            await this.cinerinoService.getServices();
            for (const authorizeSeatReservation of authorizeSeatReservations) {
                await this.cinerinoService.transaction.placeOrder.voidSeatReservation(
                    authorizeSeatReservation
                );
            }

            this.store.dispatch(
                purchaseAction.voidSeatReservation({
                    authorizeSeatReservations,
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
     * 購入者情報登録
     */
    public async setProfile(params: { profile: factory.person.IProfile }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.SetProfile',
            });
            const { profile } = params;
            const { transaction } = await this.getData();
            if (transaction === undefined) {
                throw new Error('transaction undefined');
            }
            await this.cinerinoService.getServices();
            await this.cinerinoService.transaction.placeOrder.setProfile({
                id: transaction.id,
                agent: {
                    ...profile,
                    telephone:
                        profile.telephone === undefined
                            ? undefined
                            : Functions.Util.formatTelephone(profile.telephone),
                },
            });
            this.store.dispatch(purchaseAction.setProfile({ profile }));
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
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
