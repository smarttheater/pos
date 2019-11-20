import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as csvtojson from 'csvtojson';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { sleep } from '../../../../../functions';
import { CinerinoService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

interface IData {
    person: factory.person.IPerson;
    programMembership: factory.ownershipInfo.IOwnershipInfo<factory.programMembership.IProgramMembership>[];
    account: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IAccount<factory.accountType>>;
}

@Component({
    selector: 'app-tasks-account-deposit-csv',
    templateUrl: './tasks-account-deposit-csv.component.html',
    styleUrls: ['./tasks-account-deposit-csv.component.scss']
})
export class TasksAccountDepositCSVComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public refineYears: number | null;
    public message: string;
    public amount: number;
    public json: {
        '購入者ID': string;
        '購入者お名前': string;
        '購入者会員ID': string;
        '購入者メールアドレス': string;
        '購入者電話番号': string;
    }[];
    public targetTable: IData[];
    public successTable: IData[];
    public failTable: IData[];

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private translate: TranslateService,
        private cinerinoService: CinerinoService,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.json = [];
        this.targetTable = [];
        this.successTable = [];
        this.failTable = [];
        this.refineYears = null;
        this.message = this.translate.instant('tasks.accountDepositCSV.defaultMessage');
        this.amount = 1;
    }

    /**
     * ファイルアップロード
     */
    public async onChangeInput(event: any) {
        this.json = [];
        const file = event.target.files[0];
        if (file.size > 5000000) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.upload')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>File size upper limit 5MB</code>
                </div>`
            });
            return;
        }
        const text = await this.fileToText(file);
        if (typeof text !== 'string') {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.upload')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>File format error</code>
                </div>`
            });
            return;
        }
        this.json = await this.csvToJson(text);
        // console.log(this.json);
    }

    /**
     * ファイルをテキストへ変換
     */
    private async fileToText(file: any) {
        const reader = new FileReader();
        reader.readAsText(file);
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
        });
    }

    /**
     * CSVをJSONへ変換
     */
    private async csvToJson(csv: string) {
        return new Promise<any[]>((resolve) => {
            csvtojson().fromString(csv).then((data) => {
                return resolve(data);
            });
        });
    }

    /**
     * 絞り込み
     */
    public async refine() {
        this.utilService.loadStart();
        try {
            this.targetTable = [];
            this.successTable = [];
            this.failTable = [];
            const deduplication: {
                userName: string;
                name: string;
                id: string;
                email: string;
                telephone: string;
            }[] = [];
            this.json.forEach((row) => {
                const id = row.購入者ID;
                const userName = row.購入者会員ID;
                const name = row.購入者お名前;
                const email = row.購入者メールアドレス;
                const telephone = row.購入者電話番号;
                if (deduplication.find(d => d.id === id) === undefined) {
                    deduplication.push({ id, userName, name, email, telephone });
                }
            });
            const tmpData = [];
            await this.cinerinoService.getServices();
            for (const data of deduplication) {
                const person = await this.cinerinoService.person.search({ id: data.id });
                const programMembership =
                    await this.cinerinoService.admin.ownershipInfo
                        .search<factory.programMembership.ProgramMembershipType.ProgramMembership>({
                            ownedBy: { id: data.id },
                            typeOfGood: {
                                typeOf: factory.programMembership.ProgramMembershipType.ProgramMembership
                            }
                        });
                const account =
                    await this.cinerinoService.admin.ownershipInfo
                        .search<factory.ownershipInfo.AccountGoodType.Account>({
                            ownedBy: { id: data.id },
                            typeOfGood: {
                                typeOf: factory.ownershipInfo.AccountGoodType.Account,
                                accountType: factory.accountType.Point
                            }
                        });
                tmpData.push({
                    person: person.data[0],
                    programMembership: programMembership.data,
                    account: account.data[0]
                });
                await sleep(1000);
            }
            if (this.refineYears === null) {
                this.targetTable = tmpData;
            } else {
                // 会員年数で絞り込み
                const now = (await this.utilService.getServerTime()).date;
                tmpData.forEach((data) => {
                    const validity = data.programMembership.find((p) => {
                        return (moment(p.ownedFrom).unix() < moment(now).unix()
                            && moment(p.ownedThrough).unix() > moment(now).unix());
                    });
                    if (data.programMembership.length === this.refineYears
                        && validity !== undefined) {
                        this.targetTable.push(data);
                    }
                });
            }
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.refine')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error.message}</code>
                </div>`
            });
        }
        console.log(this.targetTable);
        this.utilService.loadEnd();
    }

    /**
     * ポイント付与
     */
    public async deposit() {
        this.utilService.loadStart();
        this.successTable = [];
        this.failTable = [];
        try {
            await this.cinerinoService.getServices();
            for (const data of this.targetTable) {
                try {
                    await this.cinerinoService.account.deposit4sskts({
                        object: {
                            amount: this.amount,
                            toLocation: { accountNumber: data.account.typeOfGood.accountNumber },
                            description: this.message
                        },
                        recipient: {
                            id: data.account.typeOfGood.accountNumber,
                            name: `${data.person.givenName} ${data.person.familyName}`,
                            url: ''
                        }
                    });
                    this.successTable.push(data);
                } catch (error) {
                    console.error(error);
                    this.failTable.push(data);
                }
                await sleep(1000);
            }
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.deposit')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error.message}</code>
                </div>`
            });
        }
        this.utilService.loadEnd();
    }


}
