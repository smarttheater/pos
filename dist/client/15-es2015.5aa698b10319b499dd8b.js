(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{AL2A:function(t,e,n){"use strict";n.r(e),n.d(e,"SettingModule",(function(){return tt}));var o=n("2kYt"),r=n("DSWM"),i=n("sEIs"),c=n("RRjC"),s=n("nIj0"),a=n("sN6X"),l=n("ddJ1"),d=n("x8Mb"),p=n("PIN6"),m=n("cHUu"),u=n("mOXJ"),f=n("UH/6"),h=n("EM62"),g=n("s2Ay"),v=n("OSFB"),y=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function c(t){try{a(o.next(t))}catch(e){i(e)}}function s(t){try{a(o.throw(t))}catch(e){i(e)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,s)}a((o=o.apply(t,e||[])).next())}))};const w=["intlTelInput"];function F(t,e){if(1&t&&(h.Pc(0,"p"),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t){const t=h.Yc().$implicit;h.wc(1),h.Bd(h.ad(2,1,"form.label."+t))}}function P(t,e){if(1&t&&(h.Pc(0,"p"),h.Ad(1),h.Zc(2,"changeLanguage"),h.Oc()),2&t){const t=h.Yc().$implicit,e=h.Yc(2);var n;h.wc(1),h.Cd(" ",h.ad(2,1,null==(n=e.getAdditionalProperty(t))?null:n.label),"")}}function b(t,e){1&t&&(h.Pc(0,"p",26),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t&&(h.wc(1),h.Cd("",h.ad(2,1,"form.required")," "))}function C(t,e){if(1&t&&(h.Kc(0,"input",27),h.Zc(1,"translate")),2&t){const t=h.Yc().$implicit;h.fd("formControlName",t)("id",t)("placeholder",h.ad(1,3,"form.placeholder."+t))}}function O(t,e){if(1&t&&(h.Pc(0,"option",31),h.Ad(1),h.Zc(2,"changeLanguage"),h.Oc()),2&t){const t=e.$implicit;h.fd("value",t.branchCode),h.wc(1),h.Cd(" ",h.ad(2,2,t.name),"")}}function I(t,e){if(1&t){const t=h.Qc();h.Pc(0,"select",28),h.Wc("change",(function(){h.sd(t);return h.Yc(3).changePosList()})),h.Pc(1,"option",29),h.Ad(2),h.Zc(3,"translate"),h.Oc(),h.yd(4,O,3,4,"option",30),h.Oc()}if(2&t){const t=h.Yc().$implicit,e=h.Yc(2);h.fd("formControlName",t),h.wc(2),h.Bd(h.ad(3,3,"setting.unselected")),h.wc(2),h.fd("ngForOf",e.theaters)}}function A(t,e){if(1&t&&(h.Pc(0,"option",31),h.Ad(1),h.Oc()),2&t){const t=e.$implicit;h.fd("value",t.id),h.wc(1),h.Bd(t.name)}}function N(t,e){if(1&t&&(h.Pc(0,"select",32),h.Pc(1,"option",29),h.Ad(2),h.Zc(3,"translate"),h.Oc(),h.yd(4,A,2,2,"option",30),h.Oc()),2&t){const t=h.Yc().$implicit,e=h.Yc(2);h.fd("formControlName",t),h.wc(2),h.Bd(h.ad(3,3,"setting.unselected")),h.wc(2),h.fd("ngForOf",e.posList)}}function S(t,e){if(1&t&&(h.Pc(0,"option",31),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t){const t=e.$implicit;h.fd("value",t.connectionType),h.wc(1),h.Cd(" ",h.ad(2,2,t.name),"")}}function T(t,e){if(1&t){const t=h.Qc();h.Pc(0,"select",28),h.Wc("change",(function(){h.sd(t);return h.Yc(3).changePrinterType()})),h.yd(1,S,3,4,"option",30),h.Oc()}if(2&t){const t=h.Yc().$implicit,e=h.Yc(2);h.fd("formControlName",t),h.wc(1),h.fd("ngForOf",e.printers)}}function x(t,e){if(1&t&&(h.Pc(0,"select",33),h.Pc(1,"option",31),h.Ad(2),h.Zc(3,"translate"),h.Oc(),h.Pc(4,"option",31),h.Ad(5),h.Zc(6,"translate"),h.Oc(),h.Oc()),2&t){const t=h.Yc().$implicit;h.fd("formControlName",t)("id",t),h.wc(1),h.fd("value",!1),h.wc(1),h.Bd(h.ad(3,6,"form.option.false")),h.wc(2),h.fd("value",!0),h.wc(1),h.Bd(h.ad(6,8,"form.option.true"))}}function L(t,e){if(1&t&&(h.Kc(0,"input",34),h.Zc(1,"translate")),2&t){const t=h.Yc().$implicit;h.fd("formControlName",t)("id",t)("placeholder",h.ad(1,3,"form.placeholder."+t))}}const Y=function(t){return[t]},Z=function(t,e){return[t,e]};function B(t,e){if(1&t&&h.Kc(0,"ngx-intl-tel-input",35,36),2&t){const t=h.Yc(3);h.fd("preferredCountries",h.id(11,Y,t.CountryISO.Japan))("enableAutoCountrySelect",!1)("enablePlaceholder",!0)("searchCountryFlag",!0)("searchCountryField",h.jd(13,Z,t.SearchCountryField.Iso2,t.SearchCountryField.Name))("selectFirstCountry",!1)("selectedCountryISO",t.CountryISO.Japan)("maxLength",15)("tooltipField",t.TooltipLabel.Name)("phoneValidation",!0)("separateDialCode",!1)}}function k(t,e){if(1&t&&(h.Pc(0,"select",33),h.Pc(1,"option",29),h.Ad(2),h.Zc(3,"translate"),h.Oc(),h.Pc(4,"option",37),h.Ad(5),h.Zc(6,"translate"),h.Oc(),h.Pc(7,"option",38),h.Ad(8),h.Zc(9,"translate"),h.Oc(),h.Oc()),2&t){const t=h.Yc().$implicit;h.fd("formControlName",t)("id",t),h.wc(2),h.Bd(h.ad(3,5,"form.option.unselected")),h.wc(3),h.Bd(h.ad(6,7,"form.option.man")),h.wc(3),h.Bd(h.ad(9,9,"form.option.woman"))}}function $(t,e){if(1&t&&h.Kc(0,"textarea",39),2&t){const t=h.Yc().$implicit;h.fd("formControlName",t)("id",t)}}function j(t,e){1&t&&(h.Pc(0,"p",42),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t&&(h.wc(1),h.Cd(" ",h.ad(2,1,"form.validation.required")," "))}const J=function(t){return{value:t}};function V(t,e){if(1&t&&(h.Pc(0,"p",42),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t){const t=h.Yc(2).$implicit,e=h.Yc(2);h.wc(1),h.Cd(" ",h.bd(2,1,"form.validation.maxlength",h.id(4,J,null==e.settingForm.controls[t].errors?null:e.settingForm.controls[t].errors.maxlength.requiredLength))," ")}}function D(t,e){1&t&&(h.Pc(0,"p",42),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t&&(h.wc(1),h.Cd(" ",h.ad(2,1,"form.validation.email")," "))}function E(t,e){1&t&&(h.Pc(0,"p",42),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t&&(h.wc(1),h.Cd(" ",h.ad(2,1,"form.validation.telephone")," "))}function q(t,e){1&t&&(h.Pc(0,"p",42),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t&&(h.wc(1),h.Cd(" ",h.ad(2,1,"form.validation.fullKana"),""))}function K(t,e){1&t&&(h.Pc(0,"p",42),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t&&(h.wc(1),h.Cd(" ",h.ad(2,1,"form.validation.lowercaseLetters"),""))}function R(t,e){if(1&t&&(h.Pc(0,"div"),h.yd(1,q,3,3,"p",41),h.Zc(2,"async"),h.yd(3,K,3,3,"p",41),h.Zc(4,"async"),h.Oc()),2&t){const t=h.Yc(2).$implicit,e=h.Yc(2);var n;const r="ja"===(null==(n=h.ad(2,2,e.user))?null:n.language)&&(null==e.settingForm.controls[t].errors?null:e.settingForm.controls[t].errors.customPattern);var o;const i="ja"!==(null==(o=h.ad(4,4,e.user))?null:o.language)&&(null==e.settingForm.controls[t].errors?null:e.settingForm.controls[t].errors.customPattern);h.wc(1),h.fd("ngIf",r),h.wc(2),h.fd("ngIf",i)}}function U(t,e){if(1&t&&(h.Pc(0,"div",40),h.yd(1,j,3,3,"p",41),h.yd(2,V,3,6,"p",41),h.yd(3,D,3,3,"p",41),h.yd(4,E,3,3,"p",41),h.yd(5,R,5,6,"div",14),h.Oc()),2&t){const t=h.Yc().$implicit,e=h.Yc(2);h.wc(1),h.fd("ngIf",null==e.settingForm.controls[t].errors?null:e.settingForm.controls[t].errors.required),h.wc(1),h.fd("ngIf",null==e.settingForm.controls[t].errors?null:e.settingForm.controls[t].errors.maxlength),h.wc(1),h.fd("ngIf",null==e.settingForm.controls[t].errors?null:e.settingForm.controls[t].errors.email),h.wc(1),h.fd("ngIf",null==e.settingForm.controls[t].errors?null:e.settingForm.controls[t].errors.validatePhoneNumber),h.wc(1),h.fd("ngIf","familyName"===t||"givenName"===t)}}function H(t,e){if(1&t){const t=h.Qc();h.Pc(0,"div"),h.Pc(1,"button",43),h.Wc("click",(function(){h.sd(t);return h.Yc(3).print()})),h.Ad(2),h.Zc(3,"translate"),h.Oc(),h.Oc()}if(2&t){const t=h.Yc(3);h.wc(1),h.fd("disabled",t.settingForm.controls.printerType.value===t.connectionType.None),h.wc(1),h.Bd(h.ad(3,2,"setting.testPrinting"))}}function G(t,e){1&t&&(h.Pc(0,"p",44),h.Ad(1),h.Zc(2,"translate"),h.Oc()),2&t&&(h.wc(1),h.Cd(" ",h.ad(2,1,"setting.printerIpAddressDescription")," "))}function M(t,e){if(1&t){const t=h.Qc();h.Pc(0,"div"),h.Pc(1,"button",43),h.Wc("click",(function(){h.sd(t);return h.Yc(3).openDrawer()})),h.Ad(2),h.Zc(3,"translate"),h.Oc(),h.Pc(4,"p",44),h.Ad(5),h.Zc(6,"translate"),h.Oc(),h.Oc()}if(2&t){const t=h.Yc(3);h.wc(1),h.fd("disabled",!t.settingForm.controls.drawer.value),h.wc(1),h.Bd(h.ad(3,3,"setting.openDrawer")),h.wc(3),h.Cd(" ",h.ad(6,5,"setting.drawerDescription")," ")}}function Q(t,e){if(1&t&&(h.Pc(0,"div",11),h.Pc(1,"div",12),h.Pc(2,"div",13),h.yd(3,F,3,3,"p",14),h.yd(4,P,3,3,"p",14),h.yd(5,b,3,3,"p",15),h.Oc(),h.Oc(),h.Pc(6,"div",16),h.yd(7,C,2,5,"input",17),h.yd(8,I,5,5,"select",18),h.yd(9,N,5,5,"select",19),h.yd(10,T,2,2,"select",18),h.yd(11,x,7,10,"select",20),h.yd(12,L,2,5,"input",21),h.yd(13,B,2,16,"ngx-intl-tel-input",22),h.yd(14,k,10,11,"select",20),h.yd(15,$,1,2,"textarea",23),h.yd(16,U,6,5,"div",24),h.yd(17,H,4,4,"div",14),h.yd(18,G,3,3,"p",25),h.yd(19,M,7,7,"div",14),h.Oc(),h.Oc()),2&t){const t=e.$implicit,r=h.Yc(2);var n=null;const i="theaterBranchCode"!==t&&"posId"!==t&&"printerType"!==t&&"email"!==t&&"telephone"!==t&&"gender"!==t&&"drawer"!==t&&"textarea"!==(null==(n=r.getAdditionalProperty(t))?null:n.inputType);var o;const c="textarea"===(null==(o=r.getAdditionalProperty(t))?null:o.inputType);h.wc(3),h.fd("ngIf",!r.getAdditionalProperty(t)),h.wc(1),h.fd("ngIf",r.getAdditionalProperty(t)),h.wc(1),h.fd("ngIf",r.isRequired(t)),h.wc(2),h.fd("ngIf",i),h.wc(1),h.fd("ngIf","theaterBranchCode"===t),h.wc(1),h.fd("ngIf","posId"===t),h.wc(1),h.fd("ngIf","printerType"===t),h.wc(1),h.fd("ngIf","drawer"===t),h.wc(1),h.fd("ngIf","email"===t),h.wc(1),h.fd("ngIf","telephone"===t),h.wc(1),h.fd("ngIf","gender"===t),h.wc(1),h.fd("ngIf",c),h.wc(1),h.fd("ngIf",r.settingForm.controls[t].invalid&&r.settingForm.controls[t].touched),h.wc(1),h.fd("ngIf","printerType"===t),h.wc(1),h.fd("ngIf","printerIpAddress"===t),h.wc(1),h.fd("ngIf","drawer"===t)}}function W(t,e){if(1&t){const t=h.Qc();h.Pc(0,"form",2),h.Pc(1,"div",3),h.Pc(2,"h2",4),h.Ad(3),h.Zc(4,"translate"),h.Oc(),h.Kc(5,"p",5),h.Zc(6,"translate"),h.Pc(7,"div",6),h.yd(8,Q,20,16,"div",7),h.Oc(),h.Oc(),h.Pc(9,"div",8),h.Pc(10,"button",9),h.Wc("click",(function(){h.sd(t);return h.Yc().onSubmit()})),h.Zc(11,"async"),h.Ad(12),h.Zc(13,"translate"),h.Oc(),h.Pc(14,"button",10),h.Ad(15),h.Zc(16,"translate"),h.Oc(),h.Oc(),h.Oc()}if(2&t){const t=h.Yc();h.fd("formGroup",t.settingForm),h.wc(3),h.Bd(h.ad(4,8,"setting.title")),h.wc(2),h.fd("innerHTML",h.ad(6,10,"setting.read"),h.td),h.wc(3),h.fd("ngForOf",t.getProfileFormKeys()),h.wc(2),h.fd("disabled",h.ad(11,12,t.isLoading)),h.wc(2),h.Bd(h.ad(13,14,"setting.next")),h.wc(2),h.fd("routerLink",t.environment.BASE_URL),h.wc(1),h.Bd(h.ad(16,16,"setting.prev"))}}class X{constructor(t,e,n,o,r,i,c){this.formBuilder=t,this.store=e,this.utilService=n,this.actionService=o,this.masterService=r,this.translate=i,this.router=c,this.printers=d.b.Util.Printer.printers,this.connectionType=d.b.Util.Printer.ConnectionType,this.viewType=d.b.Util.ViewType,this.environment=Object(p.a)(),this.SearchCountryField=l.e,this.TooltipLabel=l.f,this.CountryISO=l.a}ngOnInit(){return y(this,void 0,void 0,(function*(){this.user=this.store.pipe(Object(a.m)(u.i)),this.error=this.store.pipe(Object(a.m)(u.b)),this.isLoading=this.store.pipe(Object(a.m)(u.c)),this.posList=[],this.theaters=[];try{this.theaters=yield this.masterService.getTheaters(),yield this.createSettlingForm()}catch(t){console.error(t),this.router.navigate(["/error"])}setTimeout(()=>{if(void 0===this.intlTelInput)return;const t=this.intlTelInput.allCountries.find(t=>t.iso2===l.a.Japan);void 0!==t&&(t.placeHolder=this.translate.instant("form.placeholder.telephone"))},0)}))}createSettlingForm(){return y(this,void 0,void 0,(function*(){const t=this.environment.PROFILE;this.settingForm=this.formBuilder.group({theaterBranchCode:["",[s.s.required]],posId:[""],printerType:[d.b.Util.Printer.ConnectionType.None],printerIpAddress:[""],drawer:[!1]}),t.forEach(t=>{const e=[];void 0!==t.required&&t.required&&e.push(s.s.required),void 0!==t.maxLength&&e.push(s.s.maxLength(t.maxLength)),void 0!==t.minLength&&e.push(s.s.minLength(t.minLength)),void 0!==t.pattern&&e.push(s.s.pattern(t.pattern)),"email"===t.key&&e.push(s.s.email),this.settingForm.addControl(t.key,new s.c(t.value,e))});const e=yield this.actionService.user.getData();void 0!==e.theater&&(this.settingForm.controls.theaterBranchCode.setValue(e.theater.branchCode),this.changePosList()),void 0!==e.pos&&this.settingForm.controls.posId.setValue(e.pos.id);const n=e.customerContact;if(void 0!==n){Object.keys(n).forEach(t=>{const e=n[t];void 0!==e&&void 0!==this.settingForm.controls[t]&&("telephone"!==t?this.settingForm.controls[t].setValue(e):this.settingForm.controls.telephone.setValue((new f.a).transform(e)))});const t=n.additionalProperty;if(void 0===t)return;t.forEach(t=>{const e="additionalProperty."+t.name,n=t.value;void 0!==n&&void 0!==this.settingForm.controls[e]&&this.settingForm.controls[e].setValue(n)})}void 0!==e.printer&&(this.settingForm.controls.printerType.setValue(e.printer.connectionType),this.settingForm.controls.printerIpAddress.setValue(e.printer.ipAddress)),this.settingForm.controls.drawer.setValue(void 0!==e.drawer&&e.drawer)}))}changePosList(){this.settingForm.controls.posId.setValue("");const t=this.settingForm.controls.theaterBranchCode.value;if(""===t)return void(this.posList=[]);const e=this.theaters.find(e=>e.branchCode===t);this.posList=void 0!==e?void 0===e.hasPOS?[]:e.hasPOS:[]}onSubmit(){return y(this,void 0,void 0,(function*(){if(Object.keys(this.settingForm.controls).forEach(t=>{this.settingForm.controls[t].markAsTouched()}),this.settingForm.invalid)this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.validation")});else try{const t=this.settingForm.controls.theaterBranchCode.value,e=this.settingForm.controls.posId.value,n=this.theaters.find(e=>e.branchCode===t);if(void 0===n)throw new Error("theater not found").message;const o=void 0===n.hasPOS?n.hasPOS:n.hasPOS.find(t=>t.id===e),r=[];Object.keys(this.settingForm.controls).forEach(t=>{/additionalProperty/.test(t)&&r.push({name:t.replace("additionalProperty.",""),value:this.settingForm.controls[t].value})}),this.actionService.user.updateAll({pos:o,theater:n,customerContact:{familyName:void 0===this.settingForm.controls.familyName?void 0:this.settingForm.controls.familyName.value,givenName:void 0===this.settingForm.controls.givenName?void 0:this.settingForm.controls.givenName.value,email:void 0===this.settingForm.controls.email?void 0:this.settingForm.controls.email.value,telephone:void 0===this.settingForm.controls.telephone?void 0:this.settingForm.controls.telephone.value.e164Number,age:void 0===this.settingForm.controls.age?void 0:this.settingForm.controls.age.value,address:void 0===this.settingForm.controls.address?void 0:this.settingForm.controls.address.value,gender:void 0===this.settingForm.controls.gender?void 0:this.settingForm.controls.gender.value,additionalProperty:r},printer:{ipAddress:this.settingForm.controls.printerIpAddress.value,connectionType:this.settingForm.controls.printerType.value},drawer:"true"===this.settingForm.controls.drawer.value}),this.utilService.openAlert({title:this.translate.instant("common.complete"),body:this.translate.instant("setting.alert.success")})}catch(t){console.error(t)}}))}print(){return y(this,void 0,void 0,(function*(){const t={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value};try{yield this.actionService.order.print({orders:[],printer:t})}catch(e){console.error(e),this.utilService.openAlert({title:this.translate.instant("common.error"),body:`\n                <p class="mb-4">${this.translate.instant("setting.alert.print")}</p>\n                    <div class="p-3 bg-light-gray select-text">\n                    <code>${e}</code>\n                </div>`})}}))}openDrawer(){return y(this,void 0,void 0,(function*(){const t={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value};try{yield this.actionService.order.openDrawer({printer:t})}catch(e){console.error(e),this.utilService.openAlert({title:this.translate.instant("common.error"),body:`\n                <p class="mb-4">${this.translate.instant("setting.alert.drawer")}</p>\n                    <div class="p-3 bg-light-gray select-text">\n                    <code>${e}</code>\n                </div>`})}}))}changePrinterType(){this.settingForm.controls.printerType.value===d.b.Util.Printer.ConnectionType.StarBluetooth&&this.settingForm.controls.printerIpAddress.setValue(this.translate.instant("setting.starBluetoothAddress"))}isRequired(t){return"theaterBranchCode"===t||void 0!==this.environment.PROFILE.find(e=>e.key===t&&e.required)}getProfileFormKeys(){return Object.keys(this.settingForm.controls)}getAdditionalProperty(t){return this.environment.PROFILE.find(e=>/additionalProperty/.test(e.key)&&e.key===t)}}X.\u0275fac=function(t){return new(t||X)(h.Jc(s.b),h.Jc(a.b),h.Jc(m.f),h.Jc(m.a),h.Jc(m.d),h.Jc(g.d),h.Jc(i.b))},X.\u0275cmp=h.Dc({type:X,selectors:[["app-setting"]],viewQuery:function(t,e){var n;(1&t&&h.Gd(w,!0),2&t)&&(h.od(n=h.Xc())&&(e.intlTelInput=n.first))},decls:2,vars:1,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[3,"formGroup",4,"ngIf"],[3,"formGroup"],[1,"mb-4"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"p-3","bg-white"],["class","form-group row",4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","submit",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"disabled","click"],["type","button",1,"btn","btn-outline-primary","btn-block","py-3",3,"routerLink"],[1,"form-group","row"],[1,"col-md-4","py-2","text-md-right"],[1,"d-inline-flex","align-items-center"],[4,"ngIf"],["class","badge badge-danger ml-2",4,"ngIf"],[1,"col-md-8"],["type","text","class","form-control",3,"formControlName","id","placeholder",4,"ngIf"],["class","form-control",3,"formControlName","change",4,"ngIf"],["class","form-control",3,"formControlName",4,"ngIf"],["class","form-control",3,"formControlName","id",4,"ngIf"],["type","email","class","form-control",3,"formControlName","id","placeholder",4,"ngIf"],["inputId","telephone","name","telephone","formControlName","telephone",3,"preferredCountries","enableAutoCountrySelect","enablePlaceholder","searchCountryFlag","searchCountryField","selectFirstCountry","selectedCountryISO","maxLength","tooltipField","phoneValidation","separateDialCode",4,"ngIf"],["class","form-control","placeholder","",3,"formControlName","id",4,"ngIf"],["class","mt-2",4,"ngIf"],["class","text-small mt-2",4,"ngIf"],[1,"badge","badge-danger","ml-2"],["type","text",1,"form-control",3,"formControlName","id","placeholder"],[1,"form-control",3,"formControlName","change"],["value",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"form-control",3,"formControlName"],[1,"form-control",3,"formControlName","id"],["type","email",1,"form-control",3,"formControlName","id","placeholder"],["inputId","telephone","name","telephone","formControlName","telephone",3,"preferredCountries","enableAutoCountrySelect","enablePlaceholder","searchCountryFlag","searchCountryField","selectFirstCountry","selectedCountryISO","maxLength","tooltipField","phoneValidation","separateDialCode"],["intlTelInput",""],["value","man"],["value","woman"],["placeholder","",1,"form-control",3,"formControlName","id"],[1,"mt-2"],["class","text-danger",4,"ngIf"],[1,"text-danger"],["type","button",1,"btn","btn-sm","btn-primary","py-2","mt-2",3,"disabled","click"],[1,"text-small","mt-2"]],template:function(t,e){1&t&&(h.Pc(0,"div",0),h.yd(1,W,17,18,"form",1),h.Oc()),2&t&&(h.wc(1),h.fd("ngIf",e.settingForm))},directives:[o.l,s.u,s.l,s.e,o.k,i.c,s.a,s.k,s.d,l.b,s.r,s.o,s.t,l.c],pipes:[g.c,o.b,v.a],styles:[""]});const _=[{path:"",component:c.a,children:[{path:"",component:X}]}];class z{}z.\u0275mod=h.Hc({type:z}),z.\u0275inj=h.Gc({factory:function(t){return new(t||z)},imports:[[i.d.forChild(_)],i.d]});class tt{}tt.\u0275mod=h.Hc({type:tt}),tt.\u0275inj=h.Gc({factory:function(t){return new(t||tt)},imports:[[o.c,z,r.a]]})}}]);