import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { PurchaseService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-development-screen',
    templateUrl: './development-screen.component.html',
    styleUrls: ['./development-screen.component.scss']
})
export class DevelopmentScreenComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public table: { theaterCode: string; screens: string[]; }[];
    public environment = environment;
    public theaterCode: string;
    public screenCode: string;

    constructor(
        private store: Store<reducers.IState>,
        private purchaseService: PurchaseService
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.table = this.createTable();
        this.theaterCode = this.table[0].theaterCode;
        this.screenCode = this.table[0].screens[0];
        this.getScreenData();
    }

    public async getScreenData() {
        const theaterCode = this.theaterCode;
        const screenCode = this.screenCode;
        try {
            await this.purchaseService.getScreen({
                test: true,
                theaterCode,
                screenCode
            });
        } catch (error) {
            console.error(error);
        }
    }


    private createTable() {
        return [
            { theaterCode: '118', screens: ['010', '020', '030', '040', '050', '060', '070', '080', '090'] },
            { theaterCode: '002', screens: ['010', '020', '030', '040', '050', '060', '070', '080', '090'] }
        ];
    }

    public getScreens(theaterCode: string) {
        const findResult = this.table.find(t => t.theaterCode === theaterCode);
        return (findResult === undefined) ? this.table[0] : findResult;
    }

    public changeTheaterCode() {
        this.screenCode = this.getScreens(this.theaterCode).screens[0];
    }

}
