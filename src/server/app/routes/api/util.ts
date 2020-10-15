/**
 * API
 */

import * as debug from 'debug';
import * as express from 'express';
import { NOT_FOUND } from 'http-status';
import * as moment from 'moment';
const log = debug('application: /api/util');
const router = express.Router();

/**
 * プロジェクト設定取得
 */
router.post('/project', async (req, res) => {
    log('project', req.body);
    try {
        const projectId = req.body.projectId;
        if (projectId !== undefined) {
            res.json({
                projectId: projectId,
                storageUrl: `${process.env.STORAGE_URL}/${projectId}`,
                gmoTokenUrl: process.env.GMO_TOKEN_URL,
                admissionApiEndpoint: process.env.ADMISSION_API_ENDPOINT,
                env: process.env.NODE_ENV
            });
            return;
        }
        res.json({
            projectId: (process.env.PROJECT_ID === undefined) ? '' : process.env.PROJECT_ID,
            storageUrl: (process.env.PROJECT_STORAGE_URL === undefined) ? '' : process.env.PROJECT_STORAGE_URL,
            gmoTokenUrl: process.env.GMO_TOKEN_URL,
            admissionApiEndpoint: process.env.ADMISSION_API_ENDPOINT,
            env: process.env.NODE_ENV
        });
    } catch (error) {
        log('project', error.message);
        res.status(NOT_FOUND);
        res.json({ error: error.message });
    }
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
