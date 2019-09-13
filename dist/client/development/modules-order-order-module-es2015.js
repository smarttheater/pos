(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-order-order-module"],{

/***/ "../../node_modules/raw-loader/dist/cjs.js!./app/modules/order/components/pages/order-search/order-search.component.html":
/*!***************************************************************************************************************************************************************************!*\
  !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/order/components/pages/order-search/order-search.component.html ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"contents-width mx-auto px-3 py-5\">\n    <h2 class=\"text-large mb-4 text-center font-weight-bold\">{{ 'order.search.title' | translate }}</h2>\n    <p class=\"mb-4 text-md-center\" [innerHTML]=\"'order.search.read' | translate\"></p>\n    <div class=\"conditions p-3 bg-white mb-4\">\n        <form (submit)=\"orderSearch(true)\">\n            <div class=\"form-row\">\n                <div class=\"form-group col-md-3\">\n                    <label for=\"orderDateFrom\"\n                        class=\"mb-2\">{{ 'order.search.conditions.orderDateFrom' | translate }}</label>\n                    <input type=\"text\" name=\"orderDateFrom\" id=\"orderDateFrom\" placeholder=\"YYYY/MM/DD\"\n                        class=\"form-control\" #orderDateFrom=\"bsDatepicker\" bsDatepicker\n                        [(ngModel)]=\"conditions.orderDateFrom\"\n                        [bsConfig]=\"{ dateInputFormat: 'YYYY/MM/DD', adaptivePosition: true, showWeekNumbers: false }\"\n                        readonly (onShown)=\"onShowPicker($event)\" (click)=\"setDatePicker()\">\n                    <!-- <input type=\"date\" class=\"form-control\" name=\"orderDateFrom\" id=\"orderDateFrom\"\n                        [(ngModel)]=\"conditions.orderDateFrom\" placeholder=\"{{ moment().format('YYYY-MM-DD') }}\"> -->\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"orderDateThrough\"\n                        class=\"mb-2\">{{ 'order.search.conditions.orderDateThrough' | translate }}</label>\n                    <input type=\"text\" name=\"orderDateThrough\" id=\"orderDateThrough\" placeholder=\"YYYY/MM/DD\"\n                        class=\"form-control\" #orderDateThrough=\"bsDatepicker\" bsDatepicker\n                        [(ngModel)]=\"conditions.orderDateThrough\"\n                        [bsConfig]=\"{ dateInputFormat: 'YYYY/MM/DD', adaptivePosition: true, showWeekNumbers: false }\"\n                        readonly (onShown)=\"onShowPicker($event)\" (click)=\"setDatePicker()\">\n                    <!-- <input type=\"date\" class=\"form-control\" name=\"orderDateThrough\" id=\"orderDateThrough\"\n                        [(ngModel)]=\"conditions.orderDateThrough\" placeholder=\"{{ moment().format('YYYY-MM-DD') }}\"> -->\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"confirmationNumber\" class=\"mb-2\">{{ 'common.confirmationNumber' | translate }}</label>\n                    <input type=\"text\" class=\"form-control\" name=\"confirmationNumber\" id=\"confirmationNumber\"\n                        [(ngModel)]=\"conditions.confirmationNumber\"\n                        placeholder=\"{{ 'common.confirmationNumber' | translate }}\">\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"orderNumber\" class=\"mb-2\">{{ 'common.orderNumber' | translate }}</label>\n                    <input type=\"text\" class=\"form-control\" name=\"orderNumber\" id=\"orderNumber\"\n                        [(ngModel)]=\"conditions.orderNumber\" placeholder=\"{{ 'common.orderNumber' | translate }}\">\n                </div>\n            </div>\n            <div class=\"form-row\">\n                <div class=\"form-group col-md-3\">\n                    <label for=\"familyName\" class=\"mb-2\">{{ 'common.familyName' | translate }}</label>\n                    <input type=\"text\" class=\"form-control\" name=\"familyName\" id=\"familyName\"\n                        [(ngModel)]=\"conditions.customer.familyName\"\n                        placeholder=\"{{ 'common.familyName' | translate }}\">\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"givenName\" class=\"mb-2\">{{ 'common.givenName' | translate }}</label>\n                    <input type=\"text\" class=\"form-control\" name=\"givenName\" id=\"givenName\"\n                        [(ngModel)]=\"conditions.customer.givenName\" placeholder=\"{{ 'common.givenName' | translate }}\">\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"email\" class=\"mb-2\">{{ 'common.email' | translate }}</label>\n                    <input type=\"email\" class=\"form-control\" name=\"email\" id=\"email\"\n                        [(ngModel)]=\"conditions.customer.email\" placeholder=\"{{ 'common.email' | translate }}\">\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"telephone\" class=\"mb-2\">{{ 'order.search.conditions.telephone' | translate }}</label>\n                    <input type=\"telephone\" class=\"form-control\" name=\"telephone\" id=\"telephone\"\n                        [(ngModel)]=\"conditions.customer.telephone\"\n                        placeholder=\"{{ 'order.search.conditions.telephone' | translate }}\">\n                </div>\n            </div>\n            <div class=\"form-row\">\n                <div class=\"form-group col-md-3\">\n                    <label for=\"orderStatus\" class=\"mb-2\">{{ 'common.orderStatus' | translate }}</label>\n                    <select class=\"form-control\" name=\"orderStatus\" id=\"orderStatus\"\n                        [(ngModel)]=\"conditions.orderStatus\">\n                        <option value=\"\">{{ 'common.all' | translate }}</option>\n                        <!-- <option [value]=\"orderStatus.OrderCancelled\">{{ 'order.search.orderStatus.orderCancelled' | translate }}</option> -->\n                        <option [value]=\"orderStatus.OrderDelivered\">\n                            {{ 'order.search.orderStatus.orderDelivered' | translate }}</option>\n                        <!-- <option [value]=\"orderStatus.OrderPaymentDue\">{{ 'order.search.orderStatus.orderPaymentDue' | translate }}</option> -->\n                        <!-- <option [value]=\"orderStatus.OrderPickupAvailable\">{{ 'order.search.orderStatus.orderPickupAvailable' | translate }}</option> -->\n                        <!-- <option [value]=\"orderStatus.OrderProblem\">{{ 'order.search.orderStatus.orderProblem' | translate }}</option> -->\n                        <option [value]=\"orderStatus.OrderProcessing\">\n                            {{ 'order.search.orderStatus.orderProcessing' | translate }}</option>\n                        <option [value]=\"orderStatus.OrderReturned\">\n                            {{ 'order.search.orderStatus.orderReturned' | translate }}</option>\n                    </select>\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"paymentMethodType\" class=\"mb-2\">{{ 'common.paymentMethod' | translate }}</label>\n                    <select class=\"form-control\" name=\"paymentMethodType\" id=\"paymentMethodType\"\n                        [(ngModel)]=\"conditions.paymentMethodType\">\n                        <option value=\"\">{{ 'common.all' | translate }}</option>\n                        <option [value]=\"paymentMethodType.Cash\">{{ 'common.paymentMethodType.cash' | translate }}\n                        </option>\n                        <option [value]=\"paymentMethodType.Account\">{{ 'common.paymentMethodType.account' | translate }}\n                        </option>\n                        <option [value]=\"paymentMethodType.EMoney\">{{ 'common.paymentMethodType.eMoney' | translate }}\n                        </option>\n                        <option [value]=\"paymentMethodType.CreditCard\">\n                            {{ 'common.paymentMethodType.creditCard' | translate }}</option>\n                        <option [value]=\"paymentMethodType.MovieTicket\">\n                            {{ 'common.paymentMethodType.movieTicket' | translate }}</option>\n                        <option [value]=\"paymentMethodType.Others\">{{ 'common.paymentMethodType.others' | translate }}\n                        </option>\n                    </select>\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"eventStartDateFrom\"\n                        class=\"mb-2\">{{ 'order.search.conditions.eventStartDateFrom' | translate }}</label>\n                    <input type=\"text\" name=\"eventStartDateFrom\" id=\"eventStartDateFrom\" placeholder=\"YYYY/MM/DD\"\n                        class=\"form-control\" #eventStartDateFrom=\"bsDatepicker\" bsDatepicker\n                        [(ngModel)]=\"conditions.eventStartDateFrom\"\n                        [bsConfig]=\"{ dateInputFormat: 'YYYY/MM/DD', adaptivePosition: true, showWeekNumbers: false }\"\n                        readonly (onShown)=\"onShowPicker($event)\" (click)=\"setDatePicker()\">\n                </div>\n                <div class=\"form-group col-md-3\">\n                    <label for=\"eventStartDateThrough\"\n                        class=\"mb-2\">{{ 'order.search.conditions.eventStartDateThrough' | translate }}</label>\n                    <input type=\"text\" name=\"eventStartDateThrough\" id=\"eventStartDateThrough\" placeholder=\"YYYY/MM/DD\"\n                        class=\"form-control\" #eventStartDateThrough=\"bsDatepicker\" bsDatepicker\n                        [(ngModel)]=\"conditions.eventStartDateThrough\"\n                        [bsConfig]=\"{ dateInputFormat: 'YYYY/MM/DD', adaptivePosition: true, showWeekNumbers: false }\"\n                        readonly (onShown)=\"onShowPicker($event)\" (click)=\"setDatePicker()\">\n                </div>\n            </div>\n            <div class=\"form-row\">\n                <div class=\"form-group col-md-3\">\n                    <label for=\"posId\" class=\"mb-2\">{{ 'order.search.conditions.pos' | translate }}</label>\n                    <select class=\"form-control\" name=\"posId\" id=\"posId\" [(ngModel)]=\"conditions.posId\">\n                        <option value=\"\">{{ 'common.all' | translate }}</option>\n                        <option *ngFor=\"let pos of (user | async).seller.hasPOS\" [value]=\"pos.id\">{{ pos.name }}\n                        </option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"buttons mx-auto text-center\">\n                <button type=\"submit\" class=\"btn btn-primary btn-block py-3 mb-3\"\n                    [disabled]=\"isLoading | async\">{{ 'order.search.search' | translate }}</button>\n                <button type=\"button\" class=\"btn btn-outline-primary btn-block py-3\"\n                    (click)=\"searchConditionClear()\">{{ 'order.search.clear' | translate }}</button>\n            </div>\n        </form>\n    </div>\n    <p *ngIf=\"(order | async).orders.length === 0\">{{ 'order.search.notfound' | translate }}</p>\n\n    <div *ngIf=\"(order | async).orders.length > 0\">\n        <div class=\"mb-3 text-md-left text-center\">\n            <button class=\"btn btn-primary\" (click)=\"downloadCsv()\"\n                [disabled]=\"isDownload\">{{ 'order.search.download' | translate }}</button>\n        </div>\n        <div class=\"d-md-flex align-items-center justify-content-between mb-4\">\n            <div class=\"text-md-right text-center mb-3 mb-md-0 order-2\">\n                <div class=\"d-inline-block\">\n                    <pagination [(ngModel)]=\"confirmedConditions.page\" [totalItems]=\"(order | async).pageCount * 10\"\n                        [maxSize]=\"5\" [boundaryLinks]=\"false\" previousText=\"&lsaquo;\" nextText=\"&rsaquo;\"\n                        firstText=\"&laquo;\" lastText=\"&raquo;\" (pageChanged)=\"orderSearch(false, $event)\"></pagination>\n                </div>\n            </div>\n\n            <div class=\"form-group text-center text-md-left mb-3 mb-md-0 order-1\">\n                <select class=\"form-control d-inline-block w-auto mr-2\" name=\"actionSelect\" id=\"actionSelect\"\n                    [(ngModel)]=\"actionSelect\">\n                    <option value=\"\">{{ 'order.search.unselected' | translate }}</option>\n                    <option [value]=\"OrderActions.Cancel\">{{ 'order.search.cancel' | translate }}</option>\n                    <option [value]=\"OrderActions.Print\">{{ 'order.search.print' | translate }}</option>\n                </select>\n                <button type=\"button\" class=\"btn btn-primary py-2 px-4\"\n                    (click)=\"selecedtAction()\">{{ 'order.search.apply' | translate }}</button>\n            </div>\n        </div>\n\n        <div class=\"scroll-horizontal\">\n            <table class=\"table bg-white border text-small mb-0 border border-gray\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\"></th>\n                        <th scope=\"col\">{{ 'common.orderDate' | translate }}</th>\n                        <th scope=\"col\">{{ 'common.confirmationNumber' | translate }}</th>\n                        <th scope=\"col\">{{ 'common.event' | translate }}</th>\n                        <th scope=\"col\">{{ 'common.customer' | translate }}</th>\n                        <!-- <th scope=\"col\">決済方法</th> -->\n                        <!-- <th scope=\"col\">注文ステータス</th> -->\n                        <th scope=\"col\"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let order of (order | async).orders let index = index\"\n                        [class.bg-light-gray]=\"index % 2 === 0\">\n                        <td class=\"align-middle text-large text-center\">\n                            <div *ngIf=\"order.orderStatus === orderStatus.OrderDelivered\">\n                                <i *ngIf=\"!isSelected(order)\" class=\"far fa-square pointer\"\n                                    (click)=\"addOrder(order)\"></i>\n                                <i *ngIf=\"isSelected(order)\" class=\"far fa-check-square pointer\"\n                                    (click)=\"removeOrder(order)\"></i>\n                            </div>\n                            <div *ngIf=\"order.orderStatus !== orderStatus.OrderDelivered\">\n                                <i class=\"far fa-square opacity-0\"></i>\n                            </div>\n                        </td>\n                        <td class=\"align-middle\">\n                            <p>{{ order.orderDate | formatDate: 'YYYY/MM/DD (ddd) HH:mm' }}</p>\n                        </td>\n                        <td class=\"align-middle\">{{ order.confirmationNumber }}</td>\n                        <td class=\"align-middle\">\n                            <div *ngFor=\"let eventOrder of orderToEventOrders({ order: order })\">\n                                <p *ngIf=\"(eventOrder.event.name | changeLanguage).length > 0\">{{\n                                    eventOrder.event.name | changeLanguage | slice:0:10 }}</p>\n                                <p *ngIf=\"!((eventOrder.event.name | changeLanguage).length > 0)\">{{\n                                    eventOrder.event.name | changeLanguage }}</p>\n                                <p>\n                                    <span class=\"theatre-name\">{{ eventOrder.event.superEvent.location.name | changeLanguage }}</span>\n                                    <span class=\"screen-name\">&nbsp;/&nbsp;{{ eventOrder.event.location.name | changeLanguage }}</span>\n                                </p>\n                                <p>{{ eventOrder.event.startDate | formatDate: 'YYYY/MM/DD (ddd) HH:mm' }}\n                                    -</p>\n                            </div>\n                        </td>\n                        <td class=\"align-middle\">{{ order.customer.familyName }} {{ order.customer.givenName }}</td>\n                        <!-- <td class=\"align-middle\">\n                            <div *ngFor=\"let paymentMethod of order.paymentMethods\">\n                                <p>{{ paymentMethod.name }}</p>\n                            </div>\n                        </td> -->\n                        <!-- <td class=\"align-middle\">\n                            {{ order.orderStatus }}\n                        </td> -->\n                        <td class=\"align-middle\">\n                            <button class=\"btn btn-primary mr-2\" (click)=\"openDetail(order)\"><i\n                                    class=\"fas fa-search-plus\"></i></button>\n                            <button *ngIf=\"environment.ORDER_QRCODE\"\n                                [disabled]=\"order.orderStatus !== orderStatus.OrderDelivered\"\n                                class=\"btn btn-primary mr-2\" (click)=\"openQrCode(order)\"><i\n                                    class=\"fas fa-qrcode\"></i></button>\n                            <button *ngIf=\"environment.ORDER_PRINT\"\n                                [disabled]=\"order.orderStatus !== orderStatus.OrderDelivered\"\n                                class=\"btn btn-primary mr-2\" (click)=\"printConfirm([order])\"><i\n                                    class=\"fas fa-print\"></i></button>\n                            <button *ngIf=\"environment.ORDER_CANCEL\"\n                                [disabled]=\"order.orderStatus !== orderStatus.OrderDelivered\" class=\"btn btn-primary\"\n                                (click)=\"cancelConfirm([order])\"><i class=\"fas fa-trash-alt\"></i></button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n\n    </div>\n</div>");

/***/ }),

