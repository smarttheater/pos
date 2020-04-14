/**
 * main
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import * as momentTimezone from 'moment-timezone';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { jaLocale } from 'ngx-bootstrap/locale';
import { AppModule } from './app/app.module';
import { getParameter, getProject, isFile } from './app/functions';
import { getEnvironment } from './environments/environment';

async function main() {
    // タイムゾーン設定
    momentTimezone.tz.setDefault('Asia/Tokyo');
    momentTimezone.locale('ja');

    // 言語設定
    defineLocale('ja', jaLocale);

    // パラメータ設定
    const params = getParameter<{
        projectId?: string;
    }>();

    // プロジェクト設定
    const space = localStorage.getItem('');
    if (space !== null) {
        // 無効なストレージ削除
        localStorage.removeItem('');
    }
    if (params.projectId !== undefined
        || location.hash === '#/auth/signin') {
        sessionStorage.removeItem('PROJECT');
    }
    const projectId = (params.projectId === undefined)
        ? (getProject().projectId === '') ? undefined : getProject().projectId
        : params.projectId;
    if (projectId === undefined && location.hash !== '#/auth/signin') {
        location.href = '/#/auth/signin';
        location.reload();
        return;
    }
    await setProject({ projectId });
    if (getProject().storageUrl === undefined) {
        return;
    }
    await setProjectConfig(getProject().storageUrl);
}

/**
 * プロジェクト情報設定
 */
async function setProject(params: { projectId?: string; }) {
    const fetchResult = await fetch('/api/project', {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(params)
    });
    if (!fetchResult.ok) {
        throw new Error(JSON.stringify({ status: fetchResult.status, statusText: fetchResult.statusText }));
    }
    const json: {
        projectId: string;
        projectName: string;
        storageUrl: string;
    } = await fetchResult.json();
    sessionStorage.setItem('PROJECT', JSON.stringify(json));
}

/**
 * プロジェクトごとのアプリケーション設定
 */
async function setProjectConfig(storageUrl: string) {
    const now = momentTimezone().toISOString();
    // 設定読み込み
    const fetchResult = await fetch(`${storageUrl}/js/environment.js?=date${now}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
    if (fetchResult.ok) {
        (<any>window).eval(await fetchResult.text());
    }
    const environment = getEnvironment();
    // スタイル設定
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${storageUrl}/css/style.css?=date${now}`;
    style.onerror = function () {
        this.href = `/default/css/style.css?=date${now}`;
    };
    document.head.appendChild(style);
    // ファビコン設定
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/x-icon"';
    favicon.href = (await isFile(`${storageUrl}/favicon.ico`)) ? `${storageUrl}/favicon.ico` : '/default/favicon.ico';
    document.head.appendChild(favicon);

    // タイトル設定
    document.title = environment.APP_TITLE;
    // GTM設定
    if (environment.GTM_ID) {
        (function (w, d, s, l, i) {
            (<any>w)[l] = (<any>w)[l] || [];
            (<any>w)[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            const f = d.getElementsByTagName(s)[0];
            const j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
            (<any>j).async = true;
            (<any>j).src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            (<any>f).parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', environment.GTM_ID);
    }
    if (environment.production) {
        enableProdMode();
    }
}


main().then(async () => {
    platformBrowserDynamic().bootstrapModule(AppModule);
}).catch((error) => {
    console.error(error);
});


