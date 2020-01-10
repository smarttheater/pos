/**
 * 共通
 * @namespace services.util
 */
import debug = require('debug');
import * as express from 'express';
import * as request from 'request';
const log = debug('application:util');

interface IEnvironment {
    'PROJECT': string;
    'CLIENT_ID_OAUTH2': string;
    'CLIENT_SECRET_OAUTH2': string;
    'OAUTH2_SERVER_DOMAIN': string;
    'STORAGE_URL': string;
    'WAITER_SERVER_URL': string;
}

export async function requestAsync<T>(url: string, options?: request.CoreOptions) {
    return new Promise<T>((resolve, reject) => {
        log(url, options);
        request(url, options, (error, response, body) => {
            if (error) {
                reject({ error });
                return;
            }
            resolve(<any>{ body, response });
        });
    });
}

/**
 * プロジェクト設定取得
 */
export async function getEnvironment(req: express.Request) {
    if (req.session === undefined) {
        throw new Error('project not found');
    }
    const session = req.session;
    const environment = process.env.ENVIRONMENT;
    if (environment === undefined || environment === '') {
        return {
            'PROJECT': (<string>process.env.PROJECT),
            'CLIENT_ID_OAUTH2': (<string>process.env.OAUTH2_SERVER_DOMAIN),
            'CLIENT_SECRET_OAUTH2': (<string>process.env.CLIENT_ID_OAUTH2),
            'OAUTH2_SERVER_DOMAIN': (<string>process.env.CLIENT_SECRET_OAUTH2),
            'STORAGE_URL': (<string>process.env.STORAGE_URL),
            'WAITER_SERVER_URL': (<string>process.env.WAITER_SERVER_URL)
        };
    }
    const env: IEnvironment[] = JSON.parse(environment);
    const findResult = env.find(e => e.PROJECT === session.project);
    if (findResult === undefined) {
        log('environment', 'project not found');
        throw new Error(`${session.project} project not found`);
    }
    return findResult;
}

/**
 * 環境
 * @memberof services.util
 * @enum ENV
 * @type string
 */
export enum ENV {
    /**
     * 開発
     */
    Development = 'development',
    /**
     * テスト
     */
    Test = 'test',
    /**
     * 本番
     */
    Production = 'production'
}

/**
 * HTMLエスケープ
 * @memberof services.util
 * @function escapeHtml
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str: string): string {
    const change = (match: string): string => {
        const changeList: any = {
            '&': '&amp;',
            '\'': '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        };

        return changeList[match];
    };

    return str.replace(/[&'`"<>]/g, change);
}

/**
 * カンマ区切りへ変換
 * @memberof services.util
 * @function formatPrice
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price: number): string {
    return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

/**
 * ベース64エンコード
 * @memberof services.util
 * @function bace64Encode
 * @param {string} str
 * @returns {string}
 */
export function bace64Encode(str: string): string {
    return new Buffer(str).toString('base64');
}

/**
 * ベース64デコード
 * @memberof services.util
 * @function base64Decode
 * @param {string} str
 * @returns {string}
 */
export function base64Decode(str: string): string {
    return new Buffer(str, 'base64').toString();
}
