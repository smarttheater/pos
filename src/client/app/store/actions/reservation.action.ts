import { createAction } from '@ngrx/store';
const LABEL = '[Reservation]';

export const remove = createAction(
    `${LABEL} remove`,
);
