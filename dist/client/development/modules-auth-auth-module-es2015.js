(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-auth-auth-module"],{

/***/ "./app/modules/auth/auth-routing.module.ts":
/*!*************************************************!*\
  !*** ./app/modules/auth/auth-routing.module.ts ***!
  \*************************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _canActivates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../canActivates */ "./app/canActivates/index.ts");
/* harmony import */ var _components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pages/auth-index/auth-index.component */ "./app/modules/auth/components/pages/auth-index/auth-index.component.ts");
/* harmony import */ var _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/pages/auth-signin/auth-signin.component */ "./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts");
/* harmony import */ var _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pages/auth-signout/auth-signout.component */ "./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts");








const routes = [
    {
        path: '',
        children: [
            { path: '', component: _components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_3__["AuthIndexComponent"] },
            { path: 'signin', canActivate: [_canActivates__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]], component: _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_4__["AuthSigninComponent"] },
            { path: 'signout', component: _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_5__["AuthSignoutComponent"] }
        ]
    }
];
class AuthRoutingModule {
}
AuthRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AuthRoutingModule });
AuthRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./app/modules/auth/auth.module.ts":
/*!*****************************************!*\
  !*** ./app/modules/auth/auth.module.ts ***!
  \*****************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./app/modules/shared/shared.module.ts");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-routing.module */ "./app/modules/auth/auth-routing.module.ts");
/* harmony import */ var _components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/pages/auth-index/auth-index.component */ "./app/modules/auth/components/pages/auth-index/auth-index.component.ts");
/* harmony import */ var _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pages/auth-signin/auth-signin.component */ "./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts");
/* harmony import */ var _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pages/auth-signout/auth-signout.component */ "./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts");








class AuthModule {
}
AuthModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AuthModule });
AuthModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_3__["AuthRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AuthModule, { declarations: [_components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_4__["AuthIndexComponent"],
        _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_5__["AuthSigninComponent"],
        _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_6__["AuthSignoutComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _auth_routing_module__WEBPACK_IMPORTED_MODULE_3__["AuthRoutingModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AuthModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_4__["AuthIndexComponent"],
                    _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_5__["AuthSigninComponent"],
                    _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_6__["AuthSignoutComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    _auth_routing_module__WEBPACK_IMPORTED_MODULE_3__["AuthRoutingModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./app/modules/auth/components/pages/auth-index/auth-index.component.ts":
/*!******************************************************************************!*\
  !*** ./app/modules/auth/components/pages/auth-index/auth-index.component.ts ***!
  \******************************************************************************/
/*! exports provided: AuthIndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthIndexComponent", function() { return AuthIndexComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../environments/environment */ "./environments/environment.ts");
/* harmony import */ var _services_cinerino_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/cinerino.service */ "./app/services/cinerino.service.ts");
/* harmony import */ var _shared_components_parts_loading_loading_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/components/parts/loading/loading.component */ "./app/modules/shared/components/parts/loading/loading.component.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








class AuthIndexComponent {
    constructor(cinerino, router) {
        this.cinerino = cinerino;
        this.router = router;
        this.environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["getEnvironment"])();
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.cinerino.getServices();
                this.router.navigate([this.environment.BASE_URL]);
            }
            catch (error) {
                yield this.cinerino.signIn();
            }
        });
    }
}
AuthIndexComponent.ɵfac = function AuthIndexComponent_Factory(t) { return new (t || AuthIndexComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_cinerino_service__WEBPACK_IMPORTED_MODULE_3__["CinerinoService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
AuthIndexComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthIndexComponent, selectors: [["app-auth-index"]], decls: 1, vars: 1, consts: [["process", "process.authAction.CheckLogin", 3, "isLoading"]], template: function AuthIndexComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-loading", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isLoading", true);
    } }, directives: [_shared_components_parts_loading_loading_component__WEBPACK_IMPORTED_MODULE_4__["LoadingComponent"]], styles: [""] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthIndexComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-auth-index',
                templateUrl: './auth-index.component.html',
                styleUrls: ['./auth-index.component.scss']
            }]
    }], function () { return [{ type: _services_cinerino_service__WEBPACK_IMPORTED_MODULE_3__["CinerinoService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts":
/*!********************************************************************************!*\
  !*** ./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts ***!
  \********************************************************************************/
/*! exports provided: AuthSigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthSigninComponent", function() { return AuthSigninComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services */ "./app/services/index.ts");
/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../store/reducers */ "./app/store/reducers/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _shared_components_parts_loading_loading_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/components/parts/loading/loading.component */ "./app/modules/shared/components/parts/loading/loading.component.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









function AuthSigninComponent_div_0_li_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u9078\u629E");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", project_r2.logo, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", project_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](project_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", "/?projectId=" + project_r2.id, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function AuthSigninComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u9078\u629E");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AuthSigninComponent_div_0_li_6_Template, 10, 4, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AuthSigninComponent_div_0_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.signOut(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u623B\u308B");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var tmp_0_0 = null;
    const currVal_0 = (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 1, ctx_r0.master)) == null ? null : tmp_0_0.projects;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", currVal_0);
} }
class AuthSigninComponent {
    constructor(store, masterService, utilService, cinerinoService) {
        this.store = store;
        this.masterService = masterService;
        this.utilService = utilService;
        this.cinerinoService = cinerinoService;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_3__["getLoading"]));
            this.master = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_3__["getMaster"]));
            this.projects = [];
            yield this.masterService.getProjects();
            this.utilService.loadStart({ process: 'load' });
            const masterData = yield this.masterService.getData();
            const projects = masterData.projects;
            if (projects.length === 1) {
                // プロジェクトが一つの場合自動遷移
                location.href = `/?projectId=${projects[0].id}`;
                return;
            }
            this.utilService.loadEnd();
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.cinerinoService.getServices();
                yield this.cinerinoService.signOut();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
