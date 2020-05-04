function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-admission-admission-module~modules-auth-auth-module~modules-inquiry-inquiry-module~m~f17d069f"], {
  /***/
  "./app/canActivates/auth-guard.service.ts":
  /*!************************************************!*\
    !*** ./app/canActivates/auth-guard.service.ts ***!
    \************************************************/

  /*! exports provided: AuthGuardService */

  /***/
  function appCanActivatesAuthGuardServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthGuardService", function () {
      return AuthGuardService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../services/cinerino.service */
    "./app/services/cinerino.service.ts");

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * AuthGuardService
     */


    var AuthGuardService = /*#__PURE__*/function () {
      function AuthGuardService(router, cinerino) {
        _classCallCheck(this, AuthGuardService);

        this.router = router;
        this.cinerino = cinerino;
      }
      /**
       * 認証
       * @method canActivate
       * @returns {Promise<boolean>}
       */


      _createClass(AuthGuardService, [{
        key: "canActivate",
        value: function canActivate() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return this.cinerino.getServices();

                  case 3:
                    return _context.abrupt("return", true);

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    console.log('canActivate', _context.t0);
                    this.router.navigate(['/']);
                    return _context.abrupt("return", false);

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[0, 6]]);
          }));
        }
      }]);

      return AuthGuardService;
    }();

    AuthGuardService.ɵfac = function AuthGuardService_Factory(t) {
      return new (t || AuthGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"]));
    };

    AuthGuardService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AuthGuardService,
      factory: AuthGuardService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthGuardService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
        }, {
          type: _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./app/canActivates/index.ts":
  /*!***********************************!*\
    !*** ./app/canActivates/index.ts ***!
    \***********************************/

  /*! exports provided: AuthGuardService, PurchaseTransactionGuardService, SettingGuardService, ViewTypeGuardService */

  /***/
  function appCanActivatesIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./auth-guard.service */
    "./app/canActivates/auth-guard.service.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "AuthGuardService", function () {
      return _auth_guard_service__WEBPACK_IMPORTED_MODULE_0__["AuthGuardService"];
    });
    /* harmony import */


    var _purchase_transaction_guard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./purchase-transaction-guard.service */
    "./app/canActivates/purchase-transaction-guard.service.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "PurchaseTransactionGuardService", function () {
      return _purchase_transaction_guard_service__WEBPACK_IMPORTED_MODULE_1__["PurchaseTransactionGuardService"];
    });
    /* harmony import */


    var _setting_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./setting-guard.service */
    "./app/canActivates/setting-guard.service.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "SettingGuardService", function () {
      return _setting_guard_service__WEBPACK_IMPORTED_MODULE_2__["SettingGuardService"];
    });
    /* harmony import */


    var _view_type_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./view-type-guard.service */
    "./app/canActivates/view-type-guard.service.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "ViewTypeGuardService", function () {
      return _view_type_guard_service__WEBPACK_IMPORTED_MODULE_3__["ViewTypeGuardService"];
    });
    /***/

  },

  /***/
  "./app/canActivates/purchase-transaction-guard.service.ts":
  /*!****************************************************************!*\
    !*** ./app/canActivates/purchase-transaction-guard.service.ts ***!
    \****************************************************************/

  /*! exports provided: PurchaseTransactionGuardService */

  /***/
  function appCanActivatesPurchaseTransactionGuardServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PurchaseTransactionGuardService", function () {
      return PurchaseTransactionGuardService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../services */
    "./app/services/index.ts");

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * PurchaseTransactionGuardService
     */


    var PurchaseTransactionGuardService = /*#__PURE__*/function () {
      function PurchaseTransactionGuardService(router, purchaseService) {
        _classCallCheck(this, PurchaseTransactionGuardService);

        this.router = router;
        this.purchaseService = purchaseService;
      }
      /**
       * 認証
       * @method canActivate
       * @returns {Promise<boolean>}
       */


      _createClass(PurchaseTransactionGuardService, [{
        key: "canActivate",
        value: function canActivate() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var transaction;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return this.purchaseService.getData();

                  case 3:
                    transaction = _context2.sent.transaction;

                    if (!(transaction === undefined)) {
                      _context2.next = 6;
                      break;
                    }

                    throw new Error('transaction not found').message;

                  case 6:
                    return _context2.abrupt("return", true);

                  case 9:
                    _context2.prev = 9;
                    _context2.t0 = _context2["catch"](0);
                    console.log('canActivate', _context2.t0);
                    this.router.navigate(['/']);
                    return _context2.abrupt("return", false);

                  case 14:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[0, 9]]);
          }));
        }
      }]);

      return PurchaseTransactionGuardService;
    }();

    PurchaseTransactionGuardService.ɵfac = function PurchaseTransactionGuardService_Factory(t) {
      return new (t || PurchaseTransactionGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"]));
    };

    PurchaseTransactionGuardService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: PurchaseTransactionGuardService,
      factory: PurchaseTransactionGuardService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PurchaseTransactionGuardService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
        }, {
          type: _services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./app/canActivates/setting-guard.service.ts":
  /*!***************************************************!*\
    !*** ./app/canActivates/setting-guard.service.ts ***!
    \***************************************************/

  /*! exports provided: SettingGuardService */

  /***/
  function appCanActivatesSettingGuardServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingGuardService", function () {
      return SettingGuardService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ngrx/store */
    "../../node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
    /* harmony import */


    var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../store/reducers */
    "./app/store/reducers/index.ts");

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * SettingGuardService
     */


    var SettingGuardService = /*#__PURE__*/function () {
      function SettingGuardService(router, store) {
        _classCallCheck(this, SettingGuardService);

        this.router = router;
        this.store = store;
      }
      /**
       * 認証
       * @method canActivate
       * @returns {Promise<boolean>}
       */


      _createClass(SettingGuardService, [{
        key: "canActivate",
        value: function canActivate() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var user;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    this.user = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_3__["getUser"]));
                    _context3.next = 4;
                    return this.getUser();

                  case 4:
                    user = _context3.sent;

                    if (!(user.theater === undefined)) {
                      _context3.next = 7;
                      break;
                    }

                    throw new Error('theater not found').message;

                  case 7:
                    if (!(user.customerContact === undefined)) {
                      _context3.next = 9;
                      break;
                    }

                    throw new Error('customerContact not found').message;

                  case 9:
                    return _context3.abrupt("return", true);

                  case 12:
                    _context3.prev = 12;
                    _context3.t0 = _context3["catch"](0);
                    console.log('canActivate', _context3.t0);
                    this.router.navigate(['/setting']);
                    return _context3.abrupt("return", false);

                  case 17:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[0, 12]]);
          }));
        }
      }, {
        key: "getUser",
        value: function getUser() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var _this = this;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", new Promise(function (resolve) {
                      _this.user.subscribe(function (user) {
                        resolve(user);
                      }).unsubscribe();
                    }));

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));
        }
      }]);

      return SettingGuardService;
    }();

    SettingGuardService.ɵfac = function SettingGuardService_Factory(t) {
      return new (t || SettingGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]));
    };

    SettingGuardService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: SettingGuardService,
      factory: SettingGuardService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SettingGuardService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
        }, {
          type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./app/canActivates/view-type-guard.service.ts":
  /*!*****************************************************!*\
    !*** ./app/canActivates/view-type-guard.service.ts ***!
    \*****************************************************/

  /*! exports provided: ViewTypeGuardService */

  /***/
  function appCanActivatesViewTypeGuardServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ViewTypeGuardService", function () {
      return ViewTypeGuardService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../environments/environment */
    "./environments/environment.ts");
    /* harmony import */


    var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../models */
    "./app/models/index.ts");

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

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
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * ViewTypeGuardService
     */


    var ViewTypeGuardService = /*#__PURE__*/function () {
      function ViewTypeGuardService(router) {
        _classCallCheck(this, ViewTypeGuardService);

        this.router = router;
      }
      /**
       * 認証
       * @method canActivate
       * @returns {Promise<boolean>}
       */


      _createClass(ViewTypeGuardService, [{
        key: "canActivate",
        value: function canActivate(_next, state) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var viewType;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    viewType = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["getEnvironment"])().VIEW_TYPE;

                    if (!(state.url.match('/cinema') !== null && viewType !== _models__WEBPACK_IMPORTED_MODULE_3__["ViewType"].Cinema)) {
                      _context5.next = 4;
                      break;
                    }

                    throw new Error('viewType not match');

                  case 4:
                    if (!(state.url.match('/event') !== null && viewType !== _models__WEBPACK_IMPORTED_MODULE_3__["ViewType"].Event)) {
                      _context5.next = 6;
                      break;
                    }

                    throw new Error('viewType not match');

                  case 6:
                    return _context5.abrupt("return", true);

                  case 9:
                    _context5.prev = 9;
                    _context5.t0 = _context5["catch"](0);
                    console.error('canActivate', _context5.t0);
                    this.router.navigate(['/error']);
                    return _context5.abrupt("return", false);

                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this, [[0, 9]]);
          }));
        }
      }]);

      return ViewTypeGuardService;
    }();

    ViewTypeGuardService.ɵfac = function ViewTypeGuardService_Factory(t) {
      return new (t || ViewTypeGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]));
    };

    ViewTypeGuardService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ViewTypeGuardService,
      factory: ViewTypeGuardService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ViewTypeGuardService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
        }];
      }, null);
    })();
    /***/

  }
}]);