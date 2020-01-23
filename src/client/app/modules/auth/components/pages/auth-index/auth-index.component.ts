import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getEnvironment } from '../../../../../../environments/environment';
import { CinerinoService } from '../../../../../services/cinerino.service';

@Component({
    selector: 'app-auth-index',
    templateUrl: './auth-index.component.html',
    styleUrls: ['./auth-index.component.scss']
})
export class AuthIndexComponent implements OnInit {
    public environment = getEnvironment();

    constructor(
        private cinerino: CinerinoService,
        private router: Router
    ) { }

    public async ngOnInit() {
        try {
            await this.cinerino.getServices();
            this.router.navigate([this.environment.BASE_URL]);
        } catch (error) {
            await this.cinerino.signIn();
        }
    }

}
