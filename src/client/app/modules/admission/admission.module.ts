import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionCheckComponent } from './components/pages/admission-check/admission-check.component';
import { AdmissionScheduleComponent } from './components/pages/admission-schedule/admission-schedule.component';
import { AdmissionPerformanceComponent } from './components/parts/performance/performance.component';
import { AdmissionPerformancesComponent } from './components/parts/performances/performances.component';


@NgModule({
  declarations: [
    AdmissionScheduleComponent,
    AdmissionCheckComponent,
    AdmissionPerformanceComponent,
    AdmissionPerformancesComponent,
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    SharedModule,
  ]
})
export class AdmissionModule { }
