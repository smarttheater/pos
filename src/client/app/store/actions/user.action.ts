import { factory } from '@cinerino/sdk';
import { createAction, props } from '@ngrx/store';
import { Models } from '../..';

const LABEL = '[User]';

export const remove = createAction(
    `${LABEL} remove`,
);

export const updateAll = createAction(
    `${LABEL} updateAll`,
    props<{
        theater: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
        pos?: factory.chevre.place.movieTheater.IPOS;
        entranceGate?: factory.chevre.place.movieTheater.IEntranceGate;
        customerContact: factory.transaction.placeOrder.ICustomerProfile;
        printer: Models.Util.Printer.IPrinter;
        drawer: boolean;
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
