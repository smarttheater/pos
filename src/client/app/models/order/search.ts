import { factory } from '@cinerino/sdk';

export interface IOrderSearchConditions {
    orderDateFrom?: Date;
    orderDateThrough?: Date;
    confirmationNumber: string;
    orderNumber: string;
    customer: {
        familyName: string;
        givenName: string;
        email: string;
        telephone: string;
    };
    orderStatus: '' | factory.orderStatus;
    paymentMethodType: '' | factory.paymentMethodType;
    eventStartDateFrom?: Date;
    eventStartDateThrough?: Date;
    eventIds?: string[];
    posId: string;
    page: number;
}
