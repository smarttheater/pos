"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 共通
 * @namespace services.util
 */
const debug = require("debug");
const request = require("request");
const log = debug('application:util');
function requestAsync(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            log(url, options);
            request(url, options, (error, response, body) => {
                if (error) {
                    reject({ error });
                    return;
                }
                resolve({ body, response });
            });
        });
    });
}
exports.requestAsync = requestAsync;
/**
 * プロジェクト設定取得
 */
function getEnvironment(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session === undefined) {
            throw new Error('project not found');
        }
        const session = req.session;
        const environment = process.env.ENVIRONMENT;
        if (environment === undefined || environment === '') {
            return {
                'PROJECT': process.env.PROJECT,
                'CLIENT_ID_OAUTH2': process.env.OAUTH2_SERVER_DOMAIN,
                'CLIENT_SECRET_OAUTH2': process.env.CLIENT_ID_OAUTH2,
                'OAUTH2_SERVER_DOMAIN': process.env.CLIENT_SECRET_OAUTH2,
                'STORAGE_URL': process.env.STORAGE_URL,
                'WAITER_SERVER_URL': process.env.WAITER_SERVER_URL
            };
        }
        const env = JSON.parse(environment);
        const findResult = env.find(e => e.PROJECT === session.project);
        if (findResult === undefined) {
            log('environment', 'project not found');
            throw new Error(`${session.project} project not found`);
        }
        return findResult;
    });
}
exports.getEnvironment = getEnvironment;
/**
 * 環境
 * @memberof services.util
 * @enum ENV
 * @type string
 */
var ENV;
(function (ENV) {
    /**
     * 開発
     */
    ENV["Development"] = "development";
    /**
     * テスト
     */
    ENV["Test"] = "test";
    /**
     * 本番
     */
    ENV["Production"] = "production";
})(ENV = exports.ENV || (exports.ENV = {}));
/**
 * HTMLエスケープ
 * @memberof services.util
 * @function escapeHtml
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
    const change = (match) => {
        const changeList = {
            '&': '&amp;',
            '\'': '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        };
        return changeList[match];
    };
    return str.replace(/[&'`"<>]/g, change);
}
exports.escapeHtml = escapeHtml;
/**
 * カンマ区切りへ変換
 * @memberof services.util
 * @function formatPrice
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
    return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
exports.formatPrice = formatPrice;
/**
 * ベース64エンコード
 * @memberof services.util
 * @function bace64Encode
 * @param {string} str
 * @returns {string}
 */
function bace64Encode(str) {
    return new Buffer(str).toString('base64');
}
exports.bace64Encode = bace64Encode;
/**
 * ベース64デコード
 * @memberof services.util
 * @function base64Decode
 * @param {string} str
 * @returns {string}
 */
function base64Decode(str) {
    return new Buffer(str, 'base64').toString();
}
exports.base64Decode = base64Decode;
