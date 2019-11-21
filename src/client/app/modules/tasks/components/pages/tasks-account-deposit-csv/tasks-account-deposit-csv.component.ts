import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as csvtojson from 'csvtojson';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { iOSDatepickerTapBugFix, sleep } from '../../../../../functions';
import { CinerinoService, DownloadService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

interface IData {
    person: factory.person.IPerson;
    programMembership: factory.ownershipInfo.IOwnershipInfo<factory.programMembership.IProgramMembership>;
    account: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IAccount<factory.accountType>>;
    validityMember: boolean;
    programMembershipCount: number;
    depositedCount: number;
    depositCount: number;
    pointTransferActions: factory.pecorino.action.transfer.moneyTransfer.IAction<factory.accountType.Point>[];
}

@Component({
    selector: 'app-tasks-account-deposit-csv',
    templateUrl: './tasks-account-deposit-csv.component.html',
    styleUrls: ['./tasks-account-deposit-csv.component.scss']
})
export class TasksAccountDepositCSVComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
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
    public conditions: {
        orderDateFrom: Date;
        orderDateThrough: Date;
        itemId: string;
    };
    @ViewChild('orderDateFrom', { static: true })
    private orderDateFrom: BsDatepickerDirective;
    @ViewChild('orderDateThrough', { static: true })
    private orderDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private translate: TranslateService,
        private cinerinoService: CinerinoService,
        private downloadService: DownloadService,
        private localeService: BsLocaleService,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.json = [];
        this.targetTable = [];
        this.successTable = [];
        this.failTable = [];
        this.message = this.translate.instant('tasks.accountDepositCSV.defaultMessage');
        this.amount = 1;
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            // orderDateFrom: moment(today).add(-2, 'year').toDate(),
            // orderDateThrough: moment(today).add(-1, 'year').toDate(),
            orderDateFrom: moment(today).add(-2, 'day').toDate(),
            orderDateThrough: moment(today).add(1, 'day').toDate(),
            itemId: ''
        };
    }

    /**
     * ファイルダウンロード
     */
    public async download() {
        // iOS bugfix
        this.conditions.itemId
            = (<HTMLInputElement>document.getElementById('itemId')).value;
        try {
            const params: factory.order.ISearchConditions & {
                format: factory.encodingFormat.Application | factory.encodingFormat.Text;
            } = {
                orderDateFrom: (this.conditions.orderDateFrom === undefined)
                    ? undefined
                    : <any>moment(moment(this.conditions.orderDateFrom).format('YYYYMMDD')).toISOString(),
                orderDateThrough: (this.conditions.orderDateThrough === undefined)
                    ? undefined
                    : <any>moment(moment(this.conditions.orderDateThrough)
                        .add(1, 'day').format('YYYYMMDD')).add(1, 'day').toISOString(),
                acceptedOffers: {
                    itemOffered: {
                        ids: [this.conditions.itemId]
                    }
                },
                sort: {
                    orderDate: factory.sortType.Descending
                },
                format: factory.encodingFormat.Text.csv
            };
            this.downloadService.orderStream(params);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('tasks.accountDepositCSV.alert.download')
            });
        }
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
            const data: IData[] = [];
            const now = (await this.utilService.getServerTime()).date;
            await this.cinerinoService.getServices();
            for (const d of deduplication) {
                // 会員情報取得
                const person = await this.cinerinoService.person.search({ id: d.id });
                // 会員プログラム取得
                const programMembership = await this.cinerinoService.admin.ownershipInfo
                    .search<factory.programMembership.ProgramMembershipType.ProgramMembership>({
                        sort: { ownedFrom: factory.sortType.Descending },
                        limit: 10,
                        ownedBy: { id: d.id },
                        typeOfGood: {
                            typeOf: factory.programMembership.ProgramMembershipType.ProgramMembership
                        }
                    });
                // ポイント口座取得
                const account =
                    await this.cinerinoService.admin.ownershipInfo
                        .search<factory.ownershipInfo.AccountGoodType.Account>({
                            ownedBy: { id: d.id },
                            typeOfGood: {
                                typeOf: factory.ownershipInfo.AccountGoodType.Account,
                                accountType: factory.accountType.Point
                            }
                        });
                // ポイント遷移
                // const getPointTransferActions = async () => {
                //     const limit = 100;
                //     let page = 1;
                //     let roop = true;
                //     let result: factory.pecorino.action.transfer.moneyTransfer.IAction<factory.accountType.Point>[] = [];
                //     while (roop) {
                //         const pointTransferActionsResult =
                //             await this.cinerinoService.ownershipInfo
                //                 .searchAccountMoneyTransferActions<factory.accountType.Point>({
                //                     page,
                //                     limit,
                //                     id: d.id,
                //                     accountType: factory.accountType.Point,
                //                     accountNumber: account.data[0].typeOfGood.accountNumber
                //                 });
                //         result = result.concat(pointTransferActionsResult.data);
                //         const lastPage = Math.ceil(pointTransferActionsResult.totalCount / limit);
                //         page++;
                //         roop = !(page > lastPage);
                //     }
                //     return result;
                // };
                // const pointTransferActions = await getPointTransferActions();
                const pointTransferActions: any[] = [];
                const depositedCount = pointTransferActions.filter(p => p.description === this.message).length;
                data.push({
                    person: person.data[0],
                    programMembership: programMembership.data[0],
                    account: account.data[0],
                    validityMember: (moment(programMembership.data[0].ownedFrom).unix() < moment(now).unix()
                        && moment(programMembership.data[0].ownedThrough).unix() > moment(now).unix()),
                    programMembershipCount: programMembership.totalCount,
                    depositedCount,
                    depositCount: ((programMembership.totalCount - 1 - depositedCount) > 0)
                        ? programMembership.totalCount - 1 - depositedCount : 0, // 初年度は自動なので-1
                    pointTransferActions
                });
                await sleep(1000);
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

    /**
     * DatePicker設定
     */
    public setDatePicker() {
        this.user.subscribe((user) => {
            this.localeService.use(user.language);
        }).unsubscribe();
    }

    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    public onShowPicker(container: BsDatepickerContainerComponent) {
        iOSDatepickerTapBugFix(container, [
            this.orderDateFrom,
            this.orderDateThrough
        ]);
    }


}
