/**
 * ルーティング
 */
import * as debug from 'debug';
import * as express from 'express';
import { NOT_FOUND } from 'http-status';
import * as path from 'path';
import { getProject } from '../functions/util';
import { Auth2Model } from '../models/auth2/auth2.model';
import { authorizeRouter } from './api/authorize';
import { utilRouter } from './api/util';
const log = debug('application: router');

export default (app: express.Application) => {
    app.use('/storage', (req, res) => {
        const project = <string | undefined>(req.body.project || req.query.project);
        if (project === undefined) {
            res.redirect(req.originalUrl.replace('/storage', <string>process.env.STORAGE_URL));
            return;
        }
        try {
            const findResult = getProject(project);
            if (findResult === undefined) {
                throw new Error('project not found');
            }
            res.redirect(req.originalUrl.replace('/storage', findResult.STORAGE_URL));
        } catch (error) {
            res.status(NOT_FOUND);
            res.end();
        }
    });

    app.use('/api/authorize', authorizeRouter);
    app.use('/api', utilRouter);

    app.get('/signIn', async (req, res, next) => {
        log('signInRedirect');
        try {
            if (req.session === undefined) {
                throw new Error('session is undefined');
            }
            const authModel = new Auth2Model(req.session.auth);
            if (req.query.state !== authModel.state) {
                throw (new Error(`state not matched ${req.query.state} !== ${authModel.state}`));
            }
            const auth = authModel.create(req);
            const credentials = await auth.getToken(
                req.query.code,
                <string>authModel.codeVerifier
            );
            // log('credentials published', credentials);
            authModel.credentials = credentials;
            authModel.save(req.session);
            auth.setCredentials(credentials);
            res.redirect(`/#/auth/signin`);
        } catch (error) {
            next(error);
        }
    });

    app.get('/signOut', (req, res, next) => {
        log('signOutRedirect');
        if (req.session === undefined) {
            next();
            return;
        }
        delete (<Express.Session>req.session).auth;
        res.redirect(`/#/auth/signout`);
    });

    app.get('*', async (req, res, next) => {
        log('root', req.query);
        if (req.xhr || req.header('Sec-Fetch-Mode') === 'cors') {
            next();
            return;
        }
        if (req.session === undefined) {
            next();
            return;
        }
        if (req.query.project !== undefined) {
            try {
                const findResult = getProject(req.query.project);
                if (findResult === undefined) {
                    throw new Error('project not found');
                }
            } catch (error) {
                res.sendFile(path.resolve(`${__dirname}/../../../../public/404.html`));
                return;
            }
        }
        const dir = (process.env.NODE_ENV === 'production') ? 'production' : 'development';
        res.sendFile(path.resolve(`${__dirname}/../../../client/${dir}/index.html`));
    });

    app.all('*', (req, res, _next) => {
        res.status(NOT_FOUND);
        if (req.xhr || req.header('Sec-Fetch-Mode') === 'cors') {
            res.json('NOT FOUND');
            return;
        }
    });
};
