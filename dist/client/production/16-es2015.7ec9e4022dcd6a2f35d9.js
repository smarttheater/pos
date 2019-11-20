(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"744H":function(t,e,n){"use strict";n.r(e),e.default='<div class="contents-width mx-auto px-3 py-5">\n    <form *ngIf="settingForm" [formGroup]="settingForm">\n        <div class="mb-4">\n            <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'setting.title\' | translate }}</h2>\n            <p class="mb-4 text-md-center" [innerHTML]="\'setting.read\' | translate"></p>\n            <div class="p-3 bg-white">\n\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.theater\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="sellerBranchCode" (change)="changePosList()">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let theater of (master | async).sellers"\n                                    [value]="theater.location.branchCode">{{\n                                    theater.name.ja }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.sellerBranchCode.invalid && settingForm.controls.sellerBranchCode.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.sellerBranchCode.errors.required" class="text-danger">\n                                    {{ \'form.validation.unselected\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.pos\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="posId">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let pos of posList" [value]="pos.id">{{ pos.name }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.posId.invalid && settingForm.controls.posId.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.posId.errors.required" class="text-danger">\n                                    {{ \'form.validation.unselected\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.familyName\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="familyName" placeholder="\u30e2\u30fc\u30b7\u30e7\u30f3">\n                            <div *ngIf="settingForm.controls.familyName.invalid && settingForm.controls.familyName.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.familyName.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.familyName.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.familyName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.familyName.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.fullKana\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.givenName\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="givenName" placeholder="\u30d4\u30af\u30c1\u30e3\u30fc">\n                            <div *ngIf="settingForm.controls.givenName.invalid && settingForm.controls.givenName.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.givenName.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.givenName.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.givenName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.givenName.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.fullKana\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.email\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="email" class="form-control" formControlName="email"\n                                placeholder="motionpicture@example.jp">\n                            <div *ngIf="settingForm.controls.email.invalid && settingForm.controls.email.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.email.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.email.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.email.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.email.errors.email" class="text-danger">\n                                    {{ \'form.validation.email\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.telephone\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="tel" class="form-control" formControlName="telephone" placeholder="0362778824">\n                            <div *ngIf="settingForm.controls.telephone.invalid && settingForm.controls.telephone.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.telephone.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.telephone.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.telephone.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.telephone.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.telephone.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.telephone.errors.telephone" class="text-danger">\n                                    {{ \'form.validation.telephone\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.printer\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="printerType" (change)="changePrinterType()">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let printer of printers" [value]="printer.connectionType">\n                                    {{ printer.name | translate }}</option>\n                            </select>\n                            <button\n                                *ngIf="this.settingForm.controls.printerType.value && this.settingForm.controls.printerType.value !== connectionType.None"\n                                type="button" class="btn btn-sm btn-primary py-2 mt-2"\n                                (click)="print()">{{ \'setting.testPrinting\' | translate }}</button>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.printerIpAddress\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="printerIpAddress"\n                                placeholder="0.0.0.0">\n                            <div *ngIf="settingForm.controls.printerIpAddress.invalid && settingForm.controls.printerIpAddress.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.printerIpAddress.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                            </div>\n                            <p class="text-small mt-2">\n                                {{ \'setting.printerIpAddressDescription\' | translate }}\n                            </p>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="environment.SETTING_DEVELOP_OPTION">\n                    <div class="form-group">\n                        <div class="row align-items-center">\n                            <p class="col-md-4 py-2 text-md-right">{{ \'setting.isPurchaseCart\' | translate }}</p>\n                            <div class="col-md-8">\n                                <select type="text" class="form-control" formControlName="isPurchaseCart"\n                                    id="isPurchaseCart" placeholder="">\n                                    <option value="0">{{ \'common.off\' | translate }}</option>\n                                    <option value="1">{{ \'common.on\' | translate }}</option>\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="row align-items-center">\n                            <p class="col-md-4 py-2 text-md-right">{{ \'setting.viewType\' | translate }}</p>\n                            <div class="col-md-8">\n                                <select class="form-control" id="viewType" formControlName="viewType">\n                                    <option [value]="viewType.Cinema">{{ viewType.Cinema }}</option>\n                                    <option [value]="viewType.Event">{{ viewType.Event }}</option>\n                                </select>\n                                <div *ngIf="settingForm.controls.viewType.invalid && settingForm.controls.viewType.touched"\n                                    class="mt-2">\n                                    <p *ngIf="settingForm.controls.viewType.errors.required" class="text-danger">\n                                        {{ \'form.validation.required\' | translate }}</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class="buttons mx-auto text-center">\n            <button type="submit" [disabled]="isLoading | async" class="btn btn-primary btn-block py-3 mb-3"\n                (click)="onSubmit()">{{ \'setting.next\' | translate }}</button>\n            <button type="button" class="btn btn-link"\n                [routerLink]="environment.BASE_URL">{{ \'setting.prev\' | translate }}</button>\n        </div>\n    </form>\n</div>'},AL2A:function(t,e,n){"use strict";n.r(e);var r=n("An66"),o=n("kZht"),s=n("DSWM"),i=n("3kIJ"),l=n("1VvW"),a=n("ofez"),c=n("aDqW"),d=n("WxsR"),m=n("PIN6"),p=n("i7xV"),g=n("cHUu"),v=n("mOXJ"),u=n("UH/6"),h=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i},f=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},y=function(t,e,n,r){return new(n||(n=Promise))(function(o,s){function i(t){try{a(r.next(t))}catch(e){s(e)}}function l(t){try{a(r.throw(t))}catch(e){s(e)}}function a(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(i,l)}a((r=r.apply(t,e||[])).next())})},F=function(t){return t&&t.__esModule?t:{default:t}};let b=class{constructor(t,e,n,r,o,s,i,l){this.formBuilder=t,this.store=e,this.utilService=n,this.userService=r,this.masterService=o,this.orderService=s,this.translate=i,this.router=l,this.printers=p.h,this.connectionType=p.g,this.viewType=p.f,this.environment=m.a}ngOnInit(){return y(this,void 0,void 0,function*(){this.user=this.store.pipe(Object(a.i)(v.j)),this.master=this.store.pipe(Object(a.i)(v.d)),this.error=this.store.pipe(Object(a.i)(v.b)),this.isLoading=this.store.pipe(Object(a.i)(v.c)),this.posList=[];try{yield this.masterService.getSellers(),yield this.createSettlingForm()}catch(t){console.error(t),this.router.navigate(["/error"])}})}createSettlingForm(){return y(this,void 0,void 0,function*(){this.settingForm=this.formBuilder.group({sellerBranchCode:["",[i.f.required]],posId:["",[i.f.required]],familyName:["",[i.f.required,i.f.maxLength(12),i.f.pattern(/^[\u30a1-\u30f6\u30fc]+$/)]],givenName:["",[i.f.required,i.f.maxLength(12),i.f.pattern(/^[\u30a1-\u30f6\u30fc]+$/)]],email:["",[i.f.required,i.f.maxLength(50),i.f.email]],telephone:["",[i.f.required,i.f.maxLength(15),i.f.minLength(9),t=>{const e=t.root.get("telephone");if(null!==e){if(""===e.value)return null;const t=new RegExp(/^\+/).test(e.value)?d.c(e.value):d.c(e.value,"JP");if(void 0===t.phone)return{telephone:!0};if(!d.b(t))return{telephone:!0}}return null}]],printerType:[""],printerIpAddress:[""],isPurchaseCart:["0",[i.f.required,i.f.pattern(/^[0-9]+$/)]],viewType:["",[i.f.required]]});const t=yield this.userService.getData();void 0!==t.seller&&void 0!==t.seller.location&&this.settingForm.controls.sellerBranchCode.setValue(t.seller.location.branchCode),void 0!==t.pos&&(this.changePosList(),this.settingForm.controls.posId.setValue(t.pos.id)),void 0!==t.customerContact&&void 0!==t.customerContact.familyName&&void 0!==t.customerContact.givenName&&void 0!==t.customerContact.email&&void 0!==t.customerContact.telephone&&(this.settingForm.controls.familyName.setValue(t.customerContact.familyName),this.settingForm.controls.givenName.setValue(t.customerContact.givenName),this.settingForm.controls.email.setValue(t.customerContact.email),this.settingForm.controls.telephone.setValue((new u.a).transform(t.customerContact.telephone))),void 0!==t.printer&&(this.settingForm.controls.printerType.setValue(t.printer.connectionType),this.settingForm.controls.printerIpAddress.setValue(t.printer.ipAddress)),this.settingForm.controls.isPurchaseCart.setValue(t.isPurchaseCart?"1":"0"),this.settingForm.controls.viewType.setValue(t.viewType)})}changePosList(){this.settingForm.controls.posId.setValue("");const t=this.settingForm.controls.sellerBranchCode.value;""!==t?this.master.subscribe(e=>{const n=e.sellers.find(e=>void 0!==e.location&&e.location.branchCode===t);this.posList=void 0!==n?void 0===n.hasPOS?[]:n.hasPOS:[]}).unsubscribe():this.posList=[]}onSubmit(){Object.keys(this.settingForm.controls).forEach(t=>{this.settingForm.controls[t].markAsTouched()}),this.settingForm.invalid?this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.validation")}):this.master.subscribe(t=>{const e=t.sellers.find(t=>void 0!==t.location&&t.location.branchCode===this.settingForm.controls.sellerBranchCode.value);if(void 0===e||void 0===e.hasPOS)return;const n=e.hasPOS.find(t=>t.id===this.settingForm.controls.posId.value);void 0!==n&&(this.userService.updateAll({seller:e,pos:n,customerContact:{familyName:this.settingForm.controls.familyName.value,givenName:this.settingForm.controls.givenName.value,email:this.settingForm.controls.email.value,telephone:this.settingForm.controls.telephone.value},printer:{ipAddress:this.settingForm.controls.printerIpAddress.value,connectionType:this.settingForm.controls.printerType.value},isPurchaseCart:"1"===this.settingForm.controls.isPurchaseCart.value,viewType:this.settingForm.controls.viewType.value}),this.utilService.openAlert({title:this.translate.instant("common.complete"),body:this.translate.instant("setting.alert.success")}))}).unsubscribe()}print(){return y(this,void 0,void 0,function*(){const t={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value};try{yield this.orderService.print({orders:[],printer:t})}catch(e){console.error(e),this.utilService.openAlert({title:this.translate.instant("common.error"),body:`\n                <p class="mb-4">${this.translate.instant("setting.alert.print")}</p>\n                    <div class="p-3 bg-light-gray select-text">\n                    <code>${e}</code>\n                </div>`})}})}changePrinterType(){this.settingForm.controls.printerType.value===p.g.StarBluetooth&&this.settingForm.controls.printerIpAddress.setValue(this.translate.instant("setting.starBluetoothAddress"))}};b.ctorParameters=()=>[{type:i.a},{type:a.b},{type:g.j},{type:g.i},{type:g.c},{type:g.d},{type:c.c},{type:l.b}],b=h([Object(o.n)({selector:"app-setting",template:F(n("744H")).default,styles:[F(n("uSBn")).default]}),f("design:paramtypes",[i.a,a.b,g.j,g.i,g.c,g.d,c.c,l.b])],b);var x=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i};const I=[{path:"",component:n("RRjC").a,children:[{path:"",component:b}]}];let C=class{};C=x([Object(o.I)({imports:[l.c.forChild(I)],exports:[l.c]})],C),n.d(e,"SettingModule",function(){return w});let w=class{};w=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}([Object(o.I)({declarations:[b],imports:[r.b,C,s.a]})],w)},uSBn:function(t,e,n){"use strict";n.r(e),e.default=""}}]);