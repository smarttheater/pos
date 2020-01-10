"use strict";
/**
 * API
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const moment = require("moment");
const util_1 = require("../../functions/util");
const log = debug('application: /api/util');
const router = express.Router();
/**
 * 設定取得
 */
router.get('/config', (req, res) => __awaiter(this, void 0, void 0, function* () {
    log('config');
    const env = yield util_1.getEnvironment(req);
    const endpoint = process.env.API_ENDPOINT;
    const waiterServerUrl = env.WAITER_SERVER_URL;
    const storageUrl = env.STORAGE_URL;
    res.json({ endpoint, waiterServerUrl, storageUrl });
}));
/**
 * ストレージURL取得
 */
router.get('/storage', (_req, res) => {
    log('storage');
    res.json({ storage: process.env.STORAGE_URL });
});
/**
 * サーバータイム取得
 */
router.get('/serverTime', (_req, res) => {
    log('serverTime');
    res.json({ date: moment().toISOString() });
});
/**
 * バージョン取得
 */
router.get('/version', (_req, res) => {
    log('version');
    res.json({ version: process.env.VERSION });
});
exports.utilRouter = router;
