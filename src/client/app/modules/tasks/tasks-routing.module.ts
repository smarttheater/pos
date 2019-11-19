import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../canActivates';
import { SettingGuardService } from '../../canActivates/setting-guard.service';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { TasksAccountDepositCSVComponent } from './components/pages/tasks-account-deposit-csv/tasks-account-deposit-csv.component';
import { TasksAccountDepositComponent } from './components/pages/tasks-account-deposit/tasks-account-deposit.component';
import { TasksIndexComponent } from './components/pages/tasks-index/tasks-index.component';
import { TasksOwnershipinfoSearchComponent } from './components/pages/tasks-ownershipinfo-search/tasks-ownershipinfo-search.component';


const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [AuthGuardService, SettingGuardService],
  children: [
    { path: '', component: TasksIndexComponent },
    { path: 'account/deposit/csv', component: TasksAccountDepositCSVComponent },
    { path: 'account/deposit', component: TasksAccountDepositComponent },
    { path: 'ownershipinfo/search', component: TasksOwnershipinfoSearchComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
