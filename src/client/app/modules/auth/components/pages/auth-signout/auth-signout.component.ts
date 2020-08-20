import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from '../../../../../services';

@Component({
    selector: 'app-auth-signout',
    templateUrl: './auth-signout.component.html',
    styleUrls: ['./auth-signout.component.scss']
})
export class AuthSignoutComponent implements OnInit {

    constructor(
        private router: Router,
        private actionService: ActionService,
    ) { }

    public ngOnInit() {
        this.actionService.order.delete();
        this.actionService.purchase.delete();
        this.router.navigate(['/']);
    }

    public selectProject() {
    }

}
