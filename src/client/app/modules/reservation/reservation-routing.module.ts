import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, SettingGuardService } from '../../canActivates';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { ReservationDownloadComponent } from './components/pages/reservation-download/reservation-download.component';
import { ReservationIndexComponent } from './components/pages/reservation-index/reservation-index.component';
import {
  ReservationSearchUnlimitedComponent
} from './components/pages/reservation-search-unlimited/reservation-search-unlimited.component';
import { ReservationSearchComponent } from './components/pages/reservation-search/reservation-search.component';


const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [AuthGuardService, SettingGuardService],
  children: [
    { path: '', component: ReservationIndexComponent },
    { path: 'search', component: ReservationSearchComponent },
    { path: 'search/unlimited', component: ReservationSearchUnlimitedComponent },
    { path: 'download', component: ReservationDownloadComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
