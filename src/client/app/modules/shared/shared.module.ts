import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { BaseComponent } from './components/pages/base/base.component';
import { AlertModalComponent } from './components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/parts/confirm-modal/confirm-modal.component';
import { ContentsComponent } from './components/parts/contents/contents.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { HeaderMenuComponent } from './components/parts/header-menu/header-menu.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { MvtkCheckModalComponent } from './components/parts/mvtk-check-modal/mvtk-check-modal.component';
import { NumericKeypadComponent } from './components/parts/numeric-keypad/numeric-keypad.component';
import { OrderDetailModalComponent } from './components/parts/order-detail-modal/order-detail-modal.component';
import { PurchaseCinemaTicketModalComponent } from './components/parts/purchase-cinema-ticket-modal/purchase-cinema-ticket-modal.component';
import { PurchaseEventTicketModalComponent } from './components/parts/purchase-event-ticket-modal/purchase-event-ticket-modal.component';
import { PurchaseTransactionModalComponent } from './components/parts/purchase-transaction-modal/purchase-transaction-modal.component';
import { QrCodeModalComponent } from './components/parts/qrcode-modal/qrcode-modal.component';
import { ReservationDetailModalComponent } from './components/parts/reservation-detail-modal/reservation-detail-modal.component';
import { ChangeLanguagePipe } from './pipes/change-language.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { LibphonenumberFormatPipe } from './pipes/libphonenumber-format.pipe';



@NgModule({
  declarations: [
    ContentsComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    LoadingComponent,
    AlertModalComponent,
    ConfirmModalComponent,
    MvtkCheckModalComponent,
    NumericKeypadComponent,
    OrderDetailModalComponent,
    PurchaseCinemaTicketModalComponent,
    PurchaseEventTicketModalComponent,
    PurchaseTransactionModalComponent,
    QrCodeModalComponent,
    ReservationDetailModalComponent,
    BaseComponent,
    LibphonenumberFormatPipe,
    ChangeLanguagePipe,
    FormatDatePipe,
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent,
    MvtkCheckModalComponent,
    NumericKeypadComponent,
    OrderDetailModalComponent,
    PurchaseCinemaTicketModalComponent,
    PurchaseEventTicketModalComponent,
    PurchaseTransactionModalComponent,
    QrCodeModalComponent,
    ReservationDetailModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    SwiperModule,
    ModalModule,
    BsDatepickerModule,
    PaginationModule,
  ],
  exports: [
    ContentsComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    LoadingComponent,
    AlertModalComponent,
    ConfirmModalComponent,
    MvtkCheckModalComponent,
    NumericKeypadComponent,
    OrderDetailModalComponent,
    PurchaseCinemaTicketModalComponent,
    PurchaseEventTicketModalComponent,
    PurchaseTransactionModalComponent,
    QrCodeModalComponent,
    ReservationDetailModalComponent,
    BaseComponent,
    LibphonenumberFormatPipe,
    ChangeLanguagePipe,
    FormatDatePipe,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    SwiperModule,
    ModalModule,
    BsDatepickerModule,
    PaginationModule,
  ]
})
export class SharedModule { }
