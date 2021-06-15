import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReservationDownloadComponent } from './components/pages/reservation-download/reservation-download.component';
import { ReservationIndexComponent } from './components/pages/reservation-index/reservation-index.component';
import { ReservationSearchComponent } from './components/pages/reservation-search/reservation-search.component';
import { ReservationConditionComponent } from './components/parts/reservation-condition/reservation-condition.component';
import { ReservationTableComponent } from './components/parts/reservation-table/reservation-table.component';
import { ReservationRoutingModule } from './reservation-routing.module';

@NgModule({
    declarations: [
        ReservationSearchComponent,
        ReservationDownloadComponent,
        ReservationIndexComponent,
        ReservationConditionComponent,
        ReservationTableComponent,
    ],
    imports: [CommonModule, ReservationRoutingModule, SharedModule],
})
export class ReservationModule {}