/***/ "./app/modules/order/components/pages/order-search/order-search.component.scss":
/*!*************************************************************************************!*\
  !*** ./app/modules/order/components/pages/order-search/order-search.component.scss ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".scroll-horizontal .table {\n  min-width: 900px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvYXBwL21vZHVsZXMvb3JkZXIvY29tcG9uZW50cy9wYWdlcy9vcmRlci1zZWFyY2gvQzpcXFVzZXJzXFxoYXRhZ3VjaGlcXERlc2t0b3BcXHdvcmtzcGFjZVxcQ2luZXJpbm9cXHBvcy9zcmNcXGNsaWVudFxcYXBwXFxtb2R1bGVzXFxvcmRlclxcY29tcG9uZW50c1xccGFnZXNcXG9yZGVyLXNlYXJjaFxcb3JkZXItc2VhcmNoLmNvbXBvbmVudC5zY3NzIiwic3JjL2NsaWVudC9hcHAvbW9kdWxlcy9vcmRlci9jb21wb25lbnRzL3BhZ2VzL29yZGVyLXNlYXJjaC9vcmRlci1zZWFyY2guY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0k7RUFDSSxnQkFBQTtBQ0pSIiwiZmlsZSI6InNyYy9jbGllbnQvYXBwL21vZHVsZXMvb3JkZXIvY29tcG9uZW50cy9wYWdlcy9vcmRlci1zZWFyY2gvb3JkZXItc2VhcmNoLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIm5vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnNcIjtcbkBpbXBvcnQgXCJub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzXCI7XG5AaW1wb3J0IFwibm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9zY3NzL21peGluc1wiO1xuXG4uc2Nyb2xsLWhvcml6b250YWwge1xuICAgIC50YWJsZSB7XG4gICAgICAgIG1pbi13aWR0aDogOTAwcHg7XG4gICAgfVxufVxuXG4iLCIuc2Nyb2xsLWhvcml6b250YWwgLnRhYmxlIHtcbiAgbWluLXdpZHRoOiA5MDBweDtcbn0iXX0= */");

/***/ }),

/***/ "./app/modules/order/components/pages/order-search/order-search.component.ts":
/*!***********************************************************************************!*\
  !*** ./app/modules/order/components/pages/order-search/order-search.component.ts ***!
  \***********************************************************************************/
/*! exports provided: OrderSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSearchComponent", function() { return OrderSearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cinerino/api-javascript-client */ "../../node_modules/@cinerino/api-javascript-client/lib/index.js");
/* harmony import */ var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap */ "../../node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../environments/environment */ "./environments/environment.ts");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../functions */ "./app/functions/index.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../models */ "./app/models/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../services */ "./app/services/index.ts");
/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../store/reducers */ "./app/store/reducers/index.ts");
/* harmony import */ var _shared_components_parts_order_detail_modal_order_detail_modal_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/components/parts/order-detail-modal/order-detail-modal.component */ "./app/modules/shared/components/parts/order-detail-modal/order-detail-modal.component.ts");
/* harmony import */ var _shared_components_parts_qrcode_modal_qrcode_modal_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../shared/components/parts/qrcode-modal/qrcode-modal.component */ "./app/modules/shared/components/parts/qrcode-modal/qrcode-modal.component.ts");
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














let OrderSearchComponent = class OrderSearchComponent {
    constructor(store, modal, router, utilService, userService, orderService, translate, download, localeService) {
        this.store = store;
        this.modal = modal;
        this.router = router;
        this.utilService = utilService;
        this.userService = userService;
        this.orderService = orderService;
        this.translate = translate;
        this.download = download;
        this.localeService = localeService;
        this.moment = moment__WEBPACK_IMPORTED_MODULE_5__;
        this.orderStatus = _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__["factory"].orderStatus;
        this.paymentMethodType = _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__["factory"].paymentMethodType;
        this.OrderActions = _models__WEBPACK_IMPORTED_MODULE_9__["OrderActions"];
        this.buildQueryString = _functions__WEBPACK_IMPORTED_MODULE_8__["buildQueryString"];
        this.environment = _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"];
        this.orderToEventOrders = _functions__WEBPACK_IMPORTED_MODULE_8__["orderToEventOrders"];
    }
    ngOnInit() {
        this.isDownload = false;
        this.actionSelect = '';
        this.selectedOrders = [];
        this.isLoading = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_11__["getLoading"]));
        this.error = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_11__["getError"]));
        this.order = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_11__["getOrder"]));
        this.user = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_11__["getUser"]));
        this.limit = 20;
        this.conditions = {
            confirmationNumber: '',
            orderNumber: '',
            customer: {
                familyName: '',
                givenName: '',
                email: '',
                telephone: ''
            },
            orderStatus: '',
            paymentMethodType: '',
            posId: '',
            page: 1
        };
        this.orderService.delete();
    }
    /**
     * 選択判定
     */
    isSelected(order) {
        const findResult = this.selectedOrders.find(o => o.orderNumber === order.orderNumber);
        return findResult !== undefined;
    }
    /**
     * 選択中へ変更
     */
    addOrder(order) {
        this.selectedOrders.push(order);
    }
    /**
     * 選択中解除
     */
    removeOrder(order) {
        const findIndex = this.selectedOrders.findIndex(o => o.orderNumber === order.orderNumber);
        this.selectedOrders.splice(findIndex, 1);
    }
    /**
     * 検索パラメータへ変換
     */
    convertToSearchParams() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.user.subscribe((user) => {
                    const identifiers = [];
                    if (this.confirmedConditions.posId !== '') {
                        identifiers.push({ name: 'posId', value: this.confirmedConditions.posId });
                    }
                    const params = {
                        seller: {
                            typeOf: (user.seller === undefined)
                                ? undefined : user.seller.typeOf,
                            ids: (user.seller === undefined)
                                ? undefined : [user.seller.id]
                        },
                        customer: {
                            email: (this.confirmedConditions.customer.email === '')
                                ? undefined : this.confirmedConditions.customer.email,
                            telephone: (this.confirmedConditions.customer.telephone === '')
                                ? undefined : this.confirmedConditions.customer.telephone,
                            familyName: (this.confirmedConditions.customer.familyName === '')
                                ? undefined : this.confirmedConditions.customer.familyName,
                            givenName: (this.confirmedConditions.customer.givenName === '')
                                ? undefined : this.confirmedConditions.customer.givenName,
                            identifiers
                        },
                        orderStatuses: (this.confirmedConditions.orderStatus === '')
                            ? undefined : [this.confirmedConditions.orderStatus],
                        orderDateFrom: (this.confirmedConditions.orderDateFrom === undefined)
                            ? undefined
                            : moment__WEBPACK_IMPORTED_MODULE_5__(moment__WEBPACK_IMPORTED_MODULE_5__(this.confirmedConditions.orderDateFrom).format('YYYYMMDD')).toDate(),
                        orderDateThrough: (this.confirmedConditions.orderDateThrough === undefined)
                            ? undefined
                            : moment__WEBPACK_IMPORTED_MODULE_5__(moment__WEBPACK_IMPORTED_MODULE_5__(this.confirmedConditions.orderDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
                        confirmationNumbers: (this.confirmedConditions.confirmationNumber === '')
                            ? undefined : [this.confirmedConditions.confirmationNumber],
                        orderNumbers: (this.confirmedConditions.orderNumber === '')
                            ? undefined : [this.confirmedConditions.orderNumber],
                        paymentMethods: (this.confirmedConditions.paymentMethodType === '')
                            ? undefined : { typeOfs: [this.confirmedConditions.paymentMethodType] },
                        acceptedOffers: {
                            itemOffered: {
                                reservationFor: {
                                    startFrom: (this.confirmedConditions.eventStartDateFrom === undefined)
                                        ? undefined
                                        : moment__WEBPACK_IMPORTED_MODULE_5__(moment__WEBPACK_IMPORTED_MODULE_5__(this.confirmedConditions.eventStartDateFrom).format('YYYYMMDD')).toDate(),
                                    startThrough: (this.confirmedConditions.eventStartDateThrough === undefined)
                                        ? undefined
                                        : moment__WEBPACK_IMPORTED_MODULE_5__(moment__WEBPACK_IMPORTED_MODULE_5__(this.confirmedConditions.eventStartDateThrough)
                                            .format('YYYYMMDD')).add(1, 'day').toDate(),
                                }
                            }
                        },
                        limit: this.limit,
                        page: this.confirmedConditions.page,
                        sort: {
                            orderDate: _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_2__["factory"].sortType.Descending
                        }
                    };
                    resolve(params);
                }).unsubscribe();
            });
        });
    }
    /**
     * 検索
     */
    orderSearch(changeConditions, event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedOrders = [];
            if (event !== undefined) {
                this.confirmedConditions.page = event.page;
            }
            if (changeConditions) {
                this.confirmedConditions = {
                    orderDateFrom: this.conditions.orderDateFrom,
                    orderDateThrough: this.conditions.orderDateThrough,
                    confirmationNumber: this.conditions.confirmationNumber,
                    orderNumber: this.conditions.orderNumber,
                    customer: {
                        familyName: this.conditions.customer.familyName,
                        givenName: this.conditions.customer.givenName,
                        email: this.conditions.customer.email,
                        telephone: this.conditions.customer.telephone
                    },
                    orderStatus: this.conditions.orderStatus,
                    paymentMethodType: this.conditions.paymentMethodType,
                    eventStartDateFrom: this.conditions.eventStartDateFrom,
                    eventStartDateThrough: this.conditions.eventStartDateThrough,
                    posId: this.conditions.posId,
                    page: 1
                };
            }
            try {
                const params = yield this.convertToSearchParams();
                yield this.orderService.search(params);
            }
            catch (error) {
                console.error(error);
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('order.search.alert.search')
                });
            }
        });
    }
    /**
     * 検索条件クリア
     */
    searchConditionClear() {
        this.conditions = {
            confirmationNumber: '',
            orderNumber: '',
            customer: {
                familyName: '',
                givenName: '',
                email: '',
                telephone: ''
            },
            orderStatus: '',
            paymentMethodType: '',
            posId: '',
            page: 1
        };
    }
    /**
     * 印刷確認
     */
    printConfirm(orders) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.print'),
            cb: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield this.userService.getData();
                    if (user.pos === undefined || user.printer === undefined) {
                        this.router.navigate(['/error']);
                        return;
                    }
                    const pos = user.pos;
                    const printer = user.printer;
                    yield this.orderService.print({ orders, pos, printer });
                }
                catch (error) {
                    console.error(error);
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `<p class="mb-4">${this.translate.instant('order.search.alert.print')}</p>
                        <div class="p-3 bg-light-gray select-text">
                        <code>${error}</code>
                    </div>`
                    });
                }
            })
        });
    }
    /**
     * キャンセル確認
     */
    cancelConfirm(orders) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.cancel'),
            cb: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const userData = yield this.userService.getData();
                    yield this.orderService.cancel({ orders, language: userData.language });
                    this.orderSearch(false, { page: this.confirmedConditions.page });
                }
                catch (error) {
                    console.error(error);
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `
                        <p class="mb-4">${this.translate.instant('order.search.alert.cancel')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                    });
                }
            })
        });
    }
    /**
     * 詳細を表示
     */
    openDetail(order) {
        this.modal.show(_shared_components_parts_order_detail_modal_order_detail_modal_component__WEBPACK_IMPORTED_MODULE_12__["OrderDetailModalComponent"], {
            class: 'modal-dialog-centered modal-lg',
            initialState: { order }
        });
    }
    /**
     * 選択した注文へのアクション
     */
    selecedtAction() {
        if (this.selectedOrders.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.search.alert.unselected')
            });
        }
        if (this.actionSelect === _models__WEBPACK_IMPORTED_MODULE_9__["OrderActions"].Cancel) {
            this.utilService.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.confirm.cancel'),
                cb: () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const userData = yield this.userService.getData();
                        yield this.orderService.cancel({
                            orders: this.selectedOrders,
                            language: userData.language
                        });
                        this.orderSearch(false, { page: this.confirmedConditions.page });
                    }
                    catch (error) {
                        console.error(error);
                        this.utilService.openAlert({
                            title: this.translate.instant('common.error'),
                            body: `
                            <p class="mb-4">${this.translate.instant('order.search.alert.cancel')}</p>
                                <div class="p-3 bg-light-gray select-text">
                                <code>${error}</code>
                            </div>`
                        });
                    }
                })
            });
        }
        else if (this.actionSelect === _models__WEBPACK_IMPORTED_MODULE_9__["OrderActions"].Print) {
            this.utilService.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.confirm.print'),
                cb: () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = yield this.userService.getData();
                        if (user.pos === undefined || user.printer === undefined) {
                            this.router.navigate(['/error']);
                            return;
                        }
                        const pos = user.pos;
                        const printer = user.printer;
                        const orders = this.selectedOrders;
                        yield this.orderService.print({ orders, pos, printer });
                    }
                    catch (error) {
                        console.error(error);
                        this.utilService.openAlert({
                            title: this.translate.instant('common.error'),
                            body: `<p class="mb-4">${this.translate.instant('order.search.alert.print')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                        });
                    }
                })
            });
        }
    }
    /**
     * QRコード表示
     */
    openQrCode(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.orderService.authorize(order);
                const orderData = yield this.orderService.getData();
                const authorizeOrder = orderData.order;
                if (authorizeOrder === undefined) {
                    return;
                }
                this.modal.show(_shared_components_parts_qrcode_modal_qrcode_modal_component__WEBPACK_IMPORTED_MODULE_13__["QrCodeModalComponent"], {
                    class: 'modal-dialog-centered',
                    initialState: { order: authorizeOrder },
                });
            }
            catch (error) {
                console.error(error);
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('order.search.alert.authorize')
                });
            }
        });
    }
    /**
     * CSVダウンロード
     */
    downloadCsv() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isDownload = true;
            try {
                const params = yield this.convertToSearchParams();
                yield this.download.order(params);
            }
            catch (error) {
                console.error(error);
            }
            this.isDownload = false;
        });
    }
    /**
     * DatePicker設定
     */
    setDatePicker() {
        this.user.subscribe((user) => {
            this.localeService.use(user.language);
        }).unsubscribe();
    }
    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    onShowPicker(container) {
        Object(_functions__WEBPACK_IMPORTED_MODULE_8__["iOSDatepickerTapBugFix"])(container, [
            this.orderDateFrom,
            this.orderDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough
        ]);
    }
};
OrderSearchComponent.ctorParameters = () => [
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"] },
    { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsModalService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_10__["UtilService"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_10__["UserService"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_10__["OrderService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_10__["DownloadService"] },
    { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsLocaleService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('orderDateFrom', { static: true }),
    __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsDatepickerDirective"])
], OrderSearchComponent.prototype, "orderDateFrom", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('orderDateThrough', { static: true }),
    __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsDatepickerDirective"])
], OrderSearchComponent.prototype, "orderDateThrough", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('eventStartDateFrom', { static: true }),
    __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsDatepickerDirective"])
], OrderSearchComponent.prototype, "eventStartDateFrom", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('eventStartDateThrough', { static: true }),
    __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsDatepickerDirective"])
], OrderSearchComponent.prototype, "eventStartDateThrough", void 0);
OrderSearchComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-order-search',
        template: __importDefault(__webpack_require__(/*! raw-loader!./order-search.component.html */ "../../node_modules/raw-loader/dist/cjs.js!./app/modules/order/components/pages/order-search/order-search.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./order-search.component.scss */ "./app/modules/order/components/pages/order-search/order-search.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsModalService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
        _services__WEBPACK_IMPORTED_MODULE_10__["UtilService"],
        _services__WEBPACK_IMPORTED_MODULE_10__["UserService"],
        _services__WEBPACK_IMPORTED_MODULE_10__["OrderService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"],
        _services__WEBPACK_IMPORTED_MODULE_10__["DownloadService"],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["BsLocaleService"]])
], OrderSearchComponent);



