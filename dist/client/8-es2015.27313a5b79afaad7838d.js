(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{dzKq:function(e,n,t){"use strict";t.r(n),t.d(n,"AdmissionModule",(function(){return pe}));var c=t("2kYt"),i=t("DSWM"),r=t("sEIs"),o=t("unpb"),s=t("RRjC"),a=t("sN6X"),d=t("Fp6c"),l=t("wgY5"),u=t("PIN6"),g=t("cHUu"),m=t("mOXJ"),p=t("EM62"),h=t("K/wI"),v=t("/Ez/"),f=t("s2Ay"),w=t("OSFB"),b=t("NSn/"),x=function(e,n,t,c){return new(t||(t=Promise))((function(i,r){function o(e){try{a(c.next(e))}catch(n){r(n)}}function s(e){try{a(c.throw(e))}catch(n){r(n)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,s)}a((c=c.apply(e,n||[])).next())}))};function O(e,n){if(1&e&&(p.Pc(0,"p",12),p.zd(1),p.Zc(2,"changeLanguage"),p.Zc(3,"async"),p.Oc()),2&e){const e=p.Yc(2);var t;p.wc(1),p.Ad(p.ad(2,1,null==(t=p.ad(3,3,e.user))||null==t.entranceGate?null:t.entranceGate.name))}}function P(e,n){1&e&&(p.Pc(0,"div",21),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Ad(p.ad(2,1,"admission.check.success")))}function k(e,n){1&e&&(p.Pc(0,"div",21),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Ad(p.ad(2,1,"admission.check.reEntry")))}const E=function(e){return[e]};function y(e,n){if(1&e&&(p.Pc(0,"tr"),p.Pc(1,"th",20),p.zd(2),p.Zc(3,"translate"),p.Zc(4,"translate"),p.Oc(),p.Pc(5,"td",20),p.Kc(6,"app-item-list",22),p.Oc(),p.Oc()),2&e){const e=p.Yc(4);p.wc(2),p.Cd("",p.ad(3,3,"common.seat")," / ",p.ad(4,5,"common.ticket"),""),p.wc(4),p.ed("authorizeSeatReservations",p.hd(7,E,null==e.qrcodeToken?null:e.qrcodeToken.availableReservation))}}const D=function(e){return{"background-color":e}};function S(e,n){if(1&e&&(p.Pc(0,"div",15),p.Pc(1,"div",16),p.Kc(2,"div",17),p.xd(3,P,3,3,"div",18),p.xd(4,k,3,3,"div",18),p.Pc(5,"table",19),p.Kc(6,"thead"),p.Pc(7,"tbody"),p.xd(8,y,7,9,"tr",10),p.Pc(9,"tr"),p.Pc(10,"th",20),p.zd(11),p.Zc(12,"translate"),p.Oc(),p.Pc(13,"td",20),p.Pc(14,"p"),p.zd(15),p.Oc(),p.Oc(),p.Oc(),p.Oc(),p.Oc(),p.Oc(),p.Oc()),2&e){const e=p.Yc(3);p.wc(2),p.ed("ngStyle",p.hd(8,D,null==e.qrcodeToken?null:e.qrcodeToken.availableReservation.reservedTicket.ticketType.color)),p.wc(1),p.ed("ngIf",0===(null==e.qrcodeToken?null:e.qrcodeToken.checkTokenActions.length)),p.wc(1),p.ed("ngIf",(null==e.qrcodeToken?null:e.qrcodeToken.checkTokenActions.length)>0),p.wc(4),p.ed("ngIf",null==e.qrcodeToken?null:e.qrcodeToken.availableReservation.reservedTicket.ticketedSeat),p.wc(3),p.Ad(p.ad(12,6,"admission.check.entryCount")),p.wc(4),p.Ad(null==e.qrcodeToken?null:e.qrcodeToken.checkTokenActions.length)}}function C(e,n){if(1&e&&(p.Pc(0,"div",23),p.Pc(1,"div",16),p.Pc(2,"div",24),p.zd(3),p.Zc(4,"translate"),p.Oc(),p.Pc(5,"p",25),p.zd(6),p.Zc(7,"translate"),p.Oc(),p.Pc(8,"table",19),p.Kc(9,"thead"),p.Pc(10,"tbody"),p.Pc(11,"tr"),p.Pc(12,"th",20),p.zd(13,"message"),p.Oc(),p.Pc(14,"td",20),p.Pc(15,"p"),p.zd(16),p.Oc(),p.Oc(),p.Oc(),p.Pc(17,"tr"),p.Pc(18,"th",20),p.zd(19,"inputCode"),p.Oc(),p.Pc(20,"td",20),p.Pc(21,"p"),p.zd(22),p.Oc(),p.Oc(),p.Oc(),p.Pc(23,"tr"),p.Pc(24,"th",20),p.zd(25,"statusCode"),p.Oc(),p.Pc(26,"td",20),p.Pc(27,"p"),p.zd(28),p.Oc(),p.Oc(),p.Oc(),p.Oc(),p.Oc(),p.Oc(),p.Oc()),2&e){const e=p.Yc(3);p.wc(3),p.Ad(p.ad(4,5,"admission.check.danger")),p.wc(3),p.Bd(" ",p.ad(7,7,"admission.check.alert.qrcode")," "),p.wc(10),p.Ad(null==e.qrcodeToken||null==e.qrcodeToken.error?null:e.qrcodeToken.error.message),p.wc(6),p.Ad(null==e.qrcodeToken||null==e.qrcodeToken.error?null:e.qrcodeToken.error.inputCode),p.wc(6),p.Ad(null==e.qrcodeToken?null:e.qrcodeToken.statusCode)}}function I(e,n){if(1&e&&(p.Pc(0,"div"),p.xd(1,S,16,10,"div",13),p.xd(2,C,29,9,"div",14),p.Oc()),2&e){const e=p.Yc(2);p.wc(1),p.ed("ngIf",null==e.qrcodeToken?null:e.qrcodeToken.availableReservation),p.wc(1),p.ed("ngIf",!(null!=e.qrcodeToken&&e.qrcodeToken.availableReservation))}}function T(e,n){1&e&&(p.Pc(0,"div",26),p.Pc(1,"div",27),p.Pc(2,"div",28),p.zd(3),p.Zc(4,"translate"),p.Oc(),p.Pc(5,"p"),p.zd(6),p.Zc(7,"translate"),p.Oc(),p.Oc(),p.Oc()),2&e&&(p.wc(3),p.Ad(p.ad(4,2,"admission.check.waiting")),p.wc(3),p.Ad(p.ad(7,4,"admission.check.alert.waiting")))}function z(e,n){if(1&e&&(p.Pc(0,"div",8),p.xd(1,O,4,5,"p",9),p.Zc(2,"async"),p.xd(3,I,3,2,"div",10),p.xd(4,T,8,6,"div",11),p.Oc()),2&e){const e=p.Yc();var t;const n=null==(t=p.ad(2,3,e.user))?null:t.entranceGate;p.wc(1),p.ed("ngIf",n),p.wc(2),p.ed("ngIf",e.qrcodeToken),p.wc(1),p.ed("ngIf",!e.qrcodeToken)}}function M(e,n){if(1&e&&(p.Pc(0,"div",29),p.Kc(1,"app-item-event",30),p.Pc(2,"div",31),p.Pc(3,"div"),p.Pc(4,"p",32),p.Pc(5,"strong",33),p.zd(6),p.Zc(7,"translate"),p.Oc(),p.zd(8),p.Zc(9,"formatDate"),p.Oc(),p.Pc(10,"p"),p.Pc(11,"strong",33),p.zd(12),p.Zc(13,"translate"),p.Oc(),p.zd(14),p.Zc(15,"formatDate"),p.Zc(16,"formatDate"),p.Oc(),p.Pc(17,"p",32),p.Pc(18,"strong",33),p.zd(19),p.Zc(20,"translate"),p.Oc(),p.zd(21),p.Oc(),p.Pc(22,"p"),p.Pc(23,"strong",33),p.zd(24),p.Zc(25,"translate"),p.Oc(),p.zd(26),p.Oc(),p.Oc(),p.Oc(),p.Oc()),2&e){const e=p.Yc();p.wc(1),p.ed("screeningEvent",e.screeningEvent),p.wc(5),p.Ad(p.ad(7,10,"common.doorTime")),p.wc(2),p.Bd(" ",p.bd(9,12,null==e.screeningEvent?null:e.screeningEvent.doorTime,"MM/DD (ddd) HH:mm")," "),p.wc(4),p.Ad(p.ad(13,15,"common.startDate")),p.wc(2),p.Cd(" ",p.bd(15,17,null==e.screeningEvent?null:e.screeningEvent.startDate,"MM/DD (ddd) HH:mm")," - ",p.bd(16,20,null==e.screeningEvent?null:e.screeningEvent.endDate,"HH:mm")," "),p.wc(5),p.Ad(p.ad(20,23,"common.reservation")),p.wc(2),p.Bd(" ",(null==e.screeningEvent?null:e.screeningEvent.maximumAttendeeCapacity)-(null==e.screeningEvent?null:e.screeningEvent.remainingAttendeeCapacity)," "),p.wc(3),p.Ad(p.ad(25,25,"common.admission")),p.wc(2),p.Bd(" ",null==e.screeningEvent?null:e.screeningEvent.attendeeCount," ")}}class Y{constructor(e,n,t,c){this.store=e,this.actionService=n,this.qrcodeService=t,this.router=c,this.moment=l,this.environment=Object(u.a)()}ngOnInit(){return x(this,void 0,void 0,(function*(){this.inputCode="",this.isLoading=this.store.pipe(Object(a.m)(m.c)),this.admission=this.store.pipe(Object(a.m)(m.a)),this.user=this.store.pipe(Object(a.m)(m.i));try{const{screeningEvent:e}=yield this.actionService.admission.getData();this.screeningEvent=e,void 0!==e&&this.update()}catch(e){this.router.navigate(["/error"])}}))}ngOnDestroy(){clearInterval(this.updateLoop)}handleKeyboardEvent(e){"Enter"===e.key&&this.inputCode.length>0?(this.check(this.inputCode),this.inputCode=""):"Escape"!==e.key&&(this.inputCode+=e.key)}check(e){return x(this,void 0,void 0,(function*(){try{const{screeningEvent:n,scheduleDate:t}=yield this.actionService.admission.getData(),{entranceGate:c}=yield this.actionService.user.getData();if(void 0===t)return void this.router.navigate(["/error"]);const i=yield this.actionService.admission.checkQrcode({code:e,screeningEvent:n,scheduleDate:l(t,"YYYY-MM-DD").toDate(),entranceGate:c});this.screeningEvent=i.screeningEvent,this.qrcodeToken=i.qrcodeToken}catch(n){console.error(n),this.qrcodeToken={checkTokenActions:[],statusCode:n.code?n.code:d.BAD_REQUEST,error:{inputCode:e,message:n.message}}}}))}openQRCodeReader(){this.qrcodeService.openQRCodeReader({cb:e=>x(this,void 0,void 0,(function*(){yield this.check(e)}))})}update(){clearInterval(this.updateLoop),this.updateLoop=setInterval(()=>x(this,void 0,void 0,(function*(){const{screeningEvent:e}=yield this.actionService.admission.getData();void 0!==e&&(yield this.actionService.admission.getScreeningEvent(e))})),6e5)}}Y.\u0275fac=function(e){return new(e||Y)(p.Jc(a.b),p.Jc(g.a),p.Jc(g.e),p.Jc(r.b))},Y.\u0275cmp=p.Dc({type:Y,selectors:[["app-admission-check"]],hostBindings:function(e,n){1&e&&p.Wc("keypress",(function(e){return n.handleKeyboardEvent(e)}),!1,p.pd)},decls:13,vars:10,consts:[[1,"contents-width","mx-auto","px-3","pt-4"],[1,"buttons","mx-auto","text-center","mb-4"],["type","button",1,"btn","btn-success","btn-block","py-3",3,"click"],["class","mb-4",4,"ngIf"],[1,"contents-width","mx-auto","px-3","pb-5"],["class","mb-4 bg-white",4,"ngIf"],[1,"buttons","mx-auto","text-center"],["type","button","routerLink","/admission/schedule",1,"btn","btn-outline-primary","btn-block","py-3"],[1,"mb-4"],["class","p-2 bg-white text-center font-weight-bold",4,"ngIf"],[4,"ngIf"],["class","p-4 bg-dark text-white text-center",4,"ngIf"],[1,"p-2","bg-white","text-center","font-weight-bold"],["class","position-relative py-4 bg-success text-white",4,"ngIf"],["class","py-4 bg-danger text-white",4,"ngIf"],[1,"position-relative","py-4","bg-success","text-white"],[1,"contents-width","mx-auto","px-3"],[1,"color","rounded","border","border-white",3,"ngStyle"],["class","flash-text text-xx-large font-weight-bold mb-3 text-center",4,"ngIf"],[1,"table","table-bordered","text-small","mb-0","border-white","text-white"],[1,"align-middle"],[1,"flash-text","text-xx-large","font-weight-bold","mb-3","text-center"],[3,"authorizeSeatReservations"],[1,"py-4","bg-danger","text-white"],[1,"flash-text","text-xx-large","font-weight-bold","mb-2","text-center"],[1,"text-center","mb-3"],[1,"p-4","bg-dark","text-white","text-center"],[1,"contents-width","mx-auto"],[1,"text-xx-large","font-weight-bold","mb-2"],[1,"mb-4","bg-white"],[3,"screeningEvent"],[1,"p-3"],[1,"mr-3"],[1,"mr-2"]],template:function(e,n){1&e&&(p.Pc(0,"div",0),p.Pc(1,"div",1),p.Pc(2,"button",2),p.Wc("click",(function(){return n.openQRCodeReader()})),p.zd(3),p.Zc(4,"translate"),p.Oc(),p.Oc(),p.Oc(),p.xd(5,z,5,5,"div",3),p.Zc(6,"async"),p.Pc(7,"div",4),p.xd(8,M,27,27,"div",5),p.Pc(9,"div",6),p.Pc(10,"button",7),p.zd(11),p.Zc(12,"translate"),p.Oc(),p.Oc(),p.Oc()),2&e&&(p.wc(3),p.Ad(p.ad(4,4,"admission.check.camera.start")),p.wc(2),p.ed("ngIf",!p.ad(6,6,n.isLoading)),p.wc(3),p.ed("ngIf",n.screeningEvent),p.wc(3),p.Ad(p.ad(12,8,"admission.schedule.prev")))},directives:[c.l,r.c,c.m,h.a,v.a],pipes:[f.c,c.b,w.a,b.a],styles:[".video-area[_ngcontent-%COMP%]{height:25vh;overflow:hidden}.flash-text[_ngcontent-%COMP%]{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:flash-text;animation-name:flash-text}.color[_ngcontent-%COMP%]{position:absolute;top:.5rem;left:.5rem;width:1.5rem;height:1.5rem}@-webkit-keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}@keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}"]});var Z=t("QN9p"),A=t("x8Mb");function _(e,n){if(1&e&&(p.Pc(0,"p",15),p.zd(1),p.Zc(2,"changeLanguage"),p.Oc()),2&e){const e=p.Yc(2);p.wc(1),p.Bd(" ",p.ad(2,1,e.performance.screeningEvent.location.address),"")}}function G(e,n){if(1&e&&(p.Pc(0,"div",12),p.xd(1,_,3,3,"p",13),p.Zc(2,"changeLanguage"),p.Pc(3,"p",14),p.zd(4),p.Zc(5,"changeLanguage"),p.Oc(),p.Oc()),2&e){const e=p.Yc();p.wc(1),p.ed("ngIf",p.ad(2,2,e.performance.screeningEvent.location.address)),p.wc(3),p.Ad(p.ad(5,4,e.performance.screeningEvent.location.name))}}function q(e,n){if(1&e&&(p.Pc(0,"div",16),p.Pc(1,"p",14),p.zd(2),p.Zc(3,"changeLanguage"),p.Oc(),p.Oc()),2&e){const e=p.Yc();p.wc(2),p.Bd(" ",p.ad(3,1,e.performance.screeningEvent.name),"")}}function R(e,n){1&e&&(p.Pc(0,"div",17),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Bd(" ",p.ad(2,1,"admission.schedule.status.opening"),""))}function L(e,n){1&e&&(p.Pc(0,"div",17),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Bd(" ",p.ad(2,1,"admission.schedule.status.nowShowing"),""))}function H(e,n){if(1&e&&(p.Pc(0,"div"),p.xd(1,R,3,3,"div",8),p.xd(2,L,3,3,"div",8),p.Oc()),2&e){const e=p.Yc();p.wc(1),p.ed("ngIf",e.performance.isOpenDoor()),p.wc(1),p.ed("ngIf",e.performance.isScreening())}}function B(e,n){1&e&&(p.Pc(0,"div",17),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Bd(" ",p.ad(2,1,"admission.schedule.status.beforeOpening"),""))}function F(e,n){1&e&&(p.Pc(0,"div",17),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Bd(" ",p.ad(2,1,"admission.schedule.status.filmCompletion"),""))}function U(e,n){if(1&e&&(p.Pc(0,"div",18),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e){const e=p.Yc();p.wc(1),p.Dd(" ",p.ad(2,3,"common.seat")," ",e.performance.screeningEvent.remainingAttendeeCapacity," / ",e.performance.screeningEvent.maximumAttendeeCapacity," ")}}function j(e,n){1&e&&(p.Pc(0,"div",18),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Bd(" ",p.ad(2,1,"admission.schedule.infiniteStock"),""))}const J=function(e,n){return{"bg-white":e,"bg-dark-gray text-light-gray":n}};class K{constructor(){this.select=new p.w,this.moment=l,this.environment=Object(u.a)()}ngOnInit(){}}function W(e,n){if(1&e&&(p.Pc(0,"p"),p.zd(1),p.Zc(2,"changeLanguage"),p.Oc()),2&e){const e=p.Yc(2);p.wc(1),p.Bd(" ",p.ad(2,1,e.screeningEventsGroup.screeningEvent.superEvent.headline),"")}}function Q(e,n){if(1&e&&(p.Pc(0,"p"),p.zd(1),p.Zc(2,"changeLanguage"),p.Oc()),2&e){const e=p.Yc(2);p.wc(1),p.Ad(p.ad(2,1,e.screeningEventsGroup.screeningEvent.superEvent.description))}}function N(e,n){if(1&e&&(p.Pc(0,"div",14),p.zd(1),p.Oc()),2&e){const e=p.Yc(2);p.wc(1),p.Ad(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.contentRating)}}function $(e,n){1&e&&(p.Pc(0,"div",15),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Ad(p.ad(2,1,"common.dubbing")))}function V(e,n){1&e&&(p.Pc(0,"div",16),p.zd(1),p.Zc(2,"translate"),p.Oc()),2&e&&(p.wc(1),p.Ad(p.ad(2,1,"common.subtitles")))}function X(e,n){if(1&e&&(p.Pc(0,"div",17),p.zd(1),p.Oc()),2&e){const e=n.$implicit;p.wc(1),p.Ad(e.name)}}function ee(e,n){if(1&e&&(p.Pc(0,"div",18),p.Pc(1,"span",19),p.zd(2),p.Zc(3,"translate"),p.Oc(),p.zd(4),p.Zc(5,"translate"),p.Oc()),2&e){const e=p.Yc(2);p.wc(2),p.Ad(p.ad(3,3,"common.duration")),p.wc(2),p.Cd("",e.moment.duration(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.duration).asMinutes(),"",p.ad(5,5,"common.date.minute")," ")}}function ne(e,n){if(1&e&&(p.Pc(0,"div",4),p.Pc(1,"div",5),p.Pc(2,"p",6),p.zd(3),p.Zc(4,"changeLanguage"),p.Oc(),p.xd(5,W,3,3,"p",7),p.Zc(6,"changeLanguage"),p.xd(7,Q,3,3,"p",7),p.Zc(8,"changeLanguage"),p.Oc(),p.Pc(9,"div",8),p.xd(10,N,2,1,"div",9),p.xd(11,$,3,3,"div",10),p.xd(12,V,3,3,"div",11),p.xd(13,X,2,1,"div",12),p.xd(14,ee,6,7,"div",13),p.Oc(),p.Oc()),2&e){const e=p.Yc();p.wc(3),p.Ad(p.ad(4,8,e.screeningEventsGroup.screeningEvent.name)),p.wc(2),p.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.headline&&p.ad(6,10,e.screeningEventsGroup.screeningEvent.superEvent.headline)),p.wc(2),p.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.description&&p.ad(8,12,e.screeningEventsGroup.screeningEvent.superEvent.description)),p.wc(3),p.ed("ngIf",null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.contentRating),p.wc(1),p.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.dubLanguage),p.wc(1),p.ed("ngIf",e.screeningEventsGroup.screeningEvent.superEvent.subtitleLanguage),p.wc(1),p.ed("ngForOf",e.screeningEventsGroup.screeningEvent.superEvent.videoFormat),p.wc(1),p.ed("ngIf",(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.duration)&&e.moment.duration(null==e.screeningEventsGroup.screeningEvent.workPerformed?null:e.screeningEventsGroup.screeningEvent.workPerformed.duration).asMinutes()>0)}}function te(e,n){if(1&e&&(p.Pc(0,"div",4),p.Pc(1,"p",6),p.zd(2),p.Zc(3,"changeLanguage"),p.Oc(),p.Oc()),2&e){const e=p.Yc();p.wc(2),p.Ad(p.ad(3,1,e.screeningEventsGroup.screeningEvent.location.name))}}function ce(e,n){if(1&e){const e=p.Qc();p.Pc(0,"li",20),p.Pc(1,"app-admission-performance",21),p.Wc("select",(function(n){p.rd(e);return p.Yc().select.emit(n)})),p.Oc(),p.Oc()}if(2&e){const e=n.$implicit;p.wc(1),p.ed("performance",e)}}K.\u0275fac=function(e){return new(e||K)},K.\u0275cmp=p.Dc({type:K,selectors:[["app-admission-performance"]],inputs:{performance:"performance"},outputs:{select:"select"},decls:24,vars:21,consts:[[1,"row","mx-0","border","boder-gray","rounded","p-3","py-md-3","text-md-center","d-md-block","align-items-center","pointer","h-100",3,"ngClass","click"],[1,"col-md-12","col-8","px-0"],["class","mb-1 text-small screen-name",4,"ngIf"],["class","mb-1 text-small",4,"ngIf"],[1,"text-large"],[1,"border-0","bg-light-gray","my-2"],[1,"col-md-12","col-4","px-0","text-center"],[4,"ngIf"],["class","status mb-2",4,"ngIf"],["class","mb-2 text-small",4,"ngIf"],[1,"text-small","mb-1"],[1,"text-small"],[1,"mb-1","text-small","screen-name"],["class","text-overflow-ellipsis mr-2 d-inline-block d-md-block",4,"ngIf"],[1,"text-overflow-ellipsis","d-inline-block","d-md-block"],[1,"text-overflow-ellipsis","mr-2","d-inline-block","d-md-block"],[1,"mb-1","text-small"],[1,"status","mb-2"],[1,"mb-2","text-small"]],template:function(e,n){1&e&&(p.Pc(0,"div",0),p.Wc("click",(function(){return n.select.emit(n.performance.screeningEvent)})),p.Pc(1,"div",1),p.xd(2,G,6,6,"div",2),p.xd(3,q,4,3,"div",3),p.Pc(4,"div"),p.Pc(5,"strong",4),p.zd(6),p.Oc(),p.Pc(7,"span"),p.zd(8,"-"),p.Oc(),p.Pc(9,"span"),p.zd(10),p.Oc(),p.Oc(),p.Oc(),p.Kc(11,"hr",5),p.Pc(12,"div",6),p.xd(13,H,3,2,"div",7),p.xd(14,B,3,3,"div",8),p.xd(15,F,3,3,"div",8),p.xd(16,U,3,5,"div",9),p.xd(17,j,3,3,"div",9),p.Pc(18,"div",10),p.zd(19),p.Zc(20,"translate"),p.Oc(),p.Pc(21,"div",11),p.zd(22),p.Zc(23,"translate"),p.Oc(),p.Oc(),p.Oc()),2&e&&(p.ed("ngClass",p.id(18,J,n.performance.isOpenDoor()||n.performance.isScreening(),!(n.performance.isOpenDoor()||n.performance.isScreening()))),p.wc(2),p.ed("ngIf","screeningEventSeries"===n.environment.PURCHASE_SCHEDULE_SORT),p.wc(1),p.ed("ngIf","screen"===n.environment.PURCHASE_SCHEDULE_SORT),p.wc(3),p.Ad(n.moment(n.performance.screeningEvent.startDate).format("HH:mm")),p.wc(4),p.Ad(n.moment(n.performance.screeningEvent.endDate).format("HH:mm")),p.wc(3),p.ed("ngIf",n.performance.isOpenDoor()||n.performance.isScreening()),p.wc(1),p.ed("ngIf",n.performance.isOpenDoor("before")),p.wc(1),p.ed("ngIf",n.performance.isScreening("after")),p.wc(1),p.ed("ngIf",!n.performance.isInfinitetock()),p.wc(1),p.ed("ngIf",n.performance.isInfinitetock()),p.wc(2),p.Cd("",p.ad(20,14,"common.ticketing")," ",n.performance.screeningEvent.checkInCount,""),p.wc(3),p.Cd("",p.ad(23,16,"common.admission")," ",n.performance.screeningEvent.attendeeCount,""))},directives:[c.j,c.l],pipes:[f.c,w.a],styles:[".status[_ngcontent-%COMP%]{line-height:30px}.status[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}@media (max-width:767.98px){.text-overflow-ellipsis[_ngcontent-%COMP%]{overflow:auto;width:auto;white-space:normal}}"]});class ie{constructor(){this.select=new p.w,this.moment=l,this.environment=Object(u.a)()}ngOnInit(){}}ie.\u0275fac=function(e){return new(e||ie)},ie.\u0275cmp=p.Dc({type:ie,selectors:[["app-admission-performances"]],inputs:{screeningEventsGroup:"screeningEventsGroup"},outputs:{select:"select"},decls:5,vars:3,consts:[[1,"bg-white"],["class","p-3 bg-gray",4,"ngIf"],[1,"py-2","px-3","px-md-2","d-flex","flex-wrap"],["class","px-md-2 my-2",4,"ngFor","ngForOf"],[1,"p-3","bg-gray"],[1,"mb-2"],[1,"font-weight-bold","text-large"],[4,"ngIf"],[1,"d-flex","align-items-center","flex-wrap"],["class","content-rating text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","dub-language text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","subtitle-language text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngIf"],["class","video-format text-small bg-dark-gray text-white py-1 px-2 mr-2",4,"ngFor","ngForOf"],["class","text-small ml-auto",4,"ngIf"],[1,"content-rating","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"dub-language","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"subtitle-language","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"video-format","text-small","bg-dark-gray","text-white","py-1","px-2","mr-2"],[1,"text-small","ml-auto"],[1,"mr-1"],[1,"px-md-2","my-2"],[1,"mb-3",3,"performance","select"]],template:function(e,n){1&e&&(p.Pc(0,"div",0),p.xd(1,ne,15,14,"div",1),p.xd(2,te,4,3,"div",1),p.Pc(3,"ul",2),p.xd(4,ce,2,1,"li",3),p.Oc(),p.Oc()),2&e&&(p.wc(1),p.ed("ngIf","screeningEventSeries"===n.environment.PURCHASE_SCHEDULE_SORT),p.wc(1),p.ed("ngIf","screen"===n.environment.PURCHASE_SCHEDULE_SORT),p.wc(2),p.ed("ngForOf",n.screeningEventsGroup.data))},directives:[c.l,c.k,K],pipes:[w.a,f.c],styles:["[_nghost-%COMP%]{display:block}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:20%}@media (max-width:991.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:25%}}@media (max-width:767.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:100%}}"]});var re=function(e,n,t,c){return new(t||(t=Promise))((function(i,r){function o(e){try{a(c.next(e))}catch(n){r(n)}}function s(e){try{a(c.throw(e))}catch(n){r(n)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,s)}a((c=c.apply(e,n||[])).next())}))};const oe=["datepicker"];function se(e,n){if(1&e&&(p.Pc(0,"p",16),p.zd(1),p.Zc(2,"formatDate"),p.Zc(3,"async"),p.Oc()),2&e){const e=p.Yc();var t;p.wc(1),p.Bd(" ",p.bd(2,1,null==(t=p.ad(3,4,e.admission))?null:t.scheduleDate,"YYYY/MM/DD (ddd)"),"")}}function ae(e,n){1&e&&(p.Kc(0,"p",17),p.Zc(1,"translate")),2&e&&p.ed("innerHTML",p.ad(1,1,"admission.schedule.notfound"),p.sd)}function de(e,n){if(1&e){const e=p.Qc();p.Pc(0,"app-admission-performances",18),p.Wc("select",(function(n){p.rd(e);return p.Yc().selectSchedule(n)})),p.Oc()}if(2&e){const e=n.$implicit;p.ed("screeningEventsGroup",e)}}const le=function(){return{dateInputFormat:"YYYY/MM/DD",adaptivePosition:!0,showWeekNumbers:!1}};class ue{constructor(e,n,t,c,i,r){this.store=e,this.router=n,this.localeService=t,this.actionService=c,this.masterService=i,this.utilService=r,this.moment=l,this.environment=Object(u.a)()}ngOnInit(){return re(this,void 0,void 0,(function*(){this.admission=this.store.pipe(Object(a.m)(m.a)),this.user=this.store.pipe(Object(a.m)(m.i)),this.isLoading=this.store.pipe(Object(a.m)(m.c)),this.screeningEventsGroup=[],this.scheduleDate=l(l().format("YYYYMMDD"),"YYYYMMDD").toDate()}))}ngOnDestroy(){clearTimeout(this.updateTimer)}update(){void 0!==this.updateTimer&&clearTimeout(this.updateTimer);this.updateTimer=setTimeout(()=>re(this,void 0,void 0,(function*(){try{yield this.getSchedule()}catch(e){console.error(e),this.router.navigate(["/error"])}})),6e5)}selectDate(e){return re(this,void 0,void 0,(function*(){if(null!=e){this.scheduleDate=e;try{void 0!==this.scheduleDate&&null!==this.scheduleDate||(this.scheduleDate=l().toDate());const e=l(this.scheduleDate).format("YYYY-MM-DD");this.actionService.admission.selectScheduleDate(e),yield this.getSchedule()}catch(n){console.error(n),this.router.navigate(["/error"])}}}))}getSchedule(){return re(this,void 0,void 0,(function*(){const{theater:e}=yield this.actionService.user.getData();if(void 0===e)throw new Error("theater undefined");const n=l(this.scheduleDate).format("YYYY-MM-DD"),t=yield this.masterService.searchMovies({offers:{availableFrom:l(n).toDate()}}),c="screeningEventSeries"===this.environment.PURCHASE_SCHEDULE_SORT?yield this.masterService.searchScreeningEventSeries({location:{branchCode:{$eq:e.branchCode}},workPerformed:{identifiers:t.map(e=>e.identifier)}}):[],i="screen"===this.environment.PURCHASE_SCHEDULE_SORT?yield this.masterService.searchScreeningRooms({branchCode:{$eq:e.branchCode}}):[],r=yield this.masterService.searchScreeningEvent({superEvent:{locationBranchCodes:[e.branchCode]},startFrom:l(n).toDate(),startThrough:l(n).add(1,"day").add(-1,"millisecond").toDate(),creativeWorks:t,screeningEventSeries:c,screeningRooms:i}),o=l((yield this.utilService.getServerTime()).date).toDate();this.screeningEventsGroup=A.a.Purchase.screeningEvents2ScreeningEventSeries({screeningEvents:r,now:o}),this.update()}))}selectSchedule(e){return re(this,void 0,void 0,(function*(){try{yield this.actionService.admission.getScreeningEvent(e),this.router.navigate(["/admission/check"])}catch(n){console.error(n),this.router.navigate(["/error"])}}))}notSpecified(){this.actionService.admission.delete();const e=l(this.scheduleDate).format("YYYY-MM-DD");this.actionService.admission.selectScheduleDate(e),this.router.navigate(["/admission/check"])}setDatePicker(){this.user.subscribe(e=>{this.localeService.use(e.language)}).unsubscribe()}toggleDatepicker(){this.setDatePicker(),this.datepicker.toggle()}onShowPicker(e){A.a.Util.iOSDatepickerTapBugFix(e,[this.datepicker])}}ue.\u0275fac=function(e){return new(e||ue)(p.Jc(a.b),p.Jc(r.b),p.Jc(Z.d),p.Jc(g.a),p.Jc(g.d),p.Jc(g.f))},ue.\u0275cmp=p.Dc({type:ue,selectors:[["app-admission-schedule"]],viewQuery:function(e,n){var t;(1&e&&p.vd(oe,!0),2&e)&&(p.nd(t=p.Xc())&&(n.datepicker=t.first))},decls:22,vars:17,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"mb-3"],[1,"input-group"],["type","text","placeholder","Datepicker","bsDatepicker","","readonly","",1,"form-control",3,"bsValue","bsConfig","bsValueChange","click","onShown"],["datepicker","bsDatepicker"],[1,"input-group-append","pointer",3,"click"],[1,"input-group-text"],[1,"fas","fa-caret-down"],["class","text-primary font-weight-bold mb-3",4,"ngIf"],["class","mb-3",3,"innerHTML",4,"ngIf"],[1,"mb-4"],["class","mb-3",3,"screeningEventsGroup","select",4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","button",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"click"],[1,"text-primary","font-weight-bold","mb-3"],[1,"mb-3",3,"innerHTML"],[1,"mb-3",3,"screeningEventsGroup","select"]],template:function(e,n){if(1&e&&(p.Pc(0,"div",0),p.Pc(1,"h2",1),p.zd(2),p.Zc(3,"translate"),p.Oc(),p.Kc(4,"p",2),p.Zc(5,"translate"),p.Pc(6,"div",3),p.Pc(7,"div",4),p.Pc(8,"input",5,6),p.Wc("bsValueChange",(function(e){return n.selectDate(e)}))("click",(function(){return n.setDatePicker()}))("onShown",(function(e){return n.onShowPicker(e)})),p.Oc(),p.Pc(10,"div",7),p.Wc("click",(function(){return n.toggleDatepicker()})),p.Pc(11,"span",8),p.Kc(12,"i",9),p.Oc(),p.Oc(),p.Oc(),p.Oc(),p.xd(13,se,4,6,"p",10),p.Zc(14,"async"),p.xd(15,ae,2,3,"p",11),p.Pc(16,"div",12),p.xd(17,de,1,1,"app-admission-performances",13),p.Oc(),p.Pc(18,"div",14),p.Pc(19,"button",15),p.Wc("click",(function(){return n.notSpecified()})),p.zd(20),p.Zc(21,"translate"),p.Oc(),p.Oc(),p.Oc()),2&e){var t;const e=null==(t=p.ad(14,12,n.admission))?null:t.scheduleDate;p.wc(2),p.Ad(p.ad(3,8,"admission.schedule.title")),p.wc(2),p.ed("innerHTML",p.ad(5,10,"admission.schedule.read"),p.sd),p.wc(4),p.ed("bsValue",n.scheduleDate)("bsConfig",p.gd(16,le)),p.wc(5),p.ed("ngIf",e),p.wc(2),p.ed("ngIf",0===n.screeningEventsGroup.length),p.wc(2),p.ed("ngForOf",n.screeningEventsGroup),p.wc(3),p.Ad(p.ad(21,14,"admission.schedule.next"))}},directives:[Z.b,Z.a,c.l,c.k,ie],pipes:[f.c,c.b,b.a],styles:['.condition[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%}.schedule-slider[_ngcontent-%COMP%]   .swiper-slide[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background-color:#000;opacity:.3}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%], .schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{width:27px;height:27px;background-image:url(/assets/images/icon/slider_arrow.svg);background-size:27px;margin-top:-13px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%]{right:-38px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{left:-38px;transform:rotate(180deg)}']});const ge=[{path:"",component:s.a,canActivate:[o.a,o.c],children:[{path:"schedule",component:ue},{path:"check",component:Y}]}];class me{}me.\u0275mod=p.Hc({type:me}),me.\u0275inj=p.Gc({factory:function(e){return new(e||me)},imports:[[r.d.forChild(ge)],r.d]});class pe{}pe.\u0275mod=p.Hc({type:pe}),pe.\u0275inj=p.Gc({factory:function(e){return new(e||pe)},imports:[[c.c,me,i.a]]})}}]);