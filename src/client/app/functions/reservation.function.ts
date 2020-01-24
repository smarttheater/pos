import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { getTicketPrice } from './purchase.function';

/**
 * 予約データCSV変換
 */
export function reservation2report(
    reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[]) {
    const data: any[] = [];
        reservations.forEach((reservation) => {
            const customData = {
                bookingTime: reservation.bookingTime,
                bookingTimeJST: moment(reservation.bookingTime).format('YYYY/MM/DD/HH:mm'),
                id: reservation.id,
                reservationNumber: reservation.reservationNumber,
                reservationStatus: reservation.reservationStatus,
                price: (typeof reservation.price === 'number' || reservation.price === undefined)
                    ? reservation.price
                    : getTicketPrice(<any>{ priceSpecification: { priceComponent: reservation.price.priceComponent } }).total,
                reservedTicket: reservation.reservedTicket,
                reservationFor: {
                    ...reservation.reservationFor,
                    startDateJST: moment(reservation.reservationFor.startDate).format('YYYY/MM/DD/HH:mm')
                },
                checkedIn: reservation.checkedIn,
                attended: reservation.attended
            };
            data.push(customData);
        });
    return data;
}
