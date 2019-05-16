/**
 * 環境変数
 */
export const environment: {
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
    PAYMENT_METHOD_TO_USE: string[],
    DISPLAY_TICKETED_SEAT: boolean;
    HEADER_MENU: boolean;
    HEADER_MENU_SCOPE: string[];
    PURCHASE_REQUIRED_ALERT: boolean;
    PURCHASE_CART_MAX_LENGTH: string;
    PURCHASE_TRANSACTION_TIME: string;
    PURCHASE_PRE_SCHEDULE_DATE: string;
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: string;
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: string;
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: string;
    PURCHASE_COMPLETE_MAIL_CUSTOM: boolean;
    INQUIRY_CANCEL: boolean;
    INQUIRY_QRCODE: boolean;
    INQUIRY_PRINT: boolean;
    ORDER_CANCEL: boolean;
    ORDER_QRCODE: boolean;
    ORDER_PRINT: boolean;
    PRINT_QRCODE_TYPE: string;
    PRINT_QRCODE_CUSTOM: string;
    SETTING_DEVELOP_OPTION: boolean;
} = (<any>window).environment;
