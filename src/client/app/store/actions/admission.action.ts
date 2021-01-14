
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

