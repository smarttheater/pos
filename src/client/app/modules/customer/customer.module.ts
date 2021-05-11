import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomerIndexComponent } from './components/pages/customer-index/customer-index.component';
import { CustomerSearchComponent } from './components/pages/customer-search/customer-search.component';
import { CustomerConditionComponent } from './components/parts/customer-condition/customer-condition.component';
import { CustomerTableComponent } from './components/parts/customer-table/customer-table.component';
import { CustomerRoutingModule } from './customer-routing.module';


@NgModule({
  declarations: [
    CustomerIndexComponent,
    CustomerSearchComponent,
    CustomerConditionComponent,
    CustomerTableComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
