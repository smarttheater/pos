import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CinerinoService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-tasks-account-deposit',
    templateUrl: './tasks-account-deposit.component.html',
    styleUrls: ['./tasks-account-deposit.component.scss']
})
export class TasksAccountDepositComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public conditions: {
        recipient: {
            familyName: string;
            givenName: string;
            accountNumber: string;
        },
        message: string;
        amount: number;
    };

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private translate: TranslateService,
        private cinerinoService: CinerinoService,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.conditions = {
            recipient: {
                familyName: '',
                givenName: '',
                accountNumber: '',
            },
            message: this.translate.instant('tasks.accountDeposit.defaultMessage'),
            amount: 1,
        };
    }

    /**
     * ポイント付与
     */
    public async deposit() {
        this.utilService.loadStart({ process: 'load' });
        try {
            await this.cinerinoService.getServices();
            await this.cinerinoService.account.deposit4sskts({
                object: {
                    amount: this.conditions.amount,
                    toLocation: { accountNumber: this.conditions.recipient.accountNumber },
                    description: this.conditions.message
                },
                recipient: {
                    id: this.conditions.recipient.accountNumber,
                    name: `${this.conditions.recipient.givenName} ${this.conditions.recipient.familyName}`,
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

    /**
     * 検索条件クリア
     */
    public conditionClear() {
        this.conditions = {
            recipient: {
                familyName: '',
                givenName: '',
                accountNumber: '',
            },
            message: this.translate.instant('tasks.accountDeposit.defaultMessage'),
            amount: 1,
        };
    }
}


