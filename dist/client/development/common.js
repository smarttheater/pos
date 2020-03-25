(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./app/canActivates/auth-guard.service.ts":
/*!************************************************!*\
  !*** ./app/canActivates/auth-guard.service.ts ***!
  \************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/cinerino.service */ "./app/services/cinerino.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * AuthGuardService
 */



let AuthGuardService = class AuthGuardService {
    constructor(router, cinerino) {
        this.router = router;
        this.cinerino = cinerino;
    }
    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    canActivate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.cinerino.getServices();
                return true;
            }
            catch (error) {
                console.log('canActivate', error);
                this.router.navigate(['/']);
                return false;
            }
        });
    }
};
AuthGuardService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
    { type: _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"] }
];
AuthGuardService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
        _services_cinerino_service__WEBPACK_IMPORTED_MODULE_2__["CinerinoService"]])
], AuthGuardService);



/***/ }),

/***/ "./app/canActivates/index.ts":
/*!***********************************!*\
  !*** ./app/canActivates/index.ts ***!
  \***********************************/
/*! exports provided: AuthGuardService, PurchaseTransactionGuardService, SettingGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-guard.service */ "./app/canActivates/auth-guard.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return _auth_guard_service__WEBPACK_IMPORTED_MODULE_0__["AuthGuardService"]; });

/* harmony import */ var _purchase_transaction_guard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./purchase-transaction-guard.service */ "./app/canActivates/purchase-transaction-guard.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PurchaseTransactionGuardService", function() { return _purchase_transaction_guard_service__WEBPACK_IMPORTED_MODULE_1__["PurchaseTransactionGuardService"]; });

/* harmony import */ var _setting_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setting-guard.service */ "./app/canActivates/setting-guard.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SettingGuardService", function() { return _setting_guard_service__WEBPACK_IMPORTED_MODULE_2__["SettingGuardService"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





/***/ }),

/***/ "./app/canActivates/purchase-transaction-guard.service.ts":
/*!****************************************************************!*\
  !*** ./app/canActivates/purchase-transaction-guard.service.ts ***!
  \****************************************************************/
/*! exports provided: PurchaseTransactionGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseTransactionGuardService", function() { return PurchaseTransactionGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services */ "./app/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * PurchaseTransactionGuardService
 */



let PurchaseTransactionGuardService = class PurchaseTransactionGuardService {
    constructor(router, purchaseService) {
        this.router = router;
        this.purchaseService = purchaseService;
    }
    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    canActivate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = (yield this.purchaseService.getData()).transaction;
                if (transaction === undefined) {
                    throw new Error('transaction not found').message;
                }
                return true;
            }
            catch (error) {
                console.log('canActivate', error);
                this.router.navigate(['/']);
                return false;
            }
        });
    }
};
PurchaseTransactionGuardService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"] }
];
PurchaseTransactionGuardService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
        _services__WEBPACK_IMPORTED_MODULE_2__["PurchaseService"]])
], PurchaseTransactionGuardService);



/***/ }),

/***/ "./app/canActivates/setting-guard.service.ts":
/*!***************************************************!*\
  !*** ./app/canActivates/setting-guard.service.ts ***!
  \***************************************************/
/*! exports provided: SettingGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingGuardService", function() { return SettingGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/reducers */ "./app/store/reducers/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * SettingGuardService
 */




let SettingGuardService = class SettingGuardService {
    constructor(router, store) {
        this.router = router;
        this.store = store;
    }
    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    canActivate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.user = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_3__["getUser"]));
                const user = yield this.getUser();
                if (user.seller === undefined) {
                    throw new Error('seller not found').message;
                }
                if (user.theater === undefined) {
                    throw new Error('theater not found').message;
                }
                if (user.customerContact === undefined) {
                    throw new Error('customerContact not found').message;
                }
                return true;
            }
            catch (error) {
                console.log('canActivate', error);
                this.router.navigate(['/setting']);
                return false;
            }
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.user.subscribe((user) => {
                    resolve(user);
                }).unsubscribe();
            });
        });
    }
};
SettingGuardService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
];
SettingGuardService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
        _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]])
], SettingGuardService);



/***/ })

}]);
//# sourceMappingURL=common.js.map