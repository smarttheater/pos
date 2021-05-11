import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, SettingGuardService } from '../../canActivates';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { CustomerIndexComponent } from './components/pages/customer-index/customer-index.component';
import { CustomerSearchComponent } from './components/pages/customer-search/customer-search.component';


const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [AuthGuardService, SettingGuardService],
  children: [
    { path: '', component: CustomerIndexComponent },
    { path: 'search', component: CustomerSearchComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
