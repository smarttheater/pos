function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-auth-auth-module"], {
  /***/
  "../../node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-index/auth-index.component.html":
  /*!**********************************************************************************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-index/auth-index.component.html ***!
    \**********************************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsAppModulesAuthComponentsPagesAuthIndexAuthIndexComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-loading [isLoading]=\"true\" process=\"process.authAction.CheckLogin\"></app-loading>";
    /***/
  },

  /***/
  "../../node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-signin/auth-signin.component.html":
  /*!************************************************************************************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-signin/auth-signin.component.html ***!
    \************************************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsAppModulesAuthComponentsPagesAuthSigninAuthSigninComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div *ngIf=\"projects.length > 0\" class=\"contents-width mx-auto px-3 py-5\">\n    <h2 class=\"text-large mb-4 text-center font-weight-bold\">プロジェクト選択</h2>\n    <p class=\"mb-4 text-md-center\">プロジェクトを選択してください。</p>\n\n    <ul class=\"d-md-flex flex-wrap mb-4\">\n        <li *ngFor=\"let project of (master | async).projects\" class=\"my-md-2 mb-3\">\n            <div class=\"card mx-md-2 h-100\">\n                <div class=\"card-body\">\n                    <div class=\"d-flex align-items-center mb-4\">\n                        <div class=\"mr-2\"><img [src]=\"project.logo\" class=\"logo\" [alt]=\"project.name\"></div>\n                        <p class=\"font-weight-bold\">{{ project.name }}</p>\n                    </div>\n                    <a class=\"btn btn-primary btn-block py-3\" [href]=\"'/?projectId=' + project.id\" [class.disabled]=\"!getProject(project.id)\">選択</a>\n                </div>\n            </div>\n        </li>\n    </ul>\n\n    <div class=\"buttons mx-auto text-center\">\n        <button type=\"button\" class=\"btn btn-link\" (click)=\"signOut()\">戻る</button>\n    </div>\n</div>\n\n<app-loading [isLoading]=\"isLoading | async\" process=\"process.masterAction.GetProjects\"></app-loading>";
    /***/
  },

  /***/
  "../../node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-signout/auth-signout.component.html":
  /*!**************************************************************************************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-signout/auth-signout.component.html ***!
    \**************************************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsAppModulesAuthComponentsPagesAuthSignoutAuthSignoutComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-loading [isLoading]=\"true\" process=\"process.authAction.Logout\"></app-loading>";
    /***/
  },

  /***/
  "./app/modules/auth/auth-routing.module.ts":
  /*!*************************************************!*\
    !*** ./app/modules/auth/auth-routing.module.ts ***!
    \*************************************************/

  /*! exports provided: AuthRoutingModule */

  /***/
  function appModulesAuthAuthRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function () {
      return AuthRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _canActivates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../canActivates */
    "./app/canActivates/index.ts");
    /* harmony import */


    var _components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/pages/auth-index/auth-index.component */
    "./app/modules/auth/components/pages/auth-index/auth-index.component.ts");
    /* harmony import */


    var _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./components/pages/auth-signin/auth-signin.component */
    "./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts");
    /* harmony import */


    var _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./components/pages/auth-signout/auth-signout.component */
    "./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var routes = [{
      path: '',
      children: [{
        path: '',
        component: _components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_3__["AuthIndexComponent"]
      }, {
        path: 'signin',
        canActivate: [_canActivates__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]],
        component: _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_4__["AuthSigninComponent"]
      }, {
        path: 'signout',
        component: _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_5__["AuthSignoutComponent"]
      }]
    }];

    var AuthRoutingModule = function AuthRoutingModule() {
      _classCallCheck(this, AuthRoutingModule);
    };

    AuthRoutingModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })], AuthRoutingModule);
    /***/
  },

  /***/
  "./app/modules/auth/auth.module.ts":
  /*!*****************************************!*\
    !*** ./app/modules/auth/auth.module.ts ***!
    \*****************************************/

  /*! exports provided: AuthModule */

  /***/
  function appModulesAuthAuthModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthModule", function () {
      return AuthModule;
    });
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/common */
    "../../node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../shared/shared.module */
    "./app/modules/shared/shared.module.ts");
    /* harmony import */


    var _auth_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./auth-routing.module */
    "./app/modules/auth/auth-routing.module.ts");
    /* harmony import */


    var _components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./components/pages/auth-index/auth-index.component */
    "./app/modules/auth/components/pages/auth-index/auth-index.component.ts");
    /* harmony import */


    var _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./components/pages/auth-signin/auth-signin.component */
    "./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts");
    /* harmony import */


    var _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./components/pages/auth-signout/auth-signout.component */
    "./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var AuthModule = function AuthModule() {
      _classCallCheck(this, AuthModule);
    };

    AuthModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_components_pages_auth_index_auth_index_component__WEBPACK_IMPORTED_MODULE_4__["AuthIndexComponent"], _components_pages_auth_signin_auth_signin_component__WEBPACK_IMPORTED_MODULE_5__["AuthSigninComponent"], _components_pages_auth_signout_auth_signout_component__WEBPACK_IMPORTED_MODULE_6__["AuthSignoutComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _auth_routing_module__WEBPACK_IMPORTED_MODULE_3__["AuthRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]]
    })], AuthModule);
    /***/
  },

  /***/
  "./app/modules/auth/components/pages/auth-index/auth-index.component.scss":
  /*!********************************************************************************!*\
    !*** ./app/modules/auth/components/pages/auth-index/auth-index.component.scss ***!
    \********************************************************************************/

  /*! exports provided: default */

  /***/
  function appModulesAuthComponentsPagesAuthIndexAuthIndexComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY2xpZW50L2FwcC9tb2R1bGVzL2F1dGgvY29tcG9uZW50cy9wYWdlcy9hdXRoLWluZGV4L2F1dGgtaW5kZXguY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./app/modules/auth/components/pages/auth-index/auth-index.component.ts":
  /*!******************************************************************************!*\
    !*** ./app/modules/auth/components/pages/auth-index/auth-index.component.ts ***!
    \******************************************************************************/

  /*! exports provided: AuthIndexComponent */

  /***/
  function appModulesAuthComponentsPagesAuthIndexAuthIndexComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthIndexComponent", function () {
      return AuthIndexComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../../../../environments/environment */
    "./environments/environment.ts");
    /* harmony import */


    var _services_cinerino_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../../../../services/cinerino.service */
    "./app/services/cinerino.service.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : new P(function (resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var AuthIndexComponent =
    /*#__PURE__*/
    function () {
      function AuthIndexComponent(cinerino, router) {
        _classCallCheck(this, AuthIndexComponent);

        this.cinerino = cinerino;
        this.router = router;
        this.environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["getEnvironment"])();
      }

      _createClass(AuthIndexComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return this.cinerino.getServices();

                  case 3:
                    this.router.navigate([this.environment.BASE_URL]);
                    _context.next = 10;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    _context.next = 10;
                    return this.cinerino.signIn();

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[0, 6]]);
          }));
        }
      }]);

      return AuthIndexComponent;
    }();

    AuthIndexComponent.ctorParameters = function () {
      return [{
        type: _services_cinerino_service__WEBPACK_IMPORTED_MODULE_3__["CinerinoService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }];
    };

    AuthIndexComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-auth-index',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./auth-index.component.html */
      "../../node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-index/auth-index.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./auth-index.component.scss */
      "./app/modules/auth/components/pages/auth-index/auth-index.component.scss"))["default"]]
    }), __metadata("design:paramtypes", [_services_cinerino_service__WEBPACK_IMPORTED_MODULE_3__["CinerinoService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])], AuthIndexComponent);
    /***/
  },

  /***/
  "./app/modules/auth/components/pages/auth-signin/auth-signin.component.scss":
  /*!**********************************************************************************!*\
    !*** ./app/modules/auth/components/pages/auth-signin/auth-signin.component.scss ***!
    \**********************************************************************************/

  /*! exports provided: default */

  /***/
  function appModulesAuthComponentsPagesAuthSigninAuthSigninComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".logo {\n  width: 3rem;\n}\n@media (max-width: 767.98px) {\n  .logo {\n    width: 2rem;\n  }\n}\n.text-overflow {\n  overflow: hidden;\n  white-space: nowrap;\n  width: 100%;\n  text-overflow: ellipsis;\n}\nli {\n  width: 33%;\n}\n@media (max-width: 767.98px) {\n  li {\n    width: auto;\n  }\n}\n.btn-primary.disabled {\n  opacity: 1 !important;\n  background-color: #666 !important;\n  border-color: #666 !important;\n  color: #EEE !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvYXBwL21vZHVsZXMvYXV0aC9jb21wb25lbnRzL3BhZ2VzL2F1dGgtc2lnbmluL0M6XFxVc2Vyc1xcaGF0YWd1Y2hpXFxEZXNrdG9wXFx3b3Jrc3BhY2VcXENpbmVyaW5vXFxwb3Mvc3JjXFxjbGllbnRcXGFwcFxcbW9kdWxlc1xcYXV0aFxcY29tcG9uZW50c1xccGFnZXNcXGF1dGgtc2lnbmluXFxhdXRoLXNpZ25pbi5jb21wb25lbnQuc2NzcyIsInNyYy9jbGllbnQvYXBwL21vZHVsZXMvYXV0aC9jb21wb25lbnRzL3BhZ2VzL2F1dGgtc2lnbmluL2F1dGgtc2lnbmluLmNvbXBvbmVudC5zY3NzIiwic3JjL2NsaWVudC9hcHAvbW9kdWxlcy9hdXRoL2NvbXBvbmVudHMvcGFnZXMvYXV0aC1zaWduaW4vQzpcXFVzZXJzXFxoYXRhZ3VjaGlcXERlc2t0b3BcXHdvcmtzcGFjZVxcQ2luZXJpbm9cXHBvcy9ub2RlX21vZHVsZXNcXGJvb3RzdHJhcFxcc2Nzc1xcbWl4aW5zXFxfYnJlYWtwb2ludHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtFQUNJLFdBQUE7QUNISjtBQ3VFSTtFRnJFSjtJQUdRLFdBQUE7RUNETjtBQUNGO0FESUE7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0FDREo7QURLQTtFQUNJLFVBQUE7QUNGSjtBQ3VESTtFRnRESjtJQUdRLFdBQUE7RUNBTjtBQUNGO0FER0E7RUFDSSxxQkFBQTtFQUNBLGlDQUFBO0VBQ0EsNkJBQUE7RUFDQSxzQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9jbGllbnQvYXBwL21vZHVsZXMvYXV0aC9jb21wb25lbnRzL3BhZ2VzL2F1dGgtc2lnbmluL2F1dGgtc2lnbmluLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIm5vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnNcIjtcbkBpbXBvcnQgXCJub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzXCI7XG5AaW1wb3J0IFwibm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9zY3NzL21peGluc1wiO1xuXG4ubG9nbyB7XG4gICAgd2lkdGg6IDNyZW07XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKHNtKSB7XG4gICAgICAgIHdpZHRoOiAycmVtO1xuICAgIH1cbn1cblxuLnRleHQtb3ZlcmZsb3cge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuXG5saSB7XG4gICAgd2lkdGg6IDMzJTtcbiAgICBAaW5jbHVkZSBtZWRpYS1icmVha3BvaW50LWRvd24oc20pIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgfVxufVxuXG4uYnRuLXByaW1hcnkuZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjY2ICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjNjY2ICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICNFRUUgIWltcG9ydGFudDtcbn0iLCIubG9nbyB7XG4gIHdpZHRoOiAzcmVtO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG4gIC5sb2dvIHtcbiAgICB3aWR0aDogMnJlbTtcbiAgfVxufVxuXG4udGV4dC1vdmVyZmxvdyB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxubGkge1xuICB3aWR0aDogMzMlO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG4gIGxpIHtcbiAgICB3aWR0aDogYXV0bztcbiAgfVxufVxuXG4uYnRuLXByaW1hcnkuZGlzYWJsZWQge1xuICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2NjYgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNjY2ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjRUVFICFpbXBvcnRhbnQ7XG59IiwiLy8gQnJlYWtwb2ludCB2aWV3cG9ydCBzaXplcyBhbmQgbWVkaWEgcXVlcmllcy5cbi8vXG4vLyBCcmVha3BvaW50cyBhcmUgZGVmaW5lZCBhcyBhIG1hcCBvZiAobmFtZTogbWluaW11bSB3aWR0aCksIG9yZGVyIGZyb20gc21hbGwgdG8gbGFyZ2U6XG4vL1xuLy8gICAgKHhzOiAwLCBzbTogNTc2cHgsIG1kOiA3NjhweCwgbGc6IDk5MnB4LCB4bDogMTIwMHB4KVxuLy9cbi8vIFRoZSBtYXAgZGVmaW5lZCBpbiB0aGUgYCRncmlkLWJyZWFrcG9pbnRzYCBnbG9iYWwgdmFyaWFibGUgaXMgdXNlZCBhcyB0aGUgYCRicmVha3BvaW50c2AgYXJndW1lbnQgYnkgZGVmYXVsdC5cblxuLy8gTmFtZSBvZiB0aGUgbmV4dCBicmVha3BvaW50LCBvciBudWxsIGZvciB0aGUgbGFzdCBicmVha3BvaW50LlxuLy9cbi8vICAgID4+IGJyZWFrcG9pbnQtbmV4dChzbSlcbi8vICAgIG1kXG4vLyAgICA+PiBicmVha3BvaW50LW5leHQoc20sICh4czogMCwgc206IDU3NnB4LCBtZDogNzY4cHgsIGxnOiA5OTJweCwgeGw6IDEyMDBweCkpXG4vLyAgICBtZFxuLy8gICAgPj4gYnJlYWtwb2ludC1uZXh0KHNtLCAkYnJlYWtwb2ludC1uYW1lczogKHhzIHNtIG1kIGxnIHhsKSlcbi8vICAgIG1kXG5AZnVuY3Rpb24gYnJlYWtwb2ludC1uZXh0KCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzLCAkYnJlYWtwb2ludC1uYW1lczogbWFwLWtleXMoJGJyZWFrcG9pbnRzKSkge1xuICAkbjogaW5kZXgoJGJyZWFrcG9pbnQtbmFtZXMsICRuYW1lKTtcbiAgQHJldHVybiBpZigkbiAhPSBudWxsIGFuZCAkbiA8IGxlbmd0aCgkYnJlYWtwb2ludC1uYW1lcyksIG50aCgkYnJlYWtwb2ludC1uYW1lcywgJG4gKyAxKSwgbnVsbCk7XG59XG5cbi8vIE1pbmltdW0gYnJlYWtwb2ludCB3aWR0aC4gTnVsbCBmb3IgdGhlIHNtYWxsZXN0IChmaXJzdCkgYnJlYWtwb2ludC5cbi8vXG4vLyAgICA+PiBicmVha3BvaW50LW1pbihzbSwgKHhzOiAwLCBzbTogNTc2cHgsIG1kOiA3NjhweCwgbGc6IDk5MnB4LCB4bDogMTIwMHB4KSlcbi8vICAgIDU3NnB4XG5AZnVuY3Rpb24gYnJlYWtwb2ludC1taW4oJG5hbWUsICRicmVha3BvaW50czogJGdyaWQtYnJlYWtwb2ludHMpIHtcbiAgJG1pbjogbWFwLWdldCgkYnJlYWtwb2ludHMsICRuYW1lKTtcbiAgQHJldHVybiBpZigkbWluICE9IDAsICRtaW4sIG51bGwpO1xufVxuXG4vLyBNYXhpbXVtIGJyZWFrcG9pbnQgd2lkdGguIE51bGwgZm9yIHRoZSBsYXJnZXN0IChsYXN0KSBicmVha3BvaW50LlxuLy8gVGhlIG1heGltdW0gdmFsdWUgaXMgY2FsY3VsYXRlZCBhcyB0aGUgbWluaW11bSBvZiB0aGUgbmV4dCBvbmUgbGVzcyAwLjAycHhcbi8vIHRvIHdvcmsgYXJvdW5kIHRoZSBsaW1pdGF0aW9ucyBvZiBgbWluLWAgYW5kIGBtYXgtYCBwcmVmaXhlcyBhbmQgdmlld3BvcnRzIHdpdGggZnJhY3Rpb25hbCB3aWR0aHMuXG4vLyBTZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL21lZGlhcXVlcmllcy00LyNtcS1taW4tbWF4XG4vLyBVc2VzIDAuMDJweCByYXRoZXIgdGhhbiAwLjAxcHggdG8gd29yayBhcm91bmQgYSBjdXJyZW50IHJvdW5kaW5nIGJ1ZyBpbiBTYWZhcmkuXG4vLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3ODI2MVxuLy9cbi8vICAgID4+IGJyZWFrcG9pbnQtbWF4KHNtLCAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpKVxuLy8gICAgNzY3Ljk4cHhcbkBmdW5jdGlvbiBicmVha3BvaW50LW1heCgkbmFtZSwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbmV4dDogYnJlYWtwb2ludC1uZXh0KCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICBAcmV0dXJuIGlmKCRuZXh0LCBicmVha3BvaW50LW1pbigkbmV4dCwgJGJyZWFrcG9pbnRzKSAtIC4wMiwgbnVsbCk7XG59XG5cbi8vIFJldHVybnMgYSBibGFuayBzdHJpbmcgaWYgc21hbGxlc3QgYnJlYWtwb2ludCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIG5hbWUgd2l0aCBhIGRhc2ggaW4gZnJvbnQuXG4vLyBVc2VmdWwgZm9yIG1ha2luZyByZXNwb25zaXZlIHV0aWxpdGllcy5cbi8vXG4vLyAgICA+PiBicmVha3BvaW50LWluZml4KHhzLCAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpKVxuLy8gICAgXCJcIiAgKFJldHVybnMgYSBibGFuayBzdHJpbmcpXG4vLyAgICA+PiBicmVha3BvaW50LWluZml4KHNtLCAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpKVxuLy8gICAgXCItc21cIlxuQGZ1bmN0aW9uIGJyZWFrcG9pbnQtaW5maXgoJG5hbWUsICRicmVha3BvaW50czogJGdyaWQtYnJlYWtwb2ludHMpIHtcbiAgQHJldHVybiBpZihicmVha3BvaW50LW1pbigkbmFtZSwgJGJyZWFrcG9pbnRzKSA9PSBudWxsLCBcIlwiLCBcIi0jeyRuYW1lfVwiKTtcbn1cblxuLy8gTWVkaWEgb2YgYXQgbGVhc3QgdGhlIG1pbmltdW0gYnJlYWtwb2ludCB3aWR0aC4gTm8gcXVlcnkgZm9yIHRoZSBzbWFsbGVzdCBicmVha3BvaW50LlxuLy8gTWFrZXMgdGhlIEBjb250ZW50IGFwcGx5IHRvIHRoZSBnaXZlbiBicmVha3BvaW50IGFuZCB3aWRlci5cbkBtaXhpbiBtZWRpYS1icmVha3BvaW50LXVwKCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gICRtaW46IGJyZWFrcG9pbnQtbWluKCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICBAaWYgJG1pbiB7XG4gICAgQG1lZGlhIChtaW4td2lkdGg6ICRtaW4pIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuLy8gTWVkaWEgb2YgYXQgbW9zdCB0aGUgbWF4aW11bSBicmVha3BvaW50IHdpZHRoLiBObyBxdWVyeSBmb3IgdGhlIGxhcmdlc3QgYnJlYWtwb2ludC5cbi8vIE1ha2VzIHRoZSBAY29udGVudCBhcHBseSB0byB0aGUgZ2l2ZW4gYnJlYWtwb2ludCBhbmQgbmFycm93ZXIuXG5AbWl4aW4gbWVkaWEtYnJlYWtwb2ludC1kb3duKCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gICRtYXg6IGJyZWFrcG9pbnQtbWF4KCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICBAaWYgJG1heCB7XG4gICAgQG1lZGlhIChtYXgtd2lkdGg6ICRtYXgpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuLy8gTWVkaWEgdGhhdCBzcGFucyBtdWx0aXBsZSBicmVha3BvaW50IHdpZHRocy5cbi8vIE1ha2VzIHRoZSBAY29udGVudCBhcHBseSBiZXR3ZWVuIHRoZSBtaW4gYW5kIG1heCBicmVha3BvaW50c1xuQG1peGluIG1lZGlhLWJyZWFrcG9pbnQtYmV0d2VlbigkbG93ZXIsICR1cHBlciwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbWluOiBicmVha3BvaW50LW1pbigkbG93ZXIsICRicmVha3BvaW50cyk7XG4gICRtYXg6IGJyZWFrcG9pbnQtbWF4KCR1cHBlciwgJGJyZWFrcG9pbnRzKTtcblxuICBAaWYgJG1pbiAhPSBudWxsIGFuZCAkbWF4ICE9IG51bGwge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkbWluKSBhbmQgKG1heC13aWR0aDogJG1heCkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtYXggPT0gbnVsbCB7XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC11cCgkbG93ZXIsICRicmVha3BvaW50cykge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtaW4gPT0gbnVsbCB7XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKCR1cHBlciwgJGJyZWFrcG9pbnRzKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cblxuLy8gTWVkaWEgYmV0d2VlbiB0aGUgYnJlYWtwb2ludCdzIG1pbmltdW0gYW5kIG1heGltdW0gd2lkdGhzLlxuLy8gTm8gbWluaW11bSBmb3IgdGhlIHNtYWxsZXN0IGJyZWFrcG9pbnQsIGFuZCBubyBtYXhpbXVtIGZvciB0aGUgbGFyZ2VzdCBvbmUuXG4vLyBNYWtlcyB0aGUgQGNvbnRlbnQgYXBwbHkgb25seSB0byB0aGUgZ2l2ZW4gYnJlYWtwb2ludCwgbm90IHZpZXdwb3J0cyBhbnkgd2lkZXIgb3IgbmFycm93ZXIuXG5AbWl4aW4gbWVkaWEtYnJlYWtwb2ludC1vbmx5KCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gICRtaW46IGJyZWFrcG9pbnQtbWluKCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICAkbWF4OiBicmVha3BvaW50LW1heCgkbmFtZSwgJGJyZWFrcG9pbnRzKTtcblxuICBAaWYgJG1pbiAhPSBudWxsIGFuZCAkbWF4ICE9IG51bGwge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkbWluKSBhbmQgKG1heC13aWR0aDogJG1heCkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtYXggPT0gbnVsbCB7XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC11cCgkbmFtZSwgJGJyZWFrcG9pbnRzKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1pbiA9PSBudWxsIHtcbiAgICBAaW5jbHVkZSBtZWRpYS1icmVha3BvaW50LWRvd24oJG5hbWUsICRicmVha3BvaW50cykge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG4iXX0= */";
    /***/
  },

  /***/
  "./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts":
  /*!********************************************************************************!*\
    !*** ./app/modules/auth/components/pages/auth-signin/auth-signin.component.ts ***!
    \********************************************************************************/

  /*! exports provided: AuthSigninComponent */

  /***/
  function appModulesAuthComponentsPagesAuthSigninAuthSigninComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthSigninComponent", function () {
      return AuthSigninComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @ngrx/store */
    "../../node_modules/@ngrx/store/fesm2015/store.js");
    /* harmony import */


    var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../../../services */
    "./app/services/index.ts");
    /* harmony import */


    var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../../../../store/reducers */
    "./app/store/reducers/index.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : new P(function (resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var AuthSigninComponent =
    /*#__PURE__*/
    function () {
      function AuthSigninComponent(store, masterService, utilService, cinerinoService) {
        _classCallCheck(this, AuthSigninComponent);

        this.store = store;
        this.masterService = masterService;
        this.utilService = utilService;
        this.cinerinoService = cinerinoService;
      }

      _createClass(AuthSigninComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var _this = this;

            var masterData, projects;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    this.isLoading = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_3__["getLoading"]));
                    this.master = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_3__["getMaster"]));
                    this.projects = [];
                    _context2.next = 5;
                    return this.masterService.getProjects();

                  case 5:
                    this.utilService.loadStart();
                    _context2.next = 8;
                    return this.utilService.postJson('/api/projects', {});

                  case 8:
                    this.projects = _context2.sent;
                    _context2.next = 11;
                    return this.masterService.getData();

                  case 11:
                    masterData = _context2.sent;
                    projects = masterData.projects.filter(function (p) {
                      return _this.getProject(p.id) !== undefined;
                    });

                    if (!(projects.length === 1)) {
                      _context2.next = 16;
                      break;
                    }

                    // プロジェクトが一つの場合自動遷移
                    location.href = "/?project=".concat(this.getProject(projects[0].id).projectName);
                    return _context2.abrupt("return");

                  case 16:
                    this.utilService.loadEnd();

                  case 17:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        }
      }, {
        key: "getProject",
        value: function getProject(id) {
          return this.projects.find(function (p) {
            return p.projectId === id;
          });
        }
      }, {
        key: "signOut",
        value: function signOut() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return this.cinerinoService.getServices();

                  case 3:
                    _context3.next = 5;
                    return this.cinerinoService.signOut();

                  case 5:
                    _context3.next = 10;
                    break;

                  case 7:
                    _context3.prev = 7;
                    _context3.t0 = _context3["catch"](0);
                    console.error(_context3.t0);

                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[0, 7]]);
          }));
        }
      }]);

      return AuthSigninComponent;
    }();

    AuthSigninComponent.ctorParameters = function () {
      return [{
        type: _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_2__["MasterService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_2__["UtilService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"]
      }];
    };

    AuthSigninComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-auth-signin',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./auth-signin.component.html */
      "../../node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-signin/auth-signin.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./auth-signin.component.scss */
      "./app/modules/auth/components/pages/auth-signin/auth-signin.component.scss"))["default"]]
    }), __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"], _services__WEBPACK_IMPORTED_MODULE_2__["MasterService"], _services__WEBPACK_IMPORTED_MODULE_2__["UtilService"], _services__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"]])], AuthSigninComponent);
    /***/
  },

  /***/
  "./app/modules/auth/components/pages/auth-signout/auth-signout.component.scss":
  /*!************************************************************************************!*\
    !*** ./app/modules/auth/components/pages/auth-signout/auth-signout.component.scss ***!
    \************************************************************************************/

  /*! exports provided: default */

  /***/
  function appModulesAuthComponentsPagesAuthSignoutAuthSignoutComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY2xpZW50L2FwcC9tb2R1bGVzL2F1dGgvY29tcG9uZW50cy9wYWdlcy9hdXRoLXNpZ25vdXQvYXV0aC1zaWdub3V0LmNvbXBvbmVudC5zY3NzIn0= */";
    /***/
  },

  /***/
  "./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts":
  /*!**********************************************************************************!*\
    !*** ./app/modules/auth/components/pages/auth-signout/auth-signout.component.ts ***!
    \**********************************************************************************/

  /*! exports provided: AuthSignoutComponent */

  /***/
  function appModulesAuthComponentsPagesAuthSignoutAuthSignoutComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthSignoutComponent", function () {
      return AuthSignoutComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../../../services */
    "./app/services/index.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var AuthSignoutComponent =
    /*#__PURE__*/
    function () {
      function AuthSignoutComponent(router, purchaseService, orderService) {
        _classCallCheck(this, AuthSignoutComponent);

        this.router = router;
        this.purchaseService = purchaseService;
        this.orderService = orderService;
      }

      _createClass(AuthSignoutComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.orderService["delete"]();
          this.purchaseService["delete"]();
          this.router.navigate(['/']);
        }
      }, {
        key: "selectProject",
        value: function selectProject() {}
      }]);

      return AuthSignoutComponent;
    }();

    AuthSignoutComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_2__["OrderService"]
      }];
    };

    AuthSignoutComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-auth-signout',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./auth-signout.component.html */
      "../../node_modules/raw-loader/dist/cjs.js!./app/modules/auth/components/pages/auth-signout/auth-signout.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./auth-signout.component.scss */
      "./app/modules/auth/components/pages/auth-signout/auth-signout.component.scss"))["default"]]
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"], _services__WEBPACK_IMPORTED_MODULE_2__["OrderService"]])], AuthSignoutComponent);
    /***/
  }
}]);
//# sourceMappingURL=modules-auth-auth-module-es5.js.map