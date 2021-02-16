import * as moment from 'moment';
import { getProject } from '../app/functions/util.function';

interface IProfile {
    key: string;
    value: string;
    required?: boolean;
    pattern?: RegExp;
    maxLength?: number;
    minLength?: number;
    label?: { ja: string; en: string; };
    inputType?: 'input' | 'textarea';
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
     * プライマリーカラー
     */
    PRIMARY_COLOR: string;
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
     * スケジュールソート
     */
    PURCHASE_SCHEDULE_SORT: 'screeningEventSeries' | 'screen';
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
     * 予約メモ
     */
    PURCHASE_ADDITIONAL_TICKET_TEXT: boolean;
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
     * 注文承認コード期限(s)
     * デフォルト1814400s 21days
     */
    ORDER_AUTHORIZE_CODE_EXPIRES: string;
    /**
     * 印刷QRコードタイプ
     */
    PRINT_QRCODE_TYPE: 'None' | 'token' | 'Custom' | 'Admission';
    /**
     * 印刷QRコードカスタム
     */
    PRINT_QRCODE_CUSTOM: string;
    /**
     * 印刷時ローディング
     */
    PRINT_LOADING: boolean;
    /**
     * 領収書
     */
    PRINT_RECEIPT: boolean;
    /**
     * 入力キーパッド
     */
    INPUT_KEYPAD: boolean;
}

export const isProduction = (document.querySelector('body.production') !== null);

const defaultEnvironment: IEnvironment = {
    production: false,
    APP_TITLE: '',
    PRIMARY_COLOR: 'steelblue',
    INSTRUCTION_URL: '',
    ANALYTICS_ID: '',
    GTM_ID: '',
    VIEW_TYPE: 'event',
    STORAGE_NAME: 'POS-STATE',
    STORAGE_TYPE: 'localStorage',
    BASE_URL: '/purchase/root',
    LANGUAGE: ['ja'],
    PROFILE: [
        { key: 'familyName', value: '', required: true, pattern: /^[ァ-ヶー]+$/, maxLength: 12 },
        { key: 'givenName', value: '', required: true, pattern: /^[ァ-ヶー]+$/, maxLength: 12 },
        { key: 'email', value: '', required: true, maxLength: 50 },
        { key: 'telephone', value: '', required: true, maxLength: 15, minLength: 9 }
    ],
    REGIGROW_QRCODE: '',
    DISPLAY_TICKETED_SEAT: true,
    HEADER_MENU: true,
    HEADER_MENU_SCOPE: ['purchase', 'admission', 'order', 'reservation', 'setting', 'auth'],
    PURCHASE_ITEM_MAX_LENGTH: '50',
    PURCHASE_TRANSACTION_TIME: '15',
    PURCHASE_TRANSACTION_TIME_DISPLAY: true,
    PURCHASE_TRANSACTION_IDENTIFIER: [],
    PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE: '0',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: '30',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: '%',
    PURCHASE_SCHEDULE_SORT: 'screeningEventSeries',
    PURCHASE_COMPLETE_MAIL_CUSTOM: true,
    PURCHASE_TERMS: false,
    PURCHASE_WARNING: false,
    PURCHASE_ADDITIONAL_TICKET_TEXT: true,
    INQUIRY_CANCEL: false,
    INQUIRY_QRCODE: false,
    INQUIRY_PRINT: false,
    INQUIRY_PRINT_EXPIRED_VALUE: '0',
    INQUIRY_PRINT_EXPIRED_UNIT: 'hour',
    INQUIRY_PRINT_WAIT_TIME: '',
    INQUIRY_PRINT_SUCCESS_WAIT_TIME: '',
    INQUIRY_ORDER_DATE_FROM_VALUE: '-3',
    INQUIRY_ORDER_DATE_FROM_UNIT: 'month',
    ORDER_CANCEL: true,
    ORDER_CANCEL_MAIL_CUSTOM: true,
    ORDER_PRINT: true,
    ORDER_LINK: [],
    ORDER_AUTHORIZE_CODE_EXPIRES: '1814400',
    PRINT_QRCODE_TYPE: 'token',
    PRINT_QRCODE_CUSTOM: '',
    PRINT_LOADING: true,
    PRINT_RECEIPT: false,
    INPUT_KEYPAD: true,
};

export function getEnvironment(): IEnvironment {
    const environment = {
        ...defaultEnvironment,
        STORAGE_NAME: (getProject().projectId === '')
            ? 'POS-STATE'
            : `${getProject().projectId.toUpperCase()}-POS-STATE`,
        ...(<any>window).environment,
        production: isProduction
    };
    return environment;
}
