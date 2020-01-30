import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderDownloadComponent } from './components/pages/order-download/order-download.component';
import { OrderIndexComponent } from './components/pages/order-index/order-index.component';
import { OrderSearchUnlimitedComponent } from './components/pages/order-search-unlimited/order-search-unlimited.component';
import { OrderSearchComponent } from './components/pages/order-search/order-search.component';
import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  declarations: [
    OrderIndexComponent,
    OrderSearchComponent,
    OrderSearchUnlimitedComponent,
    OrderDownloadComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule { }
