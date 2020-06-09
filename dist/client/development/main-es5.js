function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "../../node_modules/moment/locale sync recursive ^\\.\\/.*$":
  /*!**************************************************************************************************!*\
    !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/moment/locale sync ^\.\/.*$ ***!
    \**************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesMomentLocaleSyncRecursive$(module, exports, __webpack_require__) {
    var map = {
      "./af": "../../node_modules/moment/locale/af.js",
      "./af.js": "../../node_modules/moment/locale/af.js",
      "./ar": "../../node_modules/moment/locale/ar.js",
      "./ar-dz": "../../node_modules/moment/locale/ar-dz.js",
      "./ar-dz.js": "../../node_modules/moment/locale/ar-dz.js",
      "./ar-kw": "../../node_modules/moment/locale/ar-kw.js",
      "./ar-kw.js": "../../node_modules/moment/locale/ar-kw.js",
      "./ar-ly": "../../node_modules/moment/locale/ar-ly.js",
      "./ar-ly.js": "../../node_modules/moment/locale/ar-ly.js",
      "./ar-ma": "../../node_modules/moment/locale/ar-ma.js",
      "./ar-ma.js": "../../node_modules/moment/locale/ar-ma.js",
      "./ar-sa": "../../node_modules/moment/locale/ar-sa.js",
      "./ar-sa.js": "../../node_modules/moment/locale/ar-sa.js",
      "./ar-tn": "../../node_modules/moment/locale/ar-tn.js",
      "./ar-tn.js": "../../node_modules/moment/locale/ar-tn.js",
      "./ar.js": "../../node_modules/moment/locale/ar.js",
      "./az": "../../node_modules/moment/locale/az.js",
      "./az.js": "../../node_modules/moment/locale/az.js",
      "./be": "../../node_modules/moment/locale/be.js",
      "./be.js": "../../node_modules/moment/locale/be.js",
      "./bg": "../../node_modules/moment/locale/bg.js",
      "./bg.js": "../../node_modules/moment/locale/bg.js",
      "./bm": "../../node_modules/moment/locale/bm.js",
      "./bm.js": "../../node_modules/moment/locale/bm.js",
      "./bn": "../../node_modules/moment/locale/bn.js",
      "./bn.js": "../../node_modules/moment/locale/bn.js",
      "./bo": "../../node_modules/moment/locale/bo.js",
      "./bo.js": "../../node_modules/moment/locale/bo.js",
      "./br": "../../node_modules/moment/locale/br.js",
      "./br.js": "../../node_modules/moment/locale/br.js",
      "./bs": "../../node_modules/moment/locale/bs.js",
      "./bs.js": "../../node_modules/moment/locale/bs.js",
      "./ca": "../../node_modules/moment/locale/ca.js",
      "./ca.js": "../../node_modules/moment/locale/ca.js",
      "./cs": "../../node_modules/moment/locale/cs.js",
      "./cs.js": "../../node_modules/moment/locale/cs.js",
      "./cv": "../../node_modules/moment/locale/cv.js",
      "./cv.js": "../../node_modules/moment/locale/cv.js",
      "./cy": "../../node_modules/moment/locale/cy.js",
      "./cy.js": "../../node_modules/moment/locale/cy.js",
      "./da": "../../node_modules/moment/locale/da.js",
      "./da.js": "../../node_modules/moment/locale/da.js",
      "./de": "../../node_modules/moment/locale/de.js",
      "./de-at": "../../node_modules/moment/locale/de-at.js",
      "./de-at.js": "../../node_modules/moment/locale/de-at.js",
      "./de-ch": "../../node_modules/moment/locale/de-ch.js",
      "./de-ch.js": "../../node_modules/moment/locale/de-ch.js",
      "./de.js": "../../node_modules/moment/locale/de.js",
      "./dv": "../../node_modules/moment/locale/dv.js",
      "./dv.js": "../../node_modules/moment/locale/dv.js",
      "./el": "../../node_modules/moment/locale/el.js",
      "./el.js": "../../node_modules/moment/locale/el.js",
      "./en-SG": "../../node_modules/moment/locale/en-SG.js",
      "./en-SG.js": "../../node_modules/moment/locale/en-SG.js",
      "./en-au": "../../node_modules/moment/locale/en-au.js",
      "./en-au.js": "../../node_modules/moment/locale/en-au.js",
      "./en-ca": "../../node_modules/moment/locale/en-ca.js",
      "./en-ca.js": "../../node_modules/moment/locale/en-ca.js",
      "./en-gb": "../../node_modules/moment/locale/en-gb.js",
      "./en-gb.js": "../../node_modules/moment/locale/en-gb.js",
      "./en-ie": "../../node_modules/moment/locale/en-ie.js",
      "./en-ie.js": "../../node_modules/moment/locale/en-ie.js",
      "./en-il": "../../node_modules/moment/locale/en-il.js",
      "./en-il.js": "../../node_modules/moment/locale/en-il.js",
      "./en-nz": "../../node_modules/moment/locale/en-nz.js",
      "./en-nz.js": "../../node_modules/moment/locale/en-nz.js",
      "./eo": "../../node_modules/moment/locale/eo.js",
      "./eo.js": "../../node_modules/moment/locale/eo.js",
      "./es": "../../node_modules/moment/locale/es.js",
      "./es-do": "../../node_modules/moment/locale/es-do.js",
      "./es-do.js": "../../node_modules/moment/locale/es-do.js",
      "./es-us": "../../node_modules/moment/locale/es-us.js",
      "./es-us.js": "../../node_modules/moment/locale/es-us.js",
      "./es.js": "../../node_modules/moment/locale/es.js",
      "./et": "../../node_modules/moment/locale/et.js",
      "./et.js": "../../node_modules/moment/locale/et.js",
      "./eu": "../../node_modules/moment/locale/eu.js",
      "./eu.js": "../../node_modules/moment/locale/eu.js",
      "./fa": "../../node_modules/moment/locale/fa.js",
      "./fa.js": "../../node_modules/moment/locale/fa.js",
      "./fi": "../../node_modules/moment/locale/fi.js",
      "./fi.js": "../../node_modules/moment/locale/fi.js",
      "./fo": "../../node_modules/moment/locale/fo.js",
      "./fo.js": "../../node_modules/moment/locale/fo.js",
      "./fr": "../../node_modules/moment/locale/fr.js",
      "./fr-ca": "../../node_modules/moment/locale/fr-ca.js",
      "./fr-ca.js": "../../node_modules/moment/locale/fr-ca.js",
      "./fr-ch": "../../node_modules/moment/locale/fr-ch.js",
      "./fr-ch.js": "../../node_modules/moment/locale/fr-ch.js",
      "./fr.js": "../../node_modules/moment/locale/fr.js",
      "./fy": "../../node_modules/moment/locale/fy.js",
      "./fy.js": "../../node_modules/moment/locale/fy.js",
      "./ga": "../../node_modules/moment/locale/ga.js",
      "./ga.js": "../../node_modules/moment/locale/ga.js",
      "./gd": "../../node_modules/moment/locale/gd.js",
      "./gd.js": "../../node_modules/moment/locale/gd.js",
      "./gl": "../../node_modules/moment/locale/gl.js",
      "./gl.js": "../../node_modules/moment/locale/gl.js",
      "./gom-latn": "../../node_modules/moment/locale/gom-latn.js",
      "./gom-latn.js": "../../node_modules/moment/locale/gom-latn.js",
      "./gu": "../../node_modules/moment/locale/gu.js",
      "./gu.js": "../../node_modules/moment/locale/gu.js",
      "./he": "../../node_modules/moment/locale/he.js",
      "./he.js": "../../node_modules/moment/locale/he.js",
      "./hi": "../../node_modules/moment/locale/hi.js",
      "./hi.js": "../../node_modules/moment/locale/hi.js",
      "./hr": "../../node_modules/moment/locale/hr.js",
      "./hr.js": "../../node_modules/moment/locale/hr.js",
      "./hu": "../../node_modules/moment/locale/hu.js",
      "./hu.js": "../../node_modules/moment/locale/hu.js",
      "./hy-am": "../../node_modules/moment/locale/hy-am.js",
      "./hy-am.js": "../../node_modules/moment/locale/hy-am.js",
      "./id": "../../node_modules/moment/locale/id.js",
      "./id.js": "../../node_modules/moment/locale/id.js",
      "./is": "../../node_modules/moment/locale/is.js",
      "./is.js": "../../node_modules/moment/locale/is.js",
      "./it": "../../node_modules/moment/locale/it.js",
      "./it-ch": "../../node_modules/moment/locale/it-ch.js",
      "./it-ch.js": "../../node_modules/moment/locale/it-ch.js",
      "./it.js": "../../node_modules/moment/locale/it.js",
      "./ja": "../../node_modules/moment/locale/ja.js",
      "./ja.js": "../../node_modules/moment/locale/ja.js",
      "./jv": "../../node_modules/moment/locale/jv.js",
      "./jv.js": "../../node_modules/moment/locale/jv.js",
      "./ka": "../../node_modules/moment/locale/ka.js",
      "./ka.js": "../../node_modules/moment/locale/ka.js",
      "./kk": "../../node_modules/moment/locale/kk.js",
      "./kk.js": "../../node_modules/moment/locale/kk.js",
      "./km": "../../node_modules/moment/locale/km.js",
      "./km.js": "../../node_modules/moment/locale/km.js",
      "./kn": "../../node_modules/moment/locale/kn.js",
      "./kn.js": "../../node_modules/moment/locale/kn.js",
      "./ko": "../../node_modules/moment/locale/ko.js",
      "./ko.js": "../../node_modules/moment/locale/ko.js",
      "./ku": "../../node_modules/moment/locale/ku.js",
      "./ku.js": "../../node_modules/moment/locale/ku.js",
      "./ky": "../../node_modules/moment/locale/ky.js",
      "./ky.js": "../../node_modules/moment/locale/ky.js",
      "./lb": "../../node_modules/moment/locale/lb.js",
      "./lb.js": "../../node_modules/moment/locale/lb.js",
      "./lo": "../../node_modules/moment/locale/lo.js",
      "./lo.js": "../../node_modules/moment/locale/lo.js",
      "./lt": "../../node_modules/moment/locale/lt.js",
      "./lt.js": "../../node_modules/moment/locale/lt.js",
      "./lv": "../../node_modules/moment/locale/lv.js",
      "./lv.js": "../../node_modules/moment/locale/lv.js",
      "./me": "../../node_modules/moment/locale/me.js",
      "./me.js": "../../node_modules/moment/locale/me.js",
      "./mi": "../../node_modules/moment/locale/mi.js",
      "./mi.js": "../../node_modules/moment/locale/mi.js",
      "./mk": "../../node_modules/moment/locale/mk.js",
      "./mk.js": "../../node_modules/moment/locale/mk.js",
      "./ml": "../../node_modules/moment/locale/ml.js",
      "./ml.js": "../../node_modules/moment/locale/ml.js",
      "./mn": "../../node_modules/moment/locale/mn.js",
      "./mn.js": "../../node_modules/moment/locale/mn.js",
      "./mr": "../../node_modules/moment/locale/mr.js",
      "./mr.js": "../../node_modules/moment/locale/mr.js",
      "./ms": "../../node_modules/moment/locale/ms.js",
      "./ms-my": "../../node_modules/moment/locale/ms-my.js",
      "./ms-my.js": "../../node_modules/moment/locale/ms-my.js",
      "./ms.js": "../../node_modules/moment/locale/ms.js",
      "./mt": "../../node_modules/moment/locale/mt.js",
      "./mt.js": "../../node_modules/moment/locale/mt.js",
      "./my": "../../node_modules/moment/locale/my.js",
      "./my.js": "../../node_modules/moment/locale/my.js",
      "./nb": "../../node_modules/moment/locale/nb.js",
      "./nb.js": "../../node_modules/moment/locale/nb.js",
      "./ne": "../../node_modules/moment/locale/ne.js",
      "./ne.js": "../../node_modules/moment/locale/ne.js",
      "./nl": "../../node_modules/moment/locale/nl.js",
      "./nl-be": "../../node_modules/moment/locale/nl-be.js",
      "./nl-be.js": "../../node_modules/moment/locale/nl-be.js",
      "./nl.js": "../../node_modules/moment/locale/nl.js",
      "./nn": "../../node_modules/moment/locale/nn.js",
      "./nn.js": "../../node_modules/moment/locale/nn.js",
      "./pa-in": "../../node_modules/moment/locale/pa-in.js",
      "./pa-in.js": "../../node_modules/moment/locale/pa-in.js",
      "./pl": "../../node_modules/moment/locale/pl.js",
      "./pl.js": "../../node_modules/moment/locale/pl.js",
      "./pt": "../../node_modules/moment/locale/pt.js",
      "./pt-br": "../../node_modules/moment/locale/pt-br.js",
      "./pt-br.js": "../../node_modules/moment/locale/pt-br.js",
      "./pt.js": "../../node_modules/moment/locale/pt.js",
      "./ro": "../../node_modules/moment/locale/ro.js",
      "./ro.js": "../../node_modules/moment/locale/ro.js",
      "./ru": "../../node_modules/moment/locale/ru.js",
      "./ru.js": "../../node_modules/moment/locale/ru.js",
      "./sd": "../../node_modules/moment/locale/sd.js",
      "./sd.js": "../../node_modules/moment/locale/sd.js",
      "./se": "../../node_modules/moment/locale/se.js",
      "./se.js": "../../node_modules/moment/locale/se.js",
      "./si": "../../node_modules/moment/locale/si.js",
      "./si.js": "../../node_modules/moment/locale/si.js",
      "./sk": "../../node_modules/moment/locale/sk.js",
      "./sk.js": "../../node_modules/moment/locale/sk.js",
      "./sl": "../../node_modules/moment/locale/sl.js",
      "./sl.js": "../../node_modules/moment/locale/sl.js",
      "./sq": "../../node_modules/moment/locale/sq.js",
      "./sq.js": "../../node_modules/moment/locale/sq.js",
      "./sr": "../../node_modules/moment/locale/sr.js",
      "./sr-cyrl": "../../node_modules/moment/locale/sr-cyrl.js",
      "./sr-cyrl.js": "../../node_modules/moment/locale/sr-cyrl.js",
      "./sr.js": "../../node_modules/moment/locale/sr.js",
      "./ss": "../../node_modules/moment/locale/ss.js",
      "./ss.js": "../../node_modules/moment/locale/ss.js",
      "./sv": "../../node_modules/moment/locale/sv.js",
      "./sv.js": "../../node_modules/moment/locale/sv.js",
      "./sw": "../../node_modules/moment/locale/sw.js",
      "./sw.js": "../../node_modules/moment/locale/sw.js",
      "./ta": "../../node_modules/moment/locale/ta.js",
      "./ta.js": "../../node_modules/moment/locale/ta.js",
      "./te": "../../node_modules/moment/locale/te.js",
      "./te.js": "../../node_modules/moment/locale/te.js",
      "./tet": "../../node_modules/moment/locale/tet.js",
      "./tet.js": "../../node_modules/moment/locale/tet.js",
      "./tg": "../../node_modules/moment/locale/tg.js",
      "./tg.js": "../../node_modules/moment/locale/tg.js",
      "./th": "../../node_modules/moment/locale/th.js",
      "./th.js": "../../node_modules/moment/locale/th.js",
      "./tl-ph": "../../node_modules/moment/locale/tl-ph.js",
      "./tl-ph.js": "../../node_modules/moment/locale/tl-ph.js",
      "./tlh": "../../node_modules/moment/locale/tlh.js",
      "./tlh.js": "../../node_modules/moment/locale/tlh.js",
      "./tr": "../../node_modules/moment/locale/tr.js",
      "./tr.js": "../../node_modules/moment/locale/tr.js",
      "./tzl": "../../node_modules/moment/locale/tzl.js",
      "./tzl.js": "../../node_modules/moment/locale/tzl.js",
      "./tzm": "../../node_modules/moment/locale/tzm.js",
      "./tzm-latn": "../../node_modules/moment/locale/tzm-latn.js",
      "./tzm-latn.js": "../../node_modules/moment/locale/tzm-latn.js",
      "./tzm.js": "../../node_modules/moment/locale/tzm.js",
      "./ug-cn": "../../node_modules/moment/locale/ug-cn.js",
      "./ug-cn.js": "../../node_modules/moment/locale/ug-cn.js",
      "./uk": "../../node_modules/moment/locale/uk.js",
      "./uk.js": "../../node_modules/moment/locale/uk.js",
      "./ur": "../../node_modules/moment/locale/ur.js",
      "./ur.js": "../../node_modules/moment/locale/ur.js",
      "./uz": "../../node_modules/moment/locale/uz.js",
      "./uz-latn": "../../node_modules/moment/locale/uz-latn.js",
      "./uz-latn.js": "../../node_modules/moment/locale/uz-latn.js",
      "./uz.js": "../../node_modules/moment/locale/uz.js",
      "./vi": "../../node_modules/moment/locale/vi.js",
      "./vi.js": "../../node_modules/moment/locale/vi.js",
      "./x-pseudo": "../../node_modules/moment/locale/x-pseudo.js",
      "./x-pseudo.js": "../../node_modules/moment/locale/x-pseudo.js",
      "./yo": "../../node_modules/moment/locale/yo.js",
      "./yo.js": "../../node_modules/moment/locale/yo.js",
      "./zh-cn": "../../node_modules/moment/locale/zh-cn.js",
      "./zh-cn.js": "../../node_modules/moment/locale/zh-cn.js",
      "./zh-hk": "../../node_modules/moment/locale/zh-hk.js",
      "./zh-hk.js": "../../node_modules/moment/locale/zh-hk.js",
      "./zh-tw": "../../node_modules/moment/locale/zh-tw.js",
      "./zh-tw.js": "../../node_modules/moment/locale/zh-tw.js"
    };

    function webpackContext(req) {
      var id = webpackContextResolve(req);
      return __webpack_require__(id);
    }

    function webpackContextResolve(req) {
      if (!__webpack_require__.o(map, req)) {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      }

      return map[req];
    }

    webpackContext.keys = function webpackContextKeys() {
      return Object.keys(map);
    };

    webpackContext.resolve = webpackContextResolve;
    module.exports = webpackContext;
    webpackContext.id = "../../node_modules/moment/locale sync recursive ^\\.\\/.*$";
    /***/
  },

  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./app/functions/index.ts":
  /*!********************************!*\
    !*** ./app/functions/index.ts ***!
    \********************************/

  /*! exports provided: Purchase, Util, Order, Translate, Reservation */

  /***/
  function appFunctionsIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _order_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./order.function */
    "./app/functions/order.function.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Order", function () {
      return _order_function__WEBPACK_IMPORTED_MODULE_0__;
    });
    /* harmony import */


    var _purchase_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./purchase.function */
    "./app/functions/purchase.function.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Purchase", function () {
      return _purchase_function__WEBPACK_IMPORTED_MODULE_1__;
    });
    /* harmony import */


    var _reservation_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./reservation.function */
    "./app/functions/reservation.function.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Reservation", function () {
      return _reservation_function__WEBPACK_IMPORTED_MODULE_2__;
    });
    /* harmony import */


    var _translate_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./translate.function */
    "./app/functions/translate.function.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Translate", function () {
      return _translate_function__WEBPACK_IMPORTED_MODULE_3__;
    });
    /* harmony import */


    var _util_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./util.function */
    "./app/functions/util.function.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Util", function () {
      return _util_function__WEBPACK_IMPORTED_MODULE_4__;
    });
    /***/

  },

  /***/
  "./app/functions/order.function.ts":
  /*!*****************************************!*\
    !*** ./app/functions/order.function.ts ***!
    \*****************************************/

  /*! exports provided: createPrintCanvas4Html, createPrintCanvas, createTestPrintCanvas, createTestPrintCanvas4Html, createCooperationQRCode, getTransactionAgentIdentifier, order2report, input2OrderSearchCondition, createOrderLink */

  /***/
  function appFunctionsOrderFunctionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createPrintCanvas4Html", function () {
      return createPrintCanvas4Html;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createPrintCanvas", function () {
      return createPrintCanvas;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createTestPrintCanvas", function () {
      return createTestPrintCanvas;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createTestPrintCanvas4Html", function () {
      return createTestPrintCanvas4Html;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createCooperationQRCode", function () {
      return createCooperationQRCode;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getTransactionAgentIdentifier", function () {
      return getTransactionAgentIdentifier;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "order2report", function () {
      return order2report;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "input2OrderSearchCondition", function () {
      return input2OrderSearchCondition;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createOrderLink", function () {
      return createOrderLink;
    });
    /* harmony import */


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @cinerino/api-javascript-client */
    "../../node_modules/@cinerino/api-javascript-client/lib/index.js");
    /* harmony import */


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var html2canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! html2canvas */
    "../../node_modules/html2canvas/dist/html2canvas.js");
    /* harmony import */


    var html2canvas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! moment */
    "../../node_modules/moment/moment.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var qrcode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! qrcode */
    "../../node_modules/qrcode/lib/browser.js");
    /* harmony import */


    var qrcode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qrcode__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var _purchase_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./purchase.function */
    "./app/functions/purchase.function.ts");
    /* harmony import */


    var _util_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./util.function */
    "./app/functions/util.function.ts");

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
     * 印刷イメージ作成
     */


    function createPrintCanvas4Html(params) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var template, div, canvas;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(params.qrcode !== undefined)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return qrcode__WEBPACK_IMPORTED_MODULE_3__["toDataURL"](params.qrcode);

              case 3:
                params.qrcode = _context.sent;

              case 4:
                _context.next = 6;
                return window.ejs.render(params.view, Object.assign({
                  moment: moment__WEBPACK_IMPORTED_MODULE_2__
                }, params), {
                  async: true
                });

              case 6:
                template = _context.sent;
                div = document.createElement('div');
                div.className = 'position-absolute';
                div.style.top = '-9999px';
                div.innerHTML = template;
                document.body.appendChild(div);
                _context.next = 14;
                return html2canvas__WEBPACK_IMPORTED_MODULE_1___default()(div, {
                  width: 560,
                  scale: 1
                });

              case 14:
                canvas = _context.sent;
                div.remove();
                return _context.abrupt("return", canvas);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    }
    /**
     * キャンバスへ描画
     */


    function drawCanvas(args) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var printData, data, canvas, size, context, drawImage, changePosition, font, _iterator, _step, image, imageInstance, src, _iterator2, _step2, text, value, eventName, limit, _iterator3, _step3, qrCode, qrcodeCanvas;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                printData = args.printData;
                data = args.data;
                canvas = document.createElement('canvas');
                size = printData.size;
                canvas.width = size.width;
                canvas.height = size.height;
                context = canvas.getContext('2d');

                if (!(context === null)) {
                  _context2.next = 9;
                  break;
                }

                throw new Error('context is null').message;

              case 9:
                drawImage = function drawImage(drawImageArgs) {
                  return new Promise(function (resolve, reject) {
                    drawImageArgs.image.onload = function () {
                      context.drawImage(drawImageArgs.image, drawImageArgs.x, drawImageArgs.y, drawImageArgs.width, drawImageArgs.height);
                      resolve();
                    };

                    drawImageArgs.image.onerror = function (error) {
                      console.error(error);
                      reject(error);
                    };
                  });
                };

                changePosition = function changePosition(value) {
                  var position = [{
                    key: 'center',
                    value: canvas.width / 2
                  }, {
                    key: 'left',
                    value: 0
                  }, {
                    key: 'right',
                    value: canvas.width
                  }, {
                    key: 'top',
                    value: 0
                  }, {
                    key: 'bottom',
                    value: canvas.height
                  }];
                  var findResult = position.find(function (p) {
                    return p.key === value;
                  });

                  if (findResult === undefined) {
                    return value;
                  }

                  return findResult.value;
                };

                font = "\"Hiragino Sans\", \"Hiragino Kaku Gothic ProN\", \"\u6E38\u30B4\u30B7\u30C3\u30AF  Medium\", meiryo, sans-serif"; // 画像描画

                _iterator = _createForOfIteratorHelper(printData.image);
                _context2.prev = 13;

                _iterator.s();

              case 15:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 32;
                  break;
                }

                image = _step.value;
                imageInstance = new Image();
                imageInstance.crossOrigin = 'anonymous';
                _context2.next = 21;
                return Object(_util_function__WEBPACK_IMPORTED_MODULE_5__["isFile"])(image.src.replace('/storage', Object(_util_function__WEBPACK_IMPORTED_MODULE_5__["getProject"])().storageUrl));

              case 21:
                if (!_context2.sent) {
                  _context2.next = 25;
                  break;
                }

                _context2.t0 = image.src.replace('/storage', Object(_util_function__WEBPACK_IMPORTED_MODULE_5__["getProject"])().storageUrl);
                _context2.next = 26;
                break;

              case 25:
                _context2.t0 = image.src.replace('/storage', '/default');

              case 26:
                src = _context2.t0;
                imageInstance.src = src;
                _context2.next = 30;
                return drawImage({
                  image: imageInstance,
                  x: image.x,
                  y: image.y,
                  width: image.width,
                  height: image.height
                });

              case 30:
                _context2.next = 15;
                break;

              case 32:
                _context2.next = 37;
                break;

              case 34:
                _context2.prev = 34;
                _context2.t1 = _context2["catch"](13);

                _iterator.e(_context2.t1);

              case 37:
                _context2.prev = 37;

                _iterator.f();

                return _context2.finish(37);

              case 40:
                // テキスト描画
                _iterator2 = _createForOfIteratorHelper(printData.text);
                _context2.prev = 41;

                _iterator2.s();

              case 43:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 75;
                  break;
                }

                text = _step2.value;
                context.fillStyle = text.fillStyle;
                context.font = "".concat(text.font.weight, " ").concat(text.font.size, " ").concat(text.font.family === undefined ? font : text.font.family);
                context.textAlign = text.textAlign;
                value = '';

                if (!(text.name !== undefined)) {
                  _context2.next = 66;
                  break;
                }

                _context2.t2 = text.name;
                _context2.next = _context2.t2 === 'price' ? 53 : _context2.t2 === 'date' ? 55 : _context2.t2 === 'startDate' ? 57 : _context2.t2 === 'endDate' ? 57 : _context2.t2 === 'eventNameJa' ? 59 : _context2.t2 === 'eventNameEn' ? 59 : 63;
                break;

              case 53:
                value = "\uFFE5".concat(data.price.toLocaleString());
                return _context2.abrupt("break", 64);

              case 55:
                value = "(".concat(moment__WEBPACK_IMPORTED_MODULE_2__().format('YYYY/MM/DD HH:mm'), " \u767A\u5238)");
                return _context2.abrupt("break", 64);

              case 57:
                value = "".concat(moment__WEBPACK_IMPORTED_MODULE_2__(data[text.name]).format(text.value));
                return _context2.abrupt("break", 64);

              case 59:
                eventName = data[text.name];
                limit = Math.floor(size.width / parseInt(text.font.size, 10));

                if (eventName.length > limit) {
                  context.fillText(eventName.slice(0, limit), changePosition(text.fillText.x), changePosition(text.fillText.y));
                  context.fillText(eventName.length - limit < limit ? eventName.slice(limit, eventName.length) : eventName.slice(limit, limit * 2), changePosition(text.fillText.x), changePosition(text.fillText.y) + parseInt(text.font.size, 10) * 1.5);
                } else {
                  context.fillText(eventName, changePosition(text.fillText.x), changePosition(text.fillText.y) + parseInt(text.font.size, 10) * 0.75);
                }

                return _context2.abrupt("continue", 73);

              case 63:
                value = "".concat(text.value === undefined ? '' : text.value).concat(data[text.name] === undefined ? '-' : data[text.name]);

              case 64:
                _context2.next = 71;
                break;

              case 66:
                if (!(text.value !== undefined)) {
                  _context2.next = 70;
                  break;
                }

                value = text.value;
                _context2.next = 71;
                break;

              case 70:
                return _context2.abrupt("continue", 73);

              case 71:
                if (text.slice !== undefined) {
                  // 文字制限
                  value = value.slice(text.slice[0], text.slice[1]);
                }

                context.fillText(value, changePosition(text.fillText.x), changePosition(text.fillText.y));

              case 73:
                _context2.next = 43;
                break;

              case 75:
                _context2.next = 80;
                break;

              case 77:
                _context2.prev = 77;
                _context2.t3 = _context2["catch"](41);

                _iterator2.e(_context2.t3);

              case 80:
                _context2.prev = 80;

                _iterator2.f();

                return _context2.finish(80);

              case 83:
                if (!(data.qrcode !== undefined)) {
                  _context2.next = 103;
                  break;
                }

                _iterator3 = _createForOfIteratorHelper(printData.qrCode);
                _context2.prev = 85;

                _iterator3.s();

              case 87:
                if ((_step3 = _iterator3.n()).done) {
                  _context2.next = 95;
                  break;
                }

                qrCode = _step3.value;
                qrcodeCanvas = document.createElement('canvas');
                _context2.next = 92;
                return qrcode__WEBPACK_IMPORTED_MODULE_3__["toCanvas"](qrcodeCanvas, data.qrcode);

              case 92:
                context.drawImage(qrcodeCanvas, qrCode.x, qrCode.y, qrCode.width, qrCode.height);

              case 93:
                _context2.next = 87;
                break;

              case 95:
                _context2.next = 100;
                break;

              case 97:
                _context2.prev = 97;
                _context2.t4 = _context2["catch"](85);

                _iterator3.e(_context2.t4);

              case 100:
                _context2.prev = 100;

                _iterator3.f();

                return _context2.finish(100);

              case 103:
                return _context2.abrupt("return", canvas);

              case 104:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[13, 34, 37, 40], [41, 77, 80, 83], [85, 97, 100, 103]]);
      }));
    }
    /**
     * 印刷イメージ作成
     */


    function createPrintCanvas(params) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var acceptedOffer, itemOffered, data, printData, canvas;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                acceptedOffer = params.acceptedOffer;
                itemOffered = acceptedOffer.itemOffered;

                if (!(itemOffered.typeOf !== _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.reservationType.EventReservation)) {
                  _context3.next = 4;
                  break;
                }

                throw new Error('reservationType is not EventReservation').message;

              case 4:
                data = {
                  sellerNameJa: itemOffered.reservationFor.superEvent.location.name === undefined || itemOffered.reservationFor.superEvent.location.name.ja === undefined ? '' : itemOffered.reservationFor.superEvent.location.name.ja,
                  sellerNameEn: itemOffered.reservationFor.superEvent.location.name === undefined || itemOffered.reservationFor.superEvent.location.name.en === undefined ? '' : itemOffered.reservationFor.superEvent.location.name.en,
                  eventNameJa: itemOffered.reservationFor.name.ja === undefined ? '' : itemOffered.reservationFor.name.ja,
                  eventNameEn: itemOffered.reservationFor.name.en === undefined ? '' : itemOffered.reservationFor.name.en,
                  screenNameJa: itemOffered.reservationFor.location.address === undefined ? itemOffered.reservationFor.location.name === undefined || itemOffered.reservationFor.location.name.ja === undefined ? '' : itemOffered.reservationFor.location.name.ja : "".concat(itemOffered.reservationFor.location.address.ja, " ").concat(itemOffered.reservationFor.location.name === undefined ? '' : itemOffered.reservationFor.location.name.ja),
                  screenNameEn: itemOffered.reservationFor.location.address === undefined ? itemOffered.reservationFor.location.name === undefined || itemOffered.reservationFor.location.name.en === undefined ? '' : itemOffered.reservationFor.location.name.en : "".concat(itemOffered.reservationFor.location.address.en, " ").concat(itemOffered.reservationFor.location.name === undefined ? '' : itemOffered.reservationFor.location.name.en),
                  startDate: moment__WEBPACK_IMPORTED_MODULE_2__(itemOffered.reservationFor.startDate).toISOString(),
                  endDate: moment__WEBPACK_IMPORTED_MODULE_2__(itemOffered.reservationFor.endDate).toISOString(),
                  seatNumber: itemOffered.reservedTicket.ticketedSeat === undefined || itemOffered.reservedTicket.ticketedSeat === null ? undefined : itemOffered.reservedTicket.ticketedSeat.seatNumber,
                  ticketNameJa: itemOffered.reservedTicket.ticketType.name === undefined ? '' : typeof itemOffered.reservedTicket.ticketType.name === 'string' ? itemOffered.reservedTicket.ticketType.name : itemOffered.reservedTicket.ticketType.name.ja === undefined ? '' : itemOffered.reservedTicket.ticketType.name.ja,
                  ticketNameEn: itemOffered.reservedTicket.ticketType.name === undefined ? '' : typeof itemOffered.reservedTicket.ticketType.name === 'string' ? itemOffered.reservedTicket.ticketType.name : itemOffered.reservedTicket.ticketType.name.en === undefined ? '' : itemOffered.reservedTicket.ticketType.name.en,
                  price: acceptedOffer.priceSpecification === undefined ? 0 : Object(_purchase_function__WEBPACK_IMPORTED_MODULE_4__["getItemPrice"])({
                    priceComponents: acceptedOffer.priceSpecification.priceComponent
                  }),
                  posName: params.pos === undefined ? '' : params.pos.name,
                  confirmationNumber: String(params.order.confirmationNumber),
                  orderNumber: params.order.orderNumber,
                  ticketNumber: itemOffered.id,
                  qrcode: params.qrcode,
                  index: params.index
                };
                printData = params.printData;
                _context3.next = 8;
                return drawCanvas({
                  data: data,
                  printData: printData
                });

              case 8:
                canvas = _context3.sent;
                return _context3.abrupt("return", canvas);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
    }
    /**
     * テスト印刷用イメージ作成
     */


    function createTestPrintCanvas(args) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var printData, data, canvas;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                printData = args.printData;
                data = {
                  sellerNameJa: 'テスト劇場',
                  sellerNameEn: 'test theater',
                  eventNameJa: Math.floor(Math.random() * 11) < 5 ? 'テストイベント' : 'テスト1テスト2テスト3テスト4テスト5テスト6テスト7テスト8テスト9テスト10イベント',
                  eventNameEn: Math.floor(Math.random() * 11) < 5 ? 'test event' : 'test1 test2 test3 test4 test5 test6 test7 event',
                  screenNameJa: 'テストスクリーン',
                  screenNameEn: 'test screen',
                  startDate: moment__WEBPACK_IMPORTED_MODULE_2__().toISOString(),
                  endDate: moment__WEBPACK_IMPORTED_MODULE_2__().toISOString(),
                  seatNumber: 'TEST-1',
                  ticketNameJa: 'テストチケット123456',
                  ticketNameEn: 'test ticket 123456',
                  price: 1000,
                  posName: 'test-01',
                  confirmationNumber: '12345678',
                  orderNumber: 'TEST-123456-123456',
                  ticketNumber: 'TEST-123456-123456-00',
                  qrcode: 'TEST-123456-123456',
                  index: 0
                };
                _context4.next = 4;
                return drawCanvas({
                  printData: printData,
                  data: data
                });

              case 4:
                canvas = _context4.sent;
                return _context4.abrupt("return", canvas);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
    }
    /**
     * テスト印刷用イメージ作成
     */


    function createTestPrintCanvas4Html() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var view, template, div, canvas;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                view = "<div style=\"width: 560px;\">\n    <div class=\"py-5 text-center\" style=\"font-size: 30px;\">\n    <p class=\"mb-3\"><img width=\"400\" height=\"64\" src=\"/default/images/print/logo.png\"></p>\n    <p class=\"mb-3\">Test print</p>\n    <p><%= moment().tz('Asia/Tokyo').locale('ja').format('YYYY/MM/DD HH:mm:ss') %></p>\n    </div>\n    </div>";
                _context5.next = 3;
                return window.ejs.render(view, {
                  moment: moment__WEBPACK_IMPORTED_MODULE_2__
                }, {
                  async: true
                });

              case 3:
                template = _context5.sent;
                div = document.createElement('div');
                div.className = 'position-absolute';
                div.style.top = '-9999px';
                div.innerHTML = template;
                document.body.appendChild(div);
                _context5.next = 11;
                return html2canvas__WEBPACK_IMPORTED_MODULE_1___default()(div, {
                  width: 560,
                  scale: 1
                });

              case 11:
                canvas = _context5.sent;
                div.remove();
                return _context5.abrupt("return", canvas);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
    }
    /**
     * 連携用QR作成
     */


    function createCooperationQRCode(params) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var order, qrcodeText, canvas, text;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                order = params.order;
                qrcodeText = params.qrcodeText;
                canvas = document.createElement('canvas');
                text = qrcodeText.replace(/\{\{ orderNumber \}\}/g, order.orderNumber).replace(/\{\{ price \}\}/g, String(order.price));
                return _context6.abrupt("return", new Promise(function (resolve, reject) {
                  qrcode__WEBPACK_IMPORTED_MODULE_3__["toCanvas"](canvas, text).then(function () {
                    resolve(canvas.toDataURL());
                  })["catch"](function (error) {
                    console.error(error);
                    reject(error);
                  });
                }));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
    }
    /**
     * 取引追加情報取得
     */


    function getTransactionAgentIdentifier(order, key) {
      if (order.customer.identifier === undefined || typeof order.customer.identifier === 'string') {
        return;
      }

      return order.customer.identifier.find(function (i) {
        return i.name === key;
      });
    }
    /**
     * 注文データCSV変換
     */


    function order2report(orders) {
      var data = [];
      orders.forEach(function (order) {
        order.acceptedOffers.forEach(function (acceptedOffer) {
          var itemOffered = acceptedOffer.itemOffered;

          if (itemOffered.typeOf !== _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.reservationType.EventReservation) {
            return;
          }

          var customData = {
            orderDate: order.orderDate,
            orderDateJST: moment__WEBPACK_IMPORTED_MODULE_2__(order.orderDate).format('YYYY/MM/DD/HH:mm'),
            orderNumber: order.orderNumber,
            orderStatus: order.orderStatus,
            dateReturnedJST: order.dateReturned === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_2__(order.dateReturned).format('YYYY/MM/DD/HH:mm'),
            confirmationNumber: order.confirmationNumber,
            price: order.price,
            seller: order.seller,
            paymentMethodsNames: order.paymentMethods.map(function (m) {
              return m.name;
            }).join(','),
            customer: Object.assign(Object.assign({}, order.customer), {
              formatTelephone: Object(_util_function__WEBPACK_IMPORTED_MODULE_5__["formatTelephone"])(order.customer.telephone),
              pos: {
                name: getTransactionAgentIdentifier(order, 'posName') === undefined ? {
                  name: '',
                  value: ''
                } : getTransactionAgentIdentifier(order, 'posName')
              },
              liny: {
                id: getTransactionAgentIdentifier(order, 'linyId') === undefined ? {
                  name: '',
                  value: ''
                } : getTransactionAgentIdentifier(order, 'linyId')
              }
            }),
            itemOffered: {
              id: itemOffered.id,
              price: Object(_purchase_function__WEBPACK_IMPORTED_MODULE_4__["getItemPrice"])({
                priceComponents: acceptedOffer.priceSpecification.priceComponent
              }),
              reservedTicket: itemOffered.reservedTicket,
              reservationFor: Object.assign(Object.assign({}, itemOffered.reservationFor), {
                startDateJST: moment__WEBPACK_IMPORTED_MODULE_2__(itemOffered.reservationFor.startDate).format('YYYY/MM/DD/HH:mm')
              })
            }
          };
          data.push(customData);
        });
      });
      return data;
    }
    /**
     * 入力データを検索条件へ変換
     */


    function input2OrderSearchCondition(params) {
      var input = params.input;
      var theater = params.theater;
      var page = params.page;
      var limit = params.limit;
      var identifiers = [];

      if (input.posId !== '') {
        identifiers.push({
          name: 'posId',
          value: input.posId
        });
      }

      var result = {
        customer: {
          // email: (input.customer.email === '') ? undefined : input.customer.email,
          // telephone: (input.customer.telephone === '') ? undefined : input.customer.telephone,
          // familyName: (input.customer.familyName === '') ? undefined : input.customer.familyName,
          // givenName: (input.customer.givenName === '') ? undefined : input.customer.givenName,
          email: {
            $eq: input.customer.email === '' ? undefined : input.customer.email
          },
          telephone: input.customer.telephone === '' ? undefined : input.customer.telephone,
          familyName: {
            $eq: input.customer.familyName === '' ? undefined : input.customer.familyName
          },
          givenName: {
            $eq: input.customer.givenName === '' ? undefined : input.customer.givenName
          },
          identifiers: identifiers
        },
        orderStatuses: input.orderStatus === '' ? undefined : [input.orderStatus],
        orderDateFrom: input.orderDateFrom === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_2__(moment__WEBPACK_IMPORTED_MODULE_2__(input.orderDateFrom).format('YYYYMMDD')).toDate(),
        orderDateThrough: input.orderDateThrough === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_2__(moment__WEBPACK_IMPORTED_MODULE_2__(input.orderDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
        confirmationNumbers: input.confirmationNumber === '' ? undefined : [input.confirmationNumber],
        orderNumbers: input.orderNumber === '' ? undefined : [input.orderNumber],
        paymentMethods: input.paymentMethodType === '' ? undefined : {
          typeOfs: [input.paymentMethodType]
        },
        acceptedOffers: {
          itemOffered: {
            reservationFor: {
              inSessionFrom: input.eventStartDateFrom === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_2__(moment__WEBPACK_IMPORTED_MODULE_2__(input.eventStartDateFrom).format('YYYYMMDD')).toDate(),
              inSessionThrough: input.eventStartDateThrough === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_2__(moment__WEBPACK_IMPORTED_MODULE_2__(input.eventStartDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
              superEvent: {
                location: {
                  branchCodes: theater === undefined ? [] : [theater.branchCode]
                }
              }
            }
          }
        },
        limit: limit,
        page: page,
        sort: {
          orderDate: _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].sortType.Descending
        }
      };
      return result;
    }
    /**
     * 注文連携リンク作成
     */


    function createOrderLink(order, link) {
      var params = [];
      link.params.forEach(function (p) {
        var value = p.value === undefined ? order[p.key] : p.value;
        params.push("".concat(p.key, "=").concat(value));
      });
      return params.length > 0 ? "".concat(link.url, "?").concat(params.join('&')) : link.url;
    }
    /***/

  },

  /***/
  "./app/functions/purchase.function.ts":
  /*!********************************************!*\
    !*** ./app/functions/purchase.function.ts ***!
    \********************************************/

  /*! exports provided: screeningEvents2WorkEvents, createGmoTokenObject, sameMovieTicketFilter, isAvailabilityMovieTicket, createMovieTicketsFromAuthorizeSeatReservation, getCustomPaymentMethodTypeName, getTicketPrice, getItemPrice, movieTicketAuthErroCodeToMessage, getAmount, order2EventOrders, authorizeSeatReservation2Event, getRemainingSeatLength, isEligibleSeatingType, getEmptySeat, selectAvailableSeat */

  /***/
  function appFunctionsPurchaseFunctionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "screeningEvents2WorkEvents", function () {
      return screeningEvents2WorkEvents;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createGmoTokenObject", function () {
      return createGmoTokenObject;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "sameMovieTicketFilter", function () {
      return sameMovieTicketFilter;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "isAvailabilityMovieTicket", function () {
      return isAvailabilityMovieTicket;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createMovieTicketsFromAuthorizeSeatReservation", function () {
      return createMovieTicketsFromAuthorizeSeatReservation;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getCustomPaymentMethodTypeName", function () {
      return getCustomPaymentMethodTypeName;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getTicketPrice", function () {
      return getTicketPrice;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getItemPrice", function () {
      return getItemPrice;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "movieTicketAuthErroCodeToMessage", function () {
      return movieTicketAuthErroCodeToMessage;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getAmount", function () {
      return getAmount;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "order2EventOrders", function () {
      return order2EventOrders;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "authorizeSeatReservation2Event", function () {
      return authorizeSeatReservation2Event;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getRemainingSeatLength", function () {
      return getRemainingSeatLength;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "isEligibleSeatingType", function () {
      return isEligibleSeatingType;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getEmptySeat", function () {
      return getEmptySeat;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "selectAvailableSeat", function () {
      return selectAvailableSeat;
    });
    /* harmony import */


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @cinerino/api-javascript-client */
    "../../node_modules/@cinerino/api-javascript-client/lib/index.js");
    /* harmony import */


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! moment */
    "../../node_modules/moment/moment.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../environments/environment */
    "./environments/environment.ts");
    /* harmony import */


    var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../models */
    "./app/models/index.ts");
    /**
     * 作品別イベントへ変換
     */


    function screeningEvents2WorkEvents(params) {
      var films = [];
      var screeningEvents = params.screeningEvents;
      screeningEvents.forEach(function (screeningEvent) {
        var registered = films.find(function (film) {
          return film.info.superEvent.id === screeningEvent.superEvent.id;
        });

        if (registered === undefined) {
          films.push({
            info: screeningEvent,
            data: [new _models__WEBPACK_IMPORTED_MODULE_3__["Purchase"].Performance(screeningEvent)]
          });
        } else {
          registered.data.push(new _models__WEBPACK_IMPORTED_MODULE_3__["Purchase"].Performance(screeningEvent));
        }
      });
      return films;
    }
    /**
     * GMOトークンオブジェクト生成
     */


    function createGmoTokenObject(params) {
      return new Promise(function (resolve, reject) {
        if (params.seller.paymentAccepted === undefined) {
          throw new Error('seller.paymentAccepted is undefined').message;
        }

        var findPaymentAcceptedResult = params.seller.paymentAccepted.find(function (paymentAccepted) {
          return paymentAccepted.paymentMethodType === _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].paymentMethodType.CreditCard;
        });

        if (findPaymentAcceptedResult === undefined || findPaymentAcceptedResult.paymentMethodType !== _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].paymentMethodType.CreditCard) {
          throw new Error('paymentMethodType CreditCard not found').message;
        }

        window.someCallbackFunction = function someCallbackFunction(response) {
          if (response.resultCode === '000') {
            resolve(response.tokenObject);
          } else {
            reject(new Error(response.resultCode));
          }
        };

        var Multipayment = window.Multipayment;
        Multipayment.init(findPaymentAcceptedResult.gmoInfo.shopId);
        Multipayment.getToken(params.creditCard, window.someCallbackFunction);
      });
    }
    /**
     * ムビチケ検索
     */


    function sameMovieTicketFilter(args) {
      var checkMovieTicketAction = args.checkMovieTicketAction;
      var checkMovieTicketActions = args.checkMovieTicketActions;

      if (checkMovieTicketAction.result === undefined || checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut === null || checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut[0].ykknInfo === null) {
        return [];
      }

      var result = [];
      checkMovieTicketActions.forEach(function (action) {
        if (action.result === undefined || action.result.purchaseNumberAuthResult.knyknrNoInfoOut === null || action.result.purchaseNumberAuthResult.knyknrNoInfoOut[0].ykknInfo === null) {
          return;
        }

        if (action.object.movieTickets[0].identifier !== checkMovieTicketAction.object.movieTickets[0].identifier) {
          return;
        }

        result.push(action);
      });
      return result;
    }
    /**
     * ムビチケ有効
     */


    function isAvailabilityMovieTicket(checkMovieTicketAction) {
      return checkMovieTicketAction.result !== undefined && checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut !== null && checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut[0].ykknInfo !== null;
    }
    /**
     *  予約情報からムビチケ情報作成
     */


    function createMovieTicketsFromAuthorizeSeatReservation(args) {
      var results = [];
      var authorizeSeatReservation = args.authorizeSeatReservation;
      var pendingMovieTickets = args.pendingMovieTickets;
      var seller = args.seller;

      if (authorizeSeatReservation.result === undefined) {
        return [];
      }

      var pendingReservations = authorizeSeatReservation.result.responseBody.object.reservations;
      pendingReservations.forEach(function (pendingReservation) {
        if (pendingReservation.price === undefined || typeof pendingReservation.price === 'number') {
          return;
        }

        var findMovieTicketTypeChargeSpecification = pendingReservation.price.priceComponent.find(function (p) {
          return p.typeOf === _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.priceSpecificationType.MovieTicketTypeChargeSpecification;
        });

        if (findMovieTicketTypeChargeSpecification === undefined) {
          return;
        }

        var findPendingMovieTicket = pendingMovieTickets.find(function (pendingMovieTicket) {
          return pendingMovieTicket.id === authorizeSeatReservation.id;
        });

        if (findPendingMovieTicket === undefined) {
          return;
        }

        var findReservation = findPendingMovieTicket.movieTickets.find(function (movieTicket) {
          var seatNumber = movieTicket.serviceOutput.reservedTicket.ticketedSeat.seatNumber;
          var seatSection = movieTicket.serviceOutput.reservedTicket.ticketedSeat.seatSection;
          return pendingReservation.reservedTicket.ticketedSeat !== undefined && seatNumber === pendingReservation.reservedTicket.ticketedSeat.seatNumber && seatSection === pendingReservation.reservedTicket.ticketedSeat.seatSection;
        });

        if (findReservation === undefined) {
          return;
        }

        results.push({
          typeOf: _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].paymentMethodType.MovieTicket,
          project: seller.project,
          identifier: findReservation.identifier,
          accessCode: findReservation.accessCode,
          serviceType: findReservation.serviceType,
          serviceOutput: findReservation.serviceOutput
        });
      });
      return results;
    }
    /**
     * カスタム支払い方法名称取得
     */


    function getCustomPaymentMethodTypeName(params) {
      var paymentMethodType = params.typeOf;
      var category = params.category;
      var environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["getEnvironment"])();
      var findResult = environment.PAYMENT_METHOD_CUSTOM.find(function (p) {
        return p.category === category;
      });

      if (paymentMethodType !== _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].paymentMethodType.Others || findResult === undefined) {
        return {
          ja: '',
          en: ''
        };
      }

      return findResult.name;
    }
    /**
     * 券種金額取得
     * @deprecated 非推奨（廃止予定）
     */


    function getTicketPrice(ticket) {
      var result = {
        unitPriceSpecification: 0,
        videoFormatCharge: 0,
        soundFormatCharge: 0,
        movieTicketTypeCharge: 0,
        total: 0,
        single: 0
      };

      if (ticket.priceSpecification === undefined) {
        return result;
      }

      var priceComponent = ticket.priceSpecification.priceComponent;
      var priceSpecificationType = _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.priceSpecificationType;
      var unitPriceSpecifications = priceComponent.filter(function (s) {
        return s.typeOf === priceSpecificationType.UnitPriceSpecification;
      });
      var movieTicketTypeCharges = priceComponent.filter(function (s) {
        return s.typeOf === priceSpecificationType.MovieTicketTypeChargeSpecification;
      });
      result.unitPriceSpecification += unitPriceSpecifications[0].price;
      movieTicketTypeCharges.forEach(function (movieTicketTypeCharge) {
        result.movieTicketTypeCharge += movieTicketTypeCharge.price;
      });
      result.total = result.unitPriceSpecification + result.videoFormatCharge + result.soundFormatCharge + result.movieTicketTypeCharge;
      var unitPriceSpecification = unitPriceSpecifications[0];

      if (unitPriceSpecification.typeOf === priceSpecificationType.UnitPriceSpecification) {
        var referenceQuantityValue = unitPriceSpecification.referenceQuantity.value === undefined ? 1 : unitPriceSpecification.referenceQuantity.value;
        result.single = result.total / referenceQuantityValue;
      }

      return result;
    }
    /**
     * アイテム金額取得
     */


    function getItemPrice(params) {
      var price = 0; // 券種価格

      var priceComponents = params.priceComponents;

      if (priceComponents === undefined) {
        return price;
      }

      var priceSpecificationType = _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.priceSpecificationType;
      priceComponents.forEach(function (p) {
        if (p.typeOf === priceSpecificationType.UnitPriceSpecification) {
          var value = p.referenceQuantity.value ? p.referenceQuantity.value : 1;
          price += p.price / value;
          return;
        }

        price += p.price;
      }); // 座席価格

      var seat = params.seat;

      if (seat === undefined || seat.offers === undefined) {
        return price;
      }

      seat.offers.forEach(function (o) {
        if (o.priceSpecification === undefined) {
          return;
        }

        o.priceSpecification.priceComponent.forEach(function (p) {
          return price += p.price;
        });
      });
      return price;
    }
    /**
     * ムビチケ認証購入管理番号無効事由区分変換
     */


    function movieTicketAuthErroCodeToMessage(code) {
      var table = [{
        code: '01',
        ja: '存在無',
        en: 'no existence'
      }, {
        code: '02',
        ja: 'PINｺｰﾄﾞ必須',
        en: 'PIN code required'
      }, {
        code: '03',
        ja: 'PINｺｰﾄﾞ認証ｴﾗｰ',
        en: 'PIN code authentication error'
      }, {
        code: '04',
        ja: '作品不一致',
        en: 'Work disagreement'
      }, {
        code: '05',
        ja: '未ｱｸﾃｨﾍﾞｰﾄ',
        en: 'unactivated'
      }, {
        code: '06',
        ja: '選択興行対象外',
        en: 'Not eligible for selection box'
      }, {
        code: '07',
        ja: '有効期限切れ',
        en: 'expired'
      }, {
        code: '08',
        ja: '座席予約期間外',
        en: 'outside the seat reservation period'
      }, {
        code: '09',
        ja: 'その他',
        en: 'other'
      }, {
        code: '11',
        ja: '座席予約開始前',
        en: 'Before starting seat reservation'
      }, {
        code: '12',
        ja: '仮お直り購入番号数不一致',
        en: 'temporary redemption purchase number mismatch'
      }];
      var findResult = table.find(function (data) {
        return data.code === code;
      });
      return findResult === undefined ? {
        ja: 'その他',
        en: 'other'
      } : {
        ja: findResult.ja,
        en: findResult.en
      };
    }
    /**
     * 予約金額取得
     */


    function getAmount(authorizeSeatReservations) {
      var amounts = authorizeSeatReservations.map(function (reservations) {
        return reservations.result === undefined ? 0 : reservations.result.price;
      });
      var amount = amounts.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      });
      return amount;
    }
    /**
     * イベント別オーダーへ変換
     */


    function order2EventOrders(params) {
      var results = [];
      var order = params.order;
      order.acceptedOffers.forEach(function (acceptedOffer) {
        var itemOffered = acceptedOffer.itemOffered;

        if (itemOffered.typeOf !== _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.reservationType.EventReservation) {
          return;
        }

        var registered = results.find(function (result) {
          return result.event.id === itemOffered.reservationFor.id;
        });

        if (registered === undefined) {
          results.push({
            event: itemOffered.reservationFor,
            data: [acceptedOffer]
          });
        } else {
          registered.data.push(acceptedOffer);
        }
      }); // 公開日順（降順）へソート

      var sortResult = results.sort(function (a, b) {
        if (a.event.workPerformed === undefined || a.event.workPerformed.datePublished === undefined) {
          return 1;
        }

        if (b.event.workPerformed === undefined || b.event.workPerformed.datePublished === undefined) {
          return -1;
        }

        var unixA = moment__WEBPACK_IMPORTED_MODULE_1__(a.event.workPerformed.datePublished).unix();
        var unixB = moment__WEBPACK_IMPORTED_MODULE_1__(b.event.workPerformed.datePublished).unix();

        if (unixA > unixB) {
          return -1;
        }

        if (unixA < unixB) {
          return 1;
        }

        return 0;
      });
      return sortResult;
    }
    /**
     * 座席予約をイベントごとに変換
     */


    function authorizeSeatReservation2Event(params) {
      var results = [];
      var authorizeSeatReservations = params.authorizeSeatReservations;
      authorizeSeatReservations.forEach(function (authorizeSeatReservation) {
        if (authorizeSeatReservation.result === undefined) {
          return;
        }

        var reservations = authorizeSeatReservation.result.responseBody.object.reservations;

        if (reservations === undefined) {
          return;
        }

        reservations.forEach(function (reservation) {
          var registered = results.find(function (result) {
            return result.event.id === reservation.reservationFor.id;
          });

          if (registered === undefined) {
            results.push({
              event: reservation.reservationFor,
              reservations: [reservation]
            });
          } else {
            registered.reservations.push(reservation);
          }
        });
      });
      return results;
    }
    /**
     * 残席数取得
     */


    function getRemainingSeatLength(params) {
      var screeningEventSeats = params.screeningEventSeats;
      var screeningEvent = params.screeningEvent;
      var result = 0;
      var limitSeatNumber = screeningEvent.workPerformed === undefined || screeningEvent.workPerformed.additionalProperty === undefined ? undefined : screeningEvent.workPerformed.additionalProperty.find(function (a) {
        return a.name === 'limitSeatNumber';
      });
      var filterResult = screeningEventSeats.filter(function (s) {
        if (limitSeatNumber !== undefined) {
          // 作品追加特性（limitSeatNumber）で座席数制御
          return s.offers !== undefined && s.offers[0].availability === _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.itemAvailability.InStock && Number(s.branchCode) <= Number(limitSeatNumber.value);
        }

        return s.offers !== undefined && s.offers[0].availability === _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.itemAvailability.InStock;
      });
      result += filterResult.length;
      var reservationCount = screeningEventSeats.filter(function (s) {
        return s.offers !== undefined && s.offers[0].availability === _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.itemAvailability.OutOfStock;
      }).length;

      if (screeningEvent.maximumAttendeeCapacity !== undefined && result > screeningEvent.maximumAttendeeCapacity - reservationCount) {
        result = screeningEvent.maximumAttendeeCapacity - reservationCount;
      }

      return result;
    }
    /**
     * 適用座席タイプ判定
     */


    function isEligibleSeatingType(params) {
      var seat = params.seat;
      var eligibleSeatingType = params.eligibleSeatingType;
      var filterResult = eligibleSeatingType.filter(function (e) {
        if (Array.isArray(seat.seatingType)) {
          return seat.seatingType.find(function (s) {
            return e.codeValue === s;
          }) !== undefined;
        }

        return e.codeValue === seat.seatingType;
      });
      return filterResult.length === eligibleSeatingType.length;
    }
    /**
     * 空席取得
     */


    function getEmptySeat(params) {
      var reservations = params.reservations;
      var screeningEventSeats = params.screeningEventSeats;
      var seats = [];
      screeningEventSeats.forEach(function (s) {
        var section = s.containedInPlace === undefined || s.containedInPlace.branchCode === undefined ? '' : s.containedInPlace.branchCode;
        var selectedSeat = reservations.find(function (r) {
          return r.seat !== undefined && r.seat.seatNumber === s.branchCode && r.seat.seatSection === section;
        });

        if ((s.offers === undefined || s.offers[0].availability !== _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.itemAvailability.InStock) && selectedSeat === undefined) {
          // 在庫なし
          return;
        }

        seats.push({
          typeOf: s.typeOf,
          seatingType: s.seatingType,
          seatNumber: s.branchCode,
          seatRow: '',
          seatSection: section
        });
      });
      return seats;
    }
    /**
     * 予約可能席取得
     */


    function selectAvailableSeat(params) {
      var reservations = params.reservations;
      var screeningEventSeats = params.screeningEventSeats;
      var seats = getEmptySeat({
        reservations: reservations,
        screeningEventSeats: screeningEventSeats
      });
      var availableSeats = [];
      reservations.forEach(function (r) {
        var findReservationSeat = seats.find(function (s) {
          var findReservedSeat = availableSeats.find(function (a) {
            var findSubReservedSeat = a.subReservations.find(function (sub) {
              return sub.seatNumber === s.seatNumber && sub.seatSection === s.seatSection;
            });

            if (findSubReservedSeat !== undefined) {
              // サブ予約済み座席
              return true;
            }

            return a.seatNumber === s.seatNumber && a.seatSection === s.seatSection;
          });

          if (findReservedSeat !== undefined) {
            // 予約済み座席
            return false;
          }

          if (r.ticket !== undefined && r.ticket.ticketOffer.eligibleSeatingType !== undefined && !isEligibleSeatingType({
            seat: s,
            eligibleSeatingType: r.ticket.ticketOffer.eligibleSeatingType
          })) {
            // 適用座席タイプ違い
            return false;
          }

          if (r.seat !== undefined) {
            // 座席選択済みの場合予約中の座席を選択
            return r.seat.seatNumber === s.seatNumber && r.seat.seatSection === s.seatSection;
          }

          return true;
        });

        if (findReservationSeat === undefined) {
          // 予約可能席なし
          return;
        }

        if (r.ticket === undefined || r.ticket.ticketOffer.eligibleSubReservation === undefined) {
          // サブ予約なし
          availableSeats.push(Object.assign(Object.assign({}, findReservationSeat), {
            subReservations: []
          }));
          return;
        } // サブ予約分取得


        var subReservations = [];
        r.ticket.ticketOffer.eligibleSubReservation.forEach(function (e) {
          for (var i = 0; i < e.amountOfThisGood; i++) {
            var subReservation = seats.find(function (s) {
              var findReservedSeat = availableSeats.find(function (a) {
                var findSubReservedSeat = a.subReservations.find(function (sub) {
                  return sub.seatNumber === s.seatNumber && sub.seatSection === s.seatSection;
                });

                if (findSubReservedSeat !== undefined) {
                  // サブ予約済み座席
                  return true;
                }

                return a.seatNumber === s.seatNumber && a.seatSection === s.seatSection;
              });

              if (findReservedSeat !== undefined) {
                // 予約済み座席
                return false;
              }

              var findSubReservationSeat = subReservations.find(function (sub) {
                return sub.seatNumber === s.seatNumber && sub.seatSection === s.seatSection;
              });

              if (findSubReservationSeat !== undefined) {
                // サブ予約中座席
                return false;
              }

              if (findReservationSeat.seatNumber === s.seatNumber && findReservationSeat.seatSection === s.seatSection) {
                // 予約中座席
                return false;
              }

              if (Array.isArray(s.seatingType) && s.seatingType.find(function (t) {
                return t === e.typeOfGood.seatingType;
              }) === undefined) {
                // 適用座席タイプ違い
                return false;
              }

              if (!Array.isArray(s.seatingType) && s.seatingType !== e.typeOfGood.seatingType) {
                // 適用座席タイプ違い
                return false;
              }

              if (r.seat !== undefined) {
                // 座席選択済みの場合予約中の座席以外を選択
                return !(r.seat.seatNumber === s.seatNumber && r.seat.seatSection === s.seatSection);
              }

              return true;
            });

            if (subReservation === undefined) {
              return;
            }

            subReservations.push(subReservation);
          }
        });
        availableSeats.push(Object.assign(Object.assign({}, findReservationSeat), {
          subReservations: subReservations
        }));
      });
      return availableSeats;
    }
    /***/

  },

  /***/
  "./app/functions/reservation.function.ts":
  /*!***********************************************!*\
    !*** ./app/functions/reservation.function.ts ***!
    \***********************************************/

  /*! exports provided: reservation2report, input2ReservationSearchCondition */

  /***/
  function appFunctionsReservationFunctionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "reservation2report", function () {
      return reservation2report;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "input2ReservationSearchCondition", function () {
      return input2ReservationSearchCondition;
    });
    /* harmony import */


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @cinerino/api-javascript-client */
    "../../node_modules/@cinerino/api-javascript-client/lib/index.js");
    /* harmony import */


    var _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! moment */
    "../../node_modules/moment/moment.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var _purchase_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./purchase.function */
    "./app/functions/purchase.function.ts");
    /**
     * 予約データCSV変換
     */


    function reservation2report(reservations) {
      var data = [];
      reservations.forEach(function (reservation) {
        var customData = {
          bookingTime: reservation.bookingTime,
          bookingTimeJST: moment__WEBPACK_IMPORTED_MODULE_1__(reservation.bookingTime).format('YYYY/MM/DD/HH:mm'),
          id: reservation.id,
          reservationNumber: reservation.reservationNumber,
          reservationStatus: reservation.reservationStatus,
          price: typeof reservation.price === 'number' || reservation.price === undefined ? reservation.price : Object(_purchase_function__WEBPACK_IMPORTED_MODULE_2__["getItemPrice"])({
            priceComponents: reservation.price.priceComponent
          }),
          reservedTicket: reservation.reservedTicket,
          reservationFor: Object.assign(Object.assign({}, reservation.reservationFor), {
            startDateJST: moment__WEBPACK_IMPORTED_MODULE_1__(reservation.reservationFor.startDate).format('YYYY/MM/DD/HH:mm')
          }),
          checkedIn: reservation.checkedIn,
          attended: reservation.attended
        };
        data.push(customData);
      });
      return data;
    }
    /**
     * 入力データを検索条件へ変換
     */


    function input2ReservationSearchCondition(params) {
      var input = params.input;
      var theater = params.theater;
      var page = params.page;
      var limit = params.limit;
      var result = {
        typeOf: _cinerino_api_javascript_client__WEBPACK_IMPORTED_MODULE_0__["factory"].chevre.reservationType.EventReservation,
        bookingFrom: input.reservationDateFrom === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_1__(moment__WEBPACK_IMPORTED_MODULE_1__(input.reservationDateFrom).format('YYYYMMDD')).toDate(),
        bookingThrough: input.reservationDateThrough === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_1__(moment__WEBPACK_IMPORTED_MODULE_1__(input.reservationDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
        reservationFor: {
          startFrom: input.eventStartDateFrom === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_1__(moment__WEBPACK_IMPORTED_MODULE_1__(input.eventStartDateFrom).format('YYYYMMDD')).toDate(),
          startThrough: input.eventStartDateThrough === undefined ? undefined : moment__WEBPACK_IMPORTED_MODULE_1__(moment__WEBPACK_IMPORTED_MODULE_1__(input.eventStartDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
          superEvent: {
            location: {
              branchCodes: theater === undefined ? [] : [theater.branchCode]
            }
          }
        },
        ids: input.id === '' ? undefined : [input.id],
        reservationStatuses: input.reservationStatus === '' ? undefined : [input.reservationStatus],
        reservationNumbers: input.reservationNumber === '' ? undefined : [input.reservationNumber],
        limit: limit,
        page: page,
        sort: {// reservationDate: factory.sortType.Descending
        }
      };
      return result;
    }
    /***/

  },

  /***/
  "./app/functions/translate.function.ts":
  /*!*********************************************!*\
    !*** ./app/functions/translate.function.ts ***!
    \*********************************************/

  /*! exports provided: CustomTranslateHttpLoader, getTranslateModuleConfig */

  /***/
  function appFunctionsTranslateFunctionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CustomTranslateHttpLoader", function () {
      return CustomTranslateHttpLoader;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getTranslateModuleConfig", function () {
      return getTranslateModuleConfig;
    });
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/common/http */
    "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @ngx-translate/core */
    "../../node_modules/@ngx-translate/core/__ivy_ngcc__/fesm2015/ngx-translate-core.js");
    /* harmony import */


    var deepmerge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! deepmerge */
    "../../node_modules/deepmerge/dist/cjs.js");
    /* harmony import */


    var deepmerge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! moment */
    "../../node_modules/moment/moment.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs */
    "../../node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! rxjs/operators */
    "../../node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../environments/environment */
    "./environments/environment.ts");
    /* harmony import */


    var _util_function__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./util.function */
    "./app/functions/util.function.ts");
    /**
     * 多言語カスタムローダー
     */


    var CustomTranslateHttpLoader = /*#__PURE__*/function () {
      function CustomTranslateHttpLoader(http) {
        _classCallCheck(this, CustomTranslateHttpLoader);

        this.http = http;
      }

      _createClass(CustomTranslateHttpLoader, [{
        key: "getTranslation",
        value: function getTranslation(lang) {
          var _this = this;

          var suffix = ".json?date=".concat(moment__WEBPACK_IMPORTED_MODULE_3__().toISOString());
          var resources = ["/default/i18n/common/".concat(lang).concat(suffix), "/default/i18n/".concat(Object(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["getEnvironment"])().VIEW_TYPE, "/").concat(lang).concat(suffix), "".concat(Object(_util_function__WEBPACK_IMPORTED_MODULE_7__["getProject"])().storageUrl, "/i18n/").concat(lang).concat(suffix)];
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["forkJoin"])(resources.map(function (url) {
            return _this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
              console.error(error);
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])({});
            }));
          })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (response) {
            return response.reduce(function (a, b) {
              return deepmerge__WEBPACK_IMPORTED_MODULE_2__(a, b);
            });
          }));
        }
      }]);

      return CustomTranslateHttpLoader;
    }();
    /**
     * 多言語設定取得
     */


    function getTranslateModuleConfig() {
      return {
        loader: {
          provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateLoader"],
          useClass: CustomTranslateHttpLoader,
          deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]]
        }
      };
    }
    /***/

  },

  /***/
  "./app/functions/util.function.ts":
  /*!****************************************!*\
    !*** ./app/functions/util.function.ts ***!
    \****************************************/

  /*! exports provided: formatTelephone, toFull, toHalf, retry, sleep, buildQueryString, iOSDatepickerTapBugFix, string2blob, getParameter, getProject, createRandomString, isFile, deepCopy */

  /***/
  function appFunctionsUtilFunctionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "formatTelephone", function () {
      return formatTelephone;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "toFull", function () {
      return toFull;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "toHalf", function () {
      return toHalf;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "retry", function () {
      return retry;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "sleep", function () {
      return sleep;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "buildQueryString", function () {
      return buildQueryString;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "iOSDatepickerTapBugFix", function () {
      return iOSDatepickerTapBugFix;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "string2blob", function () {
      return string2blob;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getParameter", function () {
      return getParameter;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getProject", function () {
      return getProject;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createRandomString", function () {
      return createRandomString;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "isFile", function () {
      return isFile;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "deepCopy", function () {
      return deepCopy;
    });
    /* harmony import */


    var libphonenumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! libphonenumber-js */
    "../../node_modules/libphonenumber-js/index.es6.js");

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
     * 電話番号変換
     */


    function formatTelephone(telephone, format) {
      if (telephone === undefined) {
        return '';
      }

      var parsedNumber = new RegExp(/^\+/).test(telephone) ? libphonenumber_js__WEBPACK_IMPORTED_MODULE_0__["parse"](telephone) : libphonenumber_js__WEBPACK_IMPORTED_MODULE_0__["parse"](telephone, 'JP');
      format = format === undefined ? 'International' : format;
      return libphonenumber_js__WEBPACK_IMPORTED_MODULE_0__["format"](parsedNumber, format).replace(/\s/g, '');
    }
    /**
     * 全角変換
     */


    function toFull(value) {
      return value.replace(/[A-Za-z0-9]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 65248);
      });
    }
    /**
     * 半角変換
     */


    function toHalf(value) {
      return value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      });
    }
    /**
     * リトライ
     * @param args
     */


    function retry(args) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this2 = this;

        var count;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                count = 0;
                return _context9.abrupt("return", new Promise(function (resolve, reject) {
                  return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                    var _this3 = this;

                    var timerProcess, result;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            timerProcess = function timerProcess() {
                              setTimeout(function () {
                                return __awaiter(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                                  var result;
                                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                    while (1) {
                                      switch (_context7.prev = _context7.next) {
                                        case 0:
                                          count++;
                                          _context7.prev = 1;
                                          _context7.next = 4;
                                          return args.process();

                                        case 4:
                                          result = _context7.sent;
                                          resolve(result);
                                          _context7.next = 14;
                                          break;

                                        case 8:
                                          _context7.prev = 8;
                                          _context7.t0 = _context7["catch"](1);

                                          if (!(count >= args.limit)) {
                                            _context7.next = 13;
                                            break;
                                          }

                                          reject(_context7.t0);
                                          return _context7.abrupt("return");

                                        case 13:
                                          timerProcess();

                                        case 14:
                                        case "end":
                                          return _context7.stop();
                                      }
                                    }
                                  }, _callee7, null, [[1, 8]]);
                                }));
                              }, args.interval);
                            };

                            _context8.prev = 1;
                            _context8.next = 4;
                            return args.process();

                          case 4:
                            result = _context8.sent;
                            resolve(result);
                            _context8.next = 11;
                            break;

                          case 8:
                            _context8.prev = 8;
                            _context8.t0 = _context8["catch"](1);
                            timerProcess();

                          case 11:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8, null, [[1, 8]]);
                  }));
                }));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
    }
    /**
     * ミリ秒待ち
     * @param time
     */


    function sleep(time) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", new Promise(function (resolve) {
                  setTimeout(function () {
                    resolve();
                  }, time);
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));
    }
    /**
     * クエリストリング変換
     */


    function buildQueryString(data) {
      var key, value, type, i, max;
      var encode = encodeURIComponent;
      var query = '';

      for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
        key = _Object$keys[_i];
        value = data[key];
        type = typeof value === 'object' && value instanceof Array ? 'array' : typeof value;

        switch (type) {
          case 'undefined':
            break;

          case 'array':
            // 配列
            for (i = 0, max = value.length; i < max; i++) {
              query += key + '[]';
              query += '=';
              query += encode(value[i]);
              query += '&';
            }

            query = query.substr(0, query.length - 1);
            break;

          case 'object':
            // ハッシュ
            for (var _i2 = 0, _Object$keys2 = Object.keys(value); _i2 < _Object$keys2.length; _i2++) {
              i = _Object$keys2[_i2];

              if (value[i] === undefined || value[i] === '') {
                break;
              }

              query += key + '[' + i + ']';
              query += '=';
              query += encode(value[i]);
              query += '&';
            }

            query = query.substr(0, query.length - 1);
            break;

          default:
            if (value === '') {
              break;
            }

            query += key;
            query += '=';
            query += encode(value);
            break;
        }

        query += '&';
      }

      query = query.substr(0, query.length - 1);
      return query;
    }
    /**
     * iOS bugfix（2回タップしないと選択できない）
     */


    function iOSDatepickerTapBugFix(container, datepickerDirectives) {
      var dayHoverHandler = container.dayHoverHandler;

      var hoverWrapper = function hoverWrapper(event) {
        var cell = event.cell,
            isHovered = event.isHovered;

        if (isHovered && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) && 'ontouchstart' in window) {
          datepickerDirectives.forEach(function (d) {
            return d._datepickerRef.instance.daySelectHandler(cell);
          });
        }

        return dayHoverHandler(event);
      };

      container.dayHoverHandler = hoverWrapper;
    }
    /**
     * ストリーミングダウンロード
     */
    // export async function streamingDownload<T>(stream: ReadableStream<T>) {
    //     const reader = stream.getReader();
    //     const decoder = new TextDecoder();
    //     let streamText = '';
    //     return new Promise<string>(async (resolve, reject) => {
    //         try {
    //             const readChunk = async (chunk: { done: boolean; value: any; }) => {
    //                 if (chunk.done) {
    //                     resolve(streamText);
    //                     return;
    //                 }
    //                 streamText += decoder.decode(chunk.value);
    //                 await readChunk(await reader.read());
    //             };
    //             await readChunk(await reader.read());
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

    /**
     * 文字列をBLOB変換
     */


    function string2blob(value, options) {
      var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
      return new Blob([bom, value], options);
    }
    /**
     * パラメータ取得
     */


    function getParameter() {
      var result = {};
      var params = location.search.replace('?', '').split('&');

      for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        var key = param[0];
        var value = param[1];

        if (key && value) {
          result[key] = value;
        }
      }

      return result;
    }
    /**
     * プロジェクト情報取得
     */


    function getProject() {
      var project = sessionStorage.getItem('PROJECT');
      var defaultProject = {
        projectId: '',
        projectName: '',
        storageUrl: ''
      };

      if (project === null || project === '') {
        return defaultProject;
      }

      return Object.assign(Object.assign({}, defaultProject), JSON.parse(project));
    }
    /**
     * ランダム英数字生成
     */


    function createRandomString(length, regExp) {
      var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.replace(regExp, '');
      var result = '';

      for (var i = 0; i < length; i++) {
        result += str[Math.floor(Math.random() * str.length)];
      }

      return result;
    }
    /**
     * ファイル存在判定
     */


    function isFile(url) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var fetchResult;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return fetch(url, {
                  method: 'GET',
                  cache: 'no-cache',
                  headers: {
                    'Content-Type': 'charset=utf-8'
                  }
                });

              case 2:
                fetchResult = _context11.sent;
                return _context11.abrupt("return", fetchResult.ok);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));
    }
    /**
     * オブジェクトディープコピー
     */


    function deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    /***/

  },

  /***/
  "./app/index.ts":
  /*!**********************!*\
    !*** ./app/index.ts ***!
    \**********************/

  /*! exports provided: Functions, Models */

  /***/
  function appIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./functions */
    "./app/functions/index.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Functions", function () {
      return _functions__WEBPACK_IMPORTED_MODULE_0__;
    });
    /* harmony import */


    var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./models */
    "./app/models/index.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Models", function () {
      return _models__WEBPACK_IMPORTED_MODULE_1__;
    });
    /***/

  },

  /***/
  "./app/models/admission/index.ts":
  /*!***************************************!*\
    !*** ./app/models/admission/index.ts ***!
    \***************************************/

  /*! no static exports found */

  /***/
  function appModelsAdmissionIndexTs(module, exports) {
    /***/
  },

  /***/
  "./app/models/index.ts":
  /*!*****************************!*\
    !*** ./app/models/index.ts ***!
    \*****************************/

  /*! exports provided: Admission, Reservation, Purchase, Order, Util */

  /***/
  function appModelsIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _admission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./admission */
    "./app/models/admission/index.ts");
    /* harmony import */


    var _admission__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_admission__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Admission", function () {
      return _admission__WEBPACK_IMPORTED_MODULE_0__;
    });
    /* harmony import */


    var _order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./order */
    "./app/models/order/index.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Order", function () {
      return _order__WEBPACK_IMPORTED_MODULE_1__;
    });
    /* harmony import */


    var _purchase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./purchase */
    "./app/models/purchase/index.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Purchase", function () {
      return _purchase__WEBPACK_IMPORTED_MODULE_2__;
    });
    /* harmony import */


    var _reservation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./reservation */
    "./app/models/reservation/index.ts");
    /* harmony import */


    var _reservation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_reservation__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Reservation", function () {
      return _reservation__WEBPACK_IMPORTED_MODULE_3__;
    });
    /* harmony import */


    var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./util */
    "./app/models/util/index.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Util", function () {
      return _util__WEBPACK_IMPORTED_MODULE_4__;
    });
    /***/

  },

  /***/
  "./app/models/order/action.ts":
  /*!************************************!*\
    !*** ./app/models/order/action.ts ***!
    \************************************/

  /*! exports provided: OrderActions */

  /***/
  function appModelsOrderActionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrderActions", function () {
      return OrderActions;
    });

    var OrderActions;

    (function (OrderActions) {
      /**
       * キャンセル
       */
      OrderActions["Cancel"] = "Cancel";
      /**
       * 印刷
       */

      OrderActions["Print"] = "Print";
    })(OrderActions || (OrderActions = {}));
    /***/

  },

  /***/
  "./app/models/order/download.ts":
  /*!**************************************!*\
    !*** ./app/models/order/download.ts ***!
    \**************************************/

  /*! exports provided: CsvFormat */

  /***/
  function appModelsOrderDownloadTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CsvFormat", function () {
      return CsvFormat;
    });

    var CsvFormat;

    (function (CsvFormat) {
      CsvFormat["Default"] = "Default";
      CsvFormat["Custom"] = "Custom";
    })(CsvFormat || (CsvFormat = {}));
    /***/

  },

  /***/
  "./app/models/order/index.ts":
  /*!***********************************!*\
    !*** ./app/models/order/index.ts ***!
    \***********************************/

  /*! exports provided: Action, Print, Search, Download */

  /***/
  function appModelsOrderIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./action */
    "./app/models/order/action.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Action", function () {
      return _action__WEBPACK_IMPORTED_MODULE_0__;
    });
    /* harmony import */


    var _download__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./download */
    "./app/models/order/download.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Download", function () {
      return _download__WEBPACK_IMPORTED_MODULE_1__;
    });
    /* harmony import */


    var _print__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./print */
    "./app/models/order/print.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Print", function () {
      return _print__WEBPACK_IMPORTED_MODULE_2__;
    });
    /* harmony import */


    var _search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./search */
    "./app/models/order/search.ts");
    /* harmony import */


    var _search__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_search__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Search", function () {
      return _search__WEBPACK_IMPORTED_MODULE_3__;
    });
    /***/

  },

  /***/
  "./app/models/order/print.ts":
  /*!***********************************!*\
    !*** ./app/models/order/print.ts ***!
    \***********************************/

  /*! exports provided: PrintQrcodeType */

  /***/
  function appModelsOrderPrintTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PrintQrcodeType", function () {
      return PrintQrcodeType;
    });
    /**
     * QRコード文字列
     */


    var PrintQrcodeType;

    (function (PrintQrcodeType) {
      PrintQrcodeType["None"] = "None";
      PrintQrcodeType["Token"] = "token";
      PrintQrcodeType["Custom"] = "Custom";
    })(PrintQrcodeType || (PrintQrcodeType = {}));
    /***/

  },

  /***/
  "./app/models/order/search.ts":
  /*!************************************!*\
    !*** ./app/models/order/search.ts ***!
    \************************************/

  /*! no static exports found */

  /***/
  function appModelsOrderSearchTs(module, exports) {
    /***/
  },

  /***/
  "./app/models/purchase/index.ts":
  /*!**************************************!*\
    !*** ./app/models/purchase/index.ts ***!
    \**************************************/

  /*! exports provided: MovieTicket, Payment, Performance, Reservation, Screen */

  /***/
  function appModelsPurchaseIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _movieTicket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./movieTicket */
    "./app/models/purchase/movieTicket.ts");
    /* harmony import */


    var _movieTicket__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_movieTicket__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "MovieTicket", function () {
      return _movieTicket__WEBPACK_IMPORTED_MODULE_0__;
    });
    /* harmony import */


    var _payment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./payment */
    "./app/models/purchase/payment.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Payment", function () {
      return _payment__WEBPACK_IMPORTED_MODULE_1__;
    });
    /* harmony import */


    var _performance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./performance */
    "./app/models/purchase/performance.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "Performance", function () {
      return _performance__WEBPACK_IMPORTED_MODULE_2__["Performance"];
    });
    /* harmony import */


    var _reservation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./reservation */
    "./app/models/purchase/reservation.ts");
    /* harmony import */


    var _reservation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_reservation__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Reservation", function () {
      return _reservation__WEBPACK_IMPORTED_MODULE_3__;
    });
    /* harmony import */


    var _screen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./screen */
    "./app/models/purchase/screen.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Screen", function () {
      return _screen__WEBPACK_IMPORTED_MODULE_4__;
    });
    /***/

  },

  /***/
  "./app/models/purchase/movieTicket.ts":
  /*!********************************************!*\
    !*** ./app/models/purchase/movieTicket.ts ***!
    \********************************************/

  /*! no static exports found */

  /***/
  function appModelsPurchaseMovieTicketTs(module, exports) {
    /***/
  },

  /***/
  "./app/models/purchase/payment.ts":
  /*!****************************************!*\
    !*** ./app/models/purchase/payment.ts ***!
    \****************************************/

  /*! exports provided: PaymentMethodType */

  /***/
  function appModelsPurchasePaymentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PaymentMethodType", function () {
      return PaymentMethodType;
    });
    /**
     * 決済方法タイプ
     */


    var PaymentMethodType;

    (function (PaymentMethodType) {
      /**
       * 現金
       */
      PaymentMethodType["Cash"] = "Cash";
      /**
       * 電子マネー
       */

      PaymentMethodType["EMoney"] = "EMoney";
      /**
       * クレジットカード決済
       */

      PaymentMethodType["CreditCard"] = "CreditCard";
      /**
       * RegiGrow決済
       */

      PaymentMethodType["RegiGrow"] = "RegiGrow";
    })(PaymentMethodType || (PaymentMethodType = {}));
    /***/

  },

  /***/
  "./app/models/purchase/performance.ts":
  /*!********************************************!*\
    !*** ./app/models/purchase/performance.ts ***!
    \********************************************/

  /*! exports provided: Performance */

  /***/
  function appModelsPurchasePerformanceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Performance", function () {
      return Performance;
    });
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! moment */
    "../../node_modules/moment/moment.js");
    /* harmony import */


    var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../../environments/environment */
    "./environments/environment.ts");
    /**
     * Performance
     */


    var Performance = /*#__PURE__*/function () {
      function Performance(screeningEvent) {
        _classCallCheck(this, Performance);

        this.screeningEvent = screeningEvent;
      }
      /**
       * 販売判定
       */


      _createClass(Performance, [{
        key: "isSales",
        value: function isSales(status) {
          var screeningEvent = this.screeningEvent;
          var offers = screeningEvent.offers;

          if (offers === undefined) {
            return false;
          }

          var now = moment__WEBPACK_IMPORTED_MODULE_0__().unix();
          var validFrom = moment__WEBPACK_IMPORTED_MODULE_0__(offers.validFrom).unix();
          var validThrough = moment__WEBPACK_IMPORTED_MODULE_0__(offers.validThrough).unix();
          var result = false;

          switch (status) {
            case 'window':
              result = false;
              break;

            case 'start':
              result = now < validFrom;
              break;

            case 'end':
              result = validThrough < now;
              break;

            default:
              result = validFrom < now && now < validThrough;
              break;
          }

          return result;
        }
        /**
         * 座席ステータス判定
         */

      }, {
        key: "isSeatStatus",
        value: function isSeatStatus(status) {
          var screeningEvent = this.screeningEvent;
          var environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_1__["getEnvironment"])();
          var limitSeatNumber = screeningEvent.workPerformed === undefined || screeningEvent.workPerformed.additionalProperty === undefined ? undefined : screeningEvent.workPerformed.additionalProperty.find(function (a) {
            return a.name === 'limitSeatNumber';
          });
          var remainingAttendeeCapacity = screeningEvent.remainingAttendeeCapacity;
          var maximumAttendeeCapacity = screeningEvent.maximumAttendeeCapacity;

          if (remainingAttendeeCapacity === undefined || maximumAttendeeCapacity === undefined) {
            return status === undefined;
          }

          if (limitSeatNumber !== undefined && maximumAttendeeCapacity > Number(limitSeatNumber.value)) {
            // 作品追加特性（limitSeatNumber）で座席数制御
            remainingAttendeeCapacity = remainingAttendeeCapacity < maximumAttendeeCapacity - Number(limitSeatNumber.value) ? 0 : remainingAttendeeCapacity - (maximumAttendeeCapacity - Number(limitSeatNumber.value));
            maximumAttendeeCapacity = Number(limitSeatNumber.value);
          }

          var result = false;
          var unit = environment.PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT;
          var value = Number(environment.PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE);

          if (unit === '%') {
            switch (status) {
              case 'success':
                result = remainingAttendeeCapacity !== 0 && Math.floor(remainingAttendeeCapacity / maximumAttendeeCapacity * 100) >= value;
                break;

              case 'warning':
                result = remainingAttendeeCapacity !== 0 && Math.floor(remainingAttendeeCapacity / maximumAttendeeCapacity * 100) < value && remainingAttendeeCapacity > 0;
                break;

              case 'danger':
                result = remainingAttendeeCapacity === 0;
                break;

              default:
                break;
            }

            return result;
          } else if (unit === 'count') {
            switch (status) {
              case 'success':
                result = remainingAttendeeCapacity !== 0 && remainingAttendeeCapacity >= value;
                break;

              case 'warning':
                result = remainingAttendeeCapacity !== 0 && remainingAttendeeCapacity < value && remainingAttendeeCapacity > 0;
                break;

              case 'danger':
                result = remainingAttendeeCapacity === 0;
                break;

              default:
                break;
            }

            return result;
          } else {
            return false;
          }
        }
        /**
         * 座席あり判定
         */

      }, {
        key: "isTicketedSeat",
        value: function isTicketedSeat() {
          var screeningEvent = this.screeningEvent;
          return screeningEvent.offers !== undefined && screeningEvent.offers.itemOffered.serviceOutput !== undefined && screeningEvent.offers.itemOffered.serviceOutput.reservedTicket !== undefined && screeningEvent.offers.itemOffered.serviceOutput.reservedTicket.ticketedSeat !== undefined;
        }
        /**
         * 在庫無限判定
         */

      }, {
        key: "isInfinitetock",
        value: function isInfinitetock() {
          var screeningEvent = this.screeningEvent;
          return screeningEvent.maximumAttendeeCapacity === undefined;
        }
        /**
         * 開場判定
         */

      }, {
        key: "isOpenDoor",
        value: function isOpenDoor(status) {
          var now = moment__WEBPACK_IMPORTED_MODULE_0__().unix();
          var result;

          switch (status) {
            case 'before':
              result = now < moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.doorTime).unix();
              break;

            case 'after':
              result = moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.startDate).unix() < now;
              break;

            default:
              result = moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.doorTime).unix() < now && now < moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.startDate).unix();
              break;
          }

          return result;
        }
        /**
         * 上映判定
         */

      }, {
        key: "isScreening",
        value: function isScreening(status) {
          var now = moment__WEBPACK_IMPORTED_MODULE_0__().unix();
          var result;

          switch (status) {
            case 'before':
              result = now < moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.startDate).unix();
              break;

            case 'after':
              result = moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.endDate).unix() < now;
              break;

            default:
              result = moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.startDate).unix() < now && now < moment__WEBPACK_IMPORTED_MODULE_0__(this.screeningEvent.endDate).unix();
              break;
          }

          return result;
        }
      }]);

      return Performance;
    }();
    /***/

  },

  /***/
  "./app/models/purchase/reservation.ts":
  /*!********************************************!*\
    !*** ./app/models/purchase/reservation.ts ***!
    \********************************************/

  /*! no static exports found */

  /***/
  function appModelsPurchaseReservationTs(module, exports) {
    /***/
  },

  /***/
  "./app/models/purchase/screen.ts":
  /*!***************************************!*\
    !*** ./app/models/purchase/screen.ts ***!
    \***************************************/

  /*! exports provided: SeatStatus */

  /***/
  function appModelsPurchaseScreenTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SeatStatus", function () {
      return SeatStatus;
    });

    var SeatStatus;

    (function (SeatStatus) {
      SeatStatus["Disabled"] = "disabled";
      SeatStatus["Default"] = "default";
      SeatStatus["Active"] = "active";
    })(SeatStatus || (SeatStatus = {}));
    /***/

  },

  /***/
  "./app/models/reservation/index.ts":
  /*!*****************************************!*\
    !*** ./app/models/reservation/index.ts ***!
    \*****************************************/

  /*! no static exports found */

  /***/
  function appModelsReservationIndexTs(module, exports) {
    /***/
  },

  /***/
  "./app/models/util/index.ts":
  /*!**********************************!*\
    !*** ./app/models/util/index.ts ***!
    \**********************************/

  /*! exports provided: Language, Printer, ViewType */

  /***/
  function appModelsUtilIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./language */
    "./app/models/util/language.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "Language", function () {
      return _language__WEBPACK_IMPORTED_MODULE_0__["Language"];
    });
    /* harmony import */


    var _printer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./printer */
    "./app/models/util/printer.ts");
    /* harmony reexport (module object) */


    __webpack_require__.d(__webpack_exports__, "Printer", function () {
      return _printer__WEBPACK_IMPORTED_MODULE_1__;
    });
    /* harmony import */


    var _viewType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./viewType */
    "./app/models/util/viewType.ts");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "ViewType", function () {
      return _viewType__WEBPACK_IMPORTED_MODULE_2__["ViewType"];
    });
    /***/

  },

  /***/
  "./app/models/util/language.ts":
  /*!*************************************!*\
    !*** ./app/models/util/language.ts ***!
    \*************************************/

  /*! exports provided: Language */

  /***/
  function appModelsUtilLanguageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Language", function () {
      return Language;
    });
    /**
     * 言語
     */


    var Language;

    (function (Language) {
      Language["en"] = "English";
      Language["en-US"] = "English (American English)";
      Language["en-GB"] = "English (British English\u3001UK English)";
      Language["en-CA"] = "English (Canadian English)";
      Language["en-AU"] = "English (Australian English)";
      Language["fr"] = "French";
      Language["de"] = "German";
      Language["it"] = "Italian";
      Language["ja"] = "\u65E5\u672C\u8A9E";
      Language["ko"] = "Korean";
      Language["pt"] = "Portuguese";
      Language["ru"] = "Russian";
    })(Language || (Language = {}));
    /***/

  },

  /***/
  "./app/models/util/printer.ts":
  /*!************************************!*\
    !*** ./app/models/util/printer.ts ***!
    \************************************/

  /*! exports provided: ConnectionType, printers */

  /***/
  function appModelsUtilPrinterTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConnectionType", function () {
      return ConnectionType;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "printers", function () {
      return printers;
    });
    /**
     * 接続の種類
     */


    var ConnectionType;

    (function (ConnectionType) {
      /**
       * なし
       */
      ConnectionType["None"] = "None";
      /**
       * 画像
       */

      ConnectionType["Image"] = "Image";
      /**
       * スター精密 LAN接続
       */

      ConnectionType["StarLAN"] = "StarLAN";
      /**
       * スター精密 Bluetooth接続
       */

      ConnectionType["StarBluetooth"] = "StarBluetooth";
    })(ConnectionType || (ConnectionType = {}));
    /**
     * プリンター一覧
     */


    var printers = [{
      connectionType: ConnectionType.None,
      name: 'setting.printType.none'
    }, {
      connectionType: ConnectionType.Image,
      name: 'setting.printType.image'
    }, {
      connectionType: ConnectionType.StarLAN,
      name: 'setting.printType.starLAN'
    }, {
      connectionType: ConnectionType.StarBluetooth,
      name: 'setting.printType.starBluetooth'
    }];
    /***/
  },

  /***/
  "./app/models/util/viewType.ts":
  /*!*************************************!*\
    !*** ./app/models/util/viewType.ts ***!
    \*************************************/

  /*! exports provided: ViewType */

  /***/
  function appModelsUtilViewTypeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ViewType", function () {
      return ViewType;
    });

    var ViewType;

    (function (ViewType) {
      /**
       * 映画用
       */
      ViewType["Cinema"] = "cinema";
      /**
       * イベント用
       */

      ViewType["Event"] = "event";
    })(ViewType || (ViewType = {}));
    /***/

  },

  /***/
  "./environments/environment.ts":
  /*!*************************************!*\
    !*** ./environments/environment.ts ***!
    \*************************************/

  /*! exports provided: isProduction, getEnvironment */

  /***/
  function environmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "isProduction", function () {
      return isProduction;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getEnvironment", function () {
      return getEnvironment;
    });
    /* harmony import */


    var _app_functions_util_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../app/functions/util.function */
    "./app/functions/util.function.ts");

    var isProduction = document.querySelector('body.production') !== null;
    var defaultEnvironment = {
      production: false,
      APP_TITLE: '',
      ENTRANCE_SERVER_URL: '',
      INSTRUCTION_URL: '',
      ANALYTICS_ID: '',
      GTM_ID: '',
      VIEW_TYPE: 'event',
      STORAGE_NAME: Object(_app_functions_util_function__WEBPACK_IMPORTED_MODULE_0__["getProject"])().projectId === '' ? 'POS-STATE' : "".concat(Object(_app_functions_util_function__WEBPACK_IMPORTED_MODULE_0__["getProject"])().projectId.toUpperCase(), "-POS-STATE"),
      STORAGE_TYPE: 'localStorage',
      BASE_URL: '/purchase/root',
      LANGUAGE: ['ja'],
      PROFILE: [{
        key: 'email',
        value: '',
        required: true,
        maxLength: 50
      }, {
        key: 'givenName',
        value: '',
        required: true,
        pattern: /^[ァ-ヶー]+$/,
        maxLength: 12
      }, {
        key: 'familyName',
        value: '',
        required: true,
        pattern: /^[ァ-ヶー]+$/,
        maxLength: 12
      }, {
        key: 'telephone',
        value: '',
        required: true,
        maxLength: 15,
        minLength: 9
      }],
      PAYMENT_METHOD_TO_USE: ['Cash', 'EMoney', 'CreditCard'],
      PAYMENT_METHOD_CUSTOM: [],
      REGIGROW_QRCODE: '',
      DISPLAY_TICKETED_SEAT: true,
      HEADER_MENU: true,
      HEADER_MENU_SCOPE: ['purchase', 'admission', 'order', 'reservation', 'setting', 'auth'],
      PURCHASE_CART: true,
      PURCHASE_ITEM_MAX_LENGTH: '50',
      PURCHASE_TRANSACTION_TIME: '15',
      PURCHASE_TRANSACTION_TIME_DISPLAY: true,
      PURCHASE_TRANSACTION_IDENTIFIER: [],
      PURCHASE_PRE_SCHEDULE_DATE: '3',
      PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: '0',
      PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: '30',
      PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: '%',
      PURCHASE_SCHEDULE_SORT: true,
      PURCHASE_COMPLETE_MAIL_CUSTOM: true,
      PURCHASE_TERMS: false,
      PURCHASE_WARNING: false,
      INQUIRY_CANCEL: false,
      INQUIRY_QRCODE: false,
      INQUIRY_PRINT: false,
      INQUIRY_PRINT_EXPIRED_VALUE: '0',
      INQUIRY_PRINT_EXPIRED_UNIT: 'hour',
      INQUIRY_PRINT_WAIT_TIME: '',
      INQUIRY_PRINT_SUCCESS_WAIT_TIME: '',
      INQUIRY_INPUT_KEYPAD: false,
      INQUIRY_ORDER_DATE_FROM_VALUE: '-3',
      INQUIRY_ORDER_DATE_FROM_UNIT: 'month',
      ORDER_CANCEL: true,
      ORDER_CANCEL_MAIL_CUSTOM: true,
      ORDER_PRINT: true,
      ORDER_LINK: [],
      PRINT_QRCODE_TYPE: 'token',
      PRINT_QRCODE_CUSTOM: '',
      PRINT_LOADING: true,
      PRINT_DATA: 'JSON'
    };

    function getEnvironment() {
      var environment = Object.assign(Object.assign(Object.assign({}, defaultEnvironment), window.environment), {
        production: isProduction
      });
      return environment;
    }
    /***/

  },

  /***/
  "./main.ts":
  /*!*****************!*\
    !*** ./main.ts ***!
    \*****************/

  /*! no exports provided */

  /***/
  function mainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "../../node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! hammerjs */
    "../../node_modules/hammerjs/hammer.js");
    /* harmony import */


    var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var moment_timezone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! moment-timezone */
    "../../node_modules/moment-timezone/index.js");
    /* harmony import */


    var moment_timezone__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var ngx_bootstrap_chronos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-bootstrap/chronos */
    "../../node_modules/ngx-bootstrap/__ivy_ngcc__/chronos/fesm2015/ngx-bootstrap-chronos.js");
    /* harmony import */


    var ngx_bootstrap_locale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-bootstrap/locale */
    "../../node_modules/ngx-bootstrap/__ivy_ngcc__/locale/fesm2015/ngx-bootstrap-locale.js");
    /* harmony import */


    var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./app */
    "./app/index.ts");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./environments/environment */
    "./environments/environment.ts");

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
     * main
     */


    function main() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var params, space, projectId;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                // タイムゾーン設定
                moment_timezone__WEBPACK_IMPORTED_MODULE_3__["tz"].setDefault('Asia/Tokyo');
                moment_timezone__WEBPACK_IMPORTED_MODULE_3__["locale"]('ja'); // 言語設定

                Object(ngx_bootstrap_chronos__WEBPACK_IMPORTED_MODULE_4__["defineLocale"])('ja', ngx_bootstrap_locale__WEBPACK_IMPORTED_MODULE_5__["jaLocale"]); // パラメータ設定

                params = _app__WEBPACK_IMPORTED_MODULE_6__["Functions"].Util.getParameter(); // プロジェクト設定

                space = localStorage.getItem('');

                if (space !== null) {
                  // 無効なストレージ削除
                  localStorage.removeItem('');
                }

                if (params.projectId !== undefined || location.hash === '#/auth/signin') {
                  sessionStorage.removeItem('PROJECT');
                }

                projectId = params.projectId === undefined ? _app__WEBPACK_IMPORTED_MODULE_6__["Functions"].Util.getProject().projectId === '' ? undefined : _app__WEBPACK_IMPORTED_MODULE_6__["Functions"].Util.getProject().projectId : params.projectId;

                if (!(projectId === undefined && location.hash !== '#/auth/signin')) {
                  _context12.next = 12;
                  break;
                }

                location.href = '/#/auth/signin';
                location.reload();
                return _context12.abrupt("return");

              case 12:
                _context12.next = 14;
                return setProject({
                  projectId: projectId
                });

              case 14:
                if (!(_app__WEBPACK_IMPORTED_MODULE_6__["Functions"].Util.getProject().storageUrl === undefined)) {
                  _context12.next = 16;
                  break;
                }

                return _context12.abrupt("return");

              case 16:
                _context12.next = 18;
                return setProjectConfig(_app__WEBPACK_IMPORTED_MODULE_6__["Functions"].Util.getProject().storageUrl);

              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));
    }
    /**
     * プロジェクト情報設定
     */


    function setProject(params) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var fetchResult, json;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return fetch('/api/project', {
                  method: 'POST',
                  cache: 'no-cache',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  body: JSON.stringify(params)
                });

              case 2:
                fetchResult = _context13.sent;

                if (fetchResult.ok) {
                  _context13.next = 5;
                  break;
                }

                throw new Error(JSON.stringify({
                  status: fetchResult.status,
                  statusText: fetchResult.statusText
                }));

              case 5:
                _context13.next = 7;
                return fetchResult.json();

              case 7:
                json = _context13.sent;
                sessionStorage.setItem('PROJECT', JSON.stringify(json));

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));
    }
    /**
     * プロジェクトごとのアプリケーション設定
     */


    function setProjectConfig(storageUrl) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var now, fetchResult, environment, style, favicon;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                now = moment_timezone__WEBPACK_IMPORTED_MODULE_3__().toISOString(); // 設定読み込み

                _context14.next = 3;
                return fetch("".concat(storageUrl, "/js/environment.js?=date").concat(now), {
                  method: 'GET',
                  cache: 'no-cache',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  }
                });

              case 3:
                fetchResult = _context14.sent;

                if (!fetchResult.ok) {
                  _context14.next = 10;
                  break;
                }

                _context14.t0 = window;
                _context14.next = 8;
                return fetchResult.text();

              case 8:
                _context14.t1 = _context14.sent;

                _context14.t0.eval.call(_context14.t0, _context14.t1);

              case 10:
                environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_7__["getEnvironment"])(); // スタイル設定

                style = document.createElement('link');
                style.rel = 'stylesheet';
                style.href = "".concat(storageUrl, "/css/style.css?=date").concat(now);

                style.onerror = function () {
                  this.href = "/default/css/style.css?=date".concat(now);
                };

                document.head.appendChild(style); // ファビコン設定

                favicon = document.createElement('link');
                favicon.rel = 'icon';
                favicon.type = 'image/x-icon"';
                _context14.next = 21;
                return _app__WEBPACK_IMPORTED_MODULE_6__["Functions"].Util.isFile("".concat(storageUrl, "/favicon.ico"));

              case 21:
                if (!_context14.sent) {
                  _context14.next = 25;
                  break;
                }

                _context14.t2 = "".concat(storageUrl, "/favicon.ico");
                _context14.next = 26;
                break;

              case 25:
                _context14.t2 = '/default/favicon.ico';

              case 26:
                favicon.href = _context14.t2;
                document.head.appendChild(favicon); // タイトル設定

                document.title = environment.APP_TITLE; // GTM設定

                if (environment.GTM_ID) {
                  (function (w, d, s, l, i) {
                    w[l] = w[l] || [];
                    w[l].push({
                      'gtm.start': new Date().getTime(),
                      event: 'gtm.js'
                    });
                    var f = d.getElementsByTagName(s)[0];
                    var j = d.createElement(s),
                        dl = l !== 'dataLayer' ? '&l=' + l : '';
                    j.async = true;
                    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                    f.parentNode.insertBefore(j, f);
                  })(window, document, 'script', 'dataLayer', environment.GTM_ID);
                }

                if (environment.production) {
                  Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
                }

              case 31:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));
    }

    main().then(function () {
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var _yield$__webpack_requ, AppModule;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return __webpack_require__.e(
                /*! import() | app-app-module */
                "app-app-module").then(__webpack_require__.bind(null,
                /*! ./app/app.module */
                "./app/app.module.ts"));

              case 2:
                _yield$__webpack_requ = _context15.sent;
                AppModule = _yield$__webpack_requ.AppModule;
                Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(AppModule);

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));
    })["catch"](function (error) {
      console.error(error);
    });
    /***/
  },

  /***/
  0:
  /*!***********************!*\
    !*** multi ./main.ts ***!
    \***********************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! C:\Users\hataguchi\Desktop\workspace\Cinerino\pos\src\client\main.ts */
    "./main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);