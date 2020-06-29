import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PurchaseCinemaScheduleComponent } from './components/pages/cinema/purchase-cinema-schedule/purchase-cinema-schedule.component';
import { PurchaseCinemaSeatComponent } from './components/pages/cinema/purchase-cinema-seat/purchase-cinema-seat.component';
import { PurchaseCinemaTicketComponent } from './components/pages/cinema/purchase-cinema-ticket/purchase-cinema-ticket.component';
import { PurchaseEventScheduleComponent } from './components/pages/event/purchase-event-schedule/purchase-event-schedule.component';
import { PurchaseEventSeatTicketComponent } from './components/pages/event/purchase-event-seat-ticket/purchase-event-seat-ticket.component';
import { PurchaseEventSeatComponent } from './components/pages/event/purchase-event-seat/purchase-event-seat.component';
import { PurchaseEventTicketComponent } from './components/pages/event/purchase-event-ticket/purchase-event-ticket.component';
import { PurchaseBaseComponent } from './components/pages/purchase-base/purchase-base.component';
import { PurchaseCompleteComponent } from './components/pages/purchase-complete/purchase-complete.component';
import { PurchaseConfirmComponent } from './components/pages/purchase-confirm/purchase-confirm.component';
import { PurchasePaymentComponent } from './components/pages/purchase-payment/purchase-payment.component';
import { PurchaseRootComponent } from './components/pages/purchase-root/purchase-root.component';
import { PurchaseSeatComponent } from './components/pages/purchase-seat/purchase-seat.component';
import { PurchaseTicketComponent } from './components/pages/purchase-ticket/purchase-ticket.component';
import { PurchaseEventPerformancesConfirmComponent } from './components/parts/event/performances-confirm/performances-confirm.component';
import { PurchasePerformanceComponent } from './components/parts/performance/performance.component';
import { PurchasePerformancesComponent } from './components/parts/performances/performances.component';
import { PurchaseInfoComponent } from './components/parts/purchase-info/purchase-info.component';
import { PurchaseTermsComponent } from './components/parts/purchase-terms/purchase-terms.component';
import { PurchaseWarningComponent } from './components/parts/purchase-warning/purchase-warning.component';
import { SeatInfoComponent } from './components/parts/seat-info/seat-info.component';
import { TransactionRemainingTimeComponent } from './components/parts/transaction-remaining-time/transaction-remaining-time.component';
import { PurchaseRoutingModule } from './purchase-routing.module';


@NgModule({
  declarations: [
    PurchaseBaseComponent,
    PurchaseRootComponent,
    PurchaseCinemaSeatComponent,
    PurchaseCinemaTicketComponent,
    PurchaseEventTicketComponent,
    PurchasePaymentComponent,
    PurchaseConfirmComponent,
    PurchaseCompleteComponent,
    PurchaseCinemaScheduleComponent,
    PurchaseEventScheduleComponent,
    PurchasePerformanceComponent,
    PurchasePerformancesComponent,
    PurchaseEventPerformancesConfirmComponent,
    PurchaseInfoComponent,
    PurchaseTermsComponent,
    PurchaseWarningComponent,
    TransactionRemainingTimeComponent,
    PurchaseEventSeatComponent,
    PurchaseEventSeatTicketComponent,
    PurchaseTicketComponent,
    PurchaseSeatComponent,
    SeatInfoComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SharedModule,
  ]
})
export class PurchaseModule { }
