import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../canActivates';
import { SettingGuardService } from '../../canActivates/setting-guard.service';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { InquiryConfirmComponent } from './components/pages/inquiry-confirm/inquiry-confirm.component';
import { InquiryInputComponent } from './components/pages/inquiry-input/inquiry-input.component';
import { InquiryPrintComponent } from './components/pages/inquiry-print/inquiry-print.component';


const routes: Routes = [{
  path: '',
  component: BaseComponent,
  canActivate: [AuthGuardService, SettingGuardService],
  children: [
    { path: 'input', component: InquiryInputComponent },
    { path: 'confirm', component: InquiryConfirmComponent },
    { path: 'print', component: InquiryPrintComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
