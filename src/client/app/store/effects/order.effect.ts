import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { map, mergeMap } from 'rxjs/operators';
import { Functions } from '../..';
import { getEnvironment } from '../../../environments/environment';
import { CinerinoService, UtilService } from '../../services';
import { orderAction } from '../actions';

/**
 * Order Effects
 */
@Injectable()
export class OrderEffects {

    constructor(
        private actions: Actions,
        private cinerino: CinerinoService,
        private utilService: UtilService,
        private translate: TranslateService,
    ) { }

    /**
     * Cancel
     */
    @Effect()
    public cancel = this.actions.pipe(
        ofType(orderAction.cancel),
        map(action => action),
        mergeMap(async (payload) => {
            const orders = payload.orders;
            const environment = getEnvironment();
            const agent = payload.agent;
            try {
                await this.cinerino.getServices();
                for (const order of orders) {
                    const startResult = await this.cinerino.transaction.returnOrder.start({
                        expires: moment().add(1, 'day').add(-1, 'millisecond').toDate(),
                        object: {
                            order: {
                                orderNumber: order.orderNumber,
                                customer: {
                                    telephone: order.customer.telephone,
                                }
                            }
                        },
                        agent
                    });
                    const creditCards = order.paymentMethods.filter(p => p.typeOf === factory.paymentMethodType.CreditCard);
                    const email: factory.creativeWork.message.email.ICustomization = {
                        sender: {
                            name: (this.translate.instant('email.order.return.sender.name') === '')
                                ? undefined : this.translate.instant('email.order.return.sender.name'),
                            email: (this.translate.instant('email.order.return.sender.email') === '')
                                ? undefined : this.translate.instant('email.order.return.sender.email')
                        },
                        toRecipient: {
                            name: (this.translate.instant('email.order.return.toRecipient.name') === '')
                                ? undefined : this.translate.instant('email.order.return.toRecipient.name'),
                            email: (this.translate.instant('email.order.return.toRecipient.email') === '')
                                ? undefined : this.translate.instant('email.order.return.toRecipient.email')
                        },
                        about: (this.translate.instant('email.order.return.about') === '')
                            ? undefined : this.translate.instant('email.order.return.about'),
                        template: undefined
                    };
                    if (environment.ORDER_CANCEL_MAIL_CUSTOM) {
                        // 返品メールをカスタマイズ
                        const path = `/ejs/mail/return/${payload.language}.ejs`;
                        const url = (await Functions.Util.isFile(`${Functions.Util.getProject().storageUrl}${path}`))
                            ? `${Functions.Util.getProject().storageUrl}${path}`
                            : `/default${path}`;
                        const view = await this.utilService.getText(url);
                        const template = await (<any>window).ejs.render(view, {
                            moment,
                            formatTelephone: Functions.Util.formatTelephone,
                            getItemPrice: Functions.Purchase.getItemPrice
                        }, { async: true });
                        email.template = template;
                    }
                    const refundCreditCardEmail: factory.creativeWork.message.email.ICustomization = {
                        sender: {
                            name: (this.translate.instant('email.order.refundCreditCard.sender.name') === '')
                                ? undefined : this.translate.instant('email.order.refundCreditCard.sender.name'),
                            email: (this.translate.instant('email.order.refundCreditCard.sender.email') === '')
                                ? undefined : this.translate.instant('email.order.refundCreditCard.sender.email')
                        },
                        toRecipient: {
                            name: (this.translate.instant('email.order.refundCreditCard.toRecipient.name') === '')
                                ? undefined : this.translate.instant('email.order.refundCreditCard.toRecipient.name'),
                            email: (this.translate.instant('email.order.refundCreditCard.toRecipient.email') === '')
                                ? undefined : this.translate.instant('email.order.refundCreditCard.toRecipient.email')
                        },
                        about: (this.translate.instant('email.order.refundCreditCard.about') === '')
                            ? undefined : this.translate.instant('email.order.refundCreditCard.about'),
                        template: undefined
                    };
                    if (environment.ORDER_CANCEL_MAIL_CUSTOM) {
                        // 返金メールをカスタマイズ
                        const path = `/ejs/mail/refundCreditCard/${payload.language}.ejs`;
                        const url = (await Functions.Util.isFile(`${Functions.Util.getProject().storageUrl}${path}`))
                            ? `${Functions.Util.getProject().storageUrl}${path}`
                            : `/default${path}`;
                        const view = await this.utilService.getText(url);
                        const template = await (<any>window).ejs.render(view, {
                            moment,
                            formatTelephone: Functions.Util.formatTelephone,
                            getItemPrice: Functions.Purchase.getItemPrice
                        }, { async: true });
                        refundCreditCardEmail.template = template;
                    }
                    await this.cinerino.transaction.returnOrder.confirm({
                        id: startResult.id,
                        potentialActions: {
                            returnOrder: {
                                potentialActions: {
                                    refundCreditCard: creditCards.map((c) => {
                                        return {
                                            object: { object: [{ paymentMethod: { paymentMethodId: c.paymentMethodId } }] },
                                            potentialActions: { sendEmailMessage: { object: refundCreditCardEmail } }
                                        };
                                    }),
                                    sendEmailMessage: [{ object: email }]
                                }
                            }
                        }
                    });
                }
                const orderStatusWatch = () => {
                    return new Promise<void>(async (resolve, reject) => {
                        const limit = 10;
                        for (let i = 0; i < limit; i++) {
                            try {
                                const searchResult = await this.cinerino.order.search({
                                    orderNumbers: orders.map(o => o.orderNumber)
                                });
                                const filterResult = searchResult.data.filter(o => o.orderStatus !== factory.orderStatus.OrderReturned);
                                if (filterResult.length === 0) {
                                    return resolve();
                                }
                                if (i > limit) {
                                    return reject({ error: 'timeout' });
                                }
                                await Functions.Util.sleep(5000);
                            } catch (error) {
                                return reject(error);
                            }
                        }
                    });
                };
                await orderStatusWatch();

                return orderAction.cancelSuccess();
            } catch (error) {
                return orderAction.cancelFail({ error: error });
            }
        })
    );

    /**
     * inquiry
     */
    @Effect()
    public inquiry = this.actions.pipe(
        ofType(orderAction.inquiry),
        map(action => action),
        mergeMap(async (payload) => {
            const environment = getEnvironment();
            try {
                await this.cinerino.getServices();
                const now = (await this.utilService.getServerTime()).date;
                const today = moment(moment(now).format('YYYYMMDD')).toISOString();
                const confirmationNumber = payload.confirmationNumber;
                const customer = {
                    telephone: (payload.customer.telephone === undefined)
                        ? '' : Functions.Util.formatTelephone(payload.customer.telephone)
                };
                const orderDateFrom = {
                    value: environment.INQUIRY_ORDER_DATE_FROM_VALUE,
                    unit: environment.INQUIRY_ORDER_DATE_FROM_UNIT
                };
                const params = {
                    confirmationNumber,
                    customer,
                    orderDateFrom: moment(today).add(orderDateFrom.value, orderDateFrom.unit).toDate(),
                    orderDateThrough: moment(now).toDate()
                };
                const order = await this.cinerino.order.findByConfirmationNumber(params);

                return orderAction.inquirySuccess({
                    order: (Array.isArray(order)) ? order[0] : order
                });
            } catch (error) {
                return orderAction.inquiryFail({ error: error });
            }
        })
    );

}
