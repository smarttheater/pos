import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderDownloadComponent } from './components/pages/order-download/order-download.component';
import { OrderIndexComponent } from './components/pages/order-index/order-index.component';
import { OrderSearchEventComponent } from './components/pages/order-search-event/order-search-event.component';
import { OrderSearchComponent } from './components/pages/order-search/order-search.component';
import { OrderSearchConditionComponent } from './components/parts/order-search-condition/order-search-condition.component';
import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  declarations: [
    OrderIndexComponent,
    OrderSearchComponent,
    OrderSearchEventComponent,
    OrderDownloadComponent,
    OrderSearchConditionComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule { }
