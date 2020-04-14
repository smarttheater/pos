import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CinerinoService, MasterService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './auth-signin.component.html',
    styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public master: Observable<reducers.IMasterState>;
    public projects: {
        projectId: string;
        projectName: string;
        storageUrl: string;
    }[];

    constructor(
        private store: Store<reducers.IState>,
        private masterService: MasterService,
        private utilService: UtilService,
        private cinerinoService: CinerinoService
    ) { }

    public async ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.projects = [];
        await this.masterService.getProjects();
        this.utilService.loadStart();
        const masterData = await this.masterService.getData();
        const projects = masterData.projects;
        if (projects.length === 1) {
            // プロジェクトが一つの場合自動遷移
            location.href = `/?projectId=${projects[0].id}`;
            return;
        }
        this.utilService.loadEnd();
    }

    public async signOut() {
        try {
            await this.cinerinoService.getServices();
            await this.cinerinoService.signOut();
        } catch (error) {
            console.error(error);
        }
    }

}
