(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{dzKq:function(n,e,t){"use strict";t.r(e),t.d(e,"AdmissionModule",(function(){return vn}));var c=t("2kYt"),i=t("DSWM"),a=t("sEIs"),s=t("unpb"),o=t("RRjC"),r=t("sN6X"),d=t("wgY5"),l=t("PIN6"),u=t("cHUu"),m=t("mOXJ"),g=t("EM62"),f=t("s2Ay"),p=t("OSFB"),v=t("NSn/"),h=function(n,e,t,c){return new(t||(t=Promise))((function(i,a){function s(n){try{r(c.next(n))}catch(e){a(e)}}function o(n){try{r(c.throw(n))}catch(e){a(e)}}function r(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(s,o)}r((c=c.apply(n,e||[])).next())}))};function w(n,e){1&n&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Bd(g.ad(2,1,"admission.check.success")))}function k(n,e){1&n&&(g.Pc(0,"div",17),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Bd(g.ad(2,1,"admission.check.reEntry")))}function b(n,e){if(1&n&&(g.Pc(0,"p"),g.Pc(1,"strong",16),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Ad(4),g.Zc(5,"async"),g.Oc()),2&n){const n=g.Yc(4);var t;g.wc(2),g.Bd(g.ad(3,2,"common.seat")),g.wc(2),g.Cd(" ",null==(t=g.ad(5,4,n.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketedSeat.seatNumber," ")}}const y=function(n){return{"background-color":n}};function P(n,e){if(1&n&&(g.Pc(0,"div",13),g.Kc(1,"div",14),g.Zc(2,"async"),g.yd(3,w,3,3,"div",15),g.Zc(4,"async"),g.yd(5,k,3,3,"div",15),g.Zc(6,"async"),g.yd(7,b,6,6,"p",9),g.Zc(8,"async"),g.Pc(9,"p"),g.Pc(10,"strong",16),g.Ad(11),g.Zc(12,"translate"),g.Oc(),g.Ad(13),g.Zc(14,"changeLanguage"),g.Zc(15,"async"),g.Oc(),g.Pc(16,"p"),g.Pc(17,"strong",16),g.Ad(18),g.Zc(19,"translate"),g.Oc(),g.Ad(20),g.Zc(21,"async"),g.Oc(),g.Oc()),2&n){const n=g.Yc(3);var t;const e=g.id(26,y,null==(t=g.ad(2,8,n.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketType.color);var c;const r=0===(null==(c=g.ad(4,10,n.admission))?null:c.qrcodeToken.checkTokenActions.length);var i;const d=(null==(i=g.ad(6,12,n.admission))?null:i.qrcodeToken.checkTokenActions.length)>0;var a;const l=null==(a=g.ad(8,14,n.admission))?null:a.qrcodeToken.availableReservation.reservedTicket.ticketedSeat;var s,o;g.wc(1),g.fd("ngStyle",e),g.wc(2),g.fd("ngIf",r),g.wc(2),g.fd("ngIf",d),g.wc(2),g.fd("ngIf",l),g.wc(4),g.Bd(g.ad(12,16,"common.ticket")),g.wc(2),g.Cd(" ",g.ad(14,18,null==(s=g.ad(15,20,n.admission))?null:s.qrcodeToken.availableReservation.reservedTicket.ticketType.name)," "),g.wc(5),g.Bd(g.ad(19,22,"admission.check.entryCount")),g.wc(2),g.Cd(" ",null==(o=g.ad(21,24,n.admission))?null:o.qrcodeToken.checkTokenActions.length," ")}}function O(n,e){if(1&n&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"translate"),g.Kc(3,"br"),g.Pc(4,"strong"),g.Ad(5),g.Zc(6,"async"),g.Oc(),g.Oc()),2&n){const n=g.Yc(4);var t;g.wc(1),g.Cd(" ",g.ad(2,2,"admission.check.alert.event"),""),g.wc(4),g.Bd(null==(t=g.ad(6,4,n.admission))?null:t.qrcodeToken.statusCode)}}function x(n,e){if(1&n&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"translate"),g.Kc(3,"br"),g.Pc(4,"strong"),g.Ad(5),g.Zc(6,"async"),g.Oc(),g.Oc()),2&n){const n=g.Yc(4);var t;g.wc(1),g.Cd(" ",g.ad(2,2,"admission.check.alert.qrcode"),""),g.wc(4),g.Bd(null==(t=g.ad(6,4,n.admission))?null:t.qrcodeToken.statusCode)}}function E(n,e){if(1&n&&(g.Pc(0,"div",18),g.Pc(1,"div",17),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.yd(4,O,7,6,"p",9),g.Zc(5,"async"),g.yd(6,x,7,6,"p",9),g.Zc(7,"async"),g.Oc()),2&n){const n=g.Yc(3);var t;const e=200===(null==(t=g.ad(5,5,n.admission))?null:t.qrcodeToken.statusCode);var c;const i=200!==(null==(c=g.ad(7,7,n.admission))?null:c.qrcodeToken.statusCode);g.wc(2),g.Bd(g.ad(3,3,"admission.check.danger")),g.wc(2),g.fd("ngIf",e),g.wc(2),g.fd("ngIf",i)}}function Z(n,e){if(1&n&&(g.Pc(0,"div"),g.yd(1,P,22,28,"div",11),g.Zc(2,"async"),g.yd(3,E,8,9,"div",12),g.Zc(4,"async"),g.Oc()),2&n){const n=g.Yc(2);var t;const e=null==(t=g.ad(2,2,n.admission))?null:t.qrcodeToken.availableReservation;var c;const i=!(null!=(c=g.ad(4,4,n.admission))&&c.qrcodeToken.availableReservation);g.wc(1),g.fd("ngIf",e),g.wc(2),g.fd("ngIf",i)}}function C(n,e){1&n&&(g.Pc(0,"div",19),g.Pc(1,"div",20),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Pc(4,"p"),g.Ad(5),g.Zc(6,"translate"),g.Oc(),g.Oc()),2&n&&(g.wc(2),g.Bd(g.ad(3,2,"admission.check.waiting")),g.wc(3),g.Bd(g.ad(6,4,"admission.check.alert.waiting")))}function A(n,e){if(1&n&&(g.Pc(0,"div",8),g.yd(1,Z,5,6,"div",9),g.Zc(2,"async"),g.yd(3,C,7,6,"div",10),g.Zc(4,"async"),g.Oc()),2&n){const n=g.Yc();var t;const e=null==(t=g.ad(2,2,n.admission))?null:t.qrcodeToken;var c;const i=!(null!=(c=g.ad(4,4,n.admission))&&c.qrcodeToken);g.wc(1),g.fd("ngIf",e),g.wc(2),g.fd("ngIf",i)}}function I(n,e){if(1&n&&(g.Pc(0,"p",33),g.Ad(1),g.Zc(2,"async"),g.Oc()),2&n){const n=g.Yc(2);var t;g.wc(1),g.Cd(" ",null==(t=g.ad(2,1,n.admission))||null==t.screeningEvent.workPerformed?null:t.screeningEvent.workPerformed.headline," ")}}function D(n,e){if(1&n&&(g.Pc(0,"p",33),g.Ad(1),g.Zc(2,"changeLanguage"),g.Zc(3,"async"),g.Oc()),2&n){const n=g.Yc(2);var t;g.wc(1),g.Cd(" ",g.ad(2,1,null==(t=g.ad(3,3,n.admission))?null:t.screeningEvent.superEvent.description)," ")}}function M(n,e){if(1&n&&(g.Pc(0,"div",34),g.Ad(1),g.Zc(2,"async"),g.Oc()),2&n){const n=g.Yc(2);var t;g.wc(1),g.Bd(null==(t=g.ad(2,1,n.admission))||null==t.screeningEvent.workPerformed?null:t.screeningEvent.workPerformed.contentRating)}}function S(n,e){1&n&&(g.Pc(0,"div",34),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Bd(g.ad(2,1,"common.dubbing")))}function T(n,e){1&n&&(g.Pc(0,"div",34),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Bd(g.ad(2,1,"common.subtitles")))}function W(n,e){if(1&n&&(g.Pc(0,"div",35),g.Pc(1,"span",36),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Ad(4),g.Zc(5,"async"),g.Zc(6,"translate"),g.Oc()),2&n){const n=g.Yc(2);var t;g.wc(2),g.Bd(g.ad(3,3,"common.duration")),g.wc(2),g.Dd("",n.moment.duration(null==(t=g.ad(5,5,n.admission))||null==t.screeningEvent.workPerformed?null:t.screeningEvent.workPerformed.duration).asMinutes(),"",g.ad(6,7,"common.date.minute")," ")}}function B(n,e){if(1&n&&(g.Pc(0,"span",16),g.Ad(1),g.Zc(2,"changeLanguage"),g.Zc(3,"async"),g.Oc()),2&n){const n=g.Yc(2);var t;g.wc(1),g.Cd(" ",g.ad(2,1,null==(t=g.ad(3,3,n.admission))?null:t.screeningEvent.location.address)," ")}}function Y(n,e){if(1&n&&(g.Pc(0,"div",21),g.Pc(1,"div",22),g.Pc(2,"div",23),g.Pc(3,"p",24),g.Ad(4),g.Zc(5,"changeLanguage"),g.Zc(6,"async"),g.Oc(),g.yd(7,I,3,3,"p",25),g.Zc(8,"async"),g.yd(9,D,4,5,"p",25),g.Zc(10,"async"),g.Zc(11,"changeLanguage"),g.Zc(12,"async"),g.Oc(),g.Pc(13,"div",26),g.yd(14,M,3,3,"div",27),g.Zc(15,"async"),g.yd(16,S,3,3,"div",27),g.Zc(17,"async"),g.yd(18,T,3,3,"div",27),g.Zc(19,"async"),g.yd(20,W,7,9,"div",28),g.Zc(21,"async"),g.Zc(22,"async"),g.Oc(),g.Oc(),g.Pc(23,"div",22),g.Pc(24,"p",29),g.Ad(25),g.Zc(26,"changeLanguage"),g.Zc(27,"async"),g.Oc(),g.Pc(28,"p",30),g.yd(29,B,4,5,"span",31),g.Zc(30,"changeLanguage"),g.Zc(31,"async"),g.Pc(32,"span"),g.Ad(33),g.Zc(34,"changeLanguage"),g.Zc(35,"async"),g.Oc(),g.Oc(),g.Pc(36,"div"),g.Pc(37,"p",32),g.Pc(38,"strong",16),g.Ad(39),g.Zc(40,"translate"),g.Oc(),g.Ad(41),g.Zc(42,"formatDate"),g.Zc(43,"async"),g.Oc(),g.Pc(44,"p"),g.Pc(45,"strong",16),g.Ad(46),g.Zc(47,"translate"),g.Oc(),g.Ad(48),g.Zc(49,"formatDate"),g.Zc(50,"async"),g.Zc(51,"formatDate"),g.Zc(52,"async"),g.Oc(),g.Pc(53,"p",32),g.Pc(54,"strong",16),g.Ad(55),g.Zc(56,"translate"),g.Oc(),g.Ad(57),g.Zc(58,"async"),g.Zc(59,"async"),g.Oc(),g.Pc(60,"p"),g.Pc(61,"strong",16),g.Ad(62),g.Zc(63,"translate"),g.Oc(),g.Ad(64),g.Zc(65,"async"),g.Oc(),g.Oc(),g.Oc(),g.Oc()),2&n){const n=g.Yc();var t,c;const e=null==(c=g.ad(8,23,n.admission))||null==c.screeningEvent.workPerformed?null:c.screeningEvent.workPerformed.headline;var i=null;const h=(null==(i=g.ad(10,25,n.admission))?null:i.screeningEvent.superEvent.description)&&g.ad(11,27,null==(i=g.ad(12,29,n.admission))?null:i.screeningEvent.superEvent.description);var a;const w=null==(a=g.ad(15,31,n.admission))||null==a.screeningEvent.workPerformed?null:a.screeningEvent.workPerformed.contentRating;var s;const k=null==(s=g.ad(17,33,n.admission))?null:s.screeningEvent.superEvent.dubLanguage;var o;const b=null==(o=g.ad(19,35,n.admission))?null:o.screeningEvent.superEvent.subtitleLanguage;var r=null;const y=(null==(r=g.ad(21,37,n.admission))||null==r.screeningEvent.workPerformed?null:r.screeningEvent.workPerformed.duration)&&n.moment.duration(null==(r=g.ad(22,39,n.admission))||null==r.screeningEvent.workPerformed?null:r.screeningEvent.workPerformed.duration).asMinutes()>0;var d,l;const P=g.ad(30,45,null==(l=g.ad(31,47,n.admission))?null:l.screeningEvent.location.address);var u,m,f,p=null,v=null;g.wc(4),g.Bd(g.ad(5,19,null==(t=g.ad(6,21,n.admission))?null:t.screeningEvent.name)),g.wc(3),g.fd("ngIf",e),g.wc(2),g.fd("ngIf",h),g.wc(5),g.fd("ngIf",w),g.wc(2),g.fd("ngIf",k),g.wc(2),g.fd("ngIf",b),g.wc(2),g.fd("ngIf",y),g.wc(5),g.Bd(g.ad(26,41,null==(d=g.ad(27,43,n.admission))?null:d.screeningEvent.superEvent.location.name)),g.wc(4),g.fd("ngIf",P),g.wc(4),g.Cd(" ",g.ad(34,49,null==(u=g.ad(35,51,n.admission))?null:u.screeningEvent.location.name)," "),g.wc(6),g.Bd(g.ad(40,53,"common.doorTime")),g.wc(2),g.Cd(" ",g.bd(42,55,null==(m=g.ad(43,58,n.admission))?null:m.screeningEvent.doorTime,"MM/DD (ddd) HH:mm")," "),g.wc(5),g.Bd(g.ad(47,60,"common.startDate")),g.wc(2),g.Dd(" ",g.bd(49,62,null==(p=g.ad(50,65,n.admission))?null:p.screeningEvent.startDate,"MM/DD (ddd) HH:mm")," - ",g.bd(51,67,null==(p=g.ad(52,70,n.admission))?null:p.screeningEvent.endDate,"HH:mm")," "),g.wc(7),g.Bd(g.ad(56,72,"common.reservation")),g.wc(2),g.Cd(" ",(null==(v=g.ad(58,74,n.admission))?null:v.screeningEvent.maximumAttendeeCapacity)-(null==(v=g.ad(59,76,n.admission))?null:v.screeningEvent.remainingAttendeeCapacity)," "),g.wc(5),g.Bd(g.ad(63,78,"common.admission")),g.wc(2),g.Cd(" ",null==(f=g.ad(65,80,n.admission))?null:f.screeningEvent.attendeeCount," ")}}class L{constructor(n,e,t,c,i){this.store=n,this.actionService=e,this.utilService=t,this.qrcodeService=c,this.translate=i,this.moment=d,this.environment=Object(l.a)()}ngOnInit(){this.inputCode="",this.isLoading=this.store.pipe(Object(r.m)(m.c)),this.admission=this.store.pipe(Object(r.m)(m.a)),this.actionService.admission.initializeQrcodeToken()}ngOnDestroy(){clearInterval(this.updateLoop)}handleKeyboardEvent(n){"Enter"===n.key&&this.inputCode.length>0?(this.check(this.inputCode),this.inputCode=""):"Escape"!==n.key&&(this.inputCode+=n.key)}check(n){return h(this,void 0,void 0,(function*(){try{yield this.actionService.admission.checkQrcodeToken(n)}catch(e){console.error(e),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("admission.check.alert.check")})}}))}openQRCodeReader(){this.qrcodeService.openQRCodeReader({cb:n=>h(this,void 0,void 0,(function*(){yield this.check(n)}))})}update(){clearInterval(this.updateLoop),this.updateLoop=setInterval(()=>h(this,void 0,void 0,(function*(){const{screeningEvent:n}=yield this.actionService.admission.getData();void 0!==n&&(yield this.actionService.admission.getScreeningEvent(n))})),6e5)}}L.\u0275fac=function(n){return new(n||L)(g.Jc(r.b),g.Jc(u.a),g.Jc(u.h),g.Jc(u.f),g.Jc(f.d))},L.\u0275cmp=g.Dc({type:L,selectors:[["app-admission-check"]],hostBindings:function(n,e){1&n&&g.Wc("keypress",(function(n){return e.handleKeyboardEvent(n)}),!1,g.qd)},decls:14,vars:12,consts:[[1,"contents-width","mx-auto","px-3","pt-4"],[1,"buttons","mx-auto","text-center","mb-4"],["type","button",1,"btn","btn-success","btn-block","py-3",3,"click"],["class","mb-4",4,"ngIf"],[1,"contents-width","mx-auto","px-3","pb-5"],["class","mb-4 bg-white",4,"ngIf"],[1,"buttons","mx-auto","text-center"],["type","button","routerLink","/admission/schedule",1,"btn","btn-outline-primary","btn-block","py-3"],[1,"mb-4"],[4,"ngIf"],["class","p-4 bg-dark text-white text-center",4,"ngIf"],["class","position-relative p-4 bg-success text-white text-center",4,"ngIf"],["class","p-4 bg-danger text-white text-center",4,"ngIf"],[1,"position-relative","p-4","bg-success","text-white","text-center"],[1,"color","rounded","border","border-white",3,"ngStyle"],["class","flash-text text-xx-large font-weight-bold mb-2",4,"ngIf"],[1,"mr-2"],[1,"flash-text","text-xx-large","font-weight-bold","mb-2"],[1,"p-4","bg-danger","text-white","text-center"],[1,"p-4","bg-dark","text-white","text-center"],[1,"text-xx-large","font-weight-bold","mb-2"],[1,"mb-4","bg-white"],[1,"p-3"],[1,"mb-2"],[1,"font-weight-bold","text-large"],["class","text-small",4,"ngIf"],[1,"d-flex","align-items-center","mb-2"],["class","text-small text-white bg-dark py-1 px-3 mr-2",4,"ngIf"],["class","text-small ml-auto",4,"ngIf"],[1,"theater-name"],[1,"screen-name"],["class","mr-2",4,"ngIf"],[1,"mr-3"],[1,"text-small"],[1,"text-small","text-white","bg-dark","py-1","px-3","mr-2"],[1,"text-small","ml-auto"],[1,"mr-1"]],template:function(n,e){if(1&n&&(g.Pc(0,"div",0),g.Pc(1,"div",1),g.Pc(2,"button",2),g.Wc("click",(function(){return e.openQRCodeReader()})),g.Ad(3),g.Zc(4,"translate"),g.Oc(),g.Oc(),g.Oc(),g.yd(5,A,5,6,"div",3),g.Zc(6,"async"),g.Pc(7,"div",4),g.yd(8,Y,66,82,"div",5),g.Zc(9,"async"),g.Pc(10,"div",6),g.Pc(11,"button",7),g.Ad(12),g.Zc(13,"translate"),g.Oc(),g.Oc(),g.Oc()),2&n){var t;const n=null==(t=g.ad(9,8,e.admission))?null:t.screeningEvent;g.wc(3),g.Bd(g.ad(4,4,"admission.check.camera.start")),g.wc(2),g.fd("ngIf",!g.ad(6,6,e.isLoading)),g.wc(3),g.fd("ngIf",n),g.wc(4),g.Bd(g.ad(13,10,"admission.schedule.prev"))}},directives:[c.l,a.c,c.m],pipes:[f.c,c.b,p.a,v.a],styles:[".video-area[_ngcontent-%COMP%]{height:25vh;overflow:hidden}.flash-text[_ngcontent-%COMP%]{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:flash-text;animation-name:flash-text}.color[_ngcontent-%COMP%]{position:absolute;top:.5rem;left:.5rem;width:1.5rem;height:1.5rem}@-webkit-keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}@keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}"]});var _=t("QN9p"),q=t("x8Mb"),H=t("nIj0"),R=t("ddJ1");function J(n,e){if(1&n&&(g.Pc(0,"p",13),g.Ad(1),g.Zc(2,"changeLanguage"),g.Oc()),2&n){const n=g.Yc();g.wc(1),g.Cd(" ",g.ad(2,1,n.performance.screeningEvent.location.address),"")}}function j(n,e){1&n&&(g.Pc(0,"div",14),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.opening"),""))}function F(n,e){1&n&&(g.Pc(0,"div",14),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.nowShowing"),""))}function K(n,e){if(1&n&&(g.Pc(0,"div"),g.yd(1,j,3,3,"div",9),g.yd(2,F,3,3,"div",9),g.Oc()),2&n){const n=g.Yc();g.wc(1),g.fd("ngIf",n.performance.isOpenDoor()),g.wc(1),g.fd("ngIf",n.performance.isScreening())}}function Q(n,e){1&n&&(g.Pc(0,"div",14),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.beforeOpening"),""))}function N(n,e){1&n&&(g.Pc(0,"div",14),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.status.filmCompletion"),""))}function z(n,e){if(1&n&&(g.Pc(0,"div",15),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n){const n=g.Yc();g.wc(1),g.Ed(" ",g.ad(2,3,"common.seat")," ",n.performance.screeningEvent.remainingAttendeeCapacity," / ",n.performance.screeningEvent.maximumAttendeeCapacity," ")}}function X(n,e){1&n&&(g.Pc(0,"div",15),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Cd(" ",g.ad(2,1,"admission.schedule.infiniteStock"),""))}const G=function(n,e){return{"bg-white":n,"bg-dark-gray text-light-gray":e}};class U{constructor(){this.select=new g.w,this.moment=d}ngOnInit(){}}function V(n,e){if(1&n&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"changeLanguage"),g.Oc()),2&n){const n=g.Yc();g.wc(1),g.Cd(" ",g.ad(2,1,n.screeningWorkEvent.info.superEvent.headline),"")}}function $(n,e){if(1&n&&(g.Pc(0,"p"),g.Ad(1),g.Zc(2,"changeLanguage"),g.Oc()),2&n){const n=g.Yc();g.wc(1),g.Bd(g.ad(2,1,n.screeningWorkEvent.info.superEvent.description))}}function nn(n,e){if(1&n&&(g.Pc(0,"div",10),g.Ad(1),g.Oc()),2&n){const n=g.Yc();g.wc(1),g.Bd(null==n.screeningWorkEvent.info.workPerformed?null:n.screeningWorkEvent.info.workPerformed.contentRating)}}function en(n,e){1&n&&(g.Pc(0,"div",10),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Bd(g.ad(2,1,"common.dubbing")))}function tn(n,e){1&n&&(g.Pc(0,"div",10),g.Ad(1),g.Zc(2,"translate"),g.Oc()),2&n&&(g.wc(1),g.Bd(g.ad(2,1,"common.subtitles")))}function cn(n,e){if(1&n&&(g.Pc(0,"div",11),g.Pc(1,"span",12),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Ad(4),g.Zc(5,"translate"),g.Oc()),2&n){const n=g.Yc();g.wc(2),g.Bd(g.ad(3,3,"common.duration")),g.wc(2),g.Dd("",n.moment.duration(null==n.screeningWorkEvent.info.workPerformed?null:n.screeningWorkEvent.info.workPerformed.duration).asMinutes(),"",g.ad(5,5,"common.date.minute")," ")}}function an(n,e){if(1&n){const n=g.Qc();g.Pc(0,"li",13),g.Pc(1,"app-admission-performance",14),g.Wc("select",(function(e){g.sd(n);return g.Yc().select.emit(e)})),g.Oc(),g.Oc()}if(2&n){const n=e.$implicit;g.wc(1),g.fd("performance",n)}}U.\u0275fac=function(n){return new(n||U)},U.\u0275cmp=g.Dc({type:U,selectors:[["app-admission-performance"]],inputs:{performance:"performance"},outputs:{select:"select"},decls:28,vars:25,consts:[[1,"row","mx-0","border","boder-gray","rounded","p-3","py-md-3","text-md-center","d-md-block","align-items-center","pointer","h-100",3,"ngClass","click"],[1,"col-md-12","col-8","px-0"],[1,"mb-1","text-small","screen-name"],["class","text-overflow-ellipsis mr-2 d-inline-block d-md-block",4,"ngIf"],[1,"text-overflow-ellipsis","d-inline-block","d-md-block"],[1,"text-large"],[1,"border-0","bg-light-gray","my-2"],[1,"col-md-12","col-4","px-0","text-center"],[4,"ngIf"],["class","status mb-2",4,"ngIf"],["class","mb-2 text-small",4,"ngIf"],[1,"text-small","mb-1"],[1,"text-small"],[1,"text-overflow-ellipsis","mr-2","d-inline-block","d-md-block"],[1,"status","mb-2"],[1,"mb-2","text-small"]],template:function(n,e){1&n&&(g.Pc(0,"div",0),g.Wc("click",(function(){return e.select.emit(e.performance.screeningEvent)})),g.Pc(1,"div",1),g.Pc(2,"div",2),g.yd(3,J,3,3,"p",3),g.Zc(4,"changeLanguage"),g.Pc(5,"p",4),g.Ad(6),g.Zc(7,"changeLanguage"),g.Oc(),g.Oc(),g.Pc(8,"div"),g.Pc(9,"strong",5),g.Ad(10),g.Oc(),g.Pc(11,"span"),g.Ad(12,"-"),g.Oc(),g.Pc(13,"span"),g.Ad(14),g.Oc(),g.Oc(),g.Oc(),g.Kc(15,"hr",6),g.Pc(16,"div",7),g.yd(17,K,3,2,"div",8),g.yd(18,Q,3,3,"div",9),g.yd(19,N,3,3,"div",9),g.yd(20,z,3,5,"div",10),g.yd(21,X,3,3,"div",10),g.Pc(22,"div",11),g.Ad(23),g.Zc(24,"translate"),g.Oc(),g.Pc(25,"div",12),g.Ad(26),g.Zc(27,"translate"),g.Oc(),g.Oc(),g.Oc()),2&n&&(g.fd("ngClass",g.jd(22,G,e.performance.isOpenDoor()||e.performance.isScreening(),!(e.performance.isOpenDoor()||e.performance.isScreening()))),g.wc(3),g.fd("ngIf",g.ad(4,14,e.performance.screeningEvent.location.address)),g.wc(3),g.Bd(g.ad(7,16,e.performance.screeningEvent.location.name)),g.wc(4),g.Bd(e.moment(e.performance.screeningEvent.startDate).format("HH:mm")),g.wc(4),g.Bd(e.moment(e.performance.screeningEvent.endDate).format("HH:mm")),g.wc(3),g.fd("ngIf",e.performance.isOpenDoor()||e.performance.isScreening()),g.wc(1),g.fd("ngIf",e.performance.isOpenDoor("before")),g.wc(1),g.fd("ngIf",e.performance.isScreening("after")),g.wc(1),g.fd("ngIf",!e.performance.isInfinitetock()),g.wc(1),g.fd("ngIf",e.performance.isInfinitetock()),g.wc(2),g.Dd("",g.ad(24,18,"common.ticketing")," ",e.performance.screeningEvent.checkInCount,""),g.wc(3),g.Dd("",g.ad(27,20,"common.admission")," ",e.performance.screeningEvent.attendeeCount,""))},directives:[c.j,c.l],pipes:[p.a,f.c],styles:[".status[_ngcontent-%COMP%]{line-height:30px}.status[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}@media (max-width:767.98px){.text-overflow-ellipsis[_ngcontent-%COMP%]{overflow:auto;width:auto;white-space:normal}}"]});class sn{constructor(){this.select=new g.w,this.moment=d}ngOnInit(){}}sn.\u0275fac=function(n){return new(n||sn)},sn.\u0275cmp=g.Dc({type:sn,selectors:[["app-admission-performances"]],inputs:{screeningWorkEvent:"screeningWorkEvent"},outputs:{select:"select"},decls:17,vars:14,consts:[[1,"bg-white"],[1,"p-3","bg-gray"],[1,"mb-2"],[1,"font-weight-bold","text-large"],[4,"ngIf"],[1,"d-flex","align-items-center"],["class","text-small bg-dark-gray text-white py-1 px-3 mr-2",4,"ngIf"],["class","text-small ml-auto",4,"ngIf"],[1,"py-2","px-3","px-md-2","d-flex","flex-wrap"],["class","px-md-2 my-2",4,"ngFor","ngForOf"],[1,"text-small","bg-dark-gray","text-white","py-1","px-3","mr-2"],[1,"text-small","ml-auto"],[1,"mr-1"],[1,"px-md-2","my-2"],[1,"mb-3",3,"performance","select"]],template:function(n,e){1&n&&(g.Pc(0,"div",0),g.Pc(1,"div",1),g.Pc(2,"div",2),g.Pc(3,"p",3),g.Ad(4),g.Zc(5,"changeLanguage"),g.Oc(),g.yd(6,V,3,3,"p",4),g.Zc(7,"changeLanguage"),g.yd(8,$,3,3,"p",4),g.Zc(9,"changeLanguage"),g.Oc(),g.Pc(10,"div",5),g.yd(11,nn,2,1,"div",6),g.yd(12,en,3,3,"div",6),g.yd(13,tn,3,3,"div",6),g.yd(14,cn,6,7,"div",7),g.Oc(),g.Oc(),g.Pc(15,"ul",8),g.yd(16,an,2,1,"li",9),g.Oc(),g.Oc()),2&n&&(g.wc(4),g.Bd(g.ad(5,8,e.screeningWorkEvent.info.name)),g.wc(2),g.fd("ngIf",e.screeningWorkEvent.info.superEvent.headline&&g.ad(7,10,e.screeningWorkEvent.info.superEvent.headline)),g.wc(2),g.fd("ngIf",e.screeningWorkEvent.info.superEvent.description&&g.ad(9,12,e.screeningWorkEvent.info.superEvent.description)),g.wc(3),g.fd("ngIf",null==e.screeningWorkEvent.info.workPerformed?null:e.screeningWorkEvent.info.workPerformed.contentRating),g.wc(1),g.fd("ngIf",e.screeningWorkEvent.info.superEvent.dubLanguage),g.wc(1),g.fd("ngIf",e.screeningWorkEvent.info.superEvent.subtitleLanguage),g.wc(1),g.fd("ngIf",(null==e.screeningWorkEvent.info.workPerformed?null:e.screeningWorkEvent.info.workPerformed.duration)&&e.moment.duration(null==e.screeningWorkEvent.info.workPerformed?null:e.screeningWorkEvent.info.workPerformed.duration).asMinutes()>0),g.wc(2),g.fd("ngForOf",e.screeningWorkEvent.data))},directives:[c.l,c.k,U],pipes:[p.a,f.c],styles:["[_nghost-%COMP%]{display:block}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:20%}@media (max-width:991.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:25%}}@media (max-width:767.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:100%}}"]});var on=function(n,e,t,c){return new(t||(t=Promise))((function(i,a){function s(n){try{r(c.next(n))}catch(e){a(e)}}function o(n){try{r(c.throw(n))}catch(e){a(e)}}function r(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(s,o)}r((c=c.apply(n,e||[])).next())}))};const rn=["datepicker"];function dn(n,e){if(1&n&&(g.Pc(0,"p",16),g.Ad(1),g.Zc(2,"formatDate"),g.Zc(3,"async"),g.Oc()),2&n){const n=g.Yc();var t;g.wc(1),g.Cd(" ",g.bd(2,1,null==(t=g.ad(3,4,n.admission))?null:t.scheduleDate,"YYYY/MM/DD (ddd)"),"")}}function ln(n,e){1&n&&(g.Kc(0,"p",17),g.Zc(1,"translate")),2&n&&g.fd("innerHTML",g.ad(1,1,"admission.schedule.notfound"),g.td)}function un(n,e){if(1&n){const n=g.Qc();g.Pc(0,"app-admission-performances",18),g.Wc("select",(function(e){g.sd(n);return g.Yc().selectSchedule(e)})),g.Oc()}if(2&n){const n=e.$implicit;g.fd("screeningWorkEvent",n)}}const mn=function(){return{dateInputFormat:"YYYY/MM/DD",adaptivePosition:!0,showWeekNumbers:!1}};class gn{constructor(n,e,t,c,i){this.store=n,this.router=e,this.localeService=t,this.actionService=c,this.masterService=i,this.moment=d}ngOnInit(){return on(this,void 0,void 0,(function*(){this.admission=this.store.pipe(Object(r.m)(m.a)),this.user=this.store.pipe(Object(r.m)(m.i)),this.screeningWorkEvents=[]}))}ngOnDestroy(){clearTimeout(this.updateTimer)}update(){void 0!==this.updateTimer&&clearTimeout(this.updateTimer);this.updateTimer=setTimeout(()=>{this.selectDate()},6e5)}selectDate(n){return on(this,void 0,void 0,(function*(){null!=n&&(this.scheduleDate=n);try{const n=(yield this.actionService.user.getData()).theater;if(void 0===n)return void this.router.navigate(["/error"]);void 0!==this.scheduleDate&&null!==this.scheduleDate||(this.scheduleDate=d().toDate());const e=d(this.scheduleDate).format("YYYY-MM-DD");this.actionService.admission.selectScheduleDate(e);const t=yield this.masterService.getSchedule({superEvent:{locationBranchCodes:[n.branchCode]},startFrom:d(e).toDate(),startThrough:d(e).add(1,"day").toDate()});this.screeningWorkEvents=q.a.Purchase.screeningEvents2WorkEvents({screeningEvents:t}),this.update()}catch(e){console.error(e),this.router.navigate(["/error"])}}))}selectSchedule(n){return on(this,void 0,void 0,(function*(){try{yield this.actionService.admission.getScreeningEvent(n),this.router.navigate(["/admission/check"])}catch(e){console.error(e),this.router.navigate(["/error"])}}))}notSpecified(){this.actionService.admission.delete(),this.router.navigate(["/admission/check"])}setDatePicker(){this.user.subscribe(n=>{this.localeService.use(n.language)}).unsubscribe()}toggleDatepicker(){this.setDatePicker(),this.datepicker.toggle()}onShowPicker(n){q.a.Util.iOSDatepickerTapBugFix(n,[this.datepicker])}}gn.\u0275fac=function(n){return new(n||gn)(g.Jc(r.b),g.Jc(a.b),g.Jc(_.d),g.Jc(u.a),g.Jc(u.e))},gn.\u0275cmp=g.Dc({type:gn,selectors:[["app-admission-schedule"]],viewQuery:function(n,e){var t;(1&n&&g.wd(rn,!0),2&n)&&(g.od(t=g.Xc())&&(e.datepicker=t.first))},decls:22,vars:17,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"mb-3"],[1,"input-group"],["type","text","placeholder","Datepicker","bsDatepicker","","readonly","",1,"form-control",3,"ngModel","bsConfig","ngModelChange","bsValueChange","click","onShown"],["datepicker","bsDatepicker"],[1,"input-group-append","pointer",3,"click"],[1,"input-group-text"],[1,"fas","fa-caret-down"],["class","text-primary text-large mb-3",4,"ngIf"],["class","mb-3",3,"innerHTML",4,"ngIf"],[1,"mb-4"],["class","mb-3",3,"screeningWorkEvent","select",4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","button",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"click"],[1,"text-primary","text-large","mb-3"],[1,"mb-3",3,"innerHTML"],[1,"mb-3",3,"screeningWorkEvent","select"]],template:function(n,e){if(1&n&&(g.Pc(0,"div",0),g.Pc(1,"h2",1),g.Ad(2),g.Zc(3,"translate"),g.Oc(),g.Kc(4,"p",2),g.Zc(5,"translate"),g.Pc(6,"div",3),g.Pc(7,"div",4),g.Pc(8,"input",5,6),g.Wc("ngModelChange",(function(n){return e.scheduleDate=n}))("bsValueChange",(function(n){return e.selectDate(n)}))("click",(function(){return e.setDatePicker()}))("onShown",(function(n){return e.onShowPicker(n)})),g.Oc(),g.Pc(10,"div",7),g.Wc("click",(function(){return e.toggleDatepicker()})),g.Pc(11,"span",8),g.Kc(12,"i",9),g.Oc(),g.Oc(),g.Oc(),g.Oc(),g.yd(13,dn,4,6,"p",10),g.Zc(14,"async"),g.yd(15,ln,2,3,"p",11),g.Pc(16,"div",12),g.yd(17,un,1,1,"app-admission-performances",13),g.Oc(),g.Pc(18,"div",14),g.Pc(19,"button",15),g.Wc("click",(function(){return e.notSpecified()})),g.Ad(20),g.Zc(21,"translate"),g.Oc(),g.Oc(),g.Oc()),2&n){var t;const n=null==(t=g.ad(14,12,e.admission))?null:t.scheduleDate;g.wc(2),g.Bd(g.ad(3,8,"admission.schedule.title")),g.wc(2),g.fd("innerHTML",g.ad(5,10,"admission.schedule.read"),g.td),g.wc(4),g.fd("ngModel",e.scheduleDate)("bsConfig",g.hd(16,mn)),g.wc(5),g.fd("ngIf",n),g.wc(2),g.fd("ngIf",0===e.screeningWorkEvents.length),g.wc(2),g.fd("ngForOf",e.screeningWorkEvents),g.wc(3),g.Bd(g.ad(21,14,"admission.schedule.next"))}},directives:[_.b,H.a,_.a,H.k,H.n,R.b,c.l,c.k,sn],pipes:[f.c,c.b,v.a],styles:['.condition[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%}.schedule-slider[_ngcontent-%COMP%]   .swiper-slide[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background-color:#000;opacity:.3}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%], .schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{width:27px;height:27px;background-image:url(/assets/images/icon/slider_arrow.svg);background-size:27px;margin-top:-13px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%]{right:-38px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{left:-38px;transform:rotate(180deg)}']});const fn=[{path:"",component:o.a,canActivate:[s.a,s.c],children:[{path:"schedule",component:gn},{path:"check",component:L}]}];class pn{}pn.\u0275mod=g.Hc({type:pn}),pn.\u0275inj=g.Gc({factory:function(n){return new(n||pn)},imports:[[a.d.forChild(fn)],a.d]});class vn{}vn.\u0275mod=g.Hc({type:vn}),vn.\u0275inj=g.Gc({factory:function(n){return new(n||vn)},imports:[[c.c,pn,i.a]]})}}]);