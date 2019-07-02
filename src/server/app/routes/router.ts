/**
 * ルーティング
 */
import * as express from 'express';
import * as path from 'path';
import * as authorize from '../controllers/authorize/authorize.controller';
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

    app.get('/signIn', authorize.signInRedirect);
    app.get('/signOut', authorize.signOutRedirect);

    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/index.html`));
    });
};
