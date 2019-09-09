import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { OrderService, PurchaseService } from '../../../../../services';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './auth-signin.component.html',
    styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

    constructor(
        private router: Router,
        private purchaseService: PurchaseService,
        private orderService: OrderService
    ) { }

    public ngOnInit() {
        this.orderService.delete();
        this.purchaseService.delete();
        this.router.navigate([environment.BASE_URL]);
    }

}
