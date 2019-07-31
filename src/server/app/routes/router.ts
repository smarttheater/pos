/**
 * ルーティング
 */
import * as express from 'express';
import * as moment from 'moment';
import * as path from 'path';
import * as authorize from '../controllers/authorize/authorize.controller';
import * as mail from '../controllers/mail/mail.controller';
import authorizeRouter from './authorize';
import encryptionRouter from './encryption';

export default (app: express.Application) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });

    app.use('/storage', (req, res) => {
        const url = req.originalUrl.replace('/storage', <string>process.env.STORAGE_URL);
        res.redirect(url);
    });
    app.use('/api/authorize', authorizeRouter);
    app.use('/api/encryption', encryptionRouter);
    app.get('/api/storage', (_req, res) => { res.json({ storage: process.env.STORAGE_URL }); });
    app.get('/api/serverTime', (_req, res) => { res.json({ date: moment().toISOString() }); });
    app.post('/api/mail/template', mail.getTemplate);

    app.get('/signIn', authorize.signInRedirect);
    app.get('/signOut', authorize.signOutRedirect);

    app.get('*', (_req, res, _next) => {
        const dir = (process.env.NODE_ENV === 'production') ? 'production' : 'development';
        res.sendFile(path.resolve(`${__dirname}/../../../client/${dir}/index.html`));
    });
};
