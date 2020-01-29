import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReservationDownloadComponent } from './components/pages/reservation-download/reservation-download.component';
import { ReservationIndexComponent } from './components/pages/reservation-index/reservation-index.component';
import {
  ReservationSearchUnlimitedComponent
} from './components/pages/reservation-search-unlimited/reservation-search-unlimited.component';
import { ReservationSearchComponent } from './components/pages/reservation-search/reservation-search.component';
import { ReservationRoutingModule } from './reservation-routing.module';


@NgModule({
  declarations: [
    ReservationSearchComponent,
    ReservationSearchUnlimitedComponent,
    ReservationDownloadComponent,
    ReservationIndexComponent,
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
  ]
})
export class ReservationModule { }
