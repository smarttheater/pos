"use strict";
/**
 * API
 */
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const moment = require("moment");
const log = debug('application: /api/util');
const router = express.Router();
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
