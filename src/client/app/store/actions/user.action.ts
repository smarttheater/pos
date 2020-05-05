import { factory } from '@cinerino/api-javascript-client';
import { createAction, props } from '@ngrx/store';
import { IPrinter } from '../../models';

const LABEL = '[User]';

export const remove = createAction(
    `${LABEL} remove`,
);

export const updateAll = createAction(
    `${LABEL} updateAll`,
    props<{
        pos?: factory.chevre.place.movieTheater.IPOS;
        theater: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
        customerContact: factory.transaction.placeOrder.ICustomerProfile;
        printer: IPrinter;
    }>()
);

export const updateLanguage = createAction(
    `${LABEL} updateLanguage`,
    props<{ language: string }>()
);

export const setVersion = createAction(
    `${LABEL} setVersion`,
    props<{ version: string }>()
);
