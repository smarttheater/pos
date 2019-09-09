import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DevelopmentEncryptionComponent } from './components/pages/development-encryption/development-encryption.component';
import { DevelopmentIndexComponent } from './components/pages/development-index/development-index.component';
import { DevelopmentScreenComponent } from './components/pages/development-screen/development-screen.component';
import { DevelopmentRoutingModule } from './development-routing.module';


@NgModule({
  declarations: [
    DevelopmentIndexComponent,
    DevelopmentScreenComponent,
    DevelopmentEncryptionComponent
  ],
  imports: [
    CommonModule,
    DevelopmentRoutingModule,
    SharedModule,
  ]
})
export class DevelopmentModule { }
