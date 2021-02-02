import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BaseComponent } from './components/pages/base/base.component';
import { AlertModalComponent } from './components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/parts/confirm-modal/confirm-modal.component';
import { ContentsComponent } from './components/parts/contents/contents.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { CheckboxComponent } from './components/parts/form/checkbox/checkbox.component';
import { HeaderMenuComponent } from './components/parts/header-menu/header-menu.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { ItemEventComponent } from './components/parts/item-event/item-event.component';
import { ItemListComponent } from './components/parts/item-list/item-list.component';
import { ItemPaymentMethodComponent } from './components/parts/item-payment-method/item-payment-method.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { MovieTicketCheckModalComponent } from './components/parts/movie-ticket/check-modal/check-modal.component';
import { NumericKeypadComponent } from './components/parts/numeric-keypad/numeric-keypad.component';
import { OrderDetailModalComponent } from './components/parts/order/detail-modal/detail-modal.component';
import { PerformanceComponent } from './components/parts/performance/performance.component';
import { PerformancesComponent } from './components/parts/performances/performances.component';
import { PurchaseEventTicketModalComponent } from './components/parts/purchase/event/ticket-modal/ticket-modal.component';
import { PurchaseSeatTicketModalComponent } from './components/parts/purchase/seat-ticket-modal/seat-ticket-modal.component';
import { QRCodeImageComponent } from './components/parts/qrcode/image/image.component';
import { QRCodeReaderModalComponent } from './components/parts/qrcode/reader-modal/reader-modal.component';
import { QRCodeViewerModalComponent } from './components/parts/qrcode/viewer-modal/viewer-modal.component';
import { ReservationDetailModalComponent } from './components/parts/reservation/detail-modal/detail-modal.component';
import { ScreenComponent } from './components/parts/screen/screen.component';
import { ChangeLanguagePipe } from './pipes/change-language.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { LibphonenumberFormatPipe } from './pipes/libphonenumber-format.pipe';

const components = [
  BaseComponent,
  ContentsComponent,
  FooterComponent,
  HeaderComponent,
  HeaderMenuComponent,
  LoadingComponent,
  ScreenComponent,
  ItemListComponent,
  CheckboxComponent,
  QRCodeImageComponent,
  ItemEventComponent,
  ItemPaymentMethodComponent,
  PerformanceComponent,
  PerformancesComponent,
];

const entryComponents = [
  AlertModalComponent,
  ConfirmModalComponent,
  MovieTicketCheckModalComponent,
  NumericKeypadComponent,
  OrderDetailModalComponent,
  PurchaseSeatTicketModalComponent,
  PurchaseEventTicketModalComponent,
  QRCodeReaderModalComponent,
  QRCodeViewerModalComponent,
  ReservationDetailModalComponent,
];


@NgModule({
  declarations: [
    ...components,
    ...entryComponents,
    LibphonenumberFormatPipe,
    ChangeLanguagePipe,
    FormatDatePipe,
  ],
  entryComponents,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ModalModule,
    BsDatepickerModule,
    PaginationModule,
    NgxIntlTelInputModule,
  ],
  exports: [
    ...components,
    ...entryComponents,
    LibphonenumberFormatPipe,
    ChangeLanguagePipe,
    FormatDatePipe,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ModalModule,
    BsDatepickerModule,
    PaginationModule,
    NgxIntlTelInputModule,
  ]
})
export class SharedModule { }
