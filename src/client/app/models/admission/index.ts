import { factory } from '@cinerino/sdk';

type IReservation = factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;

export interface IDecodeResult extends factory.ownershipInfo.IOwnershipInfo<IReservation> {
    iat: number;
}
