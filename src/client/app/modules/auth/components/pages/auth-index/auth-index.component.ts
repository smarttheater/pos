import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { CinerinoService } from '../../../../../services/cinerino.service';

@Component({
    selector: 'app-auth-index',
    templateUrl: './auth-index.component.html',
    styleUrls: ['./auth-index.component.scss']
})
export class AuthIndexComponent implements OnInit {

    constructor(
        private cinerino: CinerinoService,
        private router: Router
    ) { }

    public async ngOnInit() {
        try {
            await this.cinerino.getServices();
            this.router.navigate([environment.BASE_URL]);
        } catch (error) {
            await this.cinerino.signIn();
        }
    }

}
