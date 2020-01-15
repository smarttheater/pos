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
import { getParameter, getProject, setProject, streamingDownload } from './app/functions';
import { getEnvironment } from './environments/environment';

async function main() {
    // タイムゾーン設定
    momentTimezone.tz.setDefault('Asia/Tokyo');
    momentTimezone.locale('ja');

    // 言語設定
    defineLocale('ja', jaLocale);

    // プロジェクト設定
    const project = getParameter<{ project: string | undefined }>().project
        || (getProject().projectName === '') ? undefined : getProject().projectName;
    await setProject({ project });
    await setProjectConfig();
}

/**
 * プロジェクトごとのアプリケーション設定
 */
async function setProjectConfig() {
    // 設定読み込み
    const fetchResult = await fetch(`${getProject().storageUrl}/js/environment.js`, {
        method: 'GET',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
    if (!fetchResult.ok) {
        throw new Error(JSON.stringify({ status: fetchResult.status, statusText: fetchResult.statusText }));
    }
    if (fetchResult.body === null) {
        throw new Error('fetchResult.body null');
    }
    (<any>window).eval(await streamingDownload(fetchResult.body));
    // スタイル設定
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${getProject().storageUrl}/css/style.css`;
    document.body.appendChild(style);
    // ファビコン設定
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/x-icon"';
    favicon.href = `${getProject().storageUrl}/favicon.ico`;
    document.body.appendChild(favicon);
    // タイトル設定
    document.title = getEnvironment().APP_TITLE;
    // GTM設定
    if (getEnvironment().GTM_ID) {
        (function (w, d, s, l, i) {
            (<any>w)[l] = (<any>w)[l] || [];
            (<any>w)[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            const f = d.getElementsByTagName(s)[0];
            const j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
            (<any>j).async = true;
            (<any>j).src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            (<any>f).parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', getEnvironment().GTM_ID);
    }
    if (getEnvironment().production) {
        enableProdMode();
    }
}


main().then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule);
}).catch((error) => {
    console.error(error);
});


