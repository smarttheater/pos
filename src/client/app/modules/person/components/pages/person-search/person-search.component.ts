import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { buildQueryString } from '../../../../../functions';
import { IPersonSearchConditions } from '../../../../../models';
import { DownloadService, PersonService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';


@Component({
    selector: 'app-person-search',
    templateUrl: './person-search.component.html',
    styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public isDownload: boolean;
    public error: Observable<string | null>;
    public person: Observable<reducers.IPersonState>;
    public user: Observable<reducers.IUserState>;
    public moment: typeof moment = moment;
    public limit: number;
    public conditions: IPersonSearchConditions;
    public confirmedConditions: IPersonSearchConditions;
    public selectedPersons: factory.person.IPerson[];
    public buildQueryString = buildQueryString;
    public environment = environment;


    constructor(
        private store: Store<reducers.IPersonState>,
        private utilService: UtilService,
        private personService: PersonService,
        private translate: TranslateService,
        private download: DownloadService,
    ) { }

    public ngOnInit() {
        this.isDownload = false;
        this.selectedPersons = [];
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.person = this.store.pipe(select(reducers.getPerson));
        this.user = this.store.pipe(select(reducers.getUser));
        this.limit = 20;
        this.conditions = {
            id: '',
            username: '',
            familyName: '',
            givenName: '',
            email: '',
            telephone: '',
            page: 1
        };
        this.personService.delete();
    }

    /**
     * 選択判定
     */
    public isSelected(person: factory.person.IPerson) {
        const findResult = this.selectedPersons.find(p => p.id === person.id);
        return findResult !== undefined;
    }

    /**
     * 選択中へ変更
     */
    public addPerson(person: factory.person.IPerson) {
        this.selectedPersons.push(person);
    }

    /**
     * 選択中解除
     */
    public removePerson(person: factory.person.IPerson) {
        const findIndex = this.selectedPersons.findIndex(p => p.id === person.id);
        this.selectedPersons.splice(findIndex, 1);
    }

    /**
     * 検索パラメータへ変換
     */
    public convertToSearchParams() {
        return {
            id: (this.confirmedConditions.id === '') ? undefined : this.confirmedConditions.id,
            username: (this.confirmedConditions.username === '') ? undefined : this.confirmedConditions.username,
            email: (this.confirmedConditions.email === '') ? undefined : this.confirmedConditions.email,
            telephone: (this.confirmedConditions.telephone === '') ? undefined : this.confirmedConditions.telephone,
            familyName: (this.confirmedConditions.familyName === '') ? undefined : this.confirmedConditions.familyName,
            givenName: (this.confirmedConditions.givenName === '') ? undefined : this.confirmedConditions.givenName,
            limit: this.limit,
            page: this.confirmedConditions.page
        };
    }

    /**
     * 検索
     */
    public async personSearch(changeConditions: boolean, event?: { page: number }) {
        this.selectedPersons = [];
        if (event !== undefined) {
            this.confirmedConditions.page = event.page;
        }
        // iOS bugfix
        this.conditions.id = (<HTMLInputElement>document.getElementById('id')).value;
        this.conditions.username = (<HTMLInputElement>document.getElementById('username')).value;
        this.conditions.familyName = (<HTMLInputElement>document.getElementById('familyName')).value;
        this.conditions.givenName = (<HTMLInputElement>document.getElementById('givenName')).value;
        this.conditions.email = (<HTMLInputElement>document.getElementById('email')).value;
        this.conditions.telephone = (<HTMLInputElement>document.getElementById('telephone')).value;
        if (changeConditions) {
            this.confirmedConditions = {
                id: this.conditions.id,
                username: this.conditions.username,
                familyName: this.conditions.familyName,
                givenName: this.conditions.givenName,
                email: this.conditions.email,
                telephone: this.conditions.telephone,
                page: 1
            };
        }
        try {
            const params = this.convertToSearchParams();
            await this.personService.search(params);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('person.search.alert.search')
            });
        }
    }

    /**
     * 検索条件クリア
     */
    public searchConditionClear() {
        this.conditions = {
            id: '',
            username: '',
            familyName: '',
            givenName: '',
            email: '',
            telephone: '',
            page: 1
        };
        // iOS bugfix
        (<HTMLInputElement>document.getElementById('id')).value = '';
        (<HTMLInputElement>document.getElementById('username')).value = '';
        (<HTMLInputElement>document.getElementById('familyName')).value = '';
        (<HTMLInputElement>document.getElementById('givenName')).value = '';
        (<HTMLInputElement>document.getElementById('email')).value = '';
        (<HTMLInputElement>document.getElementById('telephone')).value = '';
    }


    /**
     * 詳細を表示
     */
    public openDetail(person: factory.person.IPerson) {
        console.log(person);
        // this.modal.show(PersonDetailModalComponent, {
        //     class: 'modal-dialog-centered modal-lg',
        //     initialState: { person }
        // });
    }

    /**
     * CSVダウンロード
     */
    public async downloadCsv() {
        this.isDownload = true;
        try {
            const params = this.convertToSearchParams();
            await this.download.person(params);
        } catch (error) {
            console.error(error);
        }
        this.isDownload = false;
    }

}
