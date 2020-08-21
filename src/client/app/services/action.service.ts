import { Injectable } from '@angular/core';
import { AdmissionService } from './action/admission.service';
import { OrderService } from './action/order.service';
import { PurchaseService } from './action/purchase.service';
import { ReservationService } from './action/reservation.service';
import { UserService } from './action/user.service';

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    constructor(
        public admission: AdmissionService,
        public order: OrderService,
        public purchase: PurchaseService,
        public reservation: ReservationService,
        public user: UserService,
    ) { }
}
