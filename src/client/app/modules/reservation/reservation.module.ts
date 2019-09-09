import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReservationSearchComponent } from './components/pages/reservation-search/reservation-search.component';
import { ReservationRoutingModule } from './reservation-routing.module';


@NgModule({
  declarations: [
    ReservationSearchComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
  ]
})
export class ReservationModule { }
