import { factory } from '@cinerino/api-javascript-client';

export interface IReservationSearchConditions {
    reservationDateFrom: string;
    reservationDateThrough: string;
    id: string;
    reservationNumber: string;
    reservationStatus: '' | factory.chevre.reservationStatusType;
    page: number;
}
