(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"+r+q":function(e,n,t){"use strict";t.r(n),n.default=":host {\n  display: block;\n}\n\nul {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;\n  grid-gap: 0.5rem;\n}\n\n@media (max-width: 767.98px) {\n  ul {\n    grid-template-columns: 1fr;\n  }\n}\n\n.status {\n  line-height: 30px;\n}\n\n.status img {\n  width: 30px;\n  height: 30px;\n}"},"5Yqj":function(e,n,t){"use strict";t.r(n),n.default='<div class="contents-width mx-auto px-3 py-5">\n    <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'admission.schedule.title\' | translate }}</h2>\n    <p class="mb-4 text-md-center" [innerHTML]="\'admission.schedule.read\' | translate"></p>\n\n    <div class="mb-3">\n        <div class="input-group">\n            <input type="text" placeholder="Datepicker" class="form-control" #datepicker="bsDatepicker" bsDatepicker\n                [(ngModel)]="scheduleDate"\n                [bsConfig]="{ dateInputFormat: \'YYYY/MM/DD\', adaptivePosition: true, showWeekNumbers: false }"\n                (bsValueChange)="selectDate($event)" readonly (click)="setDatePicker()"\n                (onShown)="onShowPicker($event)">\n            \x3c!-- <input type="date" class="form-control rounded-0 text-large" name="date" [(ngModel)]="scheduleDate"\n                (change)="selectDate()"> --\x3e\n            <div class="input-group-append pointer" (click)="toggleDatepicker()">\n                <span class="input-group-text"><i class="fas fa-caret-down"></i></span>\n            </div>\n        </div>\n    </div>\n    <p *ngIf="(admission | async).scheduleDate" class="text-primary text-large mb-3">{{ (admission |\n        async).scheduleDate | formatDate: \'YYYY/MM/DD (ddd)\' }}</p>\n    <p *ngIf="screeningWorkEvents.length === 0" class="mb-3" [innerHTML]="\'admission.schedule.notfound\' | translate">\n    </p>\n    <app-admission-schedule-work *ngFor="let screeningWorkEvent of screeningWorkEvents"\n        [screeningWorkEvent]="screeningWorkEvent" (select)="selectSchedule($event)" class="mb-3">\n    </app-admission-schedule-work>\n</div>'},BMVQ:function(e,n,t){"use strict";t.r(n),n.default='<div class="bg-white">\n    <div class="p-3">\n        <div class="mb-2">\n            <p class="font-weight-bold text-large">{{ screeningWorkEvent.info.name | changeLanguage }}</p>\n            <p\n                *ngIf="screeningWorkEvent.info.superEvent.headline && (screeningWorkEvent.info.superEvent.headline | changeLanguage)">\n                {{ screeningWorkEvent.info.superEvent.headline | changeLanguage }}</p>\n            <p\n                *ngIf="screeningWorkEvent.info.superEvent.description && (screeningWorkEvent.info.superEvent.description | changeLanguage)">{{\n                    screeningWorkEvent.info.superEvent.description | changeLanguage }}</p>\n        </div>\n        <div class="d-flex align-items-center">\n            <div *ngIf="screeningWorkEvent.info.workPerformed?.contentRating"\n                class="text-small bg-dark-gray text-white py-1 px-3 mr-2">{{\n                    screeningWorkEvent.info.workPerformed.contentRating }}</div>\n            <div *ngIf="screeningWorkEvent.info.superEvent.dubLanguage"\n                class="text-small bg-dark-gray text-white py-1 px-3 mr-2">{{ \'common.dubbing\' | translate }}</div>\n            <div *ngIf="screeningWorkEvent.info.superEvent.subtitleLanguage"\n                class="text-small bg-dark-gray text-white py-1 px-3 mr-2">{{ \'common.subtitles\' | translate }}</div>\n            <div *ngIf="screeningWorkEvent.info.workPerformed?.duration && moment.duration(screeningWorkEvent.info.workPerformed.duration).asMinutes() > 0" class="text-small ml-auto">\n                <span class="mr-1">{{ \'common.duration\' | translate }}</span>{{ moment.duration(screeningWorkEvent.info.workPerformed.duration).asMinutes() }}{{ \'common.date.minute\' | translate }}\n            </div>\n        </div>\n    </div>\n    <ul class="p-3">\n        <li *ngFor="let screeningEvent of screeningWorkEvent.data"\n            class="border boder-gray rounded p-2 py-md-3 text-md-center d-md-block d-flex justify-content-between align-items-center pointer"\n            [ngClass]="{ \n          \'bg-white\': (moment(screeningEvent.doorTime).unix() < moment().unix() && moment(screeningEvent.endDate).unix() > moment().unix()), \n          \'bg-dark-gray text-light-gray\': !(moment(screeningEvent.doorTime).unix() < moment().unix() && moment(screeningEvent.endDate).unix() > moment().unix())\n          }" (click)="select.emit(screeningEvent)">\n            <div>\n                <div class="mb-2 text-small screen-name">\n                    {{ screeningEvent.location.name | changeLanguage }}\n                </div>\n                <div>\n                    <strong class="text-large">{{ moment(screeningEvent.startDate).format(\'HH:mm\') }}</strong>\n                    <span>-</span>\n                    <span>{{ moment(screeningEvent.endDate).format(\'HH:mm\') }}</span>\n                </div>\n            </div>\n            <hr class="border-0 bg-light-gray my-2">\n            <div class="text-center">\n                <div\n                    *ngIf="moment(screeningEvent.doorTime).unix() < moment().unix() && moment(screeningEvent.endDate).unix() > moment().unix()">\n                    <div class="status mb-2" *ngIf="!(moment(screeningEvent.startDate).unix() < moment().unix())">\n                        {{ \'admission.schedule.status.opening\' | translate }}\n                    </div>\n                    <div class="status mb-2" *ngIf="moment(screeningEvent.startDate).unix() < moment().unix()">\n                        {{ \'admission.schedule.status.nowShowing\' | translate }}</div>\n                </div>\n\n                <div class="status mb-2" *ngIf="!(moment(screeningEvent.doorTime).unix() < moment().unix())">\n                    {{ \'admission.schedule.status.beforeOpening\' | translate }}</div>\n                <div class="status mb-2" *ngIf="!(moment(screeningEvent.endDate).unix() > moment().unix())">\n                    {{ \'admission.schedule.status.filmCompletion\' | translate }}</div>\n                <div *ngIf="screeningEvent.offers?.itemOffered.serviceOutput?.reservedTicket?.ticketedSeat && environment.DISPLAY_TICKETED_SEAT" class="mb-2 text-small">{{ \'common.seat\' | translate }}\n                    {{ screeningEvent.remainingAttendeeCapacity }} / {{ screeningEvent.maximumAttendeeCapacity }}\n                </div>\n                <div *ngIf="!(screeningEvent.offers?.itemOffered.serviceOutput?.reservedTicket?.ticketedSeat)" class="mb-2 text-small">\n                    {{ \'admission.schedule.infiniteStock\' | translate }}</div>\n                <div class="text-small mb-1">{{ \'common.ticketing\' | translate }} {{ screeningEvent.checkInCount }}</div>\n                <div class="text-small">{{ \'common.admission\' | translate }} {{ screeningEvent.attendeeCount }}</div>\n            </div>\n        </li>\n    </ul>\n</div>'},OqUh:function(e,n,t){"use strict";t.r(n),n.default='.condition select {\n  width: 100%;\n}\n\n.schedule-slider .swiper-slide::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 4px;\n  background-color: #000;\n  opacity: 0.3;\n}\n\n.schedule-slider .swiper-button-next,\n.schedule-slider .swiper-button-prev {\n  width: 27px;\n  height: 27px;\n  background-image: url(/assets/images/icon/slider_arrow.svg);\n  background-size: 27px;\n  margin-top: -13px;\n}\n\n.schedule-slider .swiper-button-next {\n  right: -38px;\n}\n\n.schedule-slider .swiper-button-prev {\n  left: -38px;\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}'},dzKq:function(e,n,t){"use strict";t.r(n);var s=t("An66"),i=t("kZht"),a=t("DSWM"),o=t("1VvW"),r=t("unpb"),c=t("KvGu"),d=t("RRjC"),l=t("ofez"),m=t("aDqW"),u=t("wgY5"),g=t("PIN6"),p=t("cHUu"),v=t("mOXJ"),h=function(e,n,t,s){var i,a=arguments.length,o=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,n,t,s);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(o=(a<3?i(o):a>3?i(n,t,o):i(n,t))||o);return a>3&&o&&Object.defineProperty(n,t,o),o},f=function(e,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,n)},b=function(e,n,t,s){return new(t||(t=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(n){a(n)}}function r(e){try{c(s.throw(e))}catch(n){a(n)}}function c(e){e.done?i(e.value):new t((function(n){n(e.value)})).then(o,r)}c((s=s.apply(e,n||[])).next())}))},y=function(e){return e&&e.__esModule?e:{default:e}};let k=class{constructor(e,n,t,s,i){this.store=e,this.admissionService=n,this.utilService=t,this.qrcodeService=s,this.translate=i,this.moment=u,this.environment=Object(g.a)()}ngOnInit(){this.inputCode="",this.isLoading=this.store.pipe(Object(l.j)(v.c)),this.admission=this.store.pipe(Object(l.j)(v.a)),this.admissionService.initializeQrcodeToken()}ngOnDestroy(){clearInterval(this.updateLoop)}handleKeyboardEvent(e){"Enter"===e.key&&this.inputCode.length>0?(this.check(this.inputCode),this.inputCode=""):"Escape"!==e.key&&(this.inputCode+=e.key)}check(e){return b(this,void 0,void 0,(function*(){try{yield this.admissionService.checkQrcodeToken(e)}catch(n){console.error(n),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("admission.check.alert.check")})}}))}openQRCodeReader(){this.qrcodeService.openQRCodeReader({cb:e=>b(this,void 0,void 0,(function*(){yield this.check(e)}))})}update(){clearInterval(this.updateLoop),this.updateLoop=setInterval(()=>b(this,void 0,void 0,(function*(){yield this.admissionService.getScreeningEvent()})),6e4)}};k.ctorParameters=()=>[{type:l.b},{type:p.a},{type:p.k},{type:p.g},{type:m.c}],h([Object(i.y)("document:keypress",["$event"]),f("design:type",Function),f("design:paramtypes",[KeyboardEvent]),f("design:returntype",void 0)],k.prototype,"handleKeyboardEvent",null),k=h([Object(i.n)({selector:"app-admission-check",template:y(t("mfvb")).default,styles:[y(t("oN8W")).default]}),f("design:paramtypes",[l.b,p.a,p.k,p.g,m.c])],k);var x=t("aroP"),E=t("cF7s"),w=function(e,n,t,s){var i,a=arguments.length,o=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,n,t,s);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(o=(a<3?i(o):a>3?i(n,t,o):i(n,t))||o);return a>3&&o&&Object.defineProperty(n,t,o),o},D=function(e,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,n)},j=function(e,n,t,s){return new(t||(t=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(n){a(n)}}function r(e){try{c(s.throw(e))}catch(n){a(n)}}function c(e){e.done?i(e.value):new t((function(n){n(e.value)})).then(o,r)}c((s=s.apply(e,n||[])).next())}))},T=function(e){return e&&e.__esModule?e:{default:e}};let I=class{constructor(e,n,t,s,i,a){this.store=e,this.router=n,this.localeService=t,this.admissionService=s,this.masterService=i,this.userService=a,this.moment=u}ngOnInit(){return j(this,void 0,void 0,(function*(){this.admission=this.store.pipe(Object(l.j)(v.a)),this.user=this.store.pipe(Object(l.j)(v.i)),this.screeningWorkEvents=[],this.selectDate()}))}ngOnDestroy(){clearTimeout(this.updateTimer)}update(){void 0!==this.updateTimer&&clearTimeout(this.updateTimer);this.updateTimer=setTimeout(()=>{this.selectDate()},6e5)}selectDate(e){return j(this,void 0,void 0,(function*(){null!=e&&(this.scheduleDate=e);try{const e=(yield this.userService.getData()).seller;if(void 0===e)return void this.router.navigate(["/error"]);void 0!==this.scheduleDate&&null!==this.scheduleDate||(this.scheduleDate=u().toDate());const n=u(this.scheduleDate).format("YYYY-MM-DD");this.admissionService.selectScheduleDate(n),yield this.masterService.getSchedule({superEvent:{locationBranchCodes:void 0===e.location||void 0===e.location.branchCode?[]:[e.location.branchCode]},startFrom:u(n).toDate(),startThrough:u(n).add(1,"day").toDate()});const t=(yield this.masterService.getData()).screeningEvents;this.screeningWorkEvents=Object(E.B)({screeningEvents:t}),this.update()}catch(n){console.error(n),this.router.navigate(["/error"])}}))}selectSchedule(e){this.admissionService.selectScreeningEvent(e),this.router.navigate(["/admission/check"])}setDatePicker(){this.user.subscribe(e=>{this.localeService.use(e.language)}).unsubscribe()}toggleDatepicker(){this.setDatePicker(),this.datepicker.toggle()}onShowPicker(e){Object(E.r)(e,[this.datepicker])}};I.ctorParameters=()=>[{type:l.b},{type:o.b},{type:x.c},{type:p.a},{type:p.d},{type:p.j}],w([Object(i.jb)("datepicker",{static:!0}),D("design:type",x.a)],I.prototype,"datepicker",void 0),I=w([Object(i.n)({selector:"app-admission-schedule",template:T(t("5Yqj")).default,styles:[T(t("OqUh")).default]}),D("design:paramtypes",[l.b,o.b,x.c,p.a,p.d,p.j])],I);var O=function(e,n,t,s){var i,a=arguments.length,o=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,n,t,s);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(o=(a<3?i(o):a>3?i(n,t,o):i(n,t))||o);return a>3&&o&&Object.defineProperty(n,t,o),o};const R=[{path:"",component:d.a,canActivate:[r.a,c.a],children:[{path:"schedule",component:I},{path:"check",component:k}]}];let S=class{};S=O([Object(i.I)({imports:[o.c.forChild(R)],exports:[o.c]})],S);var P=function(e,n,t,s){var i,a=arguments.length,o=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,n,t,s);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(o=(a<3?i(o):a>3?i(n,t,o):i(n,t))||o);return a>3&&o&&Object.defineProperty(n,t,o),o},C=function(e,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,n)},L=function(e){return e&&e.__esModule?e:{default:e}};let W=class{constructor(){this.select=new i.v,this.moment=u,this.environment=Object(g.a)()}ngOnInit(){}};P([Object(i.D)(),C("design:type",Object)],W.prototype,"screeningWorkEvent",void 0),P([Object(i.P)(),C("design:type",Object)],W.prototype,"select",void 0),W=P([Object(i.n)({selector:"app-admission-schedule-work",template:L(t("BMVQ")).default,styles:[L(t("+r+q")).default]}),C("design:paramtypes",[])],W),t.d(n,"AdmissionModule",(function(){return M}));let M=class{};M=function(e,n,t,s){var i,a=arguments.length,o=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,n,t,s);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(o=(a<3?i(o):a>3?i(n,t,o):i(n,t))||o);return a>3&&o&&Object.defineProperty(n,t,o),o}([Object(i.I)({declarations:[I,k,W],imports:[s.b,S,a.a]})],M)},mfvb:function(e,n,t){"use strict";t.r(n),n.default='<div class="contents-width mx-auto px-3 pt-5">\n    <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'admission.check.title\' | translate }}</h2>\n    <p class="mb-4 text-md-center" [innerHTML]="\'admission.check.read\' | translate"></p>\n</div>\n\n<div class="contents-width mx-auto px-3">\n    <div class="buttons mx-auto text-center mb-4">\n        <button type="button" class="btn btn-success btn-block py-3"\n            (click)="openQRCodeReader()">{{ \'admission.check.camera.start\' | translate }}</button>\n    </div>\n</div>\n\n\n<div *ngIf="!(isLoading | async)" class="mb-4">\n    <div *ngIf="(admission | async).qrcodeToken">\n        <div *ngIf="(admission | async).qrcodeToken.availableReservation" class="p-4 bg-success text-white text-center">\n            <div *ngIf="(admission | async).qrcodeToken.checkTokenActions.length === 0"\n                class="flash-text text-xx-large font-weight-bold mb-2">{{ \'admission.check.success\' | translate }}</div>\n            <div *ngIf="(admission | async).qrcodeToken.checkTokenActions.length > 0"\n                class="flash-text text-xx-large font-weight-bold mb-2">{{ \'admission.check.reEntry\' | translate }}</div>\n            <p *ngIf="(admission | async).qrcodeToken.availableReservation.reservedTicket.ticketedSeat && environment.DISPLAY_TICKETED_SEAT">\n                <strong class="mr-2">{{ \'common.seat\' | translate }}</strong>\n                {{ (admission | async).qrcodeToken.availableReservation.reservedTicket.ticketedSeat.seatNumber }}\n            </p>\n            <p>\n                <strong class="mr-2">{{ \'common.ticket\' | translate }}</strong>\n                {{ (admission | async).qrcodeToken.availableReservation.reservedTicket.ticketType.name | changeLanguage }}\n            </p>\n            <p>\n                <strong class="mr-2">{{ \'admission.check.entryCount\' | translate }}</strong>\n                {{ (admission | async).qrcodeToken.checkTokenActions.length }}\n            </p>\n        </div>\n        <div *ngIf="!(admission | async).qrcodeToken.availableReservation" class="p-4 bg-danger text-white text-center">\n            <div class="flash-text text-xx-large font-weight-bold mb-2">{{ \'admission.check.danger\' | translate }}</div>\n            <p *ngIf="(admission | async).qrcodeToken.statusCode === 200">\n                {{ \'admission.check.alert.event\' | translate }}<br>\n                <strong>{{ (admission | async).qrcodeToken.statusCode }}</strong>\n\n            </p>\n            <p *ngIf="(admission | async).qrcodeToken.statusCode !== 200">\n                {{ \'admission.check.alert.qrcode\' | translate }}<br>\n                <strong>{{ (admission | async).qrcodeToken.statusCode }}</strong>\n            </p>\n        </div>\n    </div>\n    <div *ngIf="!(admission | async).qrcodeToken" class="p-4 bg-dark text-white text-center">\n        <div class="text-xx-large font-weight-bold mb-2">{{ \'admission.check.waiting\' | translate }}</div>\n        <p>{{ \'admission.check.alert.waiting\' | translate }}</p>\n    </div>\n</div>\n\n\n<div class="contents-width mx-auto px-3 pb-5">\n    <div class="mb-4 bg-white">\n        <div class="p-3">\n            <div class="mb-2">\n                <p class="font-weight-bold text-large">{{ (admission | async).screeningEvent.name | changeLanguage }}</p>\n                <p *ngIf="(admission | async).screeningEvent.workPerformed.headline" class="text-small">\n                    {{ (admission | async).screeningEvent.workPerformed.headline }}\n                </p>\n                <p *ngIf="(admission | async).screeningEvent.superEvent.description && ((admission | async).screeningEvent.superEvent.description | changeLanguage)"\n                    class="text-small">\n                    {{ (admission | async).screeningEvent.superEvent.description | changeLanguage }}\n                </p>\n            </div>\n            <div class="d-flex align-items-center mb-2">\n                <div *ngIf="(admission | async).screeningEvent.workPerformed.contentRating"\n                    class="text-small text-white bg-dark py-1 px-3 mr-2">{{\n                (admission | async).screeningEvent.workPerformed.contentRating }}</div>\n                <div *ngIf="(admission | async).screeningEvent.superEvent.dubLanguage"\n                    class="text-small text-white bg-dark py-1 px-3 mr-2">{{ \'common.dubbing\' | translate }}</div>\n                <div *ngIf="(admission | async).screeningEvent.superEvent.subtitleLanguage"\n                    class="text-small text-white bg-dark py-1 px-3 mr-2">{{ \'common.subtitles\' | translate }}</div>\n                <div *ngIf="(admission | async).screeningEvent.workPerformed?.duration && moment.duration((admission | async).screeningEvent.workPerformed?.duration).asMinutes() > 0"\n                    class="text-small ml-auto">\n                    <span class="mr-1">{{ \'common.duration\' | translate }}</span>{{ moment.duration((admission | async).screeningEvent.workPerformed?.duration).asMinutes() }}{{ \'common.date.minute\' | translate }}\n                </div>\n            </div>\n        </div>\n        <div class="p-3">\n            <p class="theatre-name">{{ (admission | async).screeningEvent.superEvent.location.name | changeLanguage }}</p>\n            <p class="screen-name">\n                <span *ngIf="(admission | async).screeningEvent.location.address" class="mr-2">\n                    {{ (admission | async).screeningEvent.location.address | changeLanguage }}\n                </span>\n                <span>\n                    {{ (admission | async).screeningEvent.location.name | changeLanguage }}\n                </span>\n            </p>\n            <div>\n                <p class="mr-3">\n                    <strong class="mr-2">{{ \'common.doorTime\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.doorTime | formatDate: \'MM/DD (ddd) HH:mm\' }}\n                </p>\n                <p>\n                    <strong class="mr-2">{{ \'common.startDate\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.startDate | formatDate: \'MM/DD (ddd) HH:mm\' }} -\n                    {{ (admission | async).screeningEvent.endDate | formatDate: \'HH:mm\' }}\n                </p>\n                <p class="mr-3">\n                    <strong class="mr-2">{{ \'common.reservation\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.maximumAttendeeCapacity - (admission |\n                async).screeningEvent.remainingAttendeeCapacity }}\n                </p>\n                <p>\n                    <strong class="mr-2">{{ \'common.admission\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.attendeeCount }}\n                </p>\n            </div>\n        </div>\n    </div>\n    \x3c!-- <div class="p-3 mb-4 bg-light-gray">\n        <p><strong class="mr-2">\u672a\u9001\u4fe1\u4ef6\u6570</strong> {{ (admission | async).usentList.length }}</p>\n        <p>\u203b1\u5206\u306b1\u56de\u9001\u4fe1\u3055\u308c\u307e\u3059</p>\n    </div> --\x3e\n\n    <div class="buttons mx-auto text-center">\n        <button type="button" class="btn btn-link"\n            routerLink="/admission/schedule">{{ \'admission.schedule.prev\' | translate }}</button>\n    </div>\n\n</div>'},oN8W:function(e,n,t){"use strict";t.r(n),n.default=".video-area {\n  height: 25vh;\n  overflow: hidden;\n}\n\n.flash-text {\n  -webkit-animation-duration: 3s;\n          animation-duration: 3s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-name: flash-text;\n          animation-name: flash-text;\n}\n\n@-webkit-keyframes flash-text {\n  from, 20%, 40%, 60%, 80%, to {\n    color: #FFF;\n  }\n  10%, 30%, 50%, 70%, 90% {\n    color: transparent;\n  }\n}\n\n@keyframes flash-text {\n  from, 20%, 40%, 60%, 80%, to {\n    color: #FFF;\n  }\n  10%, 30%, 50%, 70%, 90% {\n    color: transparent;\n  }\n}"}}]);