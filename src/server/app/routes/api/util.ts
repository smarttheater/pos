/**
 * API
 */

import * as debug from 'debug';
import * as express from 'express';
import * as moment from 'moment';
import { getEnvironment } from '../../functions/util';
const log = debug('application: /api/util');
const router = express.Router();

/**
 * 設定取得
 */
router.get('/config', async (req, res) => {
    log('config');
    const env = await getEnvironment(req);
    const endpoint = <string>process.env.API_ENDPOINT;
    const waiterServerUrl = env.WAITER_SERVER_URL;
    const storageUrl = env.STORAGE_URL;
    res.json({ endpoint, waiterServerUrl, storageUrl });
});

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

export const utilRouter = router;
