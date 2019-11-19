import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CinerinoService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

interface IData {
    person: factory.person.IPerson;
    programMembership: factory.ownershipInfo.IOwnershipInfo<factory.programMembership.IProgramMembership>[];
    account: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IAccount<factory.accountType>>;
}

@Component({
    selector: 'app-tasks-account-deposit',
    templateUrl: './tasks-account-deposit.component.html',
    styleUrls: ['./tasks-account-deposit.component.scss']
})
export class TasksAccountDepositComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public accountNumber: string;
    public message: string;
    public amount: number;
    public target?: IData;

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private translate: TranslateService,
        private cinerinoService: CinerinoService,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.accountNumber = '';
        this.message = this.translate.instant('tasks.accountDeposit.defaultMessage');
        this.amount = 1;
    }

    /**
     * 検索
     */
    public async search() {
        this.utilService.loadStart();
        try {
            this.target = undefined;
            await this.cinerinoService.getServices();
            const account =
                await this.cinerinoService.admin.ownershipInfo
                    .search<factory.ownershipInfo.AccountGoodType.Account>({
                        typeOfGood: {
                            typeOf: factory.ownershipInfo.AccountGoodType.Account,
                            accountType: factory.accountType.Point,
                            accountNumbers: [this.accountNumber]
                        }
                    });
            if (account.data.length === 0) {
                throw new Error('account notfound');
            }
            const person = await this.cinerinoService.person.search({ id: account.data[0].ownedBy.id });
            if (person.data.length === 0) {
                throw new Error('person notfound');
            }
            const programMembership =
                await this.cinerinoService.admin.ownershipInfo
                    .search<factory.programMembership.ProgramMembershipType.ProgramMembership>({
                        ownedBy: { id: person.data[0].id },
                        typeOfGood: {
                            typeOf: factory.programMembership.ProgramMembershipType.ProgramMembership
                        }
                    });
            this.target = {
                person: person.data[0],
                programMembership: programMembership.data,
                account: account.data[0]
            };
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDeposit.alert.search')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error.message}</code>
                </div>`
            });
        }
        console.log(this.target);
        this.utilService.loadEnd();
    }

    /**
     * ポイント付与
     */
    public async deposit() {
        this.utilService.loadStart();
        try {
            if (this.target === undefined) {
                throw new Error('target undefined');
            }
            await this.cinerinoService.getServices();
            await this.cinerinoService.account.deposit4sskts({
                object: {
                    amount: this.amount,
                    toLocation: { accountNumber: this.target.account.typeOfGood.accountNumber },
                    description: this.message
                },
                recipient: {
                    id: this.target.account.typeOfGood.accountNumber,
                    name: `${this.target.person.givenName} ${this.target.person.familyName}`,
                    url: ''
                }
            });
            this.utilService.openAlert({
                title: this.translate.instant('common.complete'),
                body: `${this.translate.instant('tasks.accountDeposit.alert.depositSuccess')}`
            });
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDeposit.alert.depositFail')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error.message}</code>
                </div>`
            });
        }
        this.utilService.loadEnd();
    }
}
