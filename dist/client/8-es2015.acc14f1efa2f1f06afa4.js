(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{dzKq:function(e,n,t){"use strict";t.r(n),t.d(n,"AdmissionModule",(function(){return pe}));var c=t("2kYt"),i=t("DSWM"),s=t("sEIs"),a=t("unpb"),r=t("RRjC"),o=t("sN6X"),d=t("wgY5"),l=t("PIN6"),u=t("cHUu"),g=t("mOXJ"),m=t("EM62"),p=t("s2Ay"),v=t("/Ez/"),f=t("OSFB"),h=t("NSn/"),w=function(e,n,t,c){return new(t||(t=Promise))((function(i,s){function a(e){try{o(c.next(e))}catch(n){s(n)}}function r(e){try{o(c.throw(e))}catch(n){s(n)}}function o(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,r)}o((c=c.apply(e,n||[])).next())}))};function b(e,n){1&e&&(m.Pc(0,"div",17),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Ad(m.ad(2,1,"admission.check.success")))}function x(e,n){1&e&&(m.Pc(0,"div",17),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Ad(m.ad(2,1,"admission.check.reEntry")))}function O(e,n){if(1&e&&(m.Pc(0,"p"),m.Pc(1,"strong",16),m.zd(2),m.Zc(3,"translate"),m.Oc(),m.zd(4),m.Zc(5,"async"),m.Oc()),2&e){const e=m.Yc(4);var t;m.wc(2),m.Ad(m.ad(3,2,"common.seat")),m.wc(2),m.Bd(" ",null==(t=m.ad(5,4,e.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketedSeat.seatNumber," ")}}const P=function(e){return{"background-color":e}};function k(e,n){if(1&e&&(m.Pc(0,"div",13),m.Kc(1,"div",14),m.Zc(2,"async"),m.xd(3,b,3,3,"div",15),m.Zc(4,"async"),m.xd(5,x,3,3,"div",15),m.Zc(6,"async"),m.xd(7,O,6,6,"p",9),m.Zc(8,"async"),m.Pc(9,"p"),m.Pc(10,"strong",16),m.zd(11),m.Zc(12,"translate"),m.Oc(),m.zd(13),m.Zc(14,"changeLanguage"),m.Zc(15,"async"),m.Oc(),m.Pc(16,"p"),m.Pc(17,"strong",16),m.zd(18),m.Zc(19,"translate"),m.Oc(),m.zd(20),m.Zc(21,"async"),m.Oc(),m.Oc()),2&e){const e=m.Yc(3);var t;const n=m.hd(26,P,null==(t=m.ad(2,8,e.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketType.color);var c;const o=0===(null==(c=m.ad(4,10,e.admission))?null:c.qrcodeToken.checkTokenActions.length);var i;const d=(null==(i=m.ad(6,12,e.admission))?null:i.qrcodeToken.checkTokenActions.length)>0;var s;const l=null==(s=m.ad(8,14,e.admission))?null:s.qrcodeToken.availableReservation.reservedTicket.ticketedSeat;var a,r;m.wc(1),m.ed("ngStyle",n),m.wc(2),m.ed("ngIf",o),m.wc(2),m.ed("ngIf",d),m.wc(2),m.ed("ngIf",l),m.wc(4),m.Ad(m.ad(12,16,"common.ticket")),m.wc(2),m.Bd(" ",m.ad(14,18,null==(a=m.ad(15,20,e.admission))?null:a.qrcodeToken.availableReservation.reservedTicket.ticketType.name)," "),m.wc(5),m.Ad(m.ad(19,22,"admission.check.entryCount")),m.wc(2),m.Bd(" ",null==(r=m.ad(21,24,e.admission))?null:r.qrcodeToken.checkTokenActions.length," ")}}function y(e,n){if(1&e&&(m.Pc(0,"p"),m.zd(1),m.Zc(2,"translate"),m.Kc(3,"br"),m.Pc(4,"strong"),m.zd(5),m.Zc(6,"async"),m.Oc(),m.Oc()),2&e){const e=m.Yc(4);var t;m.wc(1),m.Bd(" ",m.ad(2,2,"admission.check.alert.event"),""),m.wc(4),m.Ad(null==(t=m.ad(6,4,e.admission))?null:t.qrcodeToken.statusCode)}}function E(e,n){if(1&e&&(m.Pc(0,"p"),m.zd(1),m.Zc(2,"translate"),m.Kc(3,"br"),m.Pc(4,"strong"),m.zd(5),m.Zc(6,"async"),m.Oc(),m.Oc()),2&e){const e=m.Yc(4);var t;m.wc(1),m.Bd(" ",m.ad(2,2,"admission.check.alert.qrcode"),""),m.wc(4),m.Ad(null==(t=m.ad(6,4,e.admission))?null:t.qrcodeToken.statusCode)}}function C(e,n){if(1&e&&(m.Pc(0,"div",18),m.Pc(1,"div",17),m.zd(2),m.Zc(3,"translate"),m.Oc(),m.xd(4,y,7,6,"p",9),m.Zc(5,"async"),m.xd(6,E,7,6,"p",9),m.Zc(7,"async"),m.Oc()),2&e){const e=m.Yc(3);var t;const n=200===(null==(t=m.ad(5,5,e.admission))?null:t.qrcodeToken.statusCode);var c;const i=200!==(null==(c=m.ad(7,7,e.admission))?null:c.qrcodeToken.statusCode);m.wc(2),m.Ad(m.ad(3,3,"admission.check.danger")),m.wc(2),m.ed("ngIf",n),m.wc(2),m.ed("ngIf",i)}}function S(e,n){if(1&e&&(m.Pc(0,"div"),m.xd(1,k,22,28,"div",11),m.Zc(2,"async"),m.xd(3,C,8,9,"div",12),m.Zc(4,"async"),m.Oc()),2&e){const e=m.Yc(2);var t;const n=null==(t=m.ad(2,2,e.admission))?null:t.qrcodeToken.availableReservation;var c;const i=!(null!=(c=m.ad(4,4,e.admission))&&c.qrcodeToken.availableReservation);m.wc(1),m.ed("ngIf",n),m.wc(2),m.ed("ngIf",i)}}function Z(e,n){1&e&&(m.Pc(0,"div",19),m.Pc(1,"div",20),m.zd(2),m.Zc(3,"translate"),m.Oc(),m.Pc(4,"p"),m.zd(5),m.Zc(6,"translate"),m.Oc(),m.Oc()),2&e&&(m.wc(2),m.Ad(m.ad(3,2,"admission.check.waiting")),m.wc(3),m.Ad(m.ad(6,4,"admission.check.alert.waiting")))}function D(e,n){if(1&e&&(m.Pc(0,"div",8),m.xd(1,S,5,6,"div",9),m.Zc(2,"async"),m.xd(3,Z,7,6,"div",10),m.Zc(4,"async"),m.Oc()),2&e){const e=m.Yc();var t;const n=null==(t=m.ad(2,2,e.admission))?null:t.qrcodeToken;var c;const i=!(null!=(c=m.ad(4,4,e.admission))&&c.qrcodeToken);m.wc(1),m.ed("ngIf",n),m.wc(2),m.ed("ngIf",i)}}function I(e,n){if(1&e&&(m.Pc(0,"div",21),m.Kc(1,"app-item-event",22),m.Zc(2,"async"),m.Pc(3,"div",23),m.Pc(4,"div"),m.Pc(5,"p",24),m.Pc(6,"strong",16),m.zd(7),m.Zc(8,"translate"),m.Oc(),m.zd(9),m.Zc(10,"formatDate"),m.Zc(11,"async"),m.Oc(),m.Pc(12,"p"),m.Pc(13,"strong",16),m.zd(14),m.Zc(15,"translate"),m.Oc(),m.zd(16),m.Zc(17,"formatDate"),m.Zc(18,"async"),m.Zc(19,"formatDate"),m.Zc(20,"async"),m.Oc(),m.Pc(21,"p",24),m.Pc(22,"strong",16),m.zd(23),m.Zc(24,"translate"),m.Oc(),m.zd(25),m.Zc(26,"async"),m.Zc(27,"async"),m.Oc(),m.Pc(28,"p"),m.Pc(29,"strong",16),m.zd(30),m.Zc(31,"translate"),m.Oc(),m.zd(32),m.Zc(33,"async"),m.Oc(),m.Oc(),m.Oc(),m.Oc()),2&e){const e=m.Yc();var t;const n=null==(t=m.ad(2,10,e.admission))?null:t.screeningEvent;var c,i,s=null,a=null;m.wc(1),m.ed("screeningEvent",n),m.wc(6),m.Ad(m.ad(8,12,"common.doorTime")),m.wc(2),m.Bd(" ",m.bd(10,14,null==(c=m.ad(11,17,e.admission))?null:c.screeningEvent.doorTime,"MM/DD (ddd) HH:mm")," "),m.wc(5),m.Ad(m.ad(15,19,"common.startDate")),m.wc(2),m.Cd(" ",m.bd(17,21,null==(s=m.ad(18,24,e.admission))?null:s.screeningEvent.startDate,"MM/DD (ddd) HH:mm")," - ",m.bd(19,26,null==(s=m.ad(20,29,e.admission))?null:s.screeningEvent.endDate,"HH:mm")," "),m.wc(7),m.Ad(m.ad(24,31,"common.reservation")),m.wc(2),m.Bd(" ",(null==(a=m.ad(26,33,e.admission))?null:a.screeningEvent.maximumAttendeeCapacity)-(null==(a=m.ad(27,35,e.admission))?null:a.screeningEvent.remainingAttendeeCapacity)," "),m.wc(5),m.Ad(m.ad(31,37,"common.admission")),m.wc(2),m.Bd(" ",null==(i=m.ad(33,39,e.admission))?null:i.screeningEvent.attendeeCount," ")}}class z{constructor(e,n,t,c,i){this.store=e,this.actionService=n,this.utilService=t,this.qrcodeService=c,this.translate=i,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){this.inputCode="",this.isLoading=this.store.pipe(Object(o.m)(g.c)),this.admission=this.store.pipe(Object(o.m)(g.a)),this.actionService.admission.initializeQrcodeToken()}ngOnDestroy(){clearInterval(this.updateLoop)}handleKeyboardEvent(e){"Enter"===e.key&&this.inputCode.length>0?(this.check(this.inputCode),this.inputCode=""):"Escape"!==e.key&&(this.inputCode+=e.key)}check(e){return w(this,void 0,void 0,(function*(){try{yield this.actionService.admission.checkQrcodeToken(e)}catch(n){console.error(n),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("admission.check.alert.check")})}}))}openQRCodeReader(){this.qrcodeService.openQRCodeReader({cb:e=>w(this,void 0,void 0,(function*(){yield this.check(e)}))})}update(){clearInterval(this.updateLoop),this.updateLoop=setInterval(()=>w(this,void 0,void 0,(function*(){const{screeningEvent:e}=yield this.actionService.admission.getData();void 0!==e&&(yield this.actionService.admission.getScreeningEvent(e))})),6e5)}}z.\u0275fac=function(e){return new(e||z)(m.Jc(o.b),m.Jc(u.a),m.Jc(u.f),m.Jc(u.e),m.Jc(p.d))},z.\u0275cmp=m.Dc({type:z,selectors:[["app-admission-check"]],hostBindings:function(e,n){1&e&&m.Wc("keypress",(function(e){return n.handleKeyboardEvent(e)}),!1,m.pd)},decls:14,vars:12,consts:[[1,"contents-width","mx-auto","px-3","pt-4"],[1,"buttons","mx-auto","text-center","mb-4"],["type","button",1,"btn","btn-success","btn-block","py-3",3,"click"],["class","mb-4",4,"ngIf"],[1,"contents-width","mx-auto","px-3","pb-5"],["class","mb-4 bg-white",4,"ngIf"],[1,"buttons","mx-auto","text-center"],["type","button","routerLink","/admission/schedule",1,"btn","btn-outline-primary","btn-block","py-3"],[1,"mb-4"],[4,"ngIf"],["class","p-4 bg-dark text-white text-center",4,"ngIf"],["class","position-relative p-4 bg-success text-white text-center",4,"ngIf"],["class","p-4 bg-danger text-white text-center",4,"ngIf"],[1,"position-relative","p-4","bg-success","text-white","text-center"],[1,"color","rounded","border","border-white",3,"ngStyle"],["class","flash-text text-xx-large font-weight-bold mb-2",4,"ngIf"],[1,"mr-2"],[1,"flash-text","text-xx-large","font-weight-bold","mb-2"],[1,"p-4","bg-danger","text-white","text-center"],[1,"p-4","bg-dark","text-white","text-center"],[1,"text-xx-large","font-weight-bold","mb-2"],[1,"mb-4","bg-white"],[3,"screeningEvent"],[1,"p-3"],[1,"mr-3"]],template:function(e,n){if(1&e&&(m.Pc(0,"div",0),m.Pc(1,"div",1),m.Pc(2,"button",2),m.Wc("click",(function(){return n.openQRCodeReader()})),m.zd(3),m.Zc(4,"translate"),m.Oc(),m.Oc(),m.Oc(),m.xd(5,D,5,6,"div",3),m.Zc(6,"async"),m.Pc(7,"div",4),m.xd(8,I,34,41,"div",5),m.Zc(9,"async"),m.Pc(10,"div",6),m.Pc(11,"button",7),m.zd(12),m.Zc(13,"translate"),m.Oc(),m.Oc(),m.Oc()),2&e){var t;const e=null==(t=m.ad(9,8,n.admission))?null:t.screeningEvent;m.wc(3),m.Ad(m.ad(4,4,"admission.check.camera.start")),m.wc(2),m.ed("ngIf",!m.ad(6,6,n.isLoading)),m.wc(3),m.ed("ngIf",e),m.wc(4),m.Ad(m.ad(13,10,"admission.schedule.prev"))}},directives:[c.l,s.c,c.m,v.a],pipes:[p.c,c.b,f.a,h.a],styles:[".video-area[_ngcontent-%COMP%]{height:25vh;overflow:hidden}.flash-text[_ngcontent-%COMP%]{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:flash-text;animation-name:flash-text}.color[_ngcontent-%COMP%]{position:absolute;top:.5rem;left:.5rem;width:1.5rem;height:1.5rem}@-webkit-keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}@keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}"]});var M=t("QN9p"),T=t("x8Mb"),A=t("nIj0"),_=t("ddJ1");function Y(e,n){if(1&e&&(m.Pc(0,"p",15),m.zd(1),m.Zc(2,"changeLanguage"),m.Oc()),2&e){const e=m.Yc(2);m.wc(1),m.Bd(" ",m.ad(2,1,e.performance.screeningEvent.location.address),"")}}function L(e,n){if(1&e&&(m.Pc(0,"div",12),m.xd(1,Y,3,3,"p",13),m.Zc(2,"changeLanguage"),m.Pc(3,"p",14),m.zd(4),m.Zc(5,"changeLanguage"),m.Oc(),m.Oc()),2&e){const e=m.Yc();m.wc(1),m.ed("ngIf",m.ad(2,2,e.performance.screeningEvent.location.address)),m.wc(3),m.Ad(m.ad(5,4,e.performance.screeningEvent.location.name))}}function G(e,n){if(1&e&&(m.Pc(0,"div",16),m.Pc(1,"p",14),m.zd(2),m.Zc(3,"changeLanguage"),m.Oc(),m.Oc()),2&e){const e=m.Yc();m.wc(2),m.Bd(" ",m.ad(3,1,e.performance.screeningEvent.name),"")}}function H(e,n){1&e&&(m.Pc(0,"div",17),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Bd(" ",m.ad(2,1,"admission.schedule.status.opening"),""))}function R(e,n){1&e&&(m.Pc(0,"div",17),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Bd(" ",m.ad(2,1,"admission.schedule.status.nowShowing"),""))}function q(e,n){if(1&e&&(m.Pc(0,"div"),m.xd(1,H,3,3,"div",8),m.xd(2,R,3,3,"div",8),m.Oc()),2&e){const e=m.Yc();m.wc(1),m.ed("ngIf",e.performance.isOpenDoor()),m.wc(1),m.ed("ngIf",e.performance.isScreening())}}function B(e,n){1&e&&(m.Pc(0,"div",17),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Bd(" ",m.ad(2,1,"admission.schedule.status.beforeOpening"),""))}function F(e,n){1&e&&(m.Pc(0,"div",17),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Bd(" ",m.ad(2,1,"admission.schedule.status.filmCompletion"),""))}function j(e,n){if(1&e&&(m.Pc(0,"div",18),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e){const e=m.Yc();m.wc(1),m.Dd(" ",m.ad(2,3,"common.seat")," ",e.performance.screeningEvent.remainingAttendeeCapacity," / ",e.performance.screeningEvent.maximumAttendeeCapacity," ")}}function J(e,n){1&e&&(m.Pc(0,"div",18),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Bd(" ",m.ad(2,1,"admission.schedule.infiniteStock"),""))}const U=function(e,n){return{"bg-white":e,"bg-dark-gray text-light-gray":n}};class K{constructor(){this.select=new m.w,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){}}function W(e,n){if(1&e&&(m.Pc(0,"p"),m.zd(1),m.Zc(2,"changeLanguage"),m.Oc()),2&e){const e=m.Yc(2);m.wc(1),m.Bd(" ",m.ad(2,1,e.screeningEventsGroup.screeningEvent.superEvent.headline),"")}}function Q(e,n){if(1&e&&(m.Pc(0,"p"),m.zd(1),m.Zc(2,"changeLanguage"),m.Oc()),2&e){const e=m.Yc(2);m.wc(1),m.Ad(m.ad(2,1,e.screeningEventsGroup.screeningEvent.superEvent.description))}}function N(e,n){if(1&e&&(m.Pc(0,"div",14),m.zd(1),m.Oc()),2&e){const e=m.Yc(2);m.wc(1),m.Ad(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.contentRating)}}function $(e,n){1&e&&(m.Pc(0,"div",15),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Ad(m.ad(2,1,"common.dubbing")))}function X(e,n){1&e&&(m.Pc(0,"div",16),m.zd(1),m.Zc(2,"translate"),m.Oc()),2&e&&(m.wc(1),m.Ad(m.ad(2,1,"common.subtitles")))}function V(e,n){if(1&e&&(m.Pc(0,"div",17),m.zd(1),m.Oc()),2&e){const e=n.$implicit;m.wc(1),m.Ad(e.name)}}function ee(e,n){if(1&e&&(m.Pc(0,"div",18),m.Pc(1,"span",19),m.zd(2),m.Zc(3,"translate"),m.Oc(),m.zd(4),m.Zc(5,"translate"),m.Oc()),2&e){const e=m.Yc(2);m.wc(2),m.Ad(m.ad(3,3,"common.duration")),m.wc(2),m.Cd("",e.moment.duration(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.duration).asMinutes(),"",m.ad(5,5,"common.date.minute")," ")}}function ne(e,n){if(1&e&&(m.Pc(0,"div",4),m.Pc(1,"div",5),m.Pc(2,"p",6),m.zd(3),m.Zc(4,"changeLanguage"),m.Oc(),m.xd(5,W,3,3,"p",7),m.Zc(6,"changeLanguage"),m.xd(7,Q,3,3,"p",7),m.Zc(8,"changeLanguage"),m.Oc(),m.Pc(9,"div",8),m.xd(10,N,2,1,"div",9),m.xd(11,$,3,3,"div",10),m.xd(12,X,3,3,"div",11),m.xd(13,V,2,1,"div",12),m.xd(14,ee,6,7,"div",13),m.Oc(),m.Oc()),2&e){const e=m.Yc();m.wc(3),m.Ad(m.ad(4,8,e.screeningEventsGroup.screeningEvent.name)),m.wc(2),m.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.headline&&m.ad(6,10,e.screeningEventsGroup.screeningEvent.superEvent.headline)),m.wc(2),m.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.description&&m.ad(8,12,e.screeningEventsGroup.screeningEvent.superEvent.description)),m.wc(3),m.ed("ngIf",null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.contentRating),m.wc(1),m.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.dubLanguage),m.wc(1),m.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.subtitleLanguage),m.wc(1),m.ed("ngForOf",e.screeningEventsGroup.screeningEvent.superEvent.videoFormat),m.wc(1),m.ed("ngIf",(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.duration)&&e.moment.duration(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.duration).asMinutes()>0)}}function te(e,n){if(1&e&&(m.Pc(0,"div",4),m.Pc(1,"p",6),m.zd(2),m.Zc(3,"changeLanguage"),m.Oc(),m.Oc()),2&e){const e=m.Yc();m.wc(2),m.Ad(m.ad(3,1,e.screeningEventsGroup.screeningEvent.location.name))}}function ce(e,n){if(1&e){const e=m.Qc();m.Pc(0,"li",20),m.Pc(1,"app-admission-performance",21),m.Wc("select",(function(n){m.rd(e);return m.Yc().select.emit(n)})),m.Oc(),m.Oc()}if(2&e){const e=n.$implicit;m.wc(1),m.ed("performance",e)}}K.\u0275fac=function(e){return new(e||K)},K.\u0275cmp=m.Dc({type:K,selectors:[["app-admission-performance"]],inputs:{performance:"performance"},outputs:{select:"select"},decls:24,vars:21,consts:[[1,"row","mx-0","border","boder-gray","rounded","p-3","py-md-3","text-md-center","d-md-block","align-items-center","pointer","h-100",3,"ngClass","click"],[1,"col-md-12","col-8","px-0"],["class","mb-1 text-small screen-name",4,"ngIf"],["class","mb-1 text-small",4,"ngIf"],[1,"text-large"],[1,"border-0","bg-light-gray","my-2"],[1,"col-md-12","col-4","px-0","text-center"],[4,"ngIf"],["class","status mb-2",4,"ngIf"],["class","mb-2 text-small",4,"ngIf"],[1,"text-small","mb-1"],[1,"text-small"],[1,"mb-1","text-small","screen-name"],["class","text-overflow-ellipsis mr-2 d-inline-block d-md-block",4,"ngIf"],[1,"text-overflow-ellipsis","d-inline-block","d-md-block"],[1,"text-overflow-ellipsis","mr-2","d-inline-block","d-md-block"],[1,"mb-1","text-small"],[1,"status","mb-2"],[1,"mb-2","text-small"]],template:function(e,n){1&e&&(m.Pc(0,"div",0),m.Wc("click",(function(){return n.select.emit(n.performance.screeningEvent)})),m.Pc(1,"div",1),m.xd(2,L,6,6,"div",2),m.xd(3,G,4,3,"div",3),m.Pc(4,"div"),m.Pc(5,"strong",4),m.zd(6),m.Oc(),m.Pc(7,"span"),m.zd(8,"-"),m.Oc(),m.Pc(9,"span"),m.zd(10),m.Oc(),m.Oc(),m.Oc(),m.Kc(11,"hr",5),m.Pc(12,"div",6),m.xd(13,q,3,2,"div",7),m.xd(14,B,3,3,"div",8),m.xd(15,F,3,3,"div",8),m.xd(16,j,3,5,"div",9),m.xd(17,J,3,3,"div",9),m.Pc(18,"div",10),m.zd(19),m.Zc(20,"translate"),m.Oc(),m.Pc(21,"div",11),m.zd(22),m.Zc(23,"translate"),m.Oc(),m.Oc(),m.Oc()),2&e&&(m.ed("ngClass",m.id(18,U,n.performance.isOpenDoor()||n.performance.isScreening(),!(n.performance.isOpenDoor()||n.performance.isScreening()))),m.wc(2),m.ed("ngIf","screeningEventSeries"===n.environment.PURCHASE_SCHEDULE_SORT),m.wc(1),m.ed("ngIf","screen"===n.environment.PURCHASE_SCHEDULE_SORT),m.wc(3),m.Ad(n.moment(n.performance.screeningEvent.startDate).format("HH:mm")),m.wc(4),m.Ad(n.moment(n.performance.screeningEvent.endDate).format("HH:mm")),m.wc(3),m.ed("ngIf",n.performance.isOpenDoor()||n.performance.isScreening()),m.wc(1),m.ed("ngIf",n.performance.isOpenDoor("before")),m.wc(1),m.ed("ngIf",n.performance.isScreening("after")),m.wc(1),m.ed("ngIf",!n.performance.isInfinitetock()),m.wc(1),m.ed("ngIf",n.performance.isInfinitetock()),m.wc(2),m.Cd("",m.ad(20,14,"common.ticketing")," ",n.performance.screeningEvent.checkInCount,""),m.wc(3),m.Cd("",m.ad(23,16,"common.admission")," ",n.performance.screeningEvent.attendeeCount,""))},directives:[c.j,c.l],pipes:[p.c,f.a],styles:[".status[_ngcontent-%COMP%]{line-height:30px}.status[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}@media (max-width:767.98px){.text-overflow-ellipsis[_ngcontent-%COMP%]{overflow:auto;width:auto;white-space:normal}}"]});class ie{constructor(){this.select=new m.w,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){}}ie.\u0275fac=function(e){return new(e||ie)},ie.\u0275cmp=m.Dc({type:ie,selectors:[["app-admission-performances"]],inputs:{screeningEventsGroup:"screeningEventsGroup"},outputs:{select:"select"},decls:5,vars:3,consts:[[1,"bg-white"],["class","p-3 bg-gray",4,"ngIf"],[1,"py-2","px-3","px-md-2","d-flex","flex-wrap"],["class","px-md-2 my-2",4,"ngFor","ngForOf"],[1,"p-3","bg-gray"],[1,"mb-2"],[1,"font-weight-bold","text-large"],[4,"ngIf"],[1,"d-flex","align-items-center","flex-wrap"],["class","content-rating text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","dub-language text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","subtitle-language text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","video-format text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngFor","ngForOf"],["class","text-small ml-auto",4,"ngIf"],[1,"content-rating","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"dub-language","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"subtitle-language","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"video-format","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"text-small","ml-auto"],[1,"mr-1"],[1,"px-md-2","my-2"],[1,"mb-3",3,"performance","select"]],template:function(e,n){1&e&&(m.Pc(0,"div",0),m.xd(1,ne,15,14,"div",1),m.xd(2,te,4,3,"div",1),m.Pc(3,"ul",2),m.xd(4,ce,2,1,"li",3),m.Oc(),m.Oc()),2&e&&(m.wc(1),m.ed("ngIf","screeningEventSeries"===n.environment.PURCHASE_SCHEDULE_SORT),m.wc(1),m.ed("ngIf","screen"===n.environment.PURCHASE_SCHEDULE_SORT),m.wc(2),m.ed("ngForOf",n.screeningEventsGroup.data))},directives:[c.l,c.k,K],pipes:[f.a,p.c],styles:["[_nghost-%COMP%]{display:block}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:20%}@media (max-width:991.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:25%}}@media (max-width:767.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:100%}}"]});var se=function(e,n,t,c){return new(t||(t=Promise))((function(i,s){function a(e){try{o(c.next(e))}catch(n){s(n)}}function r(e){try{o(c.throw(e))}catch(n){s(n)}}function o(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,r)}o((c=c.apply(e,n||[])).next())}))};const ae=["datepicker"];function re(e,n){if(1&e&&(m.Pc(0,"p",16),m.zd(1),m.Zc(2,"formatDate"),m.Zc(3,"async"),m.Oc()),2&e){const e=m.Yc();var t;m.wc(1),m.Bd(" ",m.bd(2,1,null==(t=m.ad(3,4,e.admission))?null:t.scheduleDate,"YYYY/MM/DD (ddd)"),"")}}function oe(e,n){1&e&&(m.Kc(0,"p",17),m.Zc(1,"translate")),2&e&&m.ed("innerHTML",m.ad(1,1,"admission.schedule.notfound"),m.sd)}function de(e,n){if(1&e){const e=m.Qc();m.Pc(0,"app-admission-performances",18),m.Wc("select",(function(n){m.rd(e);return m.Yc().selectSchedule(n)})),m.Oc()}if(2&e){const e=n.$implicit;m.ed("screeningEventsGroup",e)}}const le=function(){return{dateInputFormat:"YYYY/MM/DD",adaptivePosition:!0,showWeekNumbers:!1}};class ue{constructor(e,n,t,c,i){this.store=e,this.router=n,this.localeService=t,this.actionService=c,this.masterService=i,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){return se(this,void 0,void 0,(function*(){this.admission=this.store.pipe(Object(o.m)(g.a)),this.user=this.store.pipe(Object(o.m)(g.i)),this.isLoading=this.store.pipe(Object(o.m)(g.c)),this.screeningEventsGroup=[]}))}ngOnDestroy(){clearTimeout(this.updateTimer)}update(){void 0!==this.updateTimer&&clearTimeout(this.updateTimer);this.updateTimer=setTimeout(()=>{this.selectDate()},6e5)}selectDate(e){return se(this,void 0,void 0,(function*(){if(!(yield this.getLoading())){null!=e&&(this.scheduleDate=e);try{const e=(yield this.actionService.user.getData()).theater;if(void 0===e)return void this.router.navigate(["/error"]);void 0!==this.scheduleDate&&null!==this.scheduleDate||(this.scheduleDate=d().toDate());const n=d(this.scheduleDate).format("YYYY-MM-DD");this.actionService.admission.selectScheduleDate(n);const t=yield this.masterService.searchMovies({offers:{availableFrom:d(n).toDate()}}),c="screeningEventSeries"===this.environment.PURCHASE_SCHEDULE_SORT?yield this.masterService.searchScreeningEventSeries({location:{branchCode:{$eq:e.branchCode}},workPerformed:{identifiers:t.map(e=>e.identifier)}}):[],i="screen"===this.environment.PURCHASE_SCHEDULE_SORT?yield this.masterService.searchScreeningRooms({branchCode:{$eq:e.branchCode}}):[],s=yield this.masterService.searchScreeningEvent({superEvent:{locationBranchCodes:[e.branchCode]},startFrom:d(n).toDate(),startThrough:d(n).add(1,"day").add(-1,"millisecond").toDate(),creativeWorks:t,screeningEventSeries:c,screeningRooms:i});this.screeningEventsGroup=T.a.Purchase.screeningEvents2ScreeningEventSeries({screeningEvents:s}),this.update()}catch(n){console.error(n),this.router.navigate(["/error"])}}}))}selectSchedule(e){return se(this,void 0,void 0,(function*(){try{yield this.actionService.admission.getScreeningEvent(e),this.router.navigate(["/admission/check"])}catch(n){console.error(n),this.router.navigate(["/error"])}}))}notSpecified(){this.actionService.admission.delete(),this.router.navigate(["/admission/check"])}setDatePicker(){this.user.subscribe(e=>{this.localeService.use(e.language)}).unsubscribe()}toggleDatepicker(){this.setDatePicker(),this.datepicker.toggle()}onShowPicker(e){T.a.Util.iOSDatepickerTapBugFix(e,[this.datepicker])}getLoading(){return se(this,void 0,void 0,(function*(){return new Promise(e=>{this.isLoading.subscribe(n=>{e(n)}).unsubscribe()})}))}}ue.\u0275fac=function(e){return new(e||ue)(m.Jc(o.b),m.Jc(s.b),m.Jc(M.d),m.Jc(u.a),m.Jc(u.d))},ue.\u0275cmp=m.Dc({type:ue,selectors:[["app-admission-schedule"]],viewQuery:function(e,n){var t;(1&e&&m.vd(ae,!0),2&e)&&(m.nd(t=m.Xc())&&(n.datepicker=t.first))},decls:22,vars:17,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"mb-3"],[1,"input-group"],["type","text","placeholder","Datepicker","bsDatepicker","","readonly","",1,"form-control",3,"ngModel","bsConfig","ngModelChange","bsValueChange","click","onShown"],["datepicker","bsDatepicker"],[1,"input-group-append","pointer",3,"click"],[1,"input-group-text"],[1,"fas","fa-caret-down"],["class","text-primary text-large mb-3",4,"ngIf"],["class","mb-3",3,"innerHTML",4,"ngIf"],[1,"mb-4"],["class","mb-3",3,"screeningEventsGroup","select",4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","button",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"click"],[1,"text-primary","text-large","mb-3"],[1,"mb-3",3,"innerHTML"],[1,"mb-3",3,"screeningEventsGroup","select"]],template:function(e,n){if(1&e&&(m.Pc(0,"div",0),m.Pc(1,"h2",1),m.zd(2),m.Zc(3,"translate"),m.Oc(),m.Kc(4,"p",2),m.Zc(5,"translate"),m.Pc(6,"div",3),m.Pc(7,"div",4),m.Pc(8,"input",5,6),m.Wc("ngModelChange",(function(e){return n.scheduleDate=e}))("bsValueChange",(function(e){return n.selectDate(e)}))("click",(function(){return n.setDatePicker()}))("onShown",(function(e){return n.onShowPicker(e)})),m.Oc(),m.Pc(10,"div",7),m.Wc("click",(function(){return n.toggleDatepicker()})),m.Pc(11,"span",8),m.Kc(12,"i",9),m.Oc(),m.Oc(),m.Oc(),m.Oc(),m.xd(13,re,4,6,"p",10),m.Zc(14,"async"),m.xd(15,oe,2,3,"p",11),m.Pc(16,"div",12),m.xd(17,de,1,1,"app-admission-performances",13),m.Oc(),m.Pc(18,"div",14),m.Pc(19,"button",15),m.Wc("click",(function(){return n.notSpecified()})),m.zd(20),m.Zc(21,"translate"),m.Oc(),m.Oc(),m.Oc()),2&e){var t;const e=null==(t=m.ad(14,12,n.admission))?null:t.scheduleDate;m.wc(2),m.Ad(m.ad(3,8,"admission.schedule.title")),m.wc(2),m.ed("innerHTML",m.ad(5,10,"admission.schedule.read"),m.sd),m.wc(4),m.ed("ngModel",n.scheduleDate)("bsConfig",m.gd(16,le)),m.wc(5),m.ed("ngIf",e),m.wc(2),m.ed("ngIf",0===n.screeningEventsGroup.length),m.wc(2),m.ed("ngForOf",n.screeningEventsGroup),m.wc(3),m.Ad(m.ad(21,14,"admission.schedule.next"))}},directives:[M.b,A.a,M.a,A.k,A.n,_.b,c.l,c.k,ie],pipes:[p.c,c.b,h.a],styles:['.condition[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%}.schedule-slider[_ngcontent-%COMP%]   .swiper-slide[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background-color:#000;opacity:.3}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%], .schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{width:27px;height:27px;background-image:url(/assets/images/icon/slider_arrow.svg);background-size:27px;margin-top:-13px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%]{right:-38px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{left:-38px;transform:rotate(180deg)}']});const ge=[{path:"",component:r.a,canActivate:[a.a,a.c],children:[{path:"schedule",component:ue},{path:"check",component:z}]}];class me{}me.\u0275mod=m.Hc({type:me}),me.\u0275inj=m.Gc({factory:function(e){return new(e||me)},imports:[[s.d.forChild(ge)],s.d]});class pe{}pe.\u0275mod=m.Hc({type:pe}),pe.\u0275inj=m.Gc({factory:function(e){return new(e||pe)},imports:[[c.c,me,i.a]]})}}]);