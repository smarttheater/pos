import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions } from '../../../../../..';
import { getEnvironment } from '../../../../../../../environments/environment';
import { PurchaseService, UtilService } from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';

@Component({
    selector: 'app-purchase-cinema-cart',
    templateUrl: './purchase-cinema-cart.component.html',
    styleUrls: ['./purchase-cinema-cart.component.scss']
})
export class PurchaseCinemaCartComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public moment: typeof moment = moment;
    public amount: number;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private purchaseService: PurchaseService,
        private router: Router,
        private translate: TranslateService
    ) { }

    public async ngOnInit() {
        this.amount = 0;
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.purchaseService.unsettledDelete();
        const purchase = await this.purchaseService.getData();
        this.amount = Functions.Purchase.getAmount(purchase.authorizeSeatReservations);
    }

    public removeItem(
        authorizeSeatReservation: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>
    ) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: '削除してよろしいですか。',
            cb: async () => {
                const purchase = await this.purchaseService.getData();
                if (purchase.transaction === undefined) {
                    this.router.navigate(['/error']);
                    return;
                }
                try {
                    await this.purchaseService.cancelTemporaryReservations([authorizeSeatReservation]);
                } catch (error) {
                    console.error(error);
                    this.router.navigate(['/error']);
                }
            }
        });
    }

}
