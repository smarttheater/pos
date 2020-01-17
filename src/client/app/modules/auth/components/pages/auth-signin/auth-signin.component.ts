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
        this.projects = await this.utilService.postJson<{
            projectId: string;
            projectName: string;
            storageUrl: string;
        }[]>('/api/projects', {});
    }

    public getProject(id: string) {
        return this.projects.find(p => p.projectId === id);
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
