"use strict";
/**
 * ダウンロード
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const download = require("../controllers/download/download.controller");
const router = express.Router();
router.get('/order', download.order);
router.get('/reservation', download.reservation);
exports.default = router;
