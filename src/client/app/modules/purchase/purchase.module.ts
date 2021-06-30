import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PurchaseCinemaScheduleComponent } from './components/pages/cinema/purchase-cinema-schedule/purchase-cinema-schedule.component';
import { PurchaseCinemaSeatComponent } from './components/pages/cinema/purchase-cinema-seat/purchase-cinema-seat.component';
import { PurchaseCinemaTicketComponent } from './components/pages/cinema/purchase-cinema-ticket/purchase-cinema-ticket.component';
import { PurchaseEventDateComponent } from './components/pages/event/purchase-event-date/purchase-event-date.component';
import { PurchaseEventScheduleComponent } from './components/pages/event/purchase-event-schedule/purchase-event-schedule.component';
import { PurchaseEventSeatComponent } from './components/pages/event/purchase-event-seat/purchase-event-seat.component';
import { PurchaseEventTicketComponent } from './components/pages/event/purchase-event-ticket/purchase-event-ticket.component';
import { PurchaseBaseComponent } from './components/pages/purchase-base/purchase-base.component';
import { PurchaseCompleteComponent } from './components/pages/purchase-complete/purchase-complete.component';
import { PurchaseConfirmComponent } from './components/pages/purchase-confirm/purchase-confirm.component';
import { PurchaseInputComponent } from './components/pages/purchase-input/purchase-input.component';
import { PurchaseRootComponent } from './components/pages/purchase-root/purchase-root.component';
import { PurchaseSeatComponent } from './components/pages/purchase-seat/purchase-seat.component';
import { PurchaseTicketComponent } from './components/pages/purchase-ticket/purchase-ticket.component';
import { PurchaseEventPerformancesConfirmComponent } from './components/parts/event/performances-confirm/performances-confirm.component';
import { InputTicketsComponent } from './components/parts/input-tickets/input-tickets.component';
import { PurchaseInfoComponent } from './components/parts/purchase-info/purchase-info.component';
import { PurchaseTermsComponent } from './components/parts/purchase-terms/purchase-terms.component';
import { PurchaseWarningComponent } from './components/parts/purchase-warning/purchase-warning.component';
import { SeatInfoComponent } from './components/parts/seat-info/seat-info.component';
import { PurchaseRoutingModule } from './purchase-routing.module';

@NgModule({
    declarations: [
        PurchaseBaseComponent,
        PurchaseRootComponent,
        PurchaseCinemaSeatComponent,
        PurchaseCinemaTicketComponent,
        PurchaseEventScheduleComponent,
        PurchaseConfirmComponent,
        PurchaseCompleteComponent,
        PurchaseCinemaScheduleComponent,
        PurchaseEventDateComponent,
        PurchaseEventPerformancesConfirmComponent,
        PurchaseInfoComponent,
        PurchaseTermsComponent,
        PurchaseWarningComponent,
        PurchaseEventSeatComponent,
        PurchaseEventTicketComponent,
        PurchaseTicketComponent,
        PurchaseSeatComponent,
        PurchaseInputComponent,
        SeatInfoComponent,
        InputTicketsComponent,
    ],
    imports: [CommonModule, PurchaseRoutingModule, SharedModule],
})
export class PurchaseModule {}
