import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PersonSearchComponent } from './components/pages/person-search/person-search.component';
import { PersonRoutingModule } from './person-routing.module';


@NgModule({
  declarations: [
    PersonSearchComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule,
  ]
})
export class PersonModule { }
