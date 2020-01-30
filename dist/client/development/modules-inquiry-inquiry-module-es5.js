function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-inquiry-inquiry-module"], {
  /***/
  "../../node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.html":
  /*!***********************************************************************************************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.html ***!
    \***********************************************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsAppModulesInquiryComponentsPagesInquiryConfirmInquiryConfirmComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"contents-width mx-auto px-3 py-5\">\n    <div class=\"mb-4\">\n        <h2 class=\"text-large mb-4 text-center font-weight-bold\">{{ 'inquiry.confirm.title' | translate }}</h2>\n\n        <div class=\"mb-4 px-3 py-2 bg-white\">\n            <div class=\"row align-items-center\">\n                <p class=\"col-4\">\n                    {{ 'common.confirmationNumber' | translate }}</p>\n                <p class=\"col-8 text-large text-info font-weight-bold text-md-left text-right\">\n                    {{ (order | async).order.confirmationNumber }}\n                </p>\n            </div>\n        </div>\n        <div *ngFor=\"let eventOrder of eventOrders\" class=\"mb-4 bg-white p-3\">\n            <div class=\"mb-3\">\n                <div class=\"mb-1\">\n                    <p class=\"font-weight-bold text-large\">{{ eventOrder.event.name | changeLanguage }}</p>\n                    <p class=\"text-small\"\n                        *ngIf=\"eventOrder.event.superEvent.headline && (eventOrder.event.superEvent.headline | changeLanguage)\">\n                        {{ eventOrder.event.superEvent.headline | changeLanguage }}</p>\n                    <p class=\"text-small\"\n                        *ngIf=\"eventOrder.event.superEvent.description && (eventOrder.event.superEvent.description | changeLanguage)\">{{\n                        eventOrder.event.superEvent.description | changeLanguage }}</p>\n                </div>\n                <p class=\"mb-1\">\n                    {{ eventOrder.event.startDate | formatDate: 'MM/DD(ddd) HH:mm' }}-{{ eventOrder.event.endDate | formatDate: 'HH:mm' }}\n                </p>\n                <p class=\"text-small mb-1\">\n                    <span class=\"theatre-name\">{{ eventOrder.event.superEvent.location.name | changeLanguage }}</span>\n                    <span class=\"screen-name\">&nbsp;/&nbsp;{{ eventOrder.event.location.name | changeLanguage }}</span>\n                    <span\n                        *ngIf=\"eventOrder.event.workPerformed?.duration && moment.duration(eventOrder.event.workPerformed?.duration).asMinutes() > 0\">\n                        &nbsp;/&nbsp;<span class=\"mr-1\">{{ 'common.duration' | translate }}</span>{{ moment.duration(eventOrder.event.workPerformed?.duration).asMinutes() }}{{ 'common.date.minute' | translate }}\n                    </span>\n                </p>\n            </div>\n            <hr class=\"mb-3\">\n            <div *ngIf=\"environment.DISPLAY_TICKETED_SEAT\">\n                <div *ngFor=\"let acceptedOffer of eventOrder.data\">\n                    <p>\n                        <span *ngIf=\"acceptedOffer.itemOffered.reservedTicket.ticketedSeat\">\n                            {{ acceptedOffer.itemOffered.reservedTicket.ticketedSeat.seatNumber }}&nbsp;/&nbsp;</span>{{ acceptedOffer.itemOffered.reservedTicket.ticketType.name | changeLanguage }}&nbsp;/&nbsp;{{\n                            getTicketPrice(acceptedOffer).single | currency : 'JPY' }}\n                    </p>\n                </div>\n            </div>\n            <div *ngIf=\"!environment.DISPLAY_TICKETED_SEAT\">\n                <div *ngFor=\"let ticket of changeTicketCountByOrder(eventOrder.data)\">\n                    <p>\n                        {{ ticket.acceptedOffer.itemOffered.reservedTicket.ticketType.name | changeLanguage }}&nbsp;/&nbsp;{{\n                            getTicketPrice(ticket.acceptedOffer).single | currency : 'JPY' }}&nbsp;×&nbsp;{{ ticket.count }}\n                    </p>\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"mb-4 px-3 bg-white\">\n            <div class=\"py-3 border-bottom border-gray\">\n                <div class=\"row align-items-center\">\n                    <p class=\"mb-2 mb-md-0 col-md-4\">{{ 'common.customerName' | translate }}</p>\n                    <p class=\"col-md-8\">{{ (order | async).order.customer.familyName }}\n                        {{ (order | async).order.customer.givenName }}</p>\n                </div>\n            </div>\n            <div class=\"py-3 border-bottom border-gray\">\n                <div class=\"row align-items-center\">\n                    <p class=\"mb-2 mb-md-0 col-md-4\">{{ 'common.email' | translate }}</p>\n                    <p class=\"col-md-8\">{{ (order | async).order.customer.email }}</p>\n                </div>\n            </div>\n            <div class=\"py-3\">\n                <div class=\"row align-items-center\">\n                    <p class=\"mb-2 mb-md-0 col-md-4\">{{ 'common.telephone' | translate }}</p>\n                    <p class=\"col-md-8\">{{ (order | async).order.customer.telephone | libphonenumberFormat }}</p>\n                </div>\n            </div>\n            <!-- <div class=\"py-3\" *ngIf=\"(order | async).order.price > 0\">\n                <div class=\"row align-items-center\">\n                    <p class=\"mb-2 mb-md-0 col-md-4\">{{ 'common.paymentMethod' | translate }}</p>\n                    <p class=\"col-md-8\">クレジットカード</p>\n                </div>\n            </div> -->\n        </div>\n    </div>\n\n    <div class=\"buttons mx-auto text-center\">\n        <button *ngIf=\"environment.INQUIRY_PRINT\"\n            [disabled]=\"(order | async).order.orderStatus !== orderStatus.OrderDelivered\" type=\"button\"\n            class=\"btn btn-primary btn-block py-3 mb-3\" (click)=\"print()\"\n            [disabled]=\"isLoading | async\">{{ 'inquiry.confirm.next' | translate }}</button>\n        <button *ngIf=\"environment.INQUIRY_CANCEL\"\n            [disabled]=\"(order | async).order.orderStatus === orderStatus.OrderReturned\" type=\"button\"\n            class=\"btn btn-danger btn-block py-3 mb-3\"\n            (click)=\"cancelConfirm()\">{{ 'inquiry.confirm.cancel' | translate }}</button>\n        <button type=\"button\" class=\"btn btn-link\"\n            routerLink=\"/inquiry/input\">{{ 'inquiry.confirm.prev' | translate }}</button>\n    </div>\n\n</div>";
    /***/
  },

  /***/
  "../../node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.html":
  /*!*******************************************************************************************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.html ***!
    \*******************************************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsAppModulesInquiryComponentsPagesInquiryInputInquiryInputComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"contents-width mx-auto px-3 py-5\">\n    <form [formGroup]=\"inquiryForm\">\n        <div class=\"mb-4\">\n            <h2 class=\"text-large mb-4 text-center font-weight-bold\">{{ 'inquiry.input.title' | translate }}</h2>\n            <p class=\"mb-4 text-md-center\" [innerHTML]=\"'inquiry.input.read' | translate\"></p>\n\n            <div class=\"inquiry-form mx-auto p-3 bg-white\">\n\n                <div class=\"form-group\">\n                    <label class=\"mb-2\" for=\"\">{{ 'common.confirmationNumber' | translate }}</label>\n                    <app-numeric-keypad *ngIf=\"environment.INQUIRY_INPUT_KEYPAD\" inputType=\"number\"\n                        [inputValue]=\"inquiryForm.controls.confirmationNumber.value\"\n                        (change)=\"changeConfirmationNumber($event)\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"confirmationNumber\"\n                            id=\"confirmationNumber\" [placeholder]=\"'form.placeholder.confirmationNumber' | translate\"\n                            readonly>\n                    </app-numeric-keypad>\n                    <input *ngIf=\"!environment.INQUIRY_INPUT_KEYPAD\" type=\"text\" class=\"form-control\"\n                        formControlName=\"confirmationNumber\" id=\"confirmationNumber\"\n                        [placeholder]=\"'form.placeholder.confirmationNumber' | translate\">\n                    <div *ngIf=\"inquiryForm.controls.confirmationNumber.invalid && inquiryForm.controls.confirmationNumber.touched\"\n                        class=\"mt-2\">\n                        <p *ngIf=\"inquiryForm.controls.confirmationNumber.errors.required\" class=\"text-danger\">\n                            {{ 'form.validation.required' | translate }}</p>\n                        <p *ngIf=\"inquiryForm.controls.confirmationNumber.errors.pattern\" class=\"text-danger\">\n                            {{ 'form.validation.number' | translate }}</p>\n                    </div>\n                </div>\n                <div class=\"form-group mb-0\">\n                    <label class=\"mb-2\" for=\"\">{{ 'common.telephone' | translate }}</label>\n                    <app-numeric-keypad *ngIf=\"environment.INQUIRY_INPUT_KEYPAD\" inputType=\"telephone\"\n                        [inputValue]=\"inquiryForm.controls.telephone.value\" (change)=\"changeTelephone($event)\">\n                        <input type=\"password\" class=\"form-control\" formControlName=\"telephone\" id=\"telephone\"\n                            [placeholder]=\"'form.placeholder.telephone' | translate\" readonly>\n                    </app-numeric-keypad>\n                    <input *ngIf=\"!environment.INQUIRY_INPUT_KEYPAD\" type=\"password\" class=\"form-control\"\n                        formControlName=\"telephone\" id=\"telephone\"\n                        [placeholder]=\"'form.placeholder.telephone' | translate\">\n                    <div *ngIf=\"inquiryForm.controls.telephone.invalid && inquiryForm.controls.telephone.touched\"\n                        class=\"mt-2\">\n                        <p *ngIf=\"inquiryForm.controls.telephone.errors.required\" class=\"text-danger\">\n                            {{ 'form.validation.required' | translate }}</p>\n                        <p *ngIf=\"inquiryForm.controls.telephone.errors.minlength\" class=\"text-danger\">\n                            {{ 'form.validation.minlength' | translate: { value: inquiryForm.controls.telephone.errors.minlength.requiredLength } }}\n                        </p>\n                        <p *ngIf=\"inquiryForm.controls.telephone.errors.maxlength\" class=\"text-danger\">\n                            {{ 'form.validation.maxlength' | translate: { value: inquiryForm.controls.telephone.errors.maxlength.requiredLength } }}\n                        </p>\n                        <p *ngIf=\"inquiryForm.controls.telephone.errors.telephone\" class=\"text-danger\">\n                            {{ 'form.validation.telephone' | translate }}</p>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"buttons mx-auto text-center\">\n            <button type=\"submit\" [disabled]=\"isLoading | async\" class=\"btn btn-primary btn-block py-3 mb-3\"\n                (click)=\"onSubmit()\">{{ 'inquiry.input.next' | translate }}</button>\n            <button type=\"button\" class=\"btn btn-link\"\n                routerLink=\"/purchase/root\">{{ 'inquiry.input.prev' | translate }}</button>\n        </div>\n    </form>\n</div>";
    /***/
  },

  /***/
  "../../node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.html":
  /*!*******************************************************************************************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.html ***!
    \*******************************************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsAppModulesInquiryComponentsPagesInquiryPrintInquiryPrintComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"contents-width mx-auto px-3 py-5\">\n    <div class=\"mb-4\">\n        <h2 class=\"text-large mb-4 text-center font-weight-bold\">{{ 'inquiry.print.title' | translate }}</h2>\n        <p class=\"mb-4 text-md-center\" [innerHTML]=\"'inquiry.print.read' | translate\"></p>\n    </div>\n\n    <div class=\"buttons mx-auto text-center\">\n        <button type=\"button\" class=\"btn btn-primary btn-block py-3\" routerLink=\"/inquiry/input\">\n            {{ 'inquiry.print.prev' | translate }}\n        </button>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.scss":
  /*!*********************************************************************************************!*\
    !*** ./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.scss ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function appModulesInquiryComponentsPagesInquiryConfirmInquiryConfirmComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY2xpZW50L2FwcC9tb2R1bGVzL2lucXVpcnkvY29tcG9uZW50cy9wYWdlcy9pbnF1aXJ5LWNvbmZpcm0vaW5xdWlyeS1jb25maXJtLmNvbXBvbmVudC5zY3NzIn0= */";
    /***/
  },

  /***/
  "./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.ts":
  /*!*******************************************************************************************!*\
    !*** ./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.ts ***!
    \*******************************************************************************************/

  /*! exports provided: InquiryConfirmComponent */

  /***/
  function appModulesInquiryComponentsPagesInquiryConfirmInquiryConfirmComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InquiryConfirmComponent", function () {
      return InquiryConfirmComponent;
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


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @cinerino/api-javascript-client */
    "../../node_modules/@cinerino/api-javascript-client/lib/index.js");
    /* harmony import */


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2___default =
    /*#__PURE__*/
    __webpack_require__.n(_cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ngrx/store */
    "../../node_modules/@ngrx/store/fesm2015/store.js");
    /* harmony import */


    var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ngx-translate/core */
    "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! moment */
    "../../node_modules/moment/moment.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_5___default =
    /*#__PURE__*/
    __webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../../../../../environments/environment */
    "./environments/environment.ts");
    /* harmony import */


    var _functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../../../../functions */
    "./app/functions/index.ts");
    /* harmony import */


    var _services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../../../../services */
    "./app/services/index.ts");
    /* harmony import */


    var _store_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
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

    var InquiryConfirmComponent =
    /*#__PURE__*/
    function () {
      function InquiryConfirmComponent(store, router, userService, utilService, orderService, reservationService, translate) {
        _classCallCheck(this, InquiryConfirmComponent);

        this.store = store;
        this.router = router;
        this.userService = userService;
        this.utilService = utilService;
        this.orderService = orderService;
        this.reservationService = reservationService;
        this.translate = translate;
        this.moment = moment__WEBPACK_IMPORTED_MODULE_5__;
        this.getTicketPrice = _functions__WEBPACK_IMPORTED_MODULE_7__["getTicketPrice"];
        this.changeTicketCountByOrder = _functions__WEBPACK_IMPORTED_MODULE_7__["changeTicketCountByOrder"];
        this.orderStatus = _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__["factory"].orderStatus;
        this.environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["getEnvironment"])();
      }

      _createClass(InquiryConfirmComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.eventOrders = [];
          this.order = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getOrder"]));
          this.user = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getUser"]));
          this.reservation = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getReservation"]));
          this.isLoading = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getLoading"]));
          this.error = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getError"]));
          this.order.subscribe(function (value) {
            if (value.order === undefined) {
              _this.router.navigate(['/error']);

              return;
            }

            var order = value.order;
            _this.eventOrders = Object(_functions__WEBPACK_IMPORTED_MODULE_7__["order2EventOrders"])({
              order: order
            });
          }).unsubscribe();

          if (this.environment.INQUIRY_PRINT_WAIT_TIME !== '') {
            var time = Number(this.environment.INQUIRY_PRINT_WAIT_TIME);
            this.timer = setTimeout(function () {
              _this.router.navigate(['/inquiry/input']);
            }, time);
          }
        }
        /**
         * キャンセル確認
         */

      }, {
        key: "cancelConfirm",
        value: function cancelConfirm() {
          var _this2 = this;

          this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('inquiry.confirm.confirm.cancel'),
            cb: function cb() {
              return __awaiter(_this2, void 0, void 0,
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var userData, orderData, order;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return this.userService.getData();

                      case 3:
                        userData = _context.sent;
                        _context.next = 6;
                        return this.orderService.getData();

                      case 6:
                        orderData = _context.sent;
                        order = orderData.order;

                        if (!(order === undefined)) {
                          _context.next = 11;
                          break;
                        }

                        this.utilService.openAlert({
                          title: this.translate.instant('common.error'),
                          body: "\n                            <p class=\"mb-4\">".concat(this.translate.instant('inquiry.confirm.alert.cancel'), "</p>\n                                <div class=\"p-3 bg-light-gray select-text\">\n                                <code>order undefined</code>\n                            </div>")
                        });
                        return _context.abrupt("return");

                      case 11:
                        _context.next = 13;
                        return this.orderService.cancel({
                          orders: [order],
                          language: userData.language
                        });

                      case 13:
                        _context.next = 15;
                        return this.orderService.inquiry({
                          confirmationNumber: order.confirmationNumber,
                          customer: {
                            telephone: order.customer.telephone
                          }
                        });

                      case 15:
                        _context.next = 21;
                        break;

                      case 17:
                        _context.prev = 17;
                        _context.t0 = _context["catch"](0);
                        console.error(_context.t0);
                        this.utilService.openAlert({
                          title: this.translate.instant('common.error'),
                          body: "\n                        <p class=\"mb-4\">".concat(this.translate.instant('inquiry.confirm.alert.cancel'), "</p>\n                            <div class=\"p-3 bg-light-gray select-text\">\n                            <code>").concat(JSON.stringify(_context.t0), "</code>\n                        </div>")
                        });

                      case 21:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[0, 17]]);
              }));
            }
          });
        }
        /**
         * 印刷
         */

      }, {
        key: "print",
        value: function print() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var today, limit, findResult, orderData, user, reservationNumbers, reservationData, checkedInResult, orders, pos, printer;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    today = moment__WEBPACK_IMPORTED_MODULE_5__().format('YYYYMMDD');
                    limit = moment__WEBPACK_IMPORTED_MODULE_5__(today).add(this.environment.INQUIRY_PRINT_EXPIRED_VALUE, this.environment.INQUIRY_PRINT_EXPIRED_UNIT).format('YYYYMMDD');
                    findResult = this.eventOrders.find(function (o) {
                      return moment__WEBPACK_IMPORTED_MODULE_5__(o.event.startDate).format('YYYYMMDD') < limit;
                    });

                    if (!(findResult !== undefined)) {
                      _context2.next = 6;
                      break;
                    }

                    this.utilService.openAlert({
                      title: this.translate.instant('common.error'),
                      body: this.translate.instant('inquiry.confirm.alert.printExpired')
                    });
                    return _context2.abrupt("return");

                  case 6:
                    if (this.timer !== undefined) {
                      clearTimeout(this.timer);
                    }

                    _context2.prev = 7;
                    _context2.next = 10;
                    return this.orderService.getData();

                  case 10:
                    orderData = _context2.sent;
                    _context2.next = 13;
                    return this.userService.getData();

                  case 13:
                    user = _context2.sent;

                    if (!(orderData.order === undefined || user.pos === undefined || user.printer === undefined)) {
                      _context2.next = 17;
                      break;
                    }

                    this.router.navigate(['/error']);
                    return _context2.abrupt("return");

                  case 17:
                    // 二重発券防止
                    reservationNumbers = orderData.order.acceptedOffers.map(function (offers) {
                      if (offers.itemOffered.typeOf !== _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__["factory"].chevre.reservationType.EventReservation) {
                        return '';
                      }

                      return offers.itemOffered.reservationNumber;
                    });
                    _context2.next = 20;
                    return this.reservationService.search({
                      typeOf: _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__["factory"].chevre.reservationType.EventReservation,
                      reservationNumbers: reservationNumbers
                    });

                  case 20:
                    _context2.next = 22;
                    return this.reservationService.getData();

                  case 22:
                    reservationData = _context2.sent;
                    checkedInResult = reservationData.reservations.filter(function (r) {
                      return r.checkedIn;
                    });

                    if (!(checkedInResult.length > 0)) {
                      _context2.next = 27;
                      break;
                    }

                    this.utilService.openAlert({
                      title: this.translate.instant('common.error'),
                      body: this.translate.instant('inquiry.confirm.alert.doubleTicketing')
                    });
                    return _context2.abrupt("return");

                  case 27:
                    // 印刷
                    orders = [orderData.order];
                    pos = user.pos;
                    printer = user.printer;
                    _context2.next = 32;
                    return this.orderService.print({
                      orders: orders,
                      pos: pos,
                      printer: printer
                    });

                  case 32:
                    this.router.navigate(['/inquiry/print']);
                    _context2.next = 39;
                    break;

                  case 35:
                    _context2.prev = 35;
                    _context2.t0 = _context2["catch"](7);
                    console.error(_context2.t0);
                    this.utilService.openAlert({
                      title: this.translate.instant('common.error'),
                      body: "\n                <p class=\"mb-4\">".concat(this.translate.instant('inquiry.confirm.alert.print'), "</p>\n                    <div class=\"p-3 bg-light-gray select-text\">\n                    <code>").concat(_context2.t0, "</code>\n                </div>")
                    });

                  case 39:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[7, 35]]);
          }));
        }
      }]);

      return InquiryConfirmComponent;
    }();

    InquiryConfirmComponent.ctorParameters = function () {
      return [{
        type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["UserService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["UtilService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["OrderService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_8__["ReservationService"]
      }, {
        type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]
      }];
    };

    InquiryConfirmComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-inquiry-confirm',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./inquiry-confirm.component.html */
      "../../node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./inquiry-confirm.component.scss */
      "./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.scss"))["default"]]
    }), __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services__WEBPACK_IMPORTED_MODULE_8__["UserService"], _services__WEBPACK_IMPORTED_MODULE_8__["UtilService"], _services__WEBPACK_IMPORTED_MODULE_8__["OrderService"], _services__WEBPACK_IMPORTED_MODULE_8__["ReservationService"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])], InquiryConfirmComponent);
    /***/
  },

  /***/
  "./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.scss":
  /*!*****************************************************************************************!*\
    !*** ./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.scss ***!
    \*****************************************************************************************/

  /*! exports provided: default */

  /***/
  function appModulesInquiryComponentsPagesInquiryInputInquiryInputComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".inquiry-form {\n  max-width: 500px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvYXBwL21vZHVsZXMvaW5xdWlyeS9jb21wb25lbnRzL3BhZ2VzL2lucXVpcnktaW5wdXQvQzpcXFVzZXJzXFxoYXRhZ3VjaGlcXERlc2t0b3BcXHdvcmtzcGFjZVxcQ2luZXJpbm9cXHBvcy9zcmNcXGNsaWVudFxcYXBwXFxtb2R1bGVzXFxpbnF1aXJ5XFxjb21wb25lbnRzXFxwYWdlc1xcaW5xdWlyeS1pbnB1dFxcaW5xdWlyeS1pbnB1dC5jb21wb25lbnQuc2NzcyIsInNyYy9jbGllbnQvYXBwL21vZHVsZXMvaW5xdWlyeS9jb21wb25lbnRzL3BhZ2VzL2lucXVpcnktaW5wdXQvaW5xdWlyeS1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2NsaWVudC9hcHAvbW9kdWxlcy9pbnF1aXJ5L2NvbXBvbmVudHMvcGFnZXMvaW5xdWlyeS1pbnB1dC9pbnF1aXJ5LWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmlucXVpcnktZm9ybSAge1xuICAgIG1heC13aWR0aDogNTAwcHg7XG59IiwiLmlucXVpcnktZm9ybSB7XG4gIG1heC13aWR0aDogNTAwcHg7XG59Il19 */";
    /***/
  },

  /***/
  "./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.ts":
  /*!***************************************************************************************!*\
    !*** ./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.ts ***!
    \***************************************************************************************/

  /*! exports provided: InquiryInputComponent */

  /***/
  function appModulesInquiryComponentsPagesInquiryInputInquiryInputComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InquiryInputComponent", function () {
      return InquiryInputComponent;
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


    var _services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../../../../services */
    "./app/services/index.ts");
    /* harmony import */


    var _store_reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
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

    var InquiryInputComponent =
    /*#__PURE__*/
    function () {
      function InquiryInputComponent(store, formBuilder, utilService, orderService, router, translate) {
        _classCallCheck(this, InquiryInputComponent);

        this.store = store;
        this.formBuilder = formBuilder;
        this.utilService = utilService;
        this.orderService = orderService;
        this.router = router;
        this.translate = translate;
        this.environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["getEnvironment"])();
      }

      _createClass(InquiryInputComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.isLoading = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_8__["getLoading"]));
          this.createInquiryForm();
        }
        /**
         * 照会フォーム作成
         */

      }, {
        key: "createInquiryForm",
        value: function createInquiryForm() {
          var TEL_MAX_LENGTH = 15;
          var TEL_MIN_LENGTH = 9;
          this.inquiryForm = this.formBuilder.group({
            confirmationNumber: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/^[0-9]+$/)]],
            telephone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(TEL_MAX_LENGTH), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(TEL_MIN_LENGTH), function (control) {
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
            }]]
          });
        }
        /**
         * 照会
         */

      }, {
        key: "onSubmit",
        value: function onSubmit() {
          return __awaiter(this, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            var _this3 = this;

            var confirmationNumber, telephone;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    Object.keys(this.inquiryForm.controls).forEach(function (key) {
                      _this3.inquiryForm.controls[key].markAsTouched();
                    });
                    this.inquiryForm.controls.confirmationNumber.setValue(document.getElementById('confirmationNumber').value);
                    this.inquiryForm.controls.telephone.setValue(document.getElementById('telephone').value);

                    if (!this.inquiryForm.invalid) {
                      _context3.next = 5;
                      break;
                    }

                    return _context3.abrupt("return");

                  case 5:
                    _context3.prev = 5;
                    confirmationNumber = this.inquiryForm.controls.confirmationNumber.value;
                    telephone = this.inquiryForm.controls.telephone.value;
                    _context3.next = 10;
                    return this.orderService.inquiry({
                      confirmationNumber: confirmationNumber,
                      customer: {
                        telephone: telephone
                      }
                    });

                  case 10:
                    this.router.navigate(['/inquiry/confirm']);
                    _context3.next = 16;
                    break;

                  case 13:
                    _context3.prev = 13;
                    _context3.t0 = _context3["catch"](5);
                    this.utilService.openAlert({
                      title: this.translate.instant('common.error'),
                      body: this.translate.instant('inquiry.input.validation')
                    });

                  case 16:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[5, 13]]);
          }));
        }
        /**
         * 確認番号変更
         */

      }, {
        key: "changeConfirmationNumber",
        value: function changeConfirmationNumber(value) {
          this.inquiryForm.controls.confirmationNumber.setValue(value);
        }
        /**
         * 電話番号変更
         */

      }, {
        key: "changeTelephone",
        value: function changeTelephone(value) {
          this.inquiryForm.controls.telephone.setValue(value);
        }
      }]);

      return InquiryInputComponent;
    }();

    InquiryInputComponent.ctorParameters = function () {
      return [{
        type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_7__["UtilService"]
      }, {
        type: _services__WEBPACK_IMPORTED_MODULE_7__["OrderService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]
      }];
    };

    InquiryInputComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-inquiry-input',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./inquiry-input.component.html */
      "../../node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./inquiry-input.component.scss */
      "./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.scss"))["default"]]
    }), __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _services__WEBPACK_IMPORTED_MODULE_7__["UtilService"], _services__WEBPACK_IMPORTED_MODULE_7__["OrderService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])], InquiryInputComponent);
    /***/
  },

  /***/
  "./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.scss":
  /*!*****************************************************************************************!*\
    !*** ./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.scss ***!
    \*****************************************************************************************/

  /*! exports provided: default */

  /***/
  function appModulesInquiryComponentsPagesInquiryPrintInquiryPrintComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY2xpZW50L2FwcC9tb2R1bGVzL2lucXVpcnkvY29tcG9uZW50cy9wYWdlcy9pbnF1aXJ5LXByaW50L2lucXVpcnktcHJpbnQuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.ts":
  /*!***************************************************************************************!*\
    !*** ./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.ts ***!
    \***************************************************************************************/

  /*! exports provided: InquiryPrintComponent */

  /***/
  function appModulesInquiryComponentsPagesInquiryPrintInquiryPrintComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InquiryPrintComponent", function () {
      return InquiryPrintComponent;
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

    var InquiryPrintComponent =
    /*#__PURE__*/
    function () {
      function InquiryPrintComponent(router) {
        _classCallCheck(this, InquiryPrintComponent);

        this.router = router;
        this.environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["getEnvironment"])();
      }
      /**
       * 初期化
       */


      _createClass(InquiryPrintComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this4 = this;

          if (this.environment.INQUIRY_PRINT_SUCCESS_WAIT_TIME === '') {
            return;
          }

          var time = Number(this.environment.INQUIRY_PRINT_SUCCESS_WAIT_TIME);
          this.timer = setTimeout(function () {
            _this4.router.navigate(['/inquiry/input']);
          }, time);
        }
        /**
         * 破棄
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          if (this.timer === undefined) {
            return;
          }

          clearTimeout(this.timer);
        }
      }]);

      return InquiryPrintComponent;
    }();

    InquiryPrintComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }];
    };

    InquiryPrintComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-inquiry-print',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./inquiry-print.component.html */
      "../../node_modules/raw-loader/dist/cjs.js!./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.html"))["default"],
      styles: [__importDefault(__webpack_require__(
      /*! ./inquiry-print.component.scss */
      "./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.scss"))["default"]]
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])], InquiryPrintComponent);
    /***/
  },

  /***/
  "./app/modules/inquiry/inquiry-routing.module.ts":
  /*!*******************************************************!*\
    !*** ./app/modules/inquiry/inquiry-routing.module.ts ***!
    \*******************************************************/

  /*! exports provided: InquiryRoutingModule */

  /***/
  function appModulesInquiryInquiryRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InquiryRoutingModule", function () {
      return InquiryRoutingModule;
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


    var _canActivates_setting_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../canActivates/setting-guard.service */
    "./app/canActivates/setting-guard.service.ts");
    /* harmony import */


    var _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../shared/components/pages/base/base.component */
    "./app/modules/shared/components/pages/base/base.component.ts");
    /* harmony import */


    var _components_pages_inquiry_confirm_inquiry_confirm_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./components/pages/inquiry-confirm/inquiry-confirm.component */
    "./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.ts");
    /* harmony import */


    var _components_pages_inquiry_input_inquiry_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./components/pages/inquiry-input/inquiry-input.component */
    "./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.ts");
    /* harmony import */


    var _components_pages_inquiry_print_inquiry_print_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./components/pages/inquiry-print/inquiry-print.component */
    "./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.ts");

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
      component: _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_4__["BaseComponent"],
      canActivate: [_canActivates__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"], _canActivates_setting_guard_service__WEBPACK_IMPORTED_MODULE_3__["SettingGuardService"]],
      children: [{
        path: 'input',
        component: _components_pages_inquiry_input_inquiry_input_component__WEBPACK_IMPORTED_MODULE_6__["InquiryInputComponent"]
      }, {
        path: 'confirm',
        component: _components_pages_inquiry_confirm_inquiry_confirm_component__WEBPACK_IMPORTED_MODULE_5__["InquiryConfirmComponent"]
      }, {
        path: 'print',
        component: _components_pages_inquiry_print_inquiry_print_component__WEBPACK_IMPORTED_MODULE_7__["InquiryPrintComponent"]
      }]
    }];

    var InquiryRoutingModule = function InquiryRoutingModule() {
      _classCallCheck(this, InquiryRoutingModule);
    };

    InquiryRoutingModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })], InquiryRoutingModule);
    /***/
  },

  /***/
  "./app/modules/inquiry/inquiry.module.ts":
  /*!***********************************************!*\
    !*** ./app/modules/inquiry/inquiry.module.ts ***!
    \***********************************************/

  /*! exports provided: InquiryModule */

  /***/
  function appModulesInquiryInquiryModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InquiryModule", function () {
      return InquiryModule;
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


    var _components_pages_inquiry_confirm_inquiry_confirm_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/pages/inquiry-confirm/inquiry-confirm.component */
    "./app/modules/inquiry/components/pages/inquiry-confirm/inquiry-confirm.component.ts");
    /* harmony import */


    var _components_pages_inquiry_input_inquiry_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./components/pages/inquiry-input/inquiry-input.component */
    "./app/modules/inquiry/components/pages/inquiry-input/inquiry-input.component.ts");
    /* harmony import */


    var _components_pages_inquiry_print_inquiry_print_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./components/pages/inquiry-print/inquiry-print.component */
    "./app/modules/inquiry/components/pages/inquiry-print/inquiry-print.component.ts");
    /* harmony import */


    var _inquiry_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./inquiry-routing.module */
    "./app/modules/inquiry/inquiry-routing.module.ts");

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

    var InquiryModule = function InquiryModule() {
      _classCallCheck(this, InquiryModule);
    };

    InquiryModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_components_pages_inquiry_input_inquiry_input_component__WEBPACK_IMPORTED_MODULE_4__["InquiryInputComponent"], _components_pages_inquiry_confirm_inquiry_confirm_component__WEBPACK_IMPORTED_MODULE_3__["InquiryConfirmComponent"], _components_pages_inquiry_print_inquiry_print_component__WEBPACK_IMPORTED_MODULE_5__["InquiryPrintComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _inquiry_routing_module__WEBPACK_IMPORTED_MODULE_6__["InquiryRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]]
    })], InquiryModule);
    /***/
  }
}]);
//# sourceMappingURL=modules-inquiry-inquiry-module-es5.js.map