
window.environment = {
    production: false,
    APP_TITLE: 'CINERINO-POS',
    APP_PREFIX: 'CI',
    PROJECT_ID: 'cinerino',
    ENTRANCE_SERVER_URL: '',
    INSTRUCTION_URL: '/storage/pdf/sample.pdf',
    ANALYTICS_ID: '',
    GTM_ID: '',
    VIEW_TYPE: 'cinema',
    STORAGE_NAME: 'CINERINO-POS-STATE',
    STORAGE_TYPE: 'localStorage',
    BASE_URL: '/purchase/root',
    LANGUAGE: ['ja', 'en'],
    PROFILE: [
        { key: 'age', value: '', required: false },
        { key: 'address', value: '東京都港区赤坂３－４－４専修赤坂ビル７階', required: false },
        { key: 'email', value: '', required: true, maxLength: 50 },
        { key: 'gender', value: '', required: false },
        { key: 'givenName', value: '', required: true, pattern: /^[ァ-ヶー]+$/, maxLength: 12 },
        { key: 'familyName', value: '', required: true, pattern: /^[ァ-ヶー]+$/, maxLength: 12 },
        { key: 'telephone', value: '', required: true, maxLength: 15, minLength: 9 }
    ],
    PAYMENT_METHOD_TO_USE: ['Cash', 'EMoney', 'CreditCard', 'RegiGrow', 'Others'],
    PAYMENT_METHOD_CUSTOM: [
        { category: 'CUSTOM-Group', name: { ja: 'カスタム[団体]', en: 'CUSTOM[Group]' } },
        { category: 'CUSTOM-QR', name: { ja: 'カスタム[QR連携あり]', en: 'CUSTOM[QR linkage]' }, qrcode: '{{ orderNumber }}={{ price }}' }
    ],
    REGIGROW_QRCODE: '{{ orderNumber }}={{ price }}',
    DISPLAY_TICKETED_SEAT: true,
    HEADER_MENU: true,
    HEADER_MENU_SCOPE: ['purchase', 'inquiry', 'order', 'reservation', 'admission', 'setting', 'auth', 'development', 'instruction'],
    PURCHASE_CART: false,
    PURCHASE_ITEM_MAX_LENGTH: '50',
    PURCHASE_TRANSACTION_TIME: '150',
    PURCHASE_TRANSACTION_TIME_DISPLAY: true,
    PURCHASE_TRANSACTION_IDENTIFIER: [
        { name: 'custom', value: 'test' }
    ],
    PURCHASE_PRE_SCHEDULE_DATE: '3',
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: '0',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: '30',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: '%',
    PURCHASE_COMPLETE_MAIL_CUSTOM: true,
    PURCHASE_TERMS: true,
    PURCHASE_WARNING: true,
    INQUIRY_CANCEL: true,
    INQUIRY_QRCODE: true,
    INQUIRY_PRINT: true,
    ORDER_CANCEL: true,
    ORDER_QRCODE: true,
    ORDER_PRINT: true,
    ORDER_LINK: [
        { name: { ja: '印刷[A4]', en: 'print[A4]' }, url: 'https://motionpicture.jp', params: [{ key: 'output', value: 'a4' }, { key: 'orderNumber' }] }
    ],
    PRINT_QRCODE_TYPE: 'token',
    PRINT_QRCODE_CUSTOM: '',
    PRINT_LOADING: true
};
