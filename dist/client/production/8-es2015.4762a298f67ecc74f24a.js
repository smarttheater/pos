(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{dzKq:function(e,n,t){"use strict";t.r(n),t.d(n,"AdmissionModule",(function(){return fe}));var c=t("2kYt"),i=t("DSWM"),s=t("sEIs"),o=t("unpb"),a=t("RRjC"),r=t("sN6X"),d=t("wgY5"),l=t("PIN6"),u=t("cHUu"),m=t("mOXJ"),g=t("EM62"),f=t("s2Ay"),p=t("/Ez/"),v=t("OSFB"),h=t("NSn/"),w=function(e,n,t,c){return new(t||(t=Promise))((function(i,s){function o(e){try{r(c.next(e))}catch(n){s(n)}}function a(e){try{r(c.throw(e))}catch(n){s(n)}}function r(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,a)}r((c=c.apply(e,n||[])).next())}))};function b(e,n){1&e&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Bd(g.ad(2,1,"admission.check.success")))}function y(e,n){1&e&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Bd(g.ad(2,1,"admission.check.reEntry")))}function O(e,n){if(1&e&&(g.Pc(0,"p"),g.Pc(1,"strong",16),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Ad(4),g.Zc(5,"async"),g.Oc()),2&e){const e=g.Yc(4);var t;g.wc(2),g.Bd(g.ad(3,2,"common.seat")),g.wc(2),g.Cd(" ",null==(t=g.ad(5,4,e.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketedSeat.seatNumber," ")}}const P=function(e){return{"background-color":e}};function k(e,n){if(1&e&&(g.Pc(0,"div",13),g.Kc(1,"div",14),g.Zc(2,"async"),g.yd(3,b,3,3,"div",15),g.Zc(4,"async"),g.yd(5,y,3,3,"div",15),g.Zc(6,"async"),g.yd(7,O,6,6,"p",9),g.Zc(8,"async"),g.Pc(9,"p"),g.Pc(10,"strong",16),g.Ad(11),g.Zc(12,"translate"),g.Oc(),g.Ad(13),g.Zc(14,"changeLanguage"),g.Zc(15,"async"),g.Oc(),g.Pc(16,"p"),g.Pc(17,"strong",16),g.Ad(18),g.Zc(19,"translate"),g.Oc(),g.Ad(20),g.Zc(21,"async"),g.Oc(),g.Oc()),2&e){const e=g.Yc(3);var t;const n=g.id(26,P,null==(t=g.ad(2,8,e.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketType.color);var c;const r=0===(null==(c=g.ad(4,10,e.admission))?null:c.qrcodeToken.checkTokenActions.length);var i;const d=(null==(i=g.ad(6,12,e.admission))?null:i.qrcodeToken.checkTokenActions.length)>0;var s;const l=null==(s=g.ad(8,14,e.admission))?null:s.qrcodeToken.availableReservation.reservedTicket.ticketedSeat;var o,a;g.wc(1),g.fd("ngStyle",n),g.wc(2),g.fd("ngIf",r),g.wc(2),g.fd("ngIf",d),g.wc(2),g.fd("ngIf",l),g.wc(4),g.Bd(g.ad(12,16,"common.ticket")),g.wc(2),g.Cd(" ",g.ad(14,18,null==(o=g.ad(15,20,e.admission))?null:o.qrcodeToken.availableReservation.reservedTicket.ticketType.name)," "),g.wc(5),g.Bd(g.ad(19,22,"admission.check.entryCount")),g.wc(2),g.Cd(" ",null==(a=g.ad(21,24,e.admission))?null:a.qrcodeToken.checkTokenActions.length," ")}}function x(e,n){if(1&e&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"translate"),g.Kc(3,"br"),g.Pc(4,"strong"),g.Ad(5),g.Zc(6,"async"),g.Oc(),g.Oc()),2&e){const e=g.Yc(4);var t;g.wc(1),g.Cd(" ",g.ad(2,2,"admission.check.alert.event"),""),g.wc(4),g.Bd(null==(t=g.ad(6,4,e.admission))?null:t.qrcodeToken.statusCode)}}function E(e,n){if(1&e&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"translate"),g.Kc(3,"br"),g.Pc(4,"strong"),g.Ad(5),g.Zc(6,"async"),g.Oc(),g.Oc()),2&e){const e=g.Yc(4);var t;g.wc(1),g.Cd(" ",g.ad(2,2,"admission.check.alert.qrcode"),""),g.wc(4),g.Bd(null==(t=g.ad(6,4,e.admission))?null:t.qrcodeToken.statusCode)}}function C(e,n){if(1&e&&(g.Pc(0,"div",18),g.Pc(1,"div",17),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.yd(4,x,7,6,"p",9),g.Zc(5,"async"),g.yd(6,E,7,6,"p",9),g.Zc(7,"async"),g.Oc()),2&e){const e=g.Yc(3);var t;const n=200===(null==(t=g.ad(5,5,e.admission))?null:t.qrcodeToken.statusCode);var c;const i=200!==(null==(c=g.ad(7,7,e.admission))?null:c.qrcodeToken.statusCode);g.wc(2),g.Bd(g.ad(3,3,"admission.check.danger")),g.wc(2),g.fd("ngIf",n),g.wc(2),g.fd("ngIf",i)}}function Z(e,n){if(1&e&&(g.Pc(0,"div"),g.yd(1,k,22,28,"div",11),g.Zc(2,"async"),g.yd(3,C,8,9,"div",12),g.Zc(4,"async"),g.Oc()),2&e){const e=g.Yc(2);var t;const n=null==(t=g.ad(2,2,e.admission))?null:t.qrcodeToken.availableReservation;var c;const i=!(null!=(c=g.ad(4,4,e.admission))&&c.qrcodeToken.availableReservation);g.wc(1),g.fd("ngIf",n),g.wc(2),g.fd("ngIf",i)}}function A(e,n){1&e&&(g.Pc(0,"div",19),g.Pc(1,"div",20),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Pc(4,"p"),g.Ad(5),g.Zc(6,"translate"),g.Oc(),g.Oc()),2&e&&(g.wc(2),g.Bd(g.ad(3,2,"admission.check.waiting")),g.wc(3),g.Bd(g.ad(6,4,"admission.check.alert.waiting")))}function D(e,n){if(1&e&&(g.Pc(0,"div",8),g.yd(1,Z,5,6,"div",9),g.Zc(2,"async"),g.yd(3,A,7,6,"div",10),g.Zc(4,"async"),g.Oc()),2&e){const e=g.Yc();var t;const n=null==(t=g.ad(2,2,e.admission))?null:t.qrcodeToken;var c;const i=!(null!=(c=g.ad(4,4,e.admission))&&c.qrcodeToken);g.wc(1),g.fd("ngIf",n),g.wc(2),g.fd("ngIf",i)}}function I(e,n){if(1&e&&(g.Pc(0,"div",21),g.Kc(1,"app-item-event",22),g.Zc(2,"async"),g.Pc(3,"div",23),g.Pc(4,"div"),g.Pc(5,"p",24),g.Pc(6,"strong",16),g.Ad(7),g.Zc(8,"translate"),g.Oc(),g.Ad(9),g.Zc(10,"formatDate"),g.Zc(11,"async"),g.Oc(),g.Pc(12,"p"),g.Pc(13,"strong",16),g.Ad(14),g.Zc(15,"translate"),g.Oc(),g.Ad(16),g.Zc(17,"formatDate"),g.Zc(18,"async"),g.Zc(19,"formatDate"),g.Zc(20,"async"),g.Oc(),g.Pc(21,"p",24),g.Pc(22,"strong",16),g.Ad(23),g.Zc(24,"translate"),g.Oc(),g.Ad(25),g.Zc(26,"async"),g.Zc(27,"async"),g.Oc(),g.Pc(28,"p"),g.Pc(29,"strong",16),g.Ad(30),g.Zc(31,"translate"),g.Oc(),g.Ad(32),g.Zc(33,"async"),g.Oc(),g.Oc(),g.Oc(),g.Oc()),2&e){const e=g.Yc();var t;const n=null==(t=g.ad(2,10,e.admission))?null:t.screeningEvent;var c,i,s=null,o=null;g.wc(1),g.fd("screeningEvent",n),g.wc(6),g.Bd(g.ad(8,12,"common.doorTime")),g.wc(2),g.Cd(" ",g.bd(10,14,null==(c=g.ad(11,17,e.admission))?null:c.screeningEvent.doorTime,"MM/DD (ddd) HH:mm")," "),g.wc(5),g.Bd(g.ad(15,19,"common.startDate")),g.wc(2),g.Dd(" ",g.bd(17,21,null==(s=g.ad(18,24,e.admission))?null:s.screeningEvent.startDate,"MM/DD (ddd) HH:mm")," - ",g.bd(19,26,null==(s=g.ad(20,29,e.admission))?null:s.screeningEvent.endDate,"HH:mm")," "),g.wc(7),g.Bd(g.ad(24,31,"common.reservation")),g.wc(2),g.Cd(" ",(null==(o=g.ad(26,33,e.admission))?null:o.screeningEvent.maximumAttendeeCapacity)-(null==(o=g.ad(27,35,e.admission))?null:o.screeningEvent.remainingAttendeeCapacity)," "),g.wc(5),g.Bd(g.ad(31,37,"common.admission")),g.wc(2),g.Cd(" ",null==(i=g.ad(33,39,e.admission))?null:i.screeningEvent.attendeeCount," ")}}class S{constructor(e,n,t,c,i){this.store=e,this.actionService=n,this.utilService=t,this.qrcodeService=c,this.translate=i,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){this.inputCode="",this.isLoading=this.store.pipe(Object(r.m)(m.c)),this.admission=this.store.pipe(Object(r.m)(m.a)),this.actionService.admission.initializeQrcodeToken()}ngOnDestroy(){clearInterval(this.updateLoop)}handleKeyboardEvent(e){"Enter"===e.key&&this.inputCode.length>0?(this.check(this.inputCode),this.inputCode=""):"Escape"!==e.key&&(this.inputCode+=e.key)}check(e){return w(this,void 0,void 0,(function*(){try{yield this.actionService.admission.checkQrcodeToken(e)}catch(n){console.error(n),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("admission.check.alert.check")})}}))}openQRCodeReader(){this.qrcodeService.openQRCodeReader({cb:e=>w(this,void 0,void 0,(function*(){yield this.check(e)}))})}update(){clearInterval(this.updateLoop),this.updateLoop=setInterval(()=>w(this,void 0,void 0,(function*(){const{screeningEvent:e}=yield this.actionService.admission.getData();void 0!==e&&(yield this.actionService.admission.getScreeningEvent(e))})),6e5)}}S.\u0275fac=function(e){return new(e||S)(g.Jc(r.b),g.Jc(u.a),g.Jc(u.f),g.Jc(u.e),g.Jc(f.d))},S.\u0275cmp=g.Dc({type:S,selectors:[["app-admission-check"]],hostBindings:function(e,n){1&e&&g.Wc("keypress",(function(e){return n.handleKeyboardEvent(e)}),!1,g.qd)},decls:14,vars:12,consts:[[1,"contents-width","mx-auto","px-3","pt-4"],[1,"buttons","mx-auto","text-center","mb-4"],["type","button",1,"btn","btn-success","btn-block","py-3",3,"click"],["class","mb-4",4,"ngIf"],[1,"contents-width","mx-auto","px-3","pb-5"],["class","mb-4 bg-white",4,"ngIf"],[1,"buttons","mx-auto","text-center"],["type","button","routerLink","/admission/schedule",1,"btn","btn-outline-primary","btn-block","py-3"],[1,"mb-4"],[4,"ngIf"],["class","p-4 bg-dark text-white text-center",4,"ngIf"],["class","position-relative p-4 bg-success text-white text-center",4,"ngIf"],["class","p-4 bg-danger text-white text-center",4,"ngIf"],[1,"position-relative","p-4","bg-success","text-white","text-center"],[1,"color","rounded","border","border-white",3,"ngStyle"],["class","flash-text text-xx-large font-weight-bold mb-2",4,"ngIf"],[1,"mr-2"],[1,"flash-text","text-xx-large","font-weight-bold","mb-2"],[1,"p-4","bg-danger","text-white","text-center"],[1,"p-4","bg-dark","text-white","text-center"],[1,"text-xx-large","font-weight-bold","mb-2"],[1,"mb-4","bg-white"],[3,"screeningEvent"],[1,"p-3"],[1,"mr-3"]],template:function(e,n){if(1&e&&(g.Pc(0,"div",0),g.Pc(1,"div",1),g.Pc(2,"button",2),g.Wc("click",(function(){return n.openQRCodeReader()})),g.Ad(3),g.Zc(4,"translate"),g.Oc(),g.Oc(),g.Oc(),g.yd(5,D,5,6,"div",3),g.Zc(6,"async"),g.Pc(7,"div",4),g.yd(8,I,34,41,"div",5),g.Zc(9,"async"),g.Pc(10,"div",6),g.Pc(11,"button",7),g.Ad(12),g.Zc(13,"translate"),g.Oc(),g.Oc(),g.Oc()),2&e){var t;const e=null==(t=g.ad(9,8,n.admission))?null:t.screeningEvent;g.wc(3),g.Bd(g.ad(4,4,"admission.check.camera.start")),g.wc(2),g.fd("ngIf",!g.ad(6,6,n.isLoading)),g.wc(3),g.fd("ngIf",e),g.wc(4),g.Bd(g.ad(13,10,"admission.schedule.prev"))}},directives:[c.l,s.c,c.m,p.a],pipes:[f.c,c.b,v.a,h.a],styles:[".video-area[_ngcontent-%COMP%]{height:25vh;overflow:hidden}.flash-text[_ngcontent-%COMP%]{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:flash-text;animation-name:flash-text}.color[_ngcontent-%COMP%]{position:absolute;top:.5rem;left:.5rem;width:1.5rem;height:1.5rem}@-webkit-keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}@keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}"]});var M=t("QN9p"),T=t("x8Mb"),Y=t("nIj0"),_=t("ddJ1");function B(e,n){if(1&e&&(g.Pc(0,"p",15),g.Ad(1),g.Zc(2,"changeLanguage"),g.Oc()),2&e){const e=g.Yc(2);g.wc(1),g.Cd(" ",g.ad(2,1,e.performance.screeningEvent.location.address),"")}}function G(e,n){if(1&e&&(g.Pc(0,"div",12),g.yd(1,B,3,3,"p",13),g.Zc(2,"changeLanguage"),g.Pc(3,"p",14),g.Ad(4),g.Zc(5,"changeLanguage"),g.Oc(),g.Oc()),2&e){const e=g.Yc();g.wc(1),g.fd("ngIf",g.ad(2,2,e.performance.screeningEvent.location.address)),g.wc(3),g.Bd(g.ad(5,4,e.performance.screeningEvent.location.name))}}function L(e,n){if(1&e&&(g.Pc(0,"div",16),g.Pc(1,"p",14),g.Ad(2),g.Zc(3,"changeLanguage"),g.Oc(),g.Oc()),2&e){const e=g.Yc();g.wc(2),g.Cd(" ",g.ad(3,1,e.performance.screeningEvent.name),"")}}function H(e,n){1&e&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.opening"),""))}function R(e,n){1&e&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.nowShowing"),""))}function q(e,n){if(1&e&&(g.Pc(0,"div"),g.yd(1,H,3,3,"div",8),g.yd(2,R,3,3,"div",8),g.Oc()),2&e){const e=g.Yc();g.wc(1),g.fd("ngIf",e.performance.isOpenDoor()),g.wc(1),g.fd("ngIf",e.performance.isScreening())}}function j(e,n){1&e&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.beforeOpening"),""))}function F(e,n){1&e&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.filmCompletion"),""))}function J(e,n){if(1&e&&(g.Pc(0,"div",18),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e){const e=g.Yc();g.wc(1),g.Ed(" ",g.ad(2,3,"common.seat")," ",e.performance.screeningEvent.remainingAttendeeCapacity," / ",e.performance.screeningEvent.maximumAttendeeCapacity," ")}}function K(e,n){1&e&&(g.Pc(0,"div",18),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.infiniteStock"),""))}const U=function(e,n){return{"bg-white":e,"bg-dark-gray text-light-gray":n}};class W{constructor(){this.select=new g.w,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){}}function Q(e,n){if(1&e&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"changeLanguage"),g.Oc()),2&e){const e=g.Yc(2);g.wc(1),g.Cd(" ",g.ad(2,1,e.screeningEventsGroup.info.superEvent.headline),"")}}function N(e,n){if(1&e&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"changeLanguage"),g.Oc()),2&e){const e=g.Yc(2);g.wc(1),g.Bd(g.ad(2,1,e.screeningEventsGroup.info.superEvent.description))}}function z(e,n){if(1&e&&(g.Pc(0,"div",14),g.Ad(1),g.Oc()),2&e){const e=g.Yc(2);g.wc(1),g.Bd(null==e.screeningEventsGroup.info.workPerformed?null:e.screeningEventsGroup.info.workPerformed.contentRating)}}function X(e,n){1&e&&(g.Pc(0,"div",15),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Bd(g.ad(2,1,"common.dubbing")))}function $(e,n){1&e&&(g.Pc(0,"div",16),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&e&&(g.wc(1),g.Bd(g.ad(2,1,"common.subtitles")))}function V(e,n){if(1&e&&(g.Pc(0,"div",17),g.Ad(1),g.Oc()),2&e){const e=n.$implicit;g.wc(1),g.Bd(e.name)}}function ee(e,n){if(1&e&&(g.Pc(0,"div",18),g.Pc(1,"span",19),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Ad(4),g.Zc(5,"translate"),g.Oc()),2&e){const e=g.Yc(2);g.wc(2),g.Bd(g.ad(3,3,"common.duration")),g.wc(2),g.Dd("",e.moment.duration(null==e.screeningEventsGroup.info.workPerformed?null:e.screeningEventsGroup.info.workPerformed.duration).asMinutes(),"",g.ad(5,5,"common.date.minute")," ")}}function ne(e,n){if(1&e&&(g.Pc(0,"div",4),g.Pc(1,"div",5),g.Pc(2,"p",6),g.Ad(3),g.Zc(4,"changeLanguage"),g.Oc(),g.yd(5,Q,3,3,"p",7),g.Zc(6,"changeLanguage"),g.yd(7,N,3,3,"p",7),g.Zc(8,"changeLanguage"),g.Oc(),g.Pc(9,"div",8),g.yd(10,z,2,1,"div",9),g.yd(11,X,3,3,"div",10),g.yd(12,$,3,3,"div",11),g.yd(13,V,2,1,"div",12),g.yd(14,ee,6,7,"div",13),g.Oc(),g.Oc()),2&e){const e=g.Yc();g.wc(3),g.Bd(g.ad(4,8,e.screeningEventsGroup.info.name)),g.wc(2),g.fd("ngIf",e.screeningEventsGroup.info.superEvent.headline&&g.ad(6,10,e.screeningEventsGroup.info.superEvent.headline)),g.wc(2),g.fd("ngIf",e.screeningEventsGroup.info.superEvent.description&&g.ad(8,12,e.screeningEventsGroup.info.superEvent.description)),g.wc(3),g.fd("ngIf",null==e.screeningEventsGroup.info.workPerformed?null:e.screeningEventsGroup.info.workPerformed.contentRating),g.wc(1),g.fd("ngIf",e.screeningEventsGroup.info.superEvent.dubLanguage),g.wc(1),g.fd("ngIf",e.screeningEventsGroup.info.superEvent.subtitleLanguage),g.wc(1),g.fd("ngForOf",e.screeningEventsGroup.info.superEvent.videoFormat),g.wc(1),g.fd("ngIf",(null==e.screeningEventsGroup.info.workPerformed?null:e.screeningEventsGroup.info.workPerformed.duration)&&e.moment.duration(null==e.screeningEventsGroup.info.workPerformed?null:e.screeningEventsGroup.info.workPerformed.duration).asMinutes()>0)}}function te(e,n){if(1&e&&(g.Pc(0,"div",4),g.Pc(1,"p",6),g.Ad(2),g.Zc(3,"changeLanguage"),g.Oc(),g.Oc()),2&e){const e=g.Yc();g.wc(2),g.Bd(g.ad(3,1,e.screeningEventsGroup.info.location.name))}}function ce(e,n){if(1&e){const e=g.Qc();g.Pc(0,"li",20),g.Pc(1,"app-admission-performance",21),g.Wc("select",(function(n){g.sd(e);return g.Yc().select.emit(n)})),g.Oc(),g.Oc()}if(2&e){const e=n.$implicit;g.wc(1),g.fd("performance",e)}}W.\u0275fac=function(e){return new(e||W)},W.\u0275cmp=g.Dc({type:W,selectors:[["app-admission-performance"]],inputs:{performance:"performance"},outputs:{select:"select"},decls:24,vars:21,consts:[[1,"row","mx-0","border","boder-gray","rounded","p-3","py-md-3","text-md-center","d-md-block","align-items-center","pointer","h-100",3,"ngClass","click"],[1,"col-md-12","col-8","px-0"],["class","mb-1 text-small screen-name",4,"ngIf"],["class","mb-1 text-small",4,"ngIf"],[1,"text-large"],[1,"border-0","bg-light-gray","my-2"],[1,"col-md-12","col-4","px-0","text-center"],[4,"ngIf"],["class","status mb-2",4,"ngIf"],["class","mb-2 text-small",4,"ngIf"],[1,"text-small","mb-1"],[1,"text-small"],[1,"mb-1","text-small","screen-name"],["class","text-overflow-ellipsis mr-2 d-inline-block d-md-block",4,"ngIf"],[1,"text-overflow-ellipsis","d-inline-block","d-md-block"],[1,"text-overflow-ellipsis","mr-2","d-inline-block","d-md-block"],[1,"mb-1","text-small"],[1,"status","mb-2"],[1,"mb-2","text-small"]],template:function(e,n){1&e&&(g.Pc(0,"div",0),g.Wc("click",(function(){return n.select.emit(n.performance.screeningEvent)})),g.Pc(1,"div",1),g.yd(2,G,6,6,"div",2),g.yd(3,L,4,3,"div",3),g.Pc(4,"div"),g.Pc(5,"strong",4),g.Ad(6),g.Oc(),g.Pc(7,"span"),g.Ad(8,"-"),g.Oc(),g.Pc(9,"span"),g.Ad(10),g.Oc(),g.Oc(),g.Oc(),g.Kc(11,"hr",5),g.Pc(12,"div",6),g.yd(13,q,3,2,"div",7),g.yd(14,j,3,3,"div",8),g.yd(15,F,3,3,"div",8),g.yd(16,J,3,5,"div",9),g.yd(17,K,3,3,"div",9),g.Pc(18,"div",10),g.Ad(19),g.Zc(20,"translate"),g.Oc(),g.Pc(21,"div",11),g.Ad(22),g.Zc(23,"translate"),g.Oc(),g.Oc(),g.Oc()),2&e&&(g.fd("ngClass",g.jd(18,U,n.performance.isOpenDoor()||n.performance.isScreening(),!(n.performance.isOpenDoor()||n.performance.isScreening()))),g.wc(2),g.fd("ngIf","screeningEventSeries"===n.environment.PURCHASE_SCHEDULE_SORT),g.wc(1),g.fd("ngIf","screen"===n.environment.PURCHASE_SCHEDULE_SORT),g.wc(3),g.Bd(n.moment(n.performance.screeningEvent.startDate).format("HH:mm")),g.wc(4),g.Bd(n.moment(n.performance.screeningEvent.endDate).format("HH:mm")),g.wc(3),g.fd("ngIf",n.performance.isOpenDoor()||n.performance.isScreening()),g.wc(1),g.fd("ngIf",n.performance.isOpenDoor("before")),g.wc(1),g.fd("ngIf",n.performance.isScreening("after")),g.wc(1),g.fd("ngIf",!n.performance.isInfinitetock()),g.wc(1),g.fd("ngIf",n.performance.isInfinitetock()),g.wc(2),g.Dd("",g.ad(20,14,"common.ticketing")," ",n.performance.screeningEvent.checkInCount,""),g.wc(3),g.Dd("",g.ad(23,16,"common.admission")," ",n.performance.screeningEvent.attendeeCount,""))},directives:[c.j,c.l],pipes:[f.c,v.a],styles:[".status[_ngcontent-%COMP%]{line-height:30px}.status[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}@media (max-width:767.98px){.text-overflow-ellipsis[_ngcontent-%COMP%]{overflow:auto;width:auto;white-space:normal}}"]});class ie{constructor(){this.select=new g.w,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){}}ie.\u0275fac=function(e){return new(e||ie)},ie.\u0275cmp=g.Dc({type:ie,selectors:[["app-admission-performances"]],inputs:{screeningEventsGroup:"screeningEventsGroup"},outputs:{select:"select"},decls:5,vars:3,consts:[[1,"bg-white"],["class","p-3 bg-gray",4,"ngIf"],[1,"py-2","px-3","px-md-2","d-flex","flex-wrap"],["class","px-md-2 my-2",4,"ngFor","ngForOf"],[1,"p-3","bg-gray"],[1,"mb-2"],[1,"font-weight-bold","text-large"],[4,"ngIf"],[1,"d-flex","align-items-center","flex-wrap"],["class","content-rating text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","dub-language text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","subtitle-language text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","video-format text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngFor","ngForOf"],["class","text-small ml-auto",4,"ngIf"],[1,"content-rating","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"dub-language","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"subtitle-language","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"video-format","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"text-small","ml-auto"],[1,"mr-1"],[1,"px-md-2","my-2"],[1,"mb-3",3,"performance","select"]],template:function(e,n){1&e&&(g.Pc(0,"div",0),g.yd(1,ne,15,14,"div",1),g.yd(2,te,4,3,"div",1),g.Pc(3,"ul",2),g.yd(4,ce,2,1,"li",3),g.Oc(),g.Oc()),2&e&&(g.wc(1),g.fd("ngIf","screeningEventSeries"===n.environment.PURCHASE_SCHEDULE_SORT),g.wc(1),g.fd("ngIf","screen"===n.environment.PURCHASE_SCHEDULE_SORT),g.wc(2),g.fd("ngForOf",n.screeningEventsGroup.data))},directives:[c.l,c.k,W],pipes:[v.a,f.c],styles:["[_nghost-%COMP%]{display:block}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:20%}@media (max-width:991.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:25%}}@media (max-width:767.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:100%}}"]});var se=function(e,n,t,c){return new(t||(t=Promise))((function(i,s){function o(e){try{r(c.next(e))}catch(n){s(n)}}function a(e){try{r(c.throw(e))}catch(n){s(n)}}function r(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,a)}r((c=c.apply(e,n||[])).next())}))};const oe=["datepicker"];function ae(e,n){if(1&e&&(g.Pc(0,"p",16),g.Ad(1),g.Zc(2,"formatDate"),g.Zc(3,"async"),g.Oc()),2&e){const e=g.Yc();var t;g.wc(1),g.Cd(" ",g.bd(2,1,null==(t=g.ad(3,4,e.admission))?null:t.scheduleDate,"YYYY/MM/DD (ddd)"),"")}}function re(e,n){1&e&&(g.Kc(0,"p",17),g.Zc(1,"translate")),2&e&&g.fd("innerHTML",g.ad(1,1,"admission.schedule.notfound"),g.td)}function de(e,n){if(1&e){const e=g.Qc();g.Pc(0,"app-admission-performances",18),g.Wc("select",(function(n){g.sd(e);return g.Yc().selectSchedule(n)})),g.Oc()}if(2&e){const e=n.$implicit;g.fd("screeningEventsGroup",e)}}const le=function(){return{dateInputFormat:"YYYY/MM/DD",adaptivePosition:!0,showWeekNumbers:!1}};class ue{constructor(e,n,t,c,i){this.store=e,this.router=n,this.localeService=t,this.actionService=c,this.masterService=i,this.moment=d}ngOnInit(){return se(this,void 0,void 0,(function*(){this.admission=this.store.pipe(Object(r.m)(m.a)),this.user=this.store.pipe(Object(r.m)(m.i)),this.isLoading=this.store.pipe(Object(r.m)(m.c)),this.screeningEventsGroup=[]}))}ngOnDestroy(){clearTimeout(this.updateTimer)}update(){void 0!==this.updateTimer&&clearTimeout(this.updateTimer);this.updateTimer=setTimeout(()=>{this.selectDate()},6e5)}selectDate(e){return se(this,void 0,void 0,(function*(){if(!(yield this.getLoading())){null!=e&&(this.scheduleDate=e);try{const e=(yield this.actionService.user.getData()).theater;if(void 0===e)return void this.router.navigate(["/error"]);void 0!==this.scheduleDate&&null!==this.scheduleDate||(this.scheduleDate=d().toDate());const n=d(this.scheduleDate).format("YYYY-MM-DD");this.actionService.admission.selectScheduleDate(n);const t=yield this.masterService.getSchedule({superEvent:{locationBranchCodes:[e.branchCode]},startFrom:d(n).toDate(),startThrough:d(n).add(1,"day").toDate()});this.screeningEventsGroup=T.a.Purchase.screeningEvents2ScreeningEventSeries({screeningEvents:t}),this.update()}catch(n){console.error(n),this.router.navigate(["/error"])}}}))}selectSchedule(e){return se(this,void 0,void 0,(function*(){try{yield this.actionService.admission.getScreeningEvent(e),this.router.navigate(["/admission/check"])}catch(n){console.error(n),this.router.navigate(["/error"])}}))}notSpecified(){this.actionService.admission.delete(),this.router.navigate(["/admission/check"])}setDatePicker(){this.user.subscribe(e=>{this.localeService.use(e.language)}).unsubscribe()}toggleDatepicker(){this.setDatePicker(),this.datepicker.toggle()}onShowPicker(e){T.a.Util.iOSDatepickerTapBugFix(e,[this.datepicker])}getLoading(){return se(this,void 0,void 0,(function*(){return new Promise(e=>{this.isLoading.subscribe(n=>{e(n)}).unsubscribe()})}))}}ue.\u0275fac=function(e){return new(e||ue)(g.Jc(r.b),g.Jc(s.b),g.Jc(M.d),g.Jc(u.a),g.Jc(u.d))},ue.\u0275cmp=g.Dc({type:ue,selectors:[["app-admission-schedule"]],viewQuery:function(e,n){var t;(1&e&&g.wd(oe,!0),2&e)&&(g.od(t=g.Xc())&&(n.datepicker=t.first))},decls:22,vars:17,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"mb-3"],[1,"input-group"],["type","text","placeholder","Datepicker","bsDatepicker","","readonly","",1,"form-control",3,"ngModel","bsConfig","ngModelChange","bsValueChange","click","onShown"],["datepicker","bsDatepicker"],[1,"input-group-append","pointer",3,"click"],[1,"input-group-text"],[1,"fas","fa-caret-down"],["class","text-primary text-large mb-3",4,"ngIf"],["class","mb-3",3,"innerHTML",4,"ngIf"],[1,"mb-4"],["class","mb-3",3,"screeningEventsGroup","select",4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","button",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"click"],[1,"text-primary","text-large","mb-3"],[1,"mb-3",3,"innerHTML"],[1,"mb-3",3,"screeningEventsGroup","select"]],template:function(e,n){if(1&e&&(g.Pc(0,"div",0),g.Pc(1,"h2",1),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Kc(4,"p",2),g.Zc(5,"translate"),g.Pc(6,"div",3),g.Pc(7,"div",4),g.Pc(8,"input",5,6),g.Wc("ngModelChange",(function(e){return n.scheduleDate=e}))("bsValueChange",(function(e){return n.selectDate(e)}))("click",(function(){return n.setDatePicker()}))("onShown",(function(e){return n.onShowPicker(e)})),g.Oc(),g.Pc(10,"div",7),g.Wc("click",(function(){return n.toggleDatepicker()})),g.Pc(11,"span",8),g.Kc(12,"i",9),g.Oc(),g.Oc(),g.Oc(),g.Oc(),g.yd(13,ae,4,6,"p",10),g.Zc(14,"async"),g.yd(15,re,2,3,"p",11),g.Pc(16,"div",12),g.yd(17,de,1,1,"app-admission-performances",13),g.Oc(),g.Pc(18,"div",14),g.Pc(19,"button",15),g.Wc("click",(function(){return n.notSpecified()})),g.Ad(20),g.Zc(21,"translate"),g.Oc(),g.Oc(),g.Oc()),2&e){var t;const e=null==(t=g.ad(14,12,n.admission))?null:t.scheduleDate;g.wc(2),g.Bd(g.ad(3,8,"admission.schedule.title")),g.wc(2),g.fd("innerHTML",g.ad(5,10,"admission.schedule.read"),g.td),g.wc(4),g.fd("ngModel",n.scheduleDate)("bsConfig",g.hd(16,le)),g.wc(5),g.fd("ngIf",e),g.wc(2),g.fd("ngIf",0===n.screeningEventsGroup.length),g.wc(2),g.fd("ngForOf",n.screeningEventsGroup),g.wc(3),g.Bd(g.ad(21,14,"admission.schedule.next"))}},directives:[M.b,Y.a,M.a,Y.k,Y.n,_.b,c.l,c.k,ie],pipes:[f.c,c.b,h.a],styles:['.condition[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%}.schedule-slider[_ngcontent-%COMP%]   .swiper-slide[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background-color:#000;opacity:.3}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%], .schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{width:27px;height:27px;background-image:url(/assets/images/icon/slider_arrow.svg);background-size:27px;margin-top:-13px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%]{right:-38px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{left:-38px;transform:rotate(180deg)}']});const me=[{path:"",component:a.a,canActivate:[o.a,o.c],children:[{path:"schedule",component:ue},{path:"check",component:S}]}];class ge{}ge.\u0275mod=g.Hc({type:ge}),ge.\u0275inj=g.Gc({factory:function(e){return new(e||ge)},imports:[[s.d.forChild(me)],s.d]});class fe{}fe.\u0275mod=g.Hc({type:fe}),fe.\u0275inj=g.Gc({factory:function(e){return new(e||fe)},imports:[[c.c,ge,i.a]]})}}]);