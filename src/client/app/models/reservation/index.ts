import { factory } from '@cinerino/sdk';

export interface IReservationSearchConditions {
    reservationDateFrom?: Date;
    reservationDateThrough?: Date;
    eventStartDateFrom?: Date;
    eventStartDateThrough?: Date;
    id: string;
    reservationNumber: string;
    reservationStatus: '' | factory.chevre.reservationStatusType;
    page: number;
}
