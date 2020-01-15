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
 * ルーティング
 */
const debug = require("debug");
const http_status_1 = require("http-status");
const path = require("path");
const util_1 = require("../functions/util");
const auth2_model_1 = require("../models/auth2/auth2.model");
const authorize_1 = require("./api/authorize");
const util_2 = require("./api/util");
const log = debug('application: router');
exports.default = (app) => {
    app.use('/storage', (req, res) => {
        const project = (req.body.project || req.query.project);
        if (project === undefined) {
            res.redirect(req.originalUrl.replace('/storage', process.env.STORAGE_URL));
            return;
        }
        try {
            const findResult = util_1.getProject(project);
            if (findResult === undefined) {
                throw new Error('project not found');
            }
            res.redirect(req.originalUrl.replace('/storage', findResult.STORAGE_URL));
        }
        catch (error) {
            res.status(http_status_1.NOT_FOUND);
            res.end();
        }
    });
    app.use('/api/authorize', authorize_1.authorizeRouter);
    app.use('/api', util_2.utilRouter);
    app.get('/signIn', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        log('signInRedirect');
        try {
            if (req.session === undefined) {
                throw new Error('session is undefined');
            }
            const authModel = new auth2_model_1.Auth2Model(req.session.auth);
            if (req.query.state !== authModel.state) {
                throw (new Error(`state not matched ${req.query.state} !== ${authModel.state}`));
            }
            const auth = authModel.create(req);
            const credentials = yield auth.getToken(req.query.code, authModel.codeVerifier);
            // log('credentials published', credentials);
            authModel.credentials = credentials;
            authModel.save(req.session);
            auth.setCredentials(credentials);
            res.redirect(`/#/auth/signin`);
        }
        catch (error) {
            next(error);
        }
    }));
    app.get('/signOut', (req, res, next) => {
        log('signOutRedirect');
        if (req.session === undefined) {
            next();
            return;
        }
        delete req.session.auth;
        res.redirect(`/#/auth/signout`);
    });
    app.get('*', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (req.xhr) {
            res.status(httpStatus.NOT_FOUND).json('NOT FOUND');
            return;
        }
        if (req.session === undefined) {
            next();
            return;
        }
        if (req.query.performanceId !== undefined
            && req.query.eventId === undefined) {
            req.query.eventId = req.query.performanceId;
        }
        if (req.query.project !== undefined) {
            try {
                const findResult = util_1.getProject(req.query.project);
                if (findResult === undefined) {
                    throw new Error('project not found');
                }
            }
            catch (error) {
                res.sendFile(path.resolve(`${__dirname}/../../../../public/404.html`));
                return;
            }
        }
        const dir = (process.env.NODE_ENV === 'production') ? 'production' : 'development';
        res.sendFile(path.resolve(`${__dirname}/../../../client/${dir}/index.html`));
    }));
    app.all('*', (req, res, _next) => {
        res.status(http_status_1.NOT_FOUND);
        if (req.xhr) {
            res.json('NOT FOUND');
            return;
        }
    });
};
