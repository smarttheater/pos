import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as moment from 'moment';
import { getProject } from './util.function';

/**
 *  設定ファイル取得設定
 */
function getUseFactory(http: HttpClient) {
    const prefix = `${getProject().storageUrl}/i18n/`;
    const suffix = `.json?date=${moment().toISOString()}`;
    return new TranslateHttpLoader(http, prefix, suffix);
}

/**
 * 多言語設定取得
 */
export function getTranslateModuleConfig() {
    return {
        loader: {
            provide: TranslateLoader,
            useFactory: getUseFactory,
            deps: [HttpClient]
        }
    };
}

