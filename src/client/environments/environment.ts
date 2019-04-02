import { ViewType } from '../app/models';

/**
 * 環境変数dev
 */
export const environment = {
    production: false,
    APP_PREFIX: 'CI',
    PROJECT_ID: 'cinerino',
    ENV: 'development',
    ENTRANCE_SERVER_URL: '',
    WAITER_SERVER_URL: 'https://waiter-development.appspot.com',
    ANALYTICS_ID: '',
    LIMITED_PURCHASE_COUNT: '1',
    VIEW_TYPE: ViewType.Cinema,
    TRANSACTION_TIME: '30',
    STORAGE_NAME: 'CINERINO-POS-STATE',
    BASE_URL: '/purchase/root',
    HEADER_MENU: true,
    ROUTE_SCOPE: ['purchase', 'inquiry', 'order', 'admission', 'setting', 'auth', 'development']

};
