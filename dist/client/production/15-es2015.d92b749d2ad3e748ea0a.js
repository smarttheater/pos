(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{JGdv:function(e,t,n){"use strict";n.r(t);var o=n("An66"),r=n("kZht"),a=n("DSWM"),i=n("E3Fy"),s=n("ofez"),c=n("aDqW"),l=n("wgY5"),d=n("aroP"),v=n("PIN6"),h=n("cF7s"),m=n("cHUu"),u=n("mOXJ"),p=n("jwo+"),b=function(e,t,n,o){var r,a=arguments.length,i=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(i=(a<3?r(i):a>3?r(t,n,i):r(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i},g=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},f=function(e,t,n,o){return new(n||(n=Promise))(function(r,a){function i(e){try{c(o.next(e))}catch(t){a(t)}}function s(e){try{c(o.throw(e))}catch(t){a(t)}}function c(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(i,s)}c((o=o.apply(e,t||[])).next())})},D=function(e){return e&&e.__esModule?e:{default:e}};let y=class{constructor(e,t,n,o,r,a,s){this.store=e,this.modal=t,this.download=n,this.localeService=o,this.utilService=r,this.reservationService=a,this.translate=s,this.moment=l,this.reservationStatus=i.factory.chevre.reservationStatusType,this.getTicketPrice=h.o,this.environment=Object(v.a)()}ngOnInit(){this.isDownload=!1,this.isLoading=this.store.pipe(Object(s.i)(u.c)),this.error=this.store.pipe(Object(s.i)(u.b)),this.reservation=this.store.pipe(Object(s.i)(u.i)),this.user=this.store.pipe(Object(s.i)(u.j)),this.limit=20,this.conditions={id:"",reservationNumber:"",reservationStatus:"",page:1},this.reservationService.delete()}convertToSearchParams(){return f(this,void 0,void 0,function*(){return new Promise(e=>{this.user.subscribe(()=>{const t={typeOf:i.factory.chevre.reservationType.EventReservation,bookingFrom:void 0===this.confirmedConditions.reservationDateFrom?void 0:l(l(this.confirmedConditions.reservationDateFrom).format("YYYYMMDD")).toDate(),bookingThrough:void 0===this.confirmedConditions.reservationDateThrough?void 0:l(l(this.confirmedConditions.reservationDateThrough).format("YYYYMMDD")).add(1,"day").toDate(),reservationFor:{startFrom:void 0===this.confirmedConditions.eventStartDateFrom?void 0:l(l(this.confirmedConditions.eventStartDateFrom).format("YYYYMMDD")).toDate(),startThrough:void 0===this.confirmedConditions.eventStartDateThrough?void 0:l(l(this.confirmedConditions.eventStartDateThrough).format("YYYYMMDD")).add(1,"day").toDate()},ids:""===this.confirmedConditions.id?void 0:[this.confirmedConditions.id],reservationStatuses:""===this.confirmedConditions.reservationStatus?void 0:[this.confirmedConditions.reservationStatus],reservationNumbers:""===this.confirmedConditions.reservationNumber?void 0:[this.confirmedConditions.reservationNumber],limit:this.limit,page:this.confirmedConditions.page,sort:{}};e(t)}).unsubscribe()})})}reservationSearch(e,t){return f(this,void 0,void 0,function*(){void 0!==t&&(this.confirmedConditions.page=t.page),this.conditions.id=document.getElementById("id").value,this.conditions.reservationNumber=document.getElementById("reservationNumber").value,e&&(this.confirmedConditions={reservationDateFrom:this.conditions.reservationDateFrom,reservationDateThrough:this.conditions.reservationDateThrough,eventStartDateFrom:this.conditions.eventStartDateFrom,eventStartDateThrough:this.conditions.eventStartDateThrough,id:this.conditions.id,reservationNumber:this.conditions.reservationNumber,reservationStatus:this.conditions.reservationStatus,page:1});try{const e=yield this.convertToSearchParams();this.reservationService.search(e)}catch(n){console.error(n),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("reservation.search.alert.search")})}})}searchConditionClear(){this.conditions={id:"",reservationNumber:"",reservationStatus:"",page:1},document.getElementById("id").value="",document.getElementById("reservationNumber").value=""}openDetail(e){this.modal.show(p.a,{class:"modal-dialog-centered modal-lg",initialState:{reservation:e}})}downloadCsv(){return f(this,void 0,void 0,function*(){this.isDownload=!0;try{const t=yield this.convertToSearchParams();yield this.download.reservation(t)}catch(e){console.error(e)}this.isDownload=!1})}setDatePicker(){this.user.subscribe(e=>{this.localeService.use(e.language)}).unsubscribe()}onShowPicker(e){Object(h.r)(e,[this.reservationDateFrom,this.reservationDateThrough,this.eventStartDateFrom,this.eventStartDateThrough])}};y.ctorParameters=()=>[{type:s.b},{type:d.e},{type:m.b},{type:d.c},{type:m.j},{type:m.g},{type:c.c}],b([Object(r.jb)("reservationDateFrom",{static:!0}),g("design:type",d.a)],y.prototype,"reservationDateFrom",void 0),b([Object(r.jb)("reservationDateThrough",{static:!0}),g("design:type",d.a)],y.prototype,"reservationDateThrough",void 0),b([Object(r.jb)("eventStartDateFrom",{static:!0}),g("design:type",d.a)],y.prototype,"eventStartDateFrom",void 0),b([Object(r.jb)("eventStartDateThrough",{static:!0}),g("design:type",d.a)],y.prototype,"eventStartDateThrough",void 0),y=b([Object(r.n)({selector:"app-reservation-search",template:D(n("jzbG")).default,styles:[D(n("Sq3J")).default]}),g("design:paramtypes",[s.b,d.e,m.b,d.c,m.j,m.g,c.c])],y);var S=n("1VvW"),Y=n("unpb"),T=n("KvGu"),k=function(e,t,n,o){var r,a=arguments.length,i=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(i=(a<3?r(i):a>3?r(t,n,i):r(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i};const w=[{path:"",component:n("RRjC").a,canActivate:[Y.a,T.a],children:[{path:"search",component:y}]}];let F=class{};F=k([Object(r.I)({imports:[S.c.forChild(w)],exports:[S.c]})],F),n.d(t,"ReservationModule",function(){return M});let M=class{};M=function(e,t,n,o){var r,a=arguments.length,i=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(i=(a<3?r(i):a>3?r(t,n,i):r(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i}([Object(r.I)({declarations:[y],imports:[o.b,F,a.a]})],M)},Sq3J:function(e,t,n){"use strict";n.r(t),t.default=".scroll-horizontal .table {\n  min-width: 900px;\n}"},jzbG:function(e,t,n){"use strict";n.r(t),t.default='<div class="contents-width mx-auto px-3 py-5">\n    <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'reservation.search.title\' | translate }}</h2>\n    <p class="mb-4 text-md-center" [innerHTML]="\'reservation.search.read\' | translate"></p>\n    <div class="conditions p-3 bg-white mb-4">\n        <form (submit)="reservationSearch(true)">\n            <div class="form-row">\n                <div class="form-group col-md-4 col-lg-3">\n                    <label for="reservationDateFrom"\n                        class="mb-2">{{ \'reservation.search.conditions.reservationDateFrom\' | translate }}</label>\n                    <input type="text" name="reservationDateFrom" id="reservationDateFrom" placeholder="YYYY/MM/DD"\n                        class="form-control" #reservationDateFrom="bsDatepicker" bsDatepicker\n                        [(ngModel)]="conditions.reservationDateFrom"\n                        [bsConfig]="{ dateInputFormat: \'YYYY/MM/DD\', adaptivePosition: true, showWeekNumbers: false }"\n                        readonly (onShown)="onShowPicker($event)" (click)="setDatePicker()">\n                    \x3c!-- <input type="date" class="form-control" name="reservationDateFrom" id="reservationDateFrom"\n                        [(ngModel)]="conditions.reservationDateFrom" placeholder="{{ moment().format(\'YYYY-MM-DD\') }}"> --\x3e\n                </div>\n                <div class="form-group col-md-4 col-lg-3">\n                    <label for="reservationDateThrough"\n                        class="mb-2">{{ \'reservation.search.conditions.reservationDateThrough\' | translate }}</label>\n                    <input type="text" name="reservationDateThrough" id="reservationDateThrough"\n                        placeholder="YYYY/MM/DD" class="form-control" #reservationDateThrough="bsDatepicker" bsDatepicker\n                        [(ngModel)]="conditions.reservationDateThrough"\n                        [bsConfig]="{ dateInputFormat: \'YYYY/MM/DD\', adaptivePosition: true, showWeekNumbers: false }"\n                        readonly (onShown)="onShowPicker($event)" (click)="setDatePicker()">\n                    \x3c!-- <input type="date" class="form-control" name="reservationDateThrough" id="reservationDateThrough"\n                        [(ngModel)]="conditions.reservationDateThrough"\n                        placeholder="{{ moment().format(\'YYYY-MM-DD\') }}"> --\x3e\n                </div>\n                <div class="form-group col-md-4 col-lg-3">\n                    <label for="confirmationNumber" class="mb-2">{{ \'common.reservationId\' | translate }}</label>\n                    <input type="text" class="form-control" name="id" id="id" [(ngModel)]="conditions.id"\n                        placeholder="{{ \'common.reservationId\' | translate }}">\n                </div>\n                <div class="form-group col-md-4 col-lg-3">\n                    <label for="reservationNumber" class="mb-2">{{ \'common.reservationNumber\' | translate }}</label>\n                    <input type="text" class="form-control" name="reservationNumber" id="reservationNumber"\n                        [(ngModel)]="conditions.reservationNumber"\n                        placeholder="{{ \'common.reservationNumber\' | translate }}">\n                </div>\n            \n                <div class="form-group col-md-4 col-lg-3">\n                    <label for="reservationStatus" class="mb-2">{{ \'common.reservationStatus\' | translate }}</label>\n                    <select class="form-control" name="reservationStatus" id="reservationStatus"\n                        [(ngModel)]="conditions.reservationStatus">\n                        <option value="">{{ \'common.all\' | translate }}</option>\n                        <option [value]="reservationStatus.ReservationConfirmed">\n                            {{ \'reservation.search.reservationStatus.ReservationConfirmed\' | translate }}</option>\n                        <option [value]="reservationStatus.ReservationHold">\n                            {{ \'reservation.search.reservationStatus.ReservationHold\' | translate }}</option>\n                        <option [value]="reservationStatus.ReservationPending">\n                            {{ \'reservation.search.reservationStatus.ReservationPending\' | translate }}</option>\n                    </select>\n                </div>\n                <div class="form-group col-md-4 col-lg-3">\n                    <label for="eventStartDateFrom"\n                        class="mb-2">{{ \'reservation.search.conditions.eventStartDateFrom\' | translate }}</label>\n                    <input type="text" name="eventStartDateFrom" id="eventStartDateFrom" placeholder="YYYY/MM/DD"\n                        class="form-control" #eventStartDateFrom="bsDatepicker" bsDatepicker\n                        [(ngModel)]="conditions.eventStartDateFrom"\n                        [bsConfig]="{ dateInputFormat: \'YYYY/MM/DD\', adaptivePosition: true, showWeekNumbers: false }"\n                        readonly (onShown)="onShowPicker($event)" (click)="setDatePicker()">\n                </div>\n                <div class="form-group col-md-4 col-lg-3">\n                    <label for="eventStartDateThrough"\n                        class="mb-2">{{ \'reservation.search.conditions.eventStartDateThrough\' | translate }}</label>\n                    <input type="text" name="eventStartDateThrough" id="eventStartDateThrough" placeholder="YYYY/MM/DD"\n                        class="form-control" #eventStartDateThrough="bsDatepicker" bsDatepicker\n                        [(ngModel)]="conditions.eventStartDateThrough"\n                        [bsConfig]="{ dateInputFormat: \'YYYY/MM/DD\', adaptivePosition: true, showWeekNumbers: false }"\n                        readonly (onShown)="onShowPicker($event)" (click)="setDatePicker()">\n                </div>\n            </div>\n            <div class="buttons mx-auto text-center">\n                <button type="submit" class="btn btn-primary btn-block py-3 mb-3"\n                    [disabled]="isLoading | async">{{ \'reservation.search.search\' | translate }}</button>\n                <button type="button" class="btn btn-outline-primary btn-block py-3"\n                    (click)="searchConditionClear()">{{ \'reservation.search.clear\' | translate }}</button>\n            </div>\n        </form>\n    </div>\n    <p *ngIf="(reservation | async).reservations.length === 0">{{ \'reservation.search.notfound\' | translate }}</p>\n\n    <div *ngIf="(reservation | async).reservations.length > 0">\n        <div class="mb-3 text-md-left text-center">\n            <button class="btn btn-primary" (onShown)="onShowPicker($event)" (click)="downloadCsv()"\n                [disabled]="isDownload">{{ \'reservation.search.download\' | translate }}</button>\n        </div>\n        <div class="d-md-flex align-items-center justify-content-end mb-4">\n            <div class="text-md-right text-center mb-3 mb-md-0 reservation-2">\n                <div class="d-inline-block">\n                    <pagination [(ngModel)]="confirmedConditions.page"\n                        [totalItems]="(reservation | async).pageCount * 10" [maxSize]="5" [boundaryLinks]="false"\n                        previousText="&lsaquo;" nextText="&rsaquo;" firstText="&laquo;" lastText="&raquo;"\n                        (pageChanged)="reservationSearch(false, $event)"></pagination>\n                </div>\n            </div>\n        </div>\n\n        <div class="scroll-horizontal">\n            <table class="table bg-white breservation text-small mb-0 border border-gray">\n                <thead>\n                    <tr>\n                        <th scope="col">{{ \'common.reservationNumber\' | translate }}</th>\n                        <th scope="col">{{ \'common.reservationId\' | translate }}</th>\n                        <th scope="col">{{ \'common.event\' | translate }}</th>\n                        <th scope="col">{{ \'common.ticket\' | translate }}</th>\n                        \x3c!-- <th scope="col">\u6c7a\u6e08\u65b9\u6cd5</th> --\x3e\n                        \x3c!-- <th scope="col">\u6ce8\u6587\u30b9\u30c6\u30fc\u30bf\u30b9</th> --\x3e\n                        <th scope="col"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor="let reservation of (reservation | async).reservations let index = index"\n                        [class.bg-light-gray]="index % 2 === 0">\n                        <td class="align-middle">{{ reservation.reservationNumber }}</td>\n                        <td class="align-middle">{{ reservation.id }}</td>\n\n                        <td class="align-middle">\n                            <p *ngIf="(reservation.reservationFor.name | changeLanguage).length > 0">{{\n                                reservation.reservationFor.name | changeLanguage | slice:0:10 }}</p>\n                            <p *ngIf="!((reservation.reservationFor.name | changeLanguage).length > 0)">{{\n                                reservation.reservationFor.name | changeLanguage }}</p>\n                            <p>\n                                <span class="theatre-name">{{ reservation.reservationFor.superEvent.location.name | changeLanguage }}</span>\n                                <span class="screen-name">&nbsp;/&nbsp;{{ reservation.reservationFor.location.name | changeLanguage }}</span>\n                            </p>\n                            <p>{{ reservation.reservationFor.startDate | formatDate: \'YYYY/MM/DD (ddd) HH:mm\' }}\n                                -</p>\n                        </td>\n                        <td class="align-middle">\n                            <p>{{ reservation.reservedTicket.ticketType.name | changeLanguage }}</p>\n                            <p *ngIf="reservation.reservedTicket.ticketedSeat && environment.DISPLAY_TICKETED_SEAT">\n                                {{ reservation.reservedTicket.ticketedSeat.seatNumber }}</p>\n                            <p>{{ getTicketPrice({ priceSpecification : { priceComponent: reservation.price.priceComponent } }).single | currency : \'JPY\' }}\n                            </p>\n                        </td>\n                        \x3c!-- <td class="align-middle">\n                          <div *ngFor="let paymentMethod of reservation.paymentMethods">\n                              <p>{{ paymentMethod.name }}</p>\n                          </div>\n                      </td> --\x3e\n                        \x3c!-- <td class="align-middle">\n                          {{ reservation.reservationStatus }}\n                      </td> --\x3e\n                        <td class="align-middle">\n                            <button class="btn btn-primary mr-2" (onShown)="onShowPicker($event)"\n                                (click)="openDetail(reservation)"><i class="fas fa-search-plus"></i></button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n\n    </div>\n</div>'}}]);