/***/ }),

/***/ "./app/modules/order/order-routing.module.ts":
/*!***************************************************!*\
  !*** ./app/modules/order/order-routing.module.ts ***!
  \***************************************************/
/*! exports provided: OrderRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderRoutingModule", function() { return OrderRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _canActivates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../canActivates */ "./app/canActivates/index.ts");
/* harmony import */ var _canActivates_setting_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../canActivates/setting-guard.service */ "./app/canActivates/setting-guard.service.ts");
/* harmony import */ var _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/pages/base/base.component */ "./app/modules/shared/components/pages/base/base.component.ts");
/* harmony import */ var _components_pages_order_search_order_search_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pages/order-search/order-search.component */ "./app/modules/order/components/pages/order-search/order-search.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






const routes = [{
        path: '',
        component: _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_4__["BaseComponent"],
        canActivate: [_canActivates__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"], _canActivates_setting_guard_service__WEBPACK_IMPORTED_MODULE_3__["SettingGuardService"]],
        children: [
            { path: 'search', component: _components_pages_order_search_order_search_component__WEBPACK_IMPORTED_MODULE_5__["OrderSearchComponent"] }
        ]
    }];
let OrderRoutingModule = class OrderRoutingModule {
};
OrderRoutingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], OrderRoutingModule);



/***/ }),

/***/ "./app/modules/order/order.module.ts":
/*!*******************************************!*\
  !*** ./app/modules/order/order.module.ts ***!
  \*******************************************/
/*! exports provided: OrderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderModule", function() { return OrderModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./app/modules/shared/shared.module.ts");
/* harmony import */ var _components_pages_order_search_order_search_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pages/order-search/order-search.component */ "./app/modules/order/components/pages/order-search/order-search.component.ts");
/* harmony import */ var _order_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./order-routing.module */ "./app/modules/order/order-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _components_pages_order_search_order_search_component__WEBPACK_IMPORTED_MODULE_3__["OrderSearchComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _order_routing_module__WEBPACK_IMPORTED_MODULE_4__["OrderRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        ]
    })
], OrderModule);



/***/ })

}]);
//# sourceMappingURL=modules-order-order-module-es2015.js.map