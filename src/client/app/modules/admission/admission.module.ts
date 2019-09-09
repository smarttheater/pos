import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionCheckComponent } from './components/pages/admission-check/admission-check.component';
import { AdmissionScheduleComponent } from './components/pages/admission-schedule/admission-schedule.component';


@NgModule({
  declarations: [
    AdmissionScheduleComponent,
    AdmissionCheckComponent,
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    SharedModule,
  ]
})
export class AdmissionModule { }
