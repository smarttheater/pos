/**
 * 環境変数
 */
interface IEnvironment {
    /**
     * 本番判定
     */
    production: boolean;
    /**
     * アプリケーションタイトル
     */
    APP_TITLE: string;
    /**
     * アプリケーションプレフィックス
     */
    APP_PREFIX: string;
    /**
     * プロジェクトID
     */
    PROJECT_ID: string;
    /**
     * 入り口URL（非推奨）
     */
    ENTRANCE_SERVER_URL: string;
    /**
     * 説明書URL
     */
    INSTRUCTION_URL: string;
    /**
     * アナリティクスID
     */
    ANALYTICS_ID: string;
    /**
     * タグマネージャーID
     */
    GTM_ID: string;
    /**
     * 表示タイプ
     */
    VIEW_TYPE: string;
    /**
     * ストレージの名前
     */
    STORAGE_NAME: string;
    /**
     * ストレージの種類
     */
    STORAGE_TYPE: string;
    /**
     * ベースURL
     */
    BASE_URL: string;
    /**
     * 対応言語
     */
    LANGUAGE: string[];
    /**
     * 使用可能決済手段
     */
    PAYMENT_METHOD_TO_USE: string[];
    /**
     * REGIGROW QRコード
     */
    REGIGROW_QRCODE: string;
    /**
     * 座席表示
     */
    DISPLAY_TICKETED_SEAT: boolean;
    /**
     * ヘッダーメニュー表示
     */
    HEADER_MENU: boolean;
    /**
     * ヘッダーメニューの中身
     */
    HEADER_MENU_SCOPE: string[];
    /**
     * カート機能有無
     */
    PURCHASE_CART: boolean;
    /**
     * 購入アイテム上限数
     */
    PURCHASE_ITEM_MAX_LENGTH: string;
    /**
     * 取引時間
     */
    PURCHASE_TRANSACTION_TIME: string;
    /**
     * 取引時間表示
     */
    PURCHASE_TRANSACTION_TIME_DISPLAY: boolean;
    /**
     * 先行販売期間指定
     */
    PURCHASE_PRE_SCHEDULE_DATE: string;
    /**
     * スケジュール初期選択日（相対的）
     */
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: string;
    /**
     * スケジュールステータス閾値
     */
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: string;
    /**
     * スケジュールステータス閾値単位（%）
     */
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: string;
    /**
     * 購入完了メールカスタム
     */
    PURCHASE_COMPLETE_MAIL_CUSTOM: boolean;
    /**
     * 購入利用規約
     */
    PURCHASE_TERMS: boolean;
    /**
     * 購入注意事項
     */
    PURCHASE_WARNING: boolean;
    /**
     * 照会キャンセル
     */
    INQUIRY_CANCEL: boolean;
    /**
     * 照会QR
     */
    INQUIRY_QRCODE: boolean;
    /**
     * 照会印刷
     */
    INQUIRY_PRINT: boolean;
    /**
     * 注文キャンセル
     */
    ORDER_CANCEL: boolean;
    /**
     * 注文QR
     */
    ORDER_QRCODE: boolean;
    /**
     * 注文印刷
     */
    ORDER_PRINT: boolean;
    /**
     * 印刷QRコードタイプ
     */
    PRINT_QRCODE_TYPE: string;
    /**
     * 印刷QRコードカスタム
     */
    PRINT_QRCODE_CUSTOM: string;
    /**
     * 印刷時ローディング
     */
    PRINT_LOADING: boolean;
    /**
     * 設定開発用オプション
     */
    SETTING_DEVELOP_OPTION: boolean;
}

const defaultEnvironment: IEnvironment = {
    production: false,
    APP_TITLE: '',
    APP_PREFIX: '',
    PROJECT_ID: '',
    ENTRANCE_SERVER_URL: '',
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
    PURCHASE_TRANSACTION_TIME_DISPLAY: false,
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

