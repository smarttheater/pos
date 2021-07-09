import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Functions } from '../../..';
import { purchaseAction } from '../../../store/actions';
import * as reducers from '../../../store/reducers';
import { CinerinoService } from '../../cinerino.service';
import { UtilService } from '../../util.service';
import { ActionStoreService } from '../store.service';

@Injectable({
    providedIn: 'root',
})
export class ActionPaymentService {
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
     * ムビチケ承認
     */
    public async authorizeMovieTicket() {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.AuthorizeMovieTicket',
            });
            const {
                authorizeMovieTicketPayments,
                transaction,
                pendingMovieTickets,
                authorizeSeatReservations,
                seller,
            } = await this.storeService.getPurchaseData();
            if (transaction === undefined || seller === undefined) {
                throw new Error('transaction or seller undefined');
            }
            if (authorizeMovieTicketPayments.length > 0) {
                for (const authorizeMovieTicketPayment of authorizeMovieTicketPayments) {
                    await this.cinerinoService.payment.voidTransaction(
                        authorizeMovieTicketPayment
                    );
                }
            }
            const authorizeResults: factory.action.authorize.paymentMethod.any.IAction[] =
                [];
            for (const authorizeSeatReservation of authorizeSeatReservations) {
                const movieTickets =
                    Functions.Purchase.createMovieTicketsFromAuthorizeSeatReservation(
                        {
                            authorizeSeatReservation,
                            pendingMovieTickets,
                            seller,
                        }
                    );
                const movieTicketIdentifiers: {
                    identifier: string;
                    movieTickets: factory.chevre.paymentMethod.paymentCard.movieTicket.IMovieTicket[];
                }[] = [];
                movieTickets.forEach((movieTicket) => {
                    const findResult = movieTicketIdentifiers.find(
                        (movieTicketIdentifier) => {
                            return (
                                movieTicketIdentifier.identifier ===
                                movieTicket.identifier
                            );
                        }
                    );
                    if (findResult === undefined) {
                        movieTicketIdentifiers.push({
                            identifier: movieTicket.identifier,
                            movieTickets: [movieTicket],
                        });
                        return;
                    }
                    findResult.movieTickets.push(movieTicket);
                });
                for (const movieTicketIdentifier of movieTicketIdentifiers) {
                    const authorizeResult =
                        await this.cinerinoService.payment.authorizeMovieTicket(
                            {
                                object: {
                                    typeOf: factory.action.authorize
                                        .paymentMethod.any.ResultType.Payment,
                                    amount: 0,
                                    movieTickets:
                                        movieTicketIdentifier.movieTickets,
                                    paymentMethod:
                                        movieTicketIdentifier.movieTickets[0]
                                            .typeOf,
                                },
                                purpose: transaction,
                            }
                        );
                    authorizeResults.push(authorizeResult);
                }
            }
            this.store.dispatch(
                purchaseAction.setAuthorizeMovieTicket({ authorizeResults })
            );
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * ムビチケ認証
     */
    public async checkMovieTicket(params: {
        movieTicket: {
            code: string;
            password: string;
        };
        paymentMethodType: factory.paymentMethodType | 'SurfRock';
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.CheckMovieTicket',
            });
            const movieTickets = [
                {
                    typeOf: params.paymentMethodType,
                    identifier: params.movieTicket.code, // 購入管理番号
                    accessCode: params.movieTicket.password, // PINコード
                },
            ];
            const { transaction, screeningEvent } =
                await this.storeService.getPurchaseData();
            if (
                transaction === undefined ||
                transaction.seller.id === undefined ||
                screeningEvent === undefined
            ) {
                throw new Error(
                    'transaction or transaction.seller.id or screeningEvent undefined'
                );
            }
            const checkMovieTicket =
                await this.cinerinoService.payment.checkMovieTicket({
                    typeOf: movieTickets[0].typeOf,
                    movieTickets: movieTickets.map((movieTicket) => {
                        return {
                            ...movieTicket,
                            project: screeningEvent.project,
                            serviceType: '', // 情報空でよし
                            serviceOutput: {
                                reservationFor: {
                                    typeOf: screeningEvent.typeOf,
                                    id: screeningEvent.id,
                                },
                                reservedTicket: {
                                    ticketedSeat: {
                                        typeOf: factory.chevre.placeType.Seat,
                                        seatingType: '', // 情報空でよし
                                        seatNumber: '', // 情報空でよし
                                        seatRow: '', // 情報空でよし
                                        seatSection: '', // 情報空でよし
                                    },
                                },
                            },
                        };
                    }),
                    seller: {
                        typeOf: transaction.seller.typeOf,
                        id: transaction.seller.id,
                    },
                });

            this.store.dispatch(
                purchaseAction.setCheckMovieTicket({ checkMovieTicket })
            );
            this.utilService.loadEnd();
            return checkMovieTicket;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * 対面決済承認
     */
    public async authorizeAnyPayment(params: {
        data: {
            paymentMethod: string;
            name?: string;
            amount: number;
            additionalProperty?: { name: string; value: any }[];
        }[];
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.AuthorizeAnyPayment',
            });
            const { transaction } = await this.storeService.getPurchaseData();
            if (transaction === undefined) {
                throw new Error('transaction undefined');
            }
            const typeOf =
                factory.action.authorize.paymentMethod.any.ResultType.Payment;
            const authorizeResults = [];
            for (const data of params.data) {
                await this.cinerinoService.getServices();
                const authorizeAnyPayment =
                    await this.cinerinoService.payment.authorizeAnyPayment({
                        object: {
                            ...data,
                            typeOf,
                        },
                        purpose: transaction,
                    });
                authorizeResults.push(authorizeAnyPayment);
            }
            this.store.dispatch(
                purchaseAction.setauthorizeAnyPayment({ authorizeResults })
            );
            this.utilService.loadEnd();
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     * プロダクト認証
     */
    public async checkProduct(params: {
        input: {
            identifier: string;
            accessCode: string;
        };
    }) {
        try {
            this.utilService.loadStart({
                process: 'purchaseAction.CheckProduct',
            });
            await this.cinerinoService.getServices();
            const { code } = await this.cinerinoService.serviceOutput.authorize(
                {
                    object: params.input,
                }
            );
            const { token } = await this.cinerinoService.token.getToken({
                code,
            });
            const { typeOfGood } =
                jwtDecode<{ typeOfGood: factory.product.IProduct }>(token);
            const checkProduct = {
                code,
                token,
                typeOfGood,
            };
            this.store.dispatch(
                purchaseAction.setCheckProduct({ checkProduct })
            );
            this.utilService.loadEnd();
            return checkProduct;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }
}
