import * as moment from 'moment';
import { getProject } from '../app/functions/util.function';

interface IProfile {
    key: string;
    value: string;
    required?: boolean;
    pattern?: RegExp;
    maxLength?: number;
    minLength?: number;
}

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
     * プロフィール
     */
    PROFILE: IProfile[];
    /**
     * 使用可能決済手段
     */
    PAYMENT_METHOD_TO_USE: string[];
    /**
     * カスタム決済手段
     */
    PAYMENT_METHOD_CUSTOM: { category: string; name: { ja: string; en: string; }, qrcode?: string; }[];
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
     * 取引追加特性
     */
    PURCHASE_TRANSACTION_IDENTIFIER: { name: string, value: string }[];
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
     * 照会印刷期限値
     */
    INQUIRY_PRINT_EXPIRED_VALUE: string;
    /**
     * 照会印刷期限単位
     */
    INQUIRY_PRINT_EXPIRED_UNIT: moment.DurationInputArg2;
    /**
     * 照会印刷待機時間
     */
    INQUIRY_PRINT_WAIT_TIME: string;
    /**
     * 照会印刷完了待機時間
     */
    INQUIRY_PRINT_SUCCESS_WAIT_TIME: string;
    /**
     * 照会入力キーパッド
     */
    INQUIRY_INPUT_KEYPAD: boolean;
    /**
     * 照会可能期間値（注文日）
     */
    INQUIRY_ORDER_DATE_FROM_VALUE: string;
    /**
     * 照会可能期間単位（注文日）
     */
    INQUIRY_ORDER_DATE_FROM_UNIT: moment.DurationInputArg2;
    /**
     * 注文キャンセル
     */
    ORDER_CANCEL: boolean;
    /**
     * 注文キャンセルメールカスタム
     */
    ORDER_CANCEL_MAIL_CUSTOM: boolean;
    /**
     * 注文印刷
     */
    ORDER_PRINT: boolean;
    /**
     * 注文関連リンク
     */
    ORDER_LINK: { name: { ja: string; en: string; }; url: string; params: { key: string; value?: string; }[] }[];
    /**
     * 印刷QRコードタイプ
     */
    PRINT_QRCODE_TYPE: 'None' | 'token' | 'Custom';
    /**
     * 印刷QRコードカスタム
     */
    PRINT_QRCODE_CUSTOM: string;
    /**
     * 印刷時ローディング
     */
    PRINT_LOADING: boolean;
}

const defaultEnvironment: IEnvironment = {
    production: false,
    APP_TITLE: '',
    ENTRANCE_SERVER_URL: '',
    INSTRUCTION_URL: '',
    ANALYTICS_ID: '',
    GTM_ID: '',
    VIEW_TYPE: 'cinema',
    STORAGE_NAME: (getProject().projectName === '') ? 'POS-STATE' : `${getProject().projectName.toUpperCase()}-POS-STATE`,
    STORAGE_TYPE: 'localStorage',
    BASE_URL: '/purchase/root',
    LANGUAGE: ['ja'],
    PROFILE: [
        { key: 'email', value: '', required: true, maxLength: 50 },
        { key: 'givenName', value: '', required: true, pattern: /^[ァ-ヶー]+$/, maxLength: 12 },
        { key: 'familyName', value: '', required: true, pattern: /^[ァ-ヶー]+$/, maxLength: 12 },
        { key: 'telephone', value: '', required: true, maxLength: 15, minLength: 9 }
    ],
    PAYMENT_METHOD_TO_USE: [],
    PAYMENT_METHOD_CUSTOM: [],
    REGIGROW_QRCODE: '',
    DISPLAY_TICKETED_SEAT: false,
    HEADER_MENU: false,
    HEADER_MENU_SCOPE: [],
    PURCHASE_CART: false,
    PURCHASE_ITEM_MAX_LENGTH: '50',
    PURCHASE_TRANSACTION_TIME: '15',
    PURCHASE_TRANSACTION_TIME_DISPLAY: false,
    PURCHASE_TRANSACTION_IDENTIFIER: [],
    PURCHASE_PRE_SCHEDULE_DATE: '3',
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: '0',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: '30',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: '%',
    PURCHASE_COMPLETE_MAIL_CUSTOM: true,
    PURCHASE_TERMS: false,
    PURCHASE_WARNING: false,
    INQUIRY_CANCEL: false,
    INQUIRY_QRCODE: false,
    INQUIRY_PRINT: false,
    INQUIRY_PRINT_EXPIRED_VALUE: '0',
    INQUIRY_PRINT_EXPIRED_UNIT: 'hour',
    INQUIRY_PRINT_WAIT_TIME: '',
    INQUIRY_PRINT_SUCCESS_WAIT_TIME: '',
    INQUIRY_INPUT_KEYPAD: false,
    INQUIRY_ORDER_DATE_FROM_VALUE: '-3',
    INQUIRY_ORDER_DATE_FROM_UNIT: 'month',
    ORDER_CANCEL: false,
    ORDER_CANCEL_MAIL_CUSTOM: true,
    ORDER_PRINT: false,
    ORDER_LINK: [],
    PRINT_QRCODE_TYPE: 'token',
    PRINT_QRCODE_CUSTOM: '',
    PRINT_LOADING: true
};

export function getEnvironment(): IEnvironment {
    const environment = {
        ...defaultEnvironment,
        ...(<any>window).environment,
        production: (document.querySelector('body.production') !== null)
    };
    return environment;
}
