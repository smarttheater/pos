import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../canActivates';
import { SettingGuardService } from '../../canActivates/setting-guard.service';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { AdmissionCheckComponent } from './components/pages/admission-check/admission-check.component';
import { AdmissionScheduleComponent } from './components/pages/admission-schedule/admission-schedule.component';


const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuardService, SettingGuardService],
    children: [
      { path: 'schedule', component: AdmissionScheduleComponent },
      { path: 'check', component: AdmissionCheckComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
