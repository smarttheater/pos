import { factory } from '@cinerino/sdk';
import { createAction, props } from '@ngrx/store';
const LABEL = '[Order]';

export const remove = createAction(
    `${LABEL} remove`,
);

export const cancel = createAction(
    `${LABEL} cancel`,
    props<{
        orders: factory.order.IOrder[];
        language: string;
        agent?: {
            identifier?: factory.person.IIdentifier;
        };
    }>()
);

export const cancelSuccess = createAction(
    `${LABEL} cancelSuccess`,
);

export const cancelFail = createAction(
    `${LABEL} cancelFail`,
    props<{ error: Error }>()
);

export const inquiry = createAction(
    `${LABEL} inquiry`,
    props<{
        confirmationNumber: string;
        customer: {
            email?: string;
            telephone?: string;
        };
    }>()
);

export const inquirySuccess = createAction(
    `${LABEL} inquirySuccess`,
    props<{ order: factory.order.IOrder }>()
);

export const inquiryFail = createAction(
    `${LABEL} inquiryFail`,
    props<{ error: Error }>()
);

export const orderAuthorize = createAction(
    `${LABEL} orderAuthorize`,
    props<{
        orderNumber: string;
        customer: {
            email?: string;
            telephone?: string;
        };
    }>()
);

export const orderAuthorizeSuccess = createAction(
    `${LABEL} orderAuthorizeSuccess`,
    props<{ order: factory.order.IOrder }>()
);

export const orderAuthorizeFail = createAction(
    `${LABEL} orderAuthorizeFail`,
    props<{ error: Error }>()
);
