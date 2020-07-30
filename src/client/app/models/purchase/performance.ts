import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { getEnvironment } from '../../../environments/environment';

/**
 * Performance
 */
export class Performance {
    public screeningEvent: factory.chevre.event.screeningEvent.IEvent;

    constructor(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        this.screeningEvent = screeningEvent;
    }

    /**
     * 販売判定
     */
    public isSales(status?: 'start' | 'end') {
        const screeningEvent = this.screeningEvent;
        const offers = screeningEvent.offers;
        if (offers === undefined) {
            return false;
        }
        const now = moment().unix();
        const validFrom = moment(offers.validFrom).unix();
        const validThrough = moment(offers.validThrough).unix();
        let result = false;
        switch (status) {
            case 'start':
                result = now < validFrom;
                break;
            case 'end':
                result = validThrough < now;
                break;
            default:
                result = (validFrom < now && now < validThrough);
                break;
        }
        return result;
    }

    /**
     * 座席ステータス判定
     */
    public isSeatStatus(status?: 'success' | 'warning' | 'danger') {
        const screeningEvent = this.screeningEvent;
        const environment = getEnvironment();
        const limitSeatNumber = (screeningEvent.workPerformed === undefined
            || screeningEvent.workPerformed.additionalProperty === undefined)
            ? undefined : screeningEvent.workPerformed.additionalProperty.find(a => a.name === 'limitSeatNumber');
        let remainingAttendeeCapacity = screeningEvent.remainingAttendeeCapacity;
        let maximumAttendeeCapacity = screeningEvent.maximumAttendeeCapacity;
        if (remainingAttendeeCapacity === undefined || maximumAttendeeCapacity === undefined) {
            return status === undefined;
        }
        if (limitSeatNumber !== undefined && maximumAttendeeCapacity > Number(limitSeatNumber.value)) {
            // 作品追加特性（limitSeatNumber）で座席数制御
            remainingAttendeeCapacity = (remainingAttendeeCapacity < (maximumAttendeeCapacity - Number(limitSeatNumber.value)))
                ? 0 : remainingAttendeeCapacity - (maximumAttendeeCapacity - Number(limitSeatNumber.value));
            maximumAttendeeCapacity = Number(limitSeatNumber.value);
        }
        let result = false;
        const unit = environment.PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT;
        const value = Number(environment.PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE);
        if (unit === '%') {
            switch (status) {
                case 'success':
                    result = (remainingAttendeeCapacity !== 0
                        && Math.floor(remainingAttendeeCapacity / maximumAttendeeCapacity * 100) >= value);
                    break;
                case 'warning':
                    result = (remainingAttendeeCapacity !== 0
                        && Math.floor(remainingAttendeeCapacity / maximumAttendeeCapacity * 100) < value
                        && remainingAttendeeCapacity > 0);
                    break;
                case 'danger':
                    result = remainingAttendeeCapacity === 0;
                    break;
                default:
                    break;
            }
            return result;
        } else if (unit === 'count') {
            switch (status) {
                case 'success':
                    result = (remainingAttendeeCapacity !== 0
                        && remainingAttendeeCapacity >= value);
                    break;
                case 'warning':
                    result = (remainingAttendeeCapacity !== 0
                        && remainingAttendeeCapacity < value
                        && remainingAttendeeCapacity > 0);
                    break;
                case 'danger':
                    result = remainingAttendeeCapacity === 0;
                    break;
                default:
                    break;
            }
            return result;
        } else {
            return false;
        }
    }

    /**
     * 座席あり判定
     */
    public isTicketedSeat() {
        const screeningEvent = this.screeningEvent;
        return (screeningEvent.offers !== undefined
            && screeningEvent.offers.itemOffered.serviceOutput !== undefined
            && screeningEvent.offers.itemOffered.serviceOutput.reservedTicket !== undefined
            && screeningEvent.offers.itemOffered.serviceOutput.reservedTicket.ticketedSeat !== undefined);
    }

    /**
     * 在庫無限判定
     */
    public isInfinitetock() {
        const screeningEvent = this.screeningEvent;
        return (screeningEvent.maximumAttendeeCapacity === undefined);
    }


    /**
     * 開場判定
     */
    public isOpenDoor(status?: 'before' | 'after') {
        const now = moment().unix();
        let result: boolean;
        switch (status) {
            case 'before':
                result = now < moment(this.screeningEvent.doorTime).unix();
                break;
            case 'after':
                result = moment(this.screeningEvent.startDate).unix() < now;
                break;
            default:
                result = (moment(this.screeningEvent.doorTime).unix() < now
                && now < moment(this.screeningEvent.startDate).unix());
                break;
        }
        return result;
    }

    /**
     * 上映判定
     */
    public isScreening(status?: 'before' | 'after') {
        const now = moment().unix();
        let result: boolean;
        switch (status) {
            case 'before':
                result = now < moment(this.screeningEvent.startDate).unix();
                break;
            case 'after':
                result = moment(this.screeningEvent.endDate).unix() < now;
                break;
            default:
                result = (moment(this.screeningEvent.startDate).unix() < now
                && now < moment(this.screeningEvent.endDate).unix());
                break;
        }
        return result;
    }

}
