import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cinerino from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { getProject } from '../functions';

@Injectable({
    providedIn: 'root'
})
export class CinerinoService {
    public auth: cinerino.IImplicitGrantClient;
    public account: cinerino.service.Account;
    public event: cinerino.service.Event;
    public order: cinerino.service.Order;
    public seller: cinerino.service.Seller;
    public person: cinerino.service.Person;
    public ownershipInfo: cinerino.service.person.OwnershipInfo;
    public reservation: cinerino.service.Reservation;
    public task: cinerino.service.Task;
    public payment: cinerino.service.Payment;
    public transaction: {
        placeOrder: cinerino.service.transaction.PlaceOrder,
        returnOrder: cinerino.service.transaction.ReturnOrder
    };
    public admin: {
        ownershipInfo: cinerino.service.OwnershipInfo
    };
    public userName: string;
    private endpoint: string;
    private waiterServerUrl: string;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.account = new cinerino.service.Account(option);
            this.event = new cinerino.service.Event(option);
            this.order = new cinerino.service.Order(option);
            this.seller = new cinerino.service.Seller(option);
            this.person = new cinerino.service.Person(option);
            this.ownershipInfo = new cinerino.service.person.OwnershipInfo(option);
            this.reservation = new cinerino.service.Reservation(option);
            this.task = new cinerino.service.Task(option);
            this.payment = new cinerino.service.Payment(option);
            this.transaction = {
                placeOrder: new cinerino.service.transaction.PlaceOrder(option),
                returnOrder: new cinerino.service.transaction.ReturnOrder(option)
            };
            this.admin = {
                ownershipInfo: new cinerino.service.OwnershipInfo(option)
            };
        } catch (err) {
            console.error(err);
            throw { error: 'アクセストークンの取得に失敗しました。' };
        }
    }

    /**
     * createOption
     */
    public async createOption() {
        await this.getConfig();
        await this.authorize();
        return {
            endpoint: this.endpoint,
            auth: this.auth
        };
    }

    /**
     * 設定取得
     */
    public async getConfig() {
        const url = `/api/config?date=${moment().toISOString()}&project=${getProject()}`;
        const result = await this.http.get<{ endpoint: string; waiterServerUrl: string; storageUrl: string; }>(url).toPromise();
        this.endpoint = result.endpoint;
        this.waiterServerUrl = result.waiterServerUrl;
    }

    /**
     * 認証情報取得
     */
    public async authorize() {
        const url = '/api/authorize/getCredentials';
        const body = {
            project: getProject()
        };
        const result = await this.http.post<{
            accessToken: string;
            expiryDate: number;
            userName: string;
            clientId: string;
        }>(url, body).toPromise();
        this.setCredentials(result);
    }

    /**
     * 認証情報設定
     */
    public setCredentials(params: {
        clientId: string;
        accessToken: string;
        expiryDate: number;
        userName: string;
    }) {
        const option = {
            domain: '',
            clientId: params.clientId,
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: ''
        };
        this.auth = cinerino.createAuthInstance(option);
        this.auth.setCredentials({ accessToken: params.accessToken, expiryDate: params.expiryDate });
        this.userName = params.userName;
    }

    /**
     * サインイン
     */
    public async signIn() {
        const url = `/api/authorize/signIn?project=${getProject()}`;
        const result = await this.http.get<any>(url, {}).toPromise();
        // console.log(result.url);
        location.href = result.url;
    }

    /**
     * サインアウト
     */
    public async signOut() {
        const url = `/api/authorize/signOut?project=${getProject()}`;
        const result = await this.http.get<any>(url, {}).toPromise();
        // console.log(result.url);
        location.href = result.url;
    }

    /**
     * パスポート取得
     */
    public async getPassport(selleId: string) {
        if (this.waiterServerUrl === undefined
            || this.waiterServerUrl === '') {
            return { token: '' };
        }
        const url = this.waiterServerUrl;
        const body = { scope: `Transaction:PlaceOrder:${selleId}` };
        const result = await this.http.post<{ token: string; }>(url, body).toPromise();

        return result;
    }
}
