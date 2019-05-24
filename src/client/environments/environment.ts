/**
 * 環境変数
 */
interface IEnvironment {
    production: boolean;
    APP_TITLE: string;
    APP_PREFIX: string;
    PROJECT_ID: string;
    ENV: string;
    ENTRANCE_SERVER_URL: string;
    WAITER_SERVER_URL: string;
    INSTRUCTION_URL: string;
    ANALYTICS_ID: string;
    GTM_ID: string;
    VIEW_TYPE: string;
    STORAGE_NAME: string;
    STORAGE_TYPE: string;
    BASE_URL: string;
    LANGUAGE: string[];
    PAYMENT_METHOD_TO_USE: string[];
    REGIGROW_QRCODE: string;
    DISPLAY_TICKETED_SEAT: boolean;
    HEADER_MENU: boolean;
    HEADER_MENU_SCOPE: string[];
    PURCHASE_CART: boolean;
    PURCHASE_ITEM_MAX_LENGTH: string;
    PURCHASE_TRANSACTION_TIME: string;
    PURCHASE_PRE_SCHEDULE_DATE: string;
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: string;
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: string;
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: string;
    PURCHASE_COMPLETE_MAIL_CUSTOM: boolean;
    PURCHASE_TERMS: boolean;
    PURCHASE_WARNING: boolean;
    INQUIRY_CANCEL: boolean;
    INQUIRY_QRCODE: boolean;
    INQUIRY_PRINT: boolean;
    ORDER_CANCEL: boolean;
    ORDER_QRCODE: boolean;
    ORDER_PRINT: boolean;
    PRINT_QRCODE_TYPE: string;
    PRINT_QRCODE_CUSTOM: string;
    PRINT_LOADING: boolean;
    SETTING_DEVELOP_OPTION: boolean;
}

const defaultEnvironment: IEnvironment = {
    production: false,
    APP_TITLE: '',
    APP_PREFIX: '',
    PROJECT_ID: '',
    ENV: 'development',
    ENTRANCE_SERVER_URL: '',
    WAITER_SERVER_URL: '',
    INSTRUCTION_URL: '',
    ANALYTICS_ID: '',
    GTM_ID: '',
    VIEW_TYPE: 'cinema',
    STORAGE_NAME: '',
    STORAGE_TYPE: 'localStorage',
    BASE_URL: '/purchase/root',
    LANGUAGE: ['ja'],
    PAYMENT_METHOD_TO_USE: [],
    REGIGROW_QRCODE: '',
    DISPLAY_TICKETED_SEAT: false,
    HEADER_MENU: false,
    HEADER_MENU_SCOPE: [],
    PURCHASE_CART: false,
    PURCHASE_ITEM_MAX_LENGTH: '50',
    PURCHASE_TRANSACTION_TIME: '15',
    PURCHASE_PRE_SCHEDULE_DATE: '3',
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: '0',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: '30',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: '%',
    PURCHASE_COMPLETE_MAIL_CUSTOM: false,
    PURCHASE_TERMS: false,
    PURCHASE_WARNING: false,
    INQUIRY_CANCEL: false,
    INQUIRY_QRCODE: false,
    INQUIRY_PRINT: false,
    ORDER_CANCEL: false,
    ORDER_QRCODE: false,
    ORDER_PRINT: false,
    PRINT_QRCODE_TYPE: 'token',
    PRINT_QRCODE_CUSTOM: '',
    PRINT_LOADING: true,
    SETTING_DEVELOP_OPTION: false
};

export const environment: IEnvironment = Object.assign(defaultEnvironment, (<any>window).environment);

