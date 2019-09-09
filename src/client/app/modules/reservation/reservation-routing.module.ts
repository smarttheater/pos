import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../canActivates';
import { SettingGuardService } from '../../canActivates/setting-guard.service';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { ReservationSearchComponent } from './components/pages/reservation-search/reservation-search.component';


const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [AuthGuardService, SettingGuardService],
  children: [
    { path: 'search', component: ReservationSearchComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
