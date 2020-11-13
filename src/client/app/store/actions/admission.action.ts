
import { factory } from '@cinerino/sdk';
import { createAction, props } from '@ngrx/store';
const LABEL = '[Admission]';

export const remove = createAction(
    `${LABEL} remove`,
);

export const selectSchedule = createAction(
    `${LABEL} selectSchedule`,
    props<{ screeningEvent: factory.chevre.event.screeningEvent.IEvent }>()
);

export const selectScheduleDate = createAction(
    `${LABEL} selectScheduleDate`,
    props<{ scheduleDate: string }>()
);

export const getScreeningEvent = createAction(
    `${LABEL} getScreeningEvent`,
    props<{ screeningEvent: factory.chevre.event.screeningEvent.IEvent }>()
);
export const getScreeningEventSuccess = createAction(
    `${LABEL} getScreeningEventSuccess`,
    props<{ screeningEvent: factory.chevre.event.screeningEvent.IEvent }>()
);

export const getScreeningEventFail = createAction(
    `${LABEL} getScreeningEventFail`,
    props<{ error: Error }>()
);

export const initializeQrcodeToken = createAction(
    `${LABEL} initializeQrcodeToken`,
);

export const check = createAction(
    `${LABEL} check`,
    props<{
        code: string;
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
        scheduleDate: Date;
        specified: boolean;
    }>()
);

export const checkSuccess = createAction(
    `${LABEL} checkSuccess`,
    props<{
        qrcodeToken: {
            availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
            checkTokenActions: factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[] | string[];
            statusCode: number;
        };
        screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    }>()
);

export const checkFail = createAction(
    `${LABEL} checkFail`,
    props<{ error: Error }>()
);
