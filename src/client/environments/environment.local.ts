/**
 * 環境変数local
 */
export const environment = {
    production: false,
    APP_PREFIX: 'CI',
    PROJECT_ID: 'cinerino',
    ENV: 'local',
    ENTRANCE_SERVER_URL: '',
    WAITER_SERVER_URL: 'https://waiter-development.appspot.com',
    ANALYTICS_ID: '',
    VIEW_TYPE: 'cinema',
    STORAGE_NAME: 'CINERINO-POS-STATE',
    STORAGE_TYPE: 'localStorage',
    BASE_URL: '/purchase/root',
    LANGUAGE: ['ja', 'en'],
    DISPLAY_TICKETED_SEAT: true,
    HEADER_MENU: true,
    HEADER_MENU_SCOPE: ['purchase', 'inquiry', 'order', 'reservation', 'admission', 'setting', 'auth', 'development'],
    PURCHASE_CART_MAX_LENGTH: '1',
    PURCHASE_TRANSACTION_TIME: '120',
    PURCHASE_PRE_SCHEDULE_DATE: '3',
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: '0',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: '30',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: '%',
    PURCHASE_COMPLETE_MAIL_CUSTOM: true,
    INQUIRY_CANCEL: true,
    INQUIRY_QRCODE: true,
    INQUIRY_PRINT: true,
    ORDER_CANCEL: true,
    ORDER_QRCODE: true,
    ORDER_PRINT: true,
    PRINT_QR_CODE_TYPE: 'encryption'
};
