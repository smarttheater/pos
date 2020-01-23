import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DevelopmentIndexComponent } from './components/pages/development-index/development-index.component';
import { DevelopmentScreenComponent } from './components/pages/development-screen/development-screen.component';
import { DevelopmentRoutingModule } from './development-routing.module';


@NgModule({
  declarations: [
    DevelopmentIndexComponent,
    DevelopmentScreenComponent,
  ],
  imports: [
    CommonModule,
    DevelopmentRoutingModule,
    SharedModule,
  ]
})
export class DevelopmentModule { }
