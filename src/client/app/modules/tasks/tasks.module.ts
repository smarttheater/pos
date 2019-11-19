import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TasksAccountDepositCSVComponent } from './components/pages/tasks-account-deposit-csv/tasks-account-deposit-csv.component';
import { TasksAccountDepositComponent } from './components/pages/tasks-account-deposit/tasks-account-deposit.component';
import { TasksIndexComponent } from './components/pages/tasks-index/tasks-index.component';
import { TasksOwnershipinfoSearchComponent } from './components/pages/tasks-ownershipinfo-search/tasks-ownershipinfo-search.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [
    TasksAccountDepositComponent,
    TasksAccountDepositCSVComponent,
    TasksOwnershipinfoSearchComponent,
    TasksIndexComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
  ]
})
export class TasksModule { }