AuthSigninComponent.ɵfac = function AuthSigninComponent_Factory(t) { return new (t || AuthSigninComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__["MasterService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"])); };
AuthSigninComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthSigninComponent, selectors: [["app-auth-signin"]], decls: 4, vars: 6, consts: [["class", "contents-width mx-auto px-3 py-5", 4, "ngIf"], ["process", "process.masterAction.GetProjects", 3, "isLoading"], [1, "contents-width", "mx-auto", "px-3", "py-5"], [1, "text-large", "mb-4", "text-center", "font-weight-bold"], [1, "mb-4", "text-md-center"], [1, "d-md-flex", "flex-wrap", "mb-4"], ["class", "my-md-2 mb-3", 4, "ngFor", "ngForOf"], [1, "buttons", "mx-auto", "text-center"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-block", "py-3", 3, "click"], [1, "my-md-2", "mb-3"], [1, "card", "mx-md-2", "h-100"], [1, "card-body"], [1, "d-flex", "align-items-center", "mb-4"], [1, "mr-2"], [1, "logo", 3, "src", "alt"], [1, "font-weight-bold"], [1, "btn", "btn-primary", "btn-block", "py-3", 3, "href"]], template: function AuthSigninComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AuthSigninComponent_div_0_Template, 11, 3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-loading", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        var tmp_0_0 = null;
        const currVal_0 = ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 2, ctx.master)) == null ? null : tmp_0_0.projects.length) > 0;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", currVal_0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isLoading", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 4, ctx.isLoading));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _shared_components_parts_loading_loading_component__WEBPACK_IMPORTED_MODULE_5__["LoadingComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: [".logo[_ngcontent-%COMP%] {\n  width: 3rem;\n}\n@media (max-width: 767.98px) {\n  .logo[_ngcontent-%COMP%] {\n    width: 2rem;\n  }\n}\n.text-overflow[_ngcontent-%COMP%] {\n  overflow: hidden;\n  white-space: nowrap;\n  width: 100%;\n  text-overflow: ellipsis;\n}\nli[_ngcontent-%COMP%] {\n  width: 33%;\n}\n@media (max-width: 767.98px) {\n  li[_ngcontent-%COMP%] {\n    width: auto;\n  }\n}\n.btn-primary.disabled[_ngcontent-%COMP%] {\n  opacity: 1 !important;\n  background-color: #666 !important;\n  border-color: #666 !important;\n  color: #EEE !important;\n}"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthSigninComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-auth-signin',
                templateUrl: './auth-signin.component.html',
                styleUrls: ['./auth-signin.component.scss']
            }]
    }], function () { return [{ type: _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"] }, { type: _services__WEBPACK_IMPORTED_MODULE_2__["MasterService"] }, { type: _services__WEBPACK_IMPORTED_MODULE_2__["UtilService"] }, { type: _services__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"] }]; }, null); })();


/***/ }),

/***/ "./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts":
/*!**********************************************************************************!*\
  !*** ./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts ***!
  \**********************************************************************************/
/*! exports provided: AuthSignoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthSignoutComponent", function() { return AuthSignoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services */ "./app/services/index.ts");
/* harmony import */ var _shared_components_parts_loading_loading_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/components/parts/loading/loading.component */ "./app/modules/shared/components/parts/loading/loading.component.ts");







class AuthSignoutComponent {
    constructor(router, actionService) {
        this.router = router;
        this.actionService = actionService;
    }
    ngOnInit() {
        this.actionService.order.delete();
        this.actionService.purchase.delete();
        this.router.navigate(['/']);
    }
    selectProject() {
    }
}
AuthSignoutComponent.ɵfac = function AuthSignoutComponent_Factory(t) { return new (t || AuthSignoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_2__["ActionService"])); };
AuthSignoutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthSignoutComponent, selectors: [["app-auth-signout"]], decls: 1, vars: 1, consts: [["process", "process.authAction.Logout", 3, "isLoading"]], template: function AuthSignoutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-loading", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isLoading", true);
    } }, directives: [_shared_components_parts_loading_loading_component__WEBPACK_IMPORTED_MODULE_3__["LoadingComponent"]], styles: [""] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthSignoutComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-auth-signout',
                templateUrl: './auth-signout.component.html',
                styleUrls: ['./auth-signout.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _services__WEBPACK_IMPORTED_MODULE_2__["ActionService"] }]; }, null); })();


/***/ })

}]);