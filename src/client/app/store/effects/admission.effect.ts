import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CinerinoService } from '../../services';
import { admissionAction } from '../actions';

/**
 * AdmissionEffects
 */
@Injectable()
export class AdmissionEffects {

    constructor(
        private actions: Actions,
        private cinerino: CinerinoService,
    ) { }

    /**
     * getScreeningEvent
     */
    @Effect()
    public getScreeningEvent = this.actions.pipe(
        ofType(admissionAction.getScreeningEvent),
        map(action => action),
        mergeMap(async (payload) => {
            // console.log(payload);
            try {
                await this.cinerino.getServices();
                const screeningEvent = await this.cinerino.event.findById<factory.chevre.eventType.ScreeningEvent>({
                    id: payload.screeningEvent.id
                });
                return admissionAction.getScreeningEventSuccess({ screeningEvent });
            } catch (error) {
                return admissionAction.getScreeningEventFail({ error: error });
            }
        })
    );
}
