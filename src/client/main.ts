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
import { environment } from './environments/environment';

async function main() {
    // タイムゾーン設定
    momentTimezone.tz.setDefault('Asia/Tokyo');
    momentTimezone.locale('ja');

    // 言語設定
    defineLocale('ja', jaLocale);

    // プロジェクト設定
    // if (getParameter<{ project: string }>().project !== undefined) {
    //     sessionStorage.setItem('PROJECT', getParameter<{ project: string }>().project);
    // }
    // const project = (sessionStorage.getItem('PROJECT'));
    // const config = await fetch(`/api/config?date=${momentTimezone().toISOString()}&project=${project}`, { method: 'GET' });
    // const storageUrl = (await config.json()).storageUrl;
    // const style = document.createElement('link');
    // style.rel = 'stylesheet';
    // style.href = `${storageUrl}/css/style.css`;
    // document.body.appendChild(style);
    // try {
    //     const env = await fetch(`${storageUrl}/json/environment.json?date=${momentTimezone().toISOString()}`, { method: 'GET' });
    //     (<any>window).environment = await env.json();
    // } catch (error) {
    //     const env = await fetch(`${storageUrl}/js/environment.js?date=${momentTimezone().toISOString()}`, { method: 'GET' });
    //     (<any>window).eval(<any>(env.body));
    // }

    // // GTM設定
    // if (environment.GTM_ID) {
    //     (function (w, d, s, l, i) {
    //         (<any>w)[l] = (<any>w)[l] || [];
    //         (<any>w)[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    //         const f =
    //             d.getElementsByTagName(s)[0],
    //             j = d.createElement(s),
    //             dl = l !== 'dataLayer' ? '&l=' + l : ''; (<any>j).async = true;
    //         (<any>j).src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    //         (<any>f).parentNode.insertBefore(j, f);
    //     })(window, document, 'script', 'dataLayer', environment.GTM_ID);
    // }
}


main().then(() => {
    if (environment.production) {
        enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule);
}).catch((error) => {
    console.error(error);
});


