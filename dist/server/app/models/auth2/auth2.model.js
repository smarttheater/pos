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
const cinerino = require("@cinerino/api-nodejs-client");
const util_1 = require("../../functions/util");
/**
 * 認証モデル
 * @class Auth2Model
 */
class Auth2Model {
    /**
     * @constructor
     * @param {any} session
     */
    constructor(session) {
        if (session === undefined) {
            session = {};
        }
        this.scopes = [];
        this.credentials = session.credentials;
        this.state = Auth2Model.STATE;
        this.codeVerifier = Auth2Model.CODE_VERIFIER;
    }
    /**
     * 認証クラス作成
     * @memberof Auth2Model
     */
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const env = yield util_1.getEnvironment(req);
            if (env === undefined) {
                throw new Error('project not found');
            }
            const auth = new cinerino.auth.OAuth2({
                domain: env.OAUTH2_SERVER_DOMAIN,
                clientId: env.CLIENT_ID_OAUTH2,
                clientSecret: env.CLIENT_SECRET_OAUTH2,
                redirectUri: `${req.protocol}://${req.hostname}/signIn`,
                logoutUri: `${req.protocol}://${req.hostname}/signOut`,
                state: this.state,
                scopes: this.scopes.join(' ')
            });
            if (this.credentials !== undefined) {
                auth.setCredentials(this.credentials);
            }
            return auth;
        });
    }
    /**
     * セッションへ保存
     * @memberof Auth2Model
     * @method save
     * @returns {Object}
     */
    save(session) {
        const authSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
/**
 * 状態（固定値）
 */
Auth2Model.STATE = 'STATE';
/**
 * 検証コード（固定値）
 */
Auth2Model.CODE_VERIFIER = 'CODE_VERIFIER';
exports.Auth2Model = Auth2Model;
