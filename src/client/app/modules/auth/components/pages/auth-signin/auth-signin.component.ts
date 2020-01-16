import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MasterService, UtilService } from '../../../../../services';
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
        private store: Store<reducers.IOrderState>,
        private masterService: MasterService,
        private utilService: UtilService
    ) { }

    public async ngOnInit() {
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

}
