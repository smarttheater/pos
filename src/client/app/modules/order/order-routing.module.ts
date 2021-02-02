import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, SettingGuardService } from '../../canActivates';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { OrderDownloadComponent } from './components/pages/order-download/order-download.component';
import { OrderIndexComponent } from './components/pages/order-index/order-index.component';
import { OrderSearchComponent } from './components/pages/order-search/order-search.component';


const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [AuthGuardService, SettingGuardService],
  children: [
    { path: '', component: OrderIndexComponent },
    { path: 'search', component: OrderSearchComponent },
    { path: 'download', component: OrderDownloadComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
