function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-setting-setting-module"], {
  /***/
  "../../node_modules/raw-loader/dist/cjs.js!./app/modules/setting/components/pages/setting/setting.component.html":
  /*!*******************************************************************************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/setting/components/pages/setting/setting.component.html ***!
    \*******************************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsAppModulesSettingComponentsPagesSettingSettingComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"contents-width mx-auto px-3 py-5\">\n    <form *ngIf=\"settingForm\" [formGroup]=\"settingForm\">\n        <div class=\"mb-4\">\n            <h2 class=\"text-large mb-4 text-center font-weight-bold\">{{ 'setting.title' | translate }}</h2>\n            <p class=\"mb-4 text-md-center\" [innerHTML]=\"'setting.read' | translate\"></p>\n            <div class=\"p-3 bg-white\">\n\n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.theater' | translate }}<span\n                                class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"theaterBranchCode\" (change)=\"changePosList()\">\n                                <option value=\"\">{{ 'setting.unselected' | translate }}</option>\n                                <option *ngFor=\"let theater of (master | async).theaters\" [value]=\"theater.branchCode\">\n                                    {{ theater.name | changeLanguage }}</option>\n                            </select>\n                            <div *ngIf=\"settingForm.controls.theaterBranchCode.invalid && settingForm.controls.theaterBranchCode.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.theaterBranchCode.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.unselected' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'setting.pos' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"posId\">\n                                <option value=\"\">{{ 'setting.unselected' | translate }}</option>\n                                <option *ngFor=\"let pos of posList\" [value]=\"pos.id\">{{ pos.name }}</option>\n                            </select>\n                            <div *ngIf=\"settingForm.controls.posId.invalid && settingForm.controls.posId.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.posId.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.unselected' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngIf=\"settingForm.controls.familyName\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.familyName' | translate }}<span\n                                *ngIf=\"isRequired('familyName')\"\n                                class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"familyName\" placeholder=\"モーション\">\n                            <div *ngIf=\"settingForm.controls.familyName.invalid && settingForm.controls.familyName.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.familyName.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.familyName.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.maxlength' | translate: { value: settingForm.controls.familyName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.familyName.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.fullKana' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.givenName\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.givenName' | translate }}<span\n                                *ngIf=\"isRequired('givenName')\"\n                                class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"givenName\" placeholder=\"ピクチャー\">\n                            <div *ngIf=\"settingForm.controls.givenName.invalid && settingForm.controls.givenName.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.givenName.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.givenName.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.maxlength' | translate: { value: settingForm.controls.givenName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.givenName.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.fullKana' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.email\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.email' | translate }}<span\n                            *ngIf=\"isRequired('email')\"\n                            class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <input type=\"email\" class=\"form-control\" formControlName=\"email\"\n                                placeholder=\"motionpicture@example.jp\">\n                            <div *ngIf=\"settingForm.controls.email.invalid && settingForm.controls.email.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.email.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.email.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.maxlength' | translate: { value: settingForm.controls.email.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.email.errors.email\" class=\"text-danger\">\n                                    {{ 'form.validation.email' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.telephone\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.telephone' | translate }}<span\n                            *ngIf=\"isRequired('telephone')\"\n                            class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <input type=\"tel\" class=\"form-control\" formControlName=\"telephone\" placeholder=\"0362778824\">\n                            <div *ngIf=\"settingForm.controls.telephone.invalid && settingForm.controls.telephone.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.telephone.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.telephone.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.telephone.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.telephone.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.telephone.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.telephone.errors.telephone\" class=\"text-danger\">\n                                    {{ 'form.validation.telephone' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.age\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.age' | translate }}<span\n                            *ngIf=\"isRequired('age')\"\n                            class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <input type=\"tel\" class=\"form-control\" formControlName=\"age\" placeholder=\"\">\n                            <div *ngIf=\"settingForm.controls.age.invalid && settingForm.controls.age.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.age.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.age.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.age.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.age.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.pattern' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.address\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.address' | translate }}<span\n                            *ngIf=\"isRequired('address')\"\n                            class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <input type=\"tel\" class=\"form-control\" formControlName=\"address\" placeholder=\"\">\n                            <div *ngIf=\"settingForm.controls.address.invalid && settingForm.controls.address.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.address.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.address.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.address.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.address.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.pattern' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.gender\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.gender.label' | translate }}<span\n                            *ngIf=\"isRequired('gender')\"\n                            class=\"badge badge-danger ml-2\">{{ 'common.required' | translate }}</span></p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"gender\">\n                                <option value=\"\">{{ 'common.gender.unselected' | translate }}</option>\n                                <option value=\"man\">{{ 'common.gender.man' | translate }}</option>\n                                <option value=\"woman\">{{ 'common.gender.woman' | translate }}</option>\n                            </select>\n                            <div *ngIf=\"settingForm.controls.gender.invalid && settingForm.controls.gender.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.gender.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.gender.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.gender.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.gender.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.pattern' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'setting.printer' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"printerType\" (change)=\"changePrinterType()\">\n                                <option *ngFor=\"let printer of printers\" [value]=\"printer.connectionType\">\n                                    {{ printer.name | translate }}</option>\n                            </select>\n                            <button\n                                *ngIf=\"this.settingForm.controls.printerType.value && this.settingForm.controls.printerType.value !== connectionType.None\"\n                                type=\"button\" class=\"btn btn-sm btn-primary py-2 mt-2\"\n                                (click)=\"print()\">{{ 'setting.testPrinting' | translate }}</button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'setting.printerIpAddress' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"printerIpAddress\"\n                                placeholder=\"0.0.0.0\">\n                            <div *ngIf=\"settingForm.controls.printerIpAddress.invalid && settingForm.controls.printerIpAddress.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.printerIpAddress.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                            </div>\n                            <p class=\"text-small mt-2\">\n                                {{ 'setting.printerIpAddressDescription' | translate }}\n                            </p>\n                        </div>\n                    </div>\n                </div>\n\n\n            </div>\n        </div>\n\n        <div class=\"buttons mx-auto text-center\">\n            <button type=\"submit\" [disabled]=\"isLoading | async\" class=\"btn btn-primary btn-block py-3 mb-3\"\n                (click)=\"onSubmit()\">{{ 'setting.next' | translate }}</button>\n            <button type=\"button\" class=\"btn btn-link\"\n                [routerLink]=\"environment.BASE_URL\">{{ 'setting.prev' | translate }}</button>\n        </div>\n    </form>\n</div>";
    /***/
  },

  /***/
  "./app/modules/setting/components/pages/setting/setting.component.scss":
  /*!*****************************************************************************!*\
    !*** ./app/modules/setting/components/pages/setting/setting.component.scss ***!
    \*****************************************************************************/

  /*! exports provided: default */

  /***/
  function appModulesSettingComponentsPagesSettingSettingComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY2xpZW50L2FwcC9tb2R1bGVzL3NldHRpbmcvY29tcG9uZW50cy9wYWdlcy9zZXR0aW5nL3NldHRpbmcuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./app/modules/setting/components/pages/setting/setting.component.ts":
  /*!***************************************************************************!*\
    !*** ./app/modules/setting/components/pages/setting/setting.component.ts ***!
    \***************************************************************************/

  /*! exports provided: SettingComponent */

  /***/
  function appModulesSettingComponentsPagesSettingSettingComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingComponent", function () {
      return SettingComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/forms */
    "../../node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "../../node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ngrx/store */
    "../../node_modules/@ngrx/store/fesm2015/store.js");
    /* harmony import */


    var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ngx-translate/core */
    "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
    /* harmony import */


    var libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! libphonenumber-js */
    "../../node_modules/libphonenumber-js/index.es6.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../../../../../environments/environment */
    "./environments/environment.ts");
    /* harmony import */


    var _models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../../../../models */
    "./app/models/index.ts");
    /* harmony import */


    var _services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../../../../services */
    "./app/services/index.ts");
    /* harmony import */


    var _store_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../../../../store/reducers */
    "./app/store/reducers/index.ts");
    /* harmony import */


    var _shared_pipes_libphonenumber_format_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../../../../shared/pipes/libphonenumber-format.pipe */
    "./app/modules/shared/pipes/libphonenumber-format.pipe.ts");

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

    var SettingComponent =
    /*#__PURE__*/
    function () {
      function SettingComponent(formBuilder, store, utilService, userService, masterService, orderService, translate, router) {
        _classCallCheck(this, SettingComponent);

        this.formBuilder = formBuilder;
        this.store = store;
        this.utilService = utilService;
        this.userService = userService;
        this.masterService = masterService;
        this.orderService = orderService;
        this.translate = translate;
        this.router = router;
        this.printers = _models__WEBPACK_IMPORTED_MODULE_7__["printers"];
        this.connectionType = _models__WEBPACK_IMPORTED_MODULE_7__["ConnectionType"];
        this.viewType = _models__WEBPACK_IMPORTED_MODULE_7__["ViewType"];
        this.environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["getEnvironment"])();
      }
      /**
       * 初期化
       */


      _createClass(SettingComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.user = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getUser"]));
                    this.master = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getMaster"]));
                    this.error = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getError"]));
                    this.isLoading = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getLoading"]));
                    this.posList = [];
                    _context.prev = 5;
                    _context.next = 8;
                    return this.masterService.getSellers();

                  case 8:
                    _context.next = 10;
                    return this.masterService.getTheaters();

                  case 10:
                    _context.next = 12;
                    return this.createSettlingForm();

                  case 12:
                    _context.next = 18;
                    break;

                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](5);
                    console.error(_context.t0);
                    this.router.navigate(['/error']);

                  case 18:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[5, 14]]);
          }));
        }
        /**
         * フォーム作成
         */

      }, {
        key: "createSettlingForm",
        value: function createSettlingForm() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var _this = this;

            var profile, user, customerContact;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    profile = this.environment.PROFILE;
                    this.settingForm = this.formBuilder.group({
                      theaterBranchCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
                      posId: [''],
                      printerType: [_models__WEBPACK_IMPORTED_MODULE_7__["ConnectionType"].None],
                      printerIpAddress: ['']
                    });
                    profile.forEach(function (p) {
                      var validators = [];

                      if (p.required !== undefined && p.required) {
                        validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                      }

                      if (p.maxLength !== undefined) {
                        validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(p.maxLength));
                      }

                      if (p.minLength !== undefined) {
                        validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(p.minLength));
                      }

                      if (p.pattern !== undefined) {
                        validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(p.pattern));
                      }

                      if (p.key === 'email') {
                        validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email);
                      }

                      if (p.key === 'telephone') {
                        validators.push(function (control) {
                          var field = control.root.get('telephone');

                          if (field !== null) {
                            if (field.value === '') {
                              return null;
                            }

                            var parsedNumber = new RegExp(/^\+/).test(field.value) ? libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__["parse"](field.value) : libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__["parse"](field.value, 'JP');

                            if (parsedNumber.phone === undefined) {
                              return {
                                telephone: true
                              };
                            }

                            var isValid = libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__["isValidNumber"](parsedNumber);

                            if (!isValid) {
                              return {
                                telephone: true
                              };
                            }
                          }

                          return null;
                        });
                      }

                      _this.settingForm.addControl(p.key, new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](p.value, validators));
                    });
                    _context2.next = 5;
                    return this.userService.getData();

                  case 5:
                    user = _context2.sent;

                    if (user.theater !== undefined) {
                      this.settingForm.controls.theaterBranchCode.setValue(user.theater.branchCode);
                      this.changePosList();
                    }

                    if (user.pos !== undefined) {
                      this.settingForm.controls.posId.setValue(user.pos.id);
                    }

                    customerContact = user.customerContact;

                    if (customerContact !== undefined) {
                      Object.keys(customerContact).forEach(function (key) {
                        var value = customerContact[key];

                        if (value === undefined || _this.settingForm.controls[key] === undefined) {
                          return;
                        }

                        if (key === 'telephone') {
                          _this.settingForm.controls.telephone.setValue(new _shared_pipes_libphonenumber_format_pipe__WEBPACK_IMPORTED_MODULE_10__["LibphonenumberFormatPipe"]().transform(value));

                          return;
                        }

                        _this.settingForm.controls[key].setValue(value);
                      });
                    }

                    if (user.printer !== undefined) {
                      this.settingForm.controls.printerType.setValue(user.printer.connectionType);
                      this.settingForm.controls.printerIpAddress.setValue(user.printer.ipAddress);
                    }

                    console.log(this.settingForm);

                  case 12:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        }
        /**
         * POS変更
         */

      }, {
        key: "changePosList",
        value: function changePosList() {
          var _this2 = this;

          this.settingForm.controls.posId.setValue('');
          var theaterBranchCode = this.settingForm.controls.theaterBranchCode.value;

          if (theaterBranchCode === '') {
            this.posList = [];
            return;
          }

          this.master.subscribe(function (master) {
            var findResult = master.theaters.find(function (t) {
              return t.branchCode === theaterBranchCode;
            });

            if (findResult === undefined) {
              _this2.posList = [];
              return;
            }

            _this2.posList = findResult.hasPOS === undefined ? [] : findResult.hasPOS;
          }).unsubscribe();
        }
        /**
         * 設定変更
         */

      }, {
        key: "onSubmit",
        value: function onSubmit() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            var _this3 = this;

            var masterData, theaterBranchCode, posId, theater, pos;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    Object.keys(this.settingForm.controls).forEach(function (key) {
                      _this3.settingForm.controls[key].markAsTouched();
                    });

                    if (!this.settingForm.invalid) {
                      _context3.next = 4;
                      break;
                    }

                    this.utilService.openAlert({
                      title: this.translate.instant('common.error'),
                      body: this.translate.instant('setting.alert.validation')
                    });
                    return _context3.abrupt("return");

                  case 4:
                    _context3.prev = 4;
                    _context3.next = 7;
                    return this.masterService.getData();

                  case 7:
                    masterData = _context3.sent;
                    theaterBranchCode = this.settingForm.controls.theaterBranchCode.value;
                    posId = this.settingForm.controls.posId.value;
                    theater = masterData.theaters.find(function (t) {
                      return t.branchCode === theaterBranchCode;
                    });

                    if (!(theater === undefined)) {
                      _context3.next = 13;
                      break;
                    }

                    throw new Error('theater not found').message;

                  case 13:
                    pos = theater.hasPOS === undefined ? theater.hasPOS : theater.hasPOS.find(function (p) {
                      return p.id === posId;
                    });
                    this.userService.updateAll({
                      pos: pos,
                      theater: theater,
                      customerContact: {
                        familyName: this.settingForm.controls.familyName === undefined ? undefined : this.settingForm.controls.familyName.value,
                        givenName: this.settingForm.controls.givenName === undefined ? undefined : this.settingForm.controls.givenName.value,
                        email: this.settingForm.controls.email === undefined ? undefined : this.settingForm.controls.email.value,
                        telephone: this.settingForm.controls.telephone === undefined ? undefined : this.settingForm.controls.telephone.value,
                        age: this.settingForm.controls.age === undefined ? undefined : this.settingForm.controls.age.value,
                        address: this.settingForm.controls.address === undefined ? undefined : this.settingForm.controls.address.value,
                        gender: this.settingForm.controls.gender === undefined ? undefined : this.settingForm.controls.gender.value
                      },
                      printer: {
                        ipAddress: this.settingForm.controls.printerIpAddress.value,
                        connectionType: this.settingForm.controls.printerType.value
                      }
                    });
                    this.utilService.openAlert({
                      title: this.translate.instant('common.complete'),
                      body: this.translate.instant('setting.alert.success')
                    });
                    _context3.next = 21;
                    break;

                  case 18:
                    _context3.prev = 18;
                    _context3.t0 = _context3["catch"](4);
                    console.error(_context3.t0);

                  case 21:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[4, 18]]);
          }));
        }
        /**
         * 印刷
         */

      }, {
        key: "print",
        value: function print() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
            var printer;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    printer = {
                      connectionType: this.settingForm.controls.printerType.value,
                      ipAddress: this.settingForm.controls.printerIpAddress.value
                    };
                    _context4.prev = 1;
                    _context4.next = 4;
                    return this.orderService.print({
                      orders: [],
                      printer: printer
                    });

                  case 4:
                    _context4.next = 10;
                    break;

                  case 6:
                    _context4.prev = 6;
                    _context4.t0 = _context4["catch"](1);
                    console.error(_context4.t0);
                    this.utilService.openAlert({
                      title: this.translate.instant('common.error'),
                      body: "\n                <p class=\"mb-4\">".concat(this.translate.instant('setting.alert.print'), "</p>\n                    <div class=\"p-3 bg-light-gray select-text\">\n                    <code>").concat(_context4.t0, "</code>\n                </div>")
                    });

                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this, [[1, 6]]);
          }));
        }
        /**
         * プリンター変更
         */

      }, {
        key: "changePrinterType",
        value: function changePrinterType() {
          if (this.settingForm.controls.printerType.value === _models__WEBPACK_IMPORTED_MODULE_7__["ConnectionType"].StarBluetooth) {
            this.settingForm.controls.printerIpAddress.setValue(this.translate.instant('setting.starBluetoothAddress'));
          }
        }
        /**
         * 必須判定
         */

      }, {
        key: "isRequired",
        value: function isRequired(key) {
          return this.environment.PROFILE.find(function (p) {
            return p.key === key && p.required;
          }) !== undefined;
        }
      }]);

      return SettingComponent;
    }();

    SettingComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]
      }, {
        type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["UtilService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["UserService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["MasterService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["OrderService"]
      }, {
        type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    SettingComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-setting',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./setting.component.html */
      "../../node_modules/raw-loader/dist/cjs.js!./app/modules/setting/components/pages/setting/setting.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./setting.component.scss */
      "./app/modules/setting/components/pages/setting/setting.component.scss"))["default"]]
    }), __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"], _services__WEBPACK_IMPORTED_MODULE_8__["UtilService"], _services__WEBPACK_IMPORTED_MODULE_8__["UserService"], _services__WEBPACK_IMPORTED_MODULE_8__["MasterService"], _services__WEBPACK_IMPORTED_MODULE_8__["OrderService"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])], SettingComponent);
    /***/
  },

  /***/
  "./app/modules/setting/setting-routing.module.ts":
  /*!*******************************************************!*\
    !*** ./app/modules/setting/setting-routing.module.ts ***!
    \*******************************************************/

  /*! exports provided: SettingRoutingModule */

  /***/
  function appModulesSettingSettingRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingRoutingModule", function () {
      return SettingRoutingModule;
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


    var _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../shared/components/pages/base/base.component */
    "./app/modules/shared/components/pages/base/base.component.ts");
    /* harmony import */


    var _components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/pages/setting/setting.component */
    "./app/modules/setting/components/pages/setting/setting.component.ts");

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
      component: _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"],
      children: [{
        path: '',
        component: _components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__["SettingComponent"]
      }]
    }];

    var SettingRoutingModule = function SettingRoutingModule() {
      _classCallCheck(this, SettingRoutingModule);
    };

    SettingRoutingModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })], SettingRoutingModule);
    /***/
  },

  /***/
  "./app/modules/setting/setting.module.ts":
  /*!***********************************************!*\
    !*** ./app/modules/setting/setting.module.ts ***!
    \***********************************************/

  /*! exports provided: SettingModule */

  /***/
  function appModulesSettingSettingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingModule", function () {
      return SettingModule;
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


    var _components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/pages/setting/setting.component */
    "./app/modules/setting/components/pages/setting/setting.component.ts");
    /* harmony import */


    var _setting_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./setting-routing.module */
    "./app/modules/setting/setting-routing.module.ts");

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

    var SettingModule = function SettingModule() {
      _classCallCheck(this, SettingModule);
    };

    SettingModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__["SettingComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _setting_routing_module__WEBPACK_IMPORTED_MODULE_4__["SettingRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]]
    })], SettingModule);
    /***/
  }
}]);
//# sourceMappingURL=modules-setting-setting-module-es5.js.map