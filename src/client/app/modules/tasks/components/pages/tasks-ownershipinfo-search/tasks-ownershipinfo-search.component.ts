import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { iOSDatepickerTapBugFix } from '../../../../../functions';
import { IOwnershipinfoSearchConditions } from '../../../../../models';
import { CinerinoService, MasterService, UserService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';


@Component({
    selector: 'app-tasks-ownershipinfo-search',
    templateUrl: './tasks-ownershipinfo-search.component.html',
    styleUrls: ['./tasks-ownershipinfo-search.component.scss']
})
export class TasksOwnershipinfoSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public master: Observable<reducers.IMasterState>;
    public conditions: IOwnershipinfoSearchConditions;
    public confirmedConditions: IOwnershipinfoSearchConditions;
    public table: {
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
        count: number;
    }[];
    @ViewChild('fromDate', { static: true }) private fromDate: BsDatepickerDirective;
    @ViewChild('toDate', { static: true }) private toDate: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IUserState>,
        private utilService: UtilService,
        private userService: UserService,
        private masterService: MasterService,
        private cinerinoService: CinerinoService,
        private localeService: BsLocaleService,
        private translate: TranslateService,
    ) { }

    public async ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.table = [];
        const now = moment();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            fromDate: moment(today).add(-1, 'month').toDate(),
            toDate: moment(today).toDate(),
            theaterIds: []
        };
        try {
            await this.masterService.getSellers();
        } catch (error) {
            console.error(error);
        }
        const userData = await this.userService.getData();
        if (userData.seller === undefined) {
            throw new Error('seller undefined');
        }
        this.conditions.theaterIds = [userData.seller.id];
    }

    /**
     * 検索パラメータへ変換
     */
    public convertToSearchParams() {
        return {
            fromDate: this.confirmedConditions.fromDate,
            toDate: this.confirmedConditions.toDate,
            theaterIds: this.confirmedConditions.theaterIds
        };
    }

    /**
     * 検索
     */
    public async ownershipinfoSearch(changeConditions: boolean) {
        this.table = [];
        if (changeConditions) {
            this.confirmedConditions = {
                fromDate: this.conditions.fromDate,
                toDate: this.conditions.toDate,
                theaterIds: this.conditions.theaterIds
            };
        }
        this.utilService.loadStart();
        try {
            const params = this.convertToSearchParams();
            const sellers = (await this.masterService.getData()).sellers;
            await this.cinerinoService.getServices();
            for (const id of params.theaterIds) {
                const result = await this.cinerinoService.admin.ownershipInfo.countByRegisterDateAndTheater({
                    fromDate: params.fromDate,
                    toDate: moment(params.toDate).add(1, 'day').toDate(),
                    theaterIds: [id]
                });
                const findResult = sellers.find(s => s.id === id);
                if (findResult === undefined) {
                    continue;
                }
                this.table.push({ seller: findResult, count: result.count });
            }
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('person.search.alert.search')
            });
        }
        this.utilService.loadEnd();
    }

    /**
     * 検索条件クリア
     */
    public async searchConditionClear() {
        const userData = await this.userService.getData();
        if (userData.seller === undefined) {
            throw new Error('seller undefined');
        }
        const now = moment();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            fromDate: moment(today).add(-1, 'month').toDate(),
            toDate: moment(today).toDate(),
            theaterIds: [userData.seller.id]
        };
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
            this.fromDate,
            this.toDate
        ]);
    }

    /**
     * 劇場変更
     */
    public changeSeller(id: string) {
        const findResult = this.conditions.theaterIds.find(theaterId => theaterId === id);
        if (findResult === undefined) {
            this.conditions.theaterIds.push(id);
        } else {
            const tmp = this.conditions.theaterIds.filter(theaterId => theaterId !== id);
            this.conditions.theaterIds = tmp;
        }
    }

    /**
     * 劇場選択判定
     */
    public isSellerChecked(branchCode?: string) {
        const findResult = this.conditions.theaterIds.find(id => id === branchCode);
        return (findResult !== undefined);
    }

    /**
     * 合計値取得
     */
    public getTotalCount() {
        let result = 0;
        this.table.forEach(t => result += t.count);
        return result;
    }

}
