import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { DevelopmentIndexComponent } from './components/pages/development-index/development-index.component';
import { DevelopmentScreenComponent } from './components/pages/development-screen/development-screen.component';


const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: DevelopmentIndexComponent },
      { path: 'screen', component: DevelopmentScreenComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopmentRoutingModule { }
