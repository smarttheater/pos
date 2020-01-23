(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"+NJH":function(t,e,n){"use strict";n.r(e),e.default='<app-loading [isLoading]="true" process="process.authAction.CheckLogin"></app-loading>'},"92n9":function(t,e,n){"use strict";n.r(e),e.default=".logo {\n  width: 3rem;\n}\n@media (max-width: 767.98px) {\n  .logo {\n    width: 2rem;\n  }\n}\n.text-overflow {\n  overflow: hidden;\n  white-space: nowrap;\n  width: 100%;\n  text-overflow: ellipsis;\n}\nli {\n  width: 33%;\n}\n@media (max-width: 767.98px) {\n  li {\n    width: auto;\n  }\n}\n.btn-primary.disabled {\n  opacity: 1 !important;\n  background-color: #666 !important;\n  border-color: #666 !important;\n  color: #EEE !important;\n}"},Sq0r:function(t,e,n){"use strict";n.r(e),e.default='<div *ngIf="projects.length > 0" class="contents-width mx-auto px-3 py-5">\n    <h2 class="text-large mb-4 text-center font-weight-bold">\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u9078\u629e</h2>\n    <p class="mb-4 text-md-center">\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002</p>\n\n    <ul class="d-md-flex flex-wrap mb-4">\n        <li *ngFor="let project of (master | async).projects" class="my-md-2 mb-3">\n            <div class="card mx-md-2 h-100">\n                <div class="card-body">\n                    <div class="d-flex align-items-center mb-4">\n                        <div class="mr-2"><img [src]="project.logo" class="logo" [alt]="project.name"></div>\n                        <p class="font-weight-bold">{{ project.name }}</p>\n                    </div>\n                    <a class="btn btn-primary btn-block" [href]="\'/?project=\' + getProject(project.id)?.projectName" [class.disabled]="!getProject(project.id)">\u9078\u629e</a>\n                </div>\n            </div>\n        </li>\n    </ul>\n\n    <div class="buttons mx-auto text-center">\n        <button type="button" class="btn btn-link" (click)="signOut()">\u623b\u308b</button>\n    </div>\n</div>\n\n<app-loading [isLoading]="isLoading | async" process="process.masterAction.GetProjects"></app-loading>'},bfiW:function(t,e,n){"use strict";n.r(e),e.default=""},hN61:function(t,e,n){"use strict";n.r(e),e.default=""},jycc:function(t,e,n){"use strict";n.r(e),e.default='<app-loading [isLoading]="true" process="process.authAction.Logout"></app-loading>'},k0tg:function(t,e,n){"use strict";n.r(e);var r=n("An66"),o=n("kZht"),c=n("DSWM"),i=n("1VvW"),s=n("unpb"),a=n("PIN6"),l=n("espW"),p=function(t,e,n,r){var o,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,n,i):o(e,n))||i);return c>3&&i&&Object.defineProperty(e,n,i),i},f=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},u=function(t,e,n,r){return new(n||(n=Promise))((function(o,c){function i(t){try{a(r.next(t))}catch(e){c(e)}}function s(t){try{a(r.throw(t))}catch(e){c(e)}}function a(t){t.done?o(t.value):new n((function(e){e(t.value)})).then(i,s)}a((r=r.apply(t,e||[])).next())}))},d=function(t){return t&&t.__esModule?t:{default:t}};let h=class{constructor(t,e){this.cinerino=t,this.router=e,this.environment=Object(a.a)()}ngOnInit(){return u(this,void 0,void 0,(function*(){try{yield this.cinerino.getServices(),this.router.navigate([this.environment.BASE_URL])}catch(t){yield this.cinerino.signIn()}}))}};h.ctorParameters=()=>[{type:l.a},{type:i.b}],h=p([Object(o.n)({selector:"app-auth-index",template:d(n("+NJH")).default,styles:[d(n("bfiW")).default]}),f("design:paramtypes",[l.a,i.b])],h);var g=n("ofez"),y=n("cHUu"),b=n("mOXJ"),m=function(t,e,n,r){var o,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,n,i):o(e,n))||i);return c>3&&i&&Object.defineProperty(e,n,i),i},v=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},j=function(t,e,n,r){return new(n||(n=Promise))((function(o,c){function i(t){try{a(r.next(t))}catch(e){c(e)}}function s(t){try{a(r.throw(t))}catch(e){c(e)}}function a(t){t.done?o(t.value):new n((function(e){e(t.value)})).then(i,s)}a((r=r.apply(t,e||[])).next())}))},w=function(t){return t&&t.__esModule?t:{default:t}};let O=class{constructor(t,e,n,r){this.store=t,this.masterService=e,this.utilService=n,this.cinerinoService=r}ngOnInit(){return j(this,void 0,void 0,(function*(){this.isLoading=this.store.pipe(Object(g.j)(b.c)),this.master=this.store.pipe(Object(g.j)(b.d)),this.projects=[],yield this.masterService.getProjects(),this.utilService.loadStart(),this.projects=yield this.utilService.postJson("/api/projects",{});const t=(yield this.masterService.getData()).projects.filter(t=>void 0!==this.getProject(t.id));1!==t.length?this.utilService.loadEnd():location.href=`/?project=${this.getProject(t[0].id).projectName}`}))}getProject(t){return this.projects.find(e=>e.projectId===t)}signOut(){return j(this,void 0,void 0,(function*(){try{yield this.cinerinoService.getServices(),yield this.cinerinoService.signOut()}catch(t){console.error(t)}}))}};O.ctorParameters=()=>[{type:g.b},{type:y.d},{type:y.k},{type:y.b}],O=m([Object(o.n)({selector:"app-auth-signin",template:w(n("Sq0r")).default,styles:[w(n("92n9")).default]}),v("design:paramtypes",[g.b,y.d,y.k,y.b])],O);var R=function(t,e,n,r){var o,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,n,i):o(e,n))||i);return c>3&&i&&Object.defineProperty(e,n,i),i},P=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},x=function(t){return t&&t.__esModule?t:{default:t}};let S=class{constructor(t,e,n){this.router=t,this.purchaseService=e,this.orderService=n}ngOnInit(){this.orderService.delete(),this.purchaseService.delete(),this.router.navigate(["/"])}selectProject(){}};S.ctorParameters=()=>[{type:i.b},{type:y.f},{type:y.e}],S=R([Object(o.n)({selector:"app-auth-signout",template:x(n("jycc")).default,styles:[x(n("hN61")).default]}),P("design:paramtypes",[i.b,y.f,y.e])],S);var k=function(t,e,n,r){var o,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,n,i):o(e,n))||i);return c>3&&i&&Object.defineProperty(e,n,i),i};const I=[{path:"",children:[{path:"",component:h},{path:"signin",canActivate:[s.a],component:O},{path:"signout",component:S}]}];let L=class{};L=k([Object(o.I)({imports:[i.c.forChild(I)],exports:[i.c]})],L),n.d(e,"AuthModule",(function(){return A}));let A=class{};A=function(t,e,n,r){var o,c=arguments.length,i=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,n,i):o(e,n))||i);return c>3&&i&&Object.defineProperty(e,n,i),i}([Object(o.I)({declarations:[h,O,S],imports:[r.b,L,c.a]})],A)}}]);