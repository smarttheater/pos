!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{AL2A:function(n,r,o){"use strict";o.r(r),o.d(r,"SettingModule",(function(){return nt}));var i=o("2kYt"),c=o("DSWM"),a=o("sEIs"),s=o("RRjC"),l=o("nIj0"),d=o("sN6X"),u=o("ddJ1"),p=o("x8Mb"),f=o("PIN6"),m=o("cHUu"),h=o("mOXJ"),g=o("UH/6"),v=o("EM62"),y=o("s2Ay"),w=o("OSFB"),b=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function c(t){try{s(r.next(t))}catch(e){i(e)}}function a(t){try{s(r.throw(t))}catch(e){i(e)}}function s(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,a)}s((r=r.apply(t,e||[])).next())}))},F=["intlTelInput"];function P(t,e){if(1&t&&(v.Pc(0,"p"),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t){var n=v.Yc().$implicit;v.wc(1),v.Bd(v.ad(2,1,"form.label."+n))}}function C(t,e){if(1&t&&(v.Pc(0,"p"),v.Ad(1),v.Zc(2,"changeLanguage"),v.Oc()),2&t){var n,r=v.Yc().$implicit,o=v.Yc(2);v.wc(1),v.Cd(" ",v.ad(2,1,null==(n=o.getAdditionalProperty(r))?null:n.label),"")}}function O(t,e){1&t&&(v.Pc(0,"p",26),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Cd("",v.ad(2,1,"form.required")," "))}function I(t,e){if(1&t&&(v.Kc(0,"input",27),v.Zc(1,"translate")),2&t){var n=v.Yc().$implicit;v.fd("formControlName",n)("id",n)("placeholder",v.ad(1,3,"form.placeholder."+n))}}function A(t,e){if(1&t&&(v.Pc(0,"option",31),v.Ad(1),v.Zc(2,"changeLanguage"),v.Oc()),2&t){var n=e.$implicit;v.fd("value",n.branchCode),v.wc(1),v.Cd(" ",v.ad(2,2,n.name),"")}}function x(t,e){if(1&t){var n=v.Qc();v.Pc(0,"select",28),v.Wc("change",(function(){return v.sd(n),v.Yc(3).changePosList()})),v.Pc(1,"option",29),v.Ad(2),v.Zc(3,"translate"),v.Oc(),v.yd(4,A,3,4,"option",30),v.Oc()}if(2&t){var r=v.Yc().$implicit,o=v.Yc(2);v.fd("formControlName",r),v.wc(2),v.Bd(v.ad(3,3,"setting.unselected")),v.wc(2),v.fd("ngForOf",o.theaters)}}function k(t,e){if(1&t&&(v.Pc(0,"option",31),v.Ad(1),v.Oc()),2&t){var n=e.$implicit;v.fd("value",n.id),v.wc(1),v.Bd(n.name)}}function N(t,e){if(1&t&&(v.Pc(0,"select",32),v.Pc(1,"option",29),v.Ad(2),v.Zc(3,"translate"),v.Oc(),v.yd(4,k,2,2,"option",30),v.Oc()),2&t){var n=v.Yc().$implicit,r=v.Yc(2);v.fd("formControlName",n),v.wc(2),v.Bd(v.ad(3,3,"setting.unselected")),v.wc(2),v.fd("ngForOf",r.posList)}}function S(t,e){if(1&t&&(v.Pc(0,"option",31),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t){var n=e.$implicit;v.fd("value",n.connectionType),v.wc(1),v.Cd(" ",v.ad(2,2,n.name),"")}}function T(t,e){if(1&t){var n=v.Qc();v.Pc(0,"select",28),v.Wc("change",(function(){return v.sd(n),v.Yc(3).changePrinterType()})),v.yd(1,S,3,4,"option",30),v.Oc()}if(2&t){var r=v.Yc().$implicit,o=v.Yc(2);v.fd("formControlName",r),v.wc(1),v.fd("ngForOf",o.printers)}}function L(t,e){if(1&t&&(v.Pc(0,"select",33),v.Pc(1,"option",34),v.Ad(2),v.Zc(3,"translate"),v.Oc(),v.Pc(4,"option",35),v.Ad(5),v.Zc(6,"translate"),v.Oc(),v.Oc()),2&t){var n=v.Yc().$implicit;v.fd("formControlName",n)("id",n),v.wc(2),v.Bd(v.ad(3,4,"form.option.false")),v.wc(3),v.Bd(v.ad(6,6,"form.option.true"))}}function Y(t,e){if(1&t&&(v.Kc(0,"input",36),v.Zc(1,"translate")),2&t){var n=v.Yc().$implicit;v.fd("formControlName",n)("id",n)("placeholder",v.ad(1,3,"form.placeholder."+n))}}var Z=function(t){return[t]},B=function(t,e){return[t,e]};function R(t,e){if(1&t&&v.Kc(0,"ngx-intl-tel-input",37,38),2&t){var n=v.Yc(3);v.fd("preferredCountries",v.id(11,Z,n.CountryISO.Japan))("enableAutoCountrySelect",!1)("enablePlaceholder",!0)("searchCountryFlag",!0)("searchCountryField",v.jd(13,B,n.SearchCountryField.Iso2,n.SearchCountryField.Name))("selectFirstCountry",!1)("selectedCountryISO",n.CountryISO.Japan)("maxLength",15)("tooltipField",n.TooltipLabel.Name)("phoneValidation",!0)("separateDialCode",!1)}}function $(t,e){if(1&t&&(v.Pc(0,"select",33),v.Pc(1,"option",29),v.Ad(2),v.Zc(3,"translate"),v.Oc(),v.Pc(4,"option",39),v.Ad(5),v.Zc(6,"translate"),v.Oc(),v.Pc(7,"option",40),v.Ad(8),v.Zc(9,"translate"),v.Oc(),v.Oc()),2&t){var n=v.Yc().$implicit;v.fd("formControlName",n)("id",n),v.wc(2),v.Bd(v.ad(3,5,"form.option.unselected")),v.wc(3),v.Bd(v.ad(6,7,"form.option.man")),v.wc(3),v.Bd(v.ad(9,9,"form.option.woman"))}}function j(t,e){if(1&t&&v.Kc(0,"textarea",41),2&t){var n=v.Yc().$implicit;v.fd("formControlName",n)("id",n)}}function J(t,e){1&t&&(v.Pc(0,"p",44),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Cd(" ",v.ad(2,1,"form.validation.required")," "))}var V=function(t){return{value:t}};function E(t,e){if(1&t&&(v.Pc(0,"p",44),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t){var n=v.Yc(2).$implicit,r=v.Yc(2);v.wc(1),v.Cd(" ",v.bd(2,1,"form.validation.maxlength",v.id(4,V,null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.maxlength.requiredLength))," ")}}function D(t,e){1&t&&(v.Pc(0,"p",44),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Cd(" ",v.ad(2,1,"form.validation.email")," "))}function q(t,e){1&t&&(v.Pc(0,"p",44),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Cd(" ",v.ad(2,1,"form.validation.telephone")," "))}function K(t,e){1&t&&(v.Pc(0,"p",44),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Cd(" ",v.ad(2,1,"form.validation.fullKana"),""))}function U(t,e){1&t&&(v.Pc(0,"p",44),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Cd(" ",v.ad(2,1,"form.validation.lowercaseLetters"),""))}function H(t,e){if(1&t&&(v.Pc(0,"div"),v.yd(1,K,3,3,"p",43),v.Zc(2,"async"),v.yd(3,U,3,3,"p",43),v.Zc(4,"async"),v.Oc()),2&t){var n,r,o=v.Yc(2).$implicit,i=v.Yc(2),c="ja"===(null==(n=v.ad(2,2,i.user))?null:n.language)&&(null==i.settingForm.controls[o].errors?null:i.settingForm.controls[o].errors.customPattern),a="ja"!==(null==(r=v.ad(4,4,i.user))?null:r.language)&&(null==i.settingForm.controls[o].errors?null:i.settingForm.controls[o].errors.customPattern);v.wc(1),v.fd("ngIf",c),v.wc(2),v.fd("ngIf",a)}}function G(t,e){if(1&t&&(v.Pc(0,"div",42),v.yd(1,J,3,3,"p",43),v.yd(2,E,3,6,"p",43),v.yd(3,D,3,3,"p",43),v.yd(4,q,3,3,"p",43),v.yd(5,H,5,6,"div",14),v.Oc()),2&t){var n=v.Yc().$implicit,r=v.Yc(2);v.wc(1),v.fd("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.required),v.wc(1),v.fd("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.maxlength),v.wc(1),v.fd("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.email),v.wc(1),v.fd("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.validatePhoneNumber),v.wc(1),v.fd("ngIf","familyName"===n||"givenName"===n)}}function M(t,e){if(1&t){var n=v.Qc();v.Pc(0,"div"),v.Pc(1,"button",45),v.Wc("click",(function(){return v.sd(n),v.Yc(3).print()})),v.Ad(2),v.Zc(3,"translate"),v.Oc(),v.Oc()}if(2&t){var r=v.Yc(3);v.wc(1),v.fd("disabled",r.settingForm.controls.printerType.value===r.connectionType.None),v.wc(1),v.Bd(v.ad(3,2,"setting.testPrinting"))}}function Q(t,e){1&t&&(v.Pc(0,"p",46),v.Ad(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Cd(" ",v.ad(2,1,"setting.printerIpAddressDescription")," "))}function W(t,e){if(1&t){var n=v.Qc();v.Pc(0,"div"),v.Pc(1,"button",45),v.Wc("click",(function(){return v.sd(n),v.Yc(3).openDrawer()})),v.Ad(2),v.Zc(3,"translate"),v.Oc(),v.Pc(4,"p",46),v.Ad(5),v.Zc(6,"translate"),v.Oc(),v.Oc()}if(2&t){var r=v.Yc(3);v.wc(1),v.fd("disabled","0"===r.settingForm.controls.drawer.value),v.wc(1),v.Bd(v.ad(3,3,"setting.openDrawer")),v.wc(3),v.Cd(" ",v.ad(6,5,"setting.drawerDescription")," ")}}function X(t,e){if(1&t&&(v.Pc(0,"div",11),v.Pc(1,"div",12),v.Pc(2,"div",13),v.yd(3,P,3,3,"p",14),v.yd(4,C,3,3,"p",14),v.yd(5,O,3,3,"p",15),v.Oc(),v.Oc(),v.Pc(6,"div",16),v.yd(7,I,2,5,"input",17),v.yd(8,x,5,5,"select",18),v.yd(9,N,5,5,"select",19),v.yd(10,T,2,2,"select",18),v.yd(11,L,7,8,"select",20),v.yd(12,Y,2,5,"input",21),v.yd(13,R,2,16,"ngx-intl-tel-input",22),v.yd(14,$,10,11,"select",20),v.yd(15,j,1,2,"textarea",23),v.yd(16,G,6,5,"div",24),v.yd(17,M,4,4,"div",14),v.yd(18,Q,3,3,"p",25),v.yd(19,W,7,7,"div",14),v.Oc(),v.Oc()),2&t){var n,r=e.$implicit,o=v.Yc(2),i=null,c="theaterBranchCode"!==r&&"posId"!==r&&"printerType"!==r&&"email"!==r&&"telephone"!==r&&"gender"!==r&&"drawer"!==r&&"textarea"!==(null==(i=o.getAdditionalProperty(r))?null:i.inputType),a="textarea"===(null==(n=o.getAdditionalProperty(r))?null:n.inputType);v.wc(3),v.fd("ngIf",!o.getAdditionalProperty(r)),v.wc(1),v.fd("ngIf",o.getAdditionalProperty(r)),v.wc(1),v.fd("ngIf",o.isRequired(r)),v.wc(2),v.fd("ngIf",c),v.wc(1),v.fd("ngIf","theaterBranchCode"===r),v.wc(1),v.fd("ngIf","posId"===r),v.wc(1),v.fd("ngIf","printerType"===r),v.wc(1),v.fd("ngIf","drawer"===r),v.wc(1),v.fd("ngIf","email"===r),v.wc(1),v.fd("ngIf","telephone"===r),v.wc(1),v.fd("ngIf","gender"===r),v.wc(1),v.fd("ngIf",a),v.wc(1),v.fd("ngIf",o.settingForm.controls[r].invalid&&o.settingForm.controls[r].touched),v.wc(1),v.fd("ngIf","printerType"===r),v.wc(1),v.fd("ngIf","printerIpAddress"===r),v.wc(1),v.fd("ngIf","drawer"===r)}}function _(t,e){if(1&t){var n=v.Qc();v.Pc(0,"form",2),v.Pc(1,"div",3),v.Pc(2,"h2",4),v.Ad(3),v.Zc(4,"translate"),v.Oc(),v.Kc(5,"p",5),v.Zc(6,"translate"),v.Pc(7,"div",6),v.yd(8,X,20,16,"div",7),v.Oc(),v.Oc(),v.Pc(9,"div",8),v.Pc(10,"button",9),v.Wc("click",(function(){return v.sd(n),v.Yc().onSubmit()})),v.Zc(11,"async"),v.Ad(12),v.Zc(13,"translate"),v.Oc(),v.Pc(14,"button",10),v.Ad(15),v.Zc(16,"translate"),v.Oc(),v.Oc(),v.Oc()}if(2&t){var r=v.Yc();v.fd("formGroup",r.settingForm),v.wc(3),v.Bd(v.ad(4,8,"setting.title")),v.wc(2),v.fd("innerHTML",v.ad(6,10,"setting.read"),v.td),v.wc(3),v.fd("ngForOf",r.getProfileFormKeys()),v.wc(2),v.fd("disabled",v.ad(11,12,r.isLoading)),v.wc(2),v.Bd(v.ad(13,14,"setting.next")),v.wc(2),v.fd("routerLink",r.environment.BASE_URL),v.wc(1),v.Bd(v.ad(16,16,"setting.prev"))}}var z=function(){function n(e,r,o,i,c,a,s){t(this,n),this.formBuilder=e,this.store=r,this.utilService=o,this.actionService=i,this.masterService=c,this.translate=a,this.router=s,this.printers=p.b.Util.Printer.printers,this.connectionType=p.b.Util.Printer.ConnectionType,this.viewType=p.b.Util.ViewType,this.environment=Object(f.a)(),this.SearchCountryField=u.e,this.TooltipLabel=u.f,this.CountryISO=u.a}var r,o,i;return r=n,(o=[{key:"ngOnInit",value:function(){return b(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.user=this.store.pipe(Object(d.m)(h.i)),this.error=this.store.pipe(Object(d.m)(h.b)),this.isLoading=this.store.pipe(Object(d.m)(h.c)),this.posList=[],this.theaters=[],t.prev=1,t.next=4,this.masterService.getTheaters();case 4:return this.theaters=t.sent,t.next=7,this.createSettlingForm();case 7:t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),console.error(t.t0),this.router.navigate(["/error"]);case 12:setTimeout((function(){if(void 0!==e.intlTelInput){var t=e.intlTelInput.allCountries.find((function(t){return t.iso2===u.a.Japan}));void 0!==t&&(t.placeHolder=e.translate.instant("form.placeholder.telephone"))}}),0);case 13:case"end":return t.stop()}}),t,this,[[1,9]])})))}},{key:"createSettlingForm",value:function(){return b(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,r,o,i=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.environment.PROFILE,this.settingForm=this.formBuilder.group({theaterBranchCode:["",[l.s.required]],posId:[""],printerType:[p.b.Util.Printer.ConnectionType.None],printerIpAddress:[""],drawer:[!1]}),e.forEach((function(t){var e=[];void 0!==t.required&&t.required&&e.push(l.s.required),void 0!==t.maxLength&&e.push(l.s.maxLength(t.maxLength)),void 0!==t.minLength&&e.push(l.s.minLength(t.minLength)),void 0!==t.pattern&&e.push(l.s.pattern(t.pattern)),"email"===t.key&&e.push(l.s.email),i.settingForm.addControl(t.key,new l.c(t.value,e))})),t.next=4,this.actionService.user.getData();case 4:if(void 0!==(n=t.sent).theater&&(this.settingForm.controls.theaterBranchCode.setValue(n.theater.branchCode),this.changePosList()),void 0!==n.pos&&this.settingForm.controls.posId.setValue(n.pos.id),void 0===(r=n.customerContact)){t.next=13;break}if(Object.keys(r).forEach((function(t){var e=r[t];void 0!==e&&void 0!==i.settingForm.controls[t]&&("telephone"!==t?i.settingForm.controls[t].setValue(e):i.settingForm.controls.telephone.setValue((new g.a).transform(e)))})),void 0!==(o=r.additionalProperty)){t.next=12;break}return t.abrupt("return");case 12:o.forEach((function(t){var e="additionalProperty."+t.name,n=t.value;void 0!==n&&void 0!==i.settingForm.controls[e]&&i.settingForm.controls[e].setValue(n)}));case 13:void 0!==n.printer&&(this.settingForm.controls.printerType.setValue(n.printer.connectionType),this.settingForm.controls.printerIpAddress.setValue(n.printer.ipAddress)),this.settingForm.controls.drawer.setValue(void 0!==n.drawer&&n.drawer?"1":"0");case 14:case"end":return t.stop()}}),t,this)})))}},{key:"changePosList",value:function(){this.settingForm.controls.posId.setValue("");var t=this.settingForm.controls.theaterBranchCode.value;if(""!==t){var e=this.theaters.find((function(e){return e.branchCode===t}));this.posList=void 0!==e?void 0===e.hasPOS?[]:e.hasPOS:[]}else this.posList=[]}},{key:"onSubmit",value:function(){return b(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,r,o,i,c=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Object.keys(this.settingForm.controls).forEach((function(t){c.settingForm.controls[t].markAsTouched()})),!this.settingForm.invalid){t.next=4;break}this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.validation")}),t.next=15;break;case 4:if(t.prev=4,e=this.settingForm.controls.theaterBranchCode.value,n=this.settingForm.controls.posId.value,void 0!==(r=this.theaters.find((function(t){return t.branchCode===e})))){t.next=8;break}throw new Error("theater not found").message;case 8:o=void 0===r.hasPOS?r.hasPOS:r.hasPOS.find((function(t){return t.id===n})),i=[],Object.keys(this.settingForm.controls).forEach((function(t){/additionalProperty/.test(t)&&i.push({name:t.replace("additionalProperty.",""),value:c.settingForm.controls[t].value})})),this.actionService.user.updateAll({pos:o,theater:r,customerContact:{familyName:void 0===this.settingForm.controls.familyName?void 0:this.settingForm.controls.familyName.value,givenName:void 0===this.settingForm.controls.givenName?void 0:this.settingForm.controls.givenName.value,email:void 0===this.settingForm.controls.email?void 0:this.settingForm.controls.email.value,telephone:void 0===this.settingForm.controls.telephone?void 0:this.settingForm.controls.telephone.value.e164Number,age:void 0===this.settingForm.controls.age?void 0:this.settingForm.controls.age.value,address:void 0===this.settingForm.controls.address?void 0:this.settingForm.controls.address.value,gender:void 0===this.settingForm.controls.gender?void 0:this.settingForm.controls.gender.value,additionalProperty:i},printer:{ipAddress:this.settingForm.controls.printerIpAddress.value,connectionType:this.settingForm.controls.printerType.value},drawer:"0"!==this.settingForm.controls.drawer.value}),this.utilService.openAlert({title:this.translate.instant("common.complete"),body:this.translate.instant("setting.alert.success")}),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(4),console.error(t.t0);case 15:case"end":return t.stop()}}),t,this,[[4,12]])})))}},{key:"print",value:function(){return b(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value},t.prev=1,t.next=4,this.actionService.order.print({orders:[],printer:e});case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.error(t.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:'\n                <p class="mb-4">'.concat(this.translate.instant("setting.alert.print"),'</p>\n                    <div class="p-3 bg-light-gray select-text">\n                    <code>').concat(JSON.stringify(t.t0),"</code>\n                </div>")});case 9:case"end":return t.stop()}}),t,this,[[1,6]])})))}},{key:"openDrawer",value:function(){return b(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value},t.prev=1,t.next=4,this.actionService.order.openDrawer({printer:e});case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.error(t.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:'\n                <p class="mb-4">'.concat(this.translate.instant("setting.alert.drawer"),'</p>\n                    <div class="p-3 bg-light-gray select-text">\n                    <code>').concat(JSON.stringify(t.t0),"</code>\n                </div>")});case 9:case"end":return t.stop()}}),t,this,[[1,6]])})))}},{key:"changePrinterType",value:function(){this.settingForm.controls.printerType.value===p.b.Util.Printer.ConnectionType.StarBluetooth&&this.settingForm.controls.printerIpAddress.setValue(this.translate.instant("setting.starBluetoothAddress"))}},{key:"isRequired",value:function(t){return"theaterBranchCode"===t||void 0!==this.environment.PROFILE.find((function(e){return e.key===t&&e.required}))}},{key:"getProfileFormKeys",value:function(){return Object.keys(this.settingForm.controls)}},{key:"getAdditionalProperty",value:function(t){return this.environment.PROFILE.find((function(e){return/additionalProperty/.test(e.key)&&e.key===t}))}}])&&e(r.prototype,o),i&&e(r,i),n}();z.\u0275fac=function(t){return new(t||z)(v.Jc(l.b),v.Jc(d.b),v.Jc(m.f),v.Jc(m.a),v.Jc(m.d),v.Jc(y.d),v.Jc(a.b))},z.\u0275cmp=v.Dc({type:z,selectors:[["app-setting"]],viewQuery:function(t,e){var n;1&t&&v.Gd(F,!0),2&t&&v.od(n=v.Xc())&&(e.intlTelInput=n.first)},decls:2,vars:1,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[3,"formGroup",4,"ngIf"],[3,"formGroup"],[1,"mb-4"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"p-3","bg-white"],["class","form-group row",4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","submit",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"disabled","click"],["type","button",1,"btn","btn-outline-primary","btn-block","py-3",3,"routerLink"],[1,"form-group","row"],[1,"col-md-4","py-2","text-md-right"],[1,"d-inline-flex","align-items-center"],[4,"ngIf"],["class","badge badge-danger ml-2",4,"ngIf"],[1,"col-md-8"],["type","text","class","form-control",3,"formControlName","id","placeholder",4,"ngIf"],["class","form-control",3,"formControlName","change",4,"ngIf"],["class","form-control",3,"formControlName",4,"ngIf"],["class","form-control",3,"formControlName","id",4,"ngIf"],["type","email","class","form-control",3,"formControlName","id","placeholder",4,"ngIf"],["inputId","telephone","name","telephone","formControlName","telephone",3,"preferredCountries","enableAutoCountrySelect","enablePlaceholder","searchCountryFlag","searchCountryField","selectFirstCountry","selectedCountryISO","maxLength","tooltipField","phoneValidation","separateDialCode",4,"ngIf"],["class","form-control","placeholder","",3,"formControlName","id",4,"ngIf"],["class","mt-2",4,"ngIf"],["class","text-small mt-2",4,"ngIf"],[1,"badge","badge-danger","ml-2"],["type","text",1,"form-control",3,"formControlName","id","placeholder"],[1,"form-control",3,"formControlName","change"],["value",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"form-control",3,"formControlName"],[1,"form-control",3,"formControlName","id"],["value","0"],["value","1"],["type","email",1,"form-control",3,"formControlName","id","placeholder"],["inputId","telephone","name","telephone","formControlName","telephone",3,"preferredCountries","enableAutoCountrySelect","enablePlaceholder","searchCountryFlag","searchCountryField","selectFirstCountry","selectedCountryISO","maxLength","tooltipField","phoneValidation","separateDialCode"],["intlTelInput",""],["value","man"],["value","woman"],["placeholder","",1,"form-control",3,"formControlName","id"],[1,"mt-2"],["class","text-danger",4,"ngIf"],[1,"text-danger"],["type","button",1,"btn","btn-sm","btn-primary","py-2","mt-2",3,"disabled","click"],[1,"text-small","mt-2"]],template:function(t,e){1&t&&(v.Pc(0,"div",0),v.yd(1,_,17,18,"form",1),v.Oc()),2&t&&(v.wc(1),v.fd("ngIf",e.settingForm))},directives:[i.l,l.u,l.l,l.e,i.k,a.c,l.a,l.k,l.d,u.b,l.r,l.o,l.t,u.c],pipes:[y.c,i.b,w.a],styles:[""]});var tt=[{path:"",component:s.a,children:[{path:"",component:z}]}],et=function e(){t(this,e)};et.\u0275mod=v.Hc({type:et}),et.\u0275inj=v.Gc({factory:function(t){return new(t||et)},imports:[[a.d.forChild(tt)],a.d]});var nt=function e(){t(this,e)};nt.\u0275mod=v.Hc({type:nt}),nt.\u0275inj=v.Gc({factory:function(t){return new(t||nt)},imports:[[i.c,et,c.a]]})}}])}();