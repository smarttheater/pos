/**
 * ルーティングAPI
 */
import * as cinerino from '@cinerino/api-nodejs-client';
import * as debug from 'debug';
import * as express from 'express';
import { errorProsess } from '../controllers/base/base.controller';
import { Auth2Model } from '../models/auth2/auth2.model';
const log = debug('pos:download');
const router = express.Router();

router.get('/order', async (req: express.Request, res: express.Response) => {
    log('order', req.query);
    try {
        const params = <cinerino.factory.order.ISearchConditions & {
            format: cinerino.factory.encodingFormat.Application | cinerino.factory.encodingFormat.Text;
        }>req.query;
        const orderService = new cinerino.service.Order({
            endpoint: <string>process.env.API_ENDPOINT,
            auth: new Auth2Model((<Express.Session>req.session).auth).create()
        });
        const stream = <NodeJS.ReadableStream>await orderService.download(params);
        const filename = 'OrderReport';
        if (req.query.format === cinerino.factory.encodingFormat.Application.json) {
            res.setHeader('Content-disposition', `attachment; filename*=UTF-8\'\'${encodeURIComponent(`${filename}.json`)}`);
            res.setHeader('Content-Type', `${cinerino.factory.encodingFormat.Application.json}; charset=UTF-8`);
        } else if (req.query.format === cinerino.factory.encodingFormat.Text.csv) {
            res.setHeader('Content-disposition', `attachment; filename*=UTF-8\'\'${encodeURIComponent(`${filename}.csv`)}`);
            res.setHeader('Content-Type', `${cinerino.factory.encodingFormat.Text.csv}; charset=UTF-8`);
        }

        stream.pipe(res);
    } catch (error) {
        errorProsess(res, error);
    }

});

export default router;
