import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../canActivates';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { TasksAccountDepositCSVComponent } from './components/pages/tasks-account-deposit-csv/tasks-account-deposit-csv.component';
import { TasksAccountDepositComponent } from './components/pages/tasks-account-deposit/tasks-account-deposit.component';
import { TasksIndexComponent } from './components/pages/tasks-index/tasks-index.component';

const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', component: TasksIndexComponent },
    { path: 'account/deposit/csv', component: TasksAccountDepositCSVComponent },
    { path: 'account/deposit', component: TasksAccountDepositComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
