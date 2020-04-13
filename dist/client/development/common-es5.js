function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"], {
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
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../services/cinerino.service */
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
    /**
     * AuthGuardService
     */


    var AuthGuardService =
    /*#__PURE__*/
    function () {
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

    AuthGuardService.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"]
      }];
    };

    AuthGuardService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"]])], AuthGuardService);
    /***/
  },

  /***/
  "./app/canActivates/index.ts":
  /*!***********************************!*\
    !*** ./app/canActivates/index.ts ***!
    \***********************************/

  /*! exports provided: AuthGuardService, PurchaseTransactionGuardService, SettingGuardService */

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

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
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
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../services */
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
    /**
     * PurchaseTransactionGuardService
     */


    var PurchaseTransactionGuardService =
    /*#__PURE__*/
    function () {
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
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
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

    PurchaseTransactionGuardService.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"]
      }];
    };

    PurchaseTransactionGuardService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"]])], PurchaseTransactionGuardService);
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
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ngrx/store */
    "../../node_modules/@ngrx/store/fesm2015/store.js");
    /* harmony import */


    var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../store/reducers */
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
    /**
     * SettingGuardService
     */


    var SettingGuardService =
    /*#__PURE__*/
    function () {
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
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
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
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
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

    SettingGuardService.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]
      }];
    };

    SettingGuardService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]])], SettingGuardService);
    /***/
  }
}]);
//# sourceMappingURL=common-es5.js.map