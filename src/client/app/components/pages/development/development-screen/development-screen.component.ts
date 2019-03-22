import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-development-screen',
    templateUrl: './development-screen.component.html',
    styleUrls: ['./development-screen.component.scss']
})
export class DevelopmentScreenComponent implements OnInit {
    public table: { branchCode: string; screens: string[]; }[];
    public environment = environment;
    public branchCode: string;
    public screenCode: string;

    constructor() { }

    public ngOnInit() {
        this.table = this.createTable();
        this.branchCode = this.table[0].branchCode;
        this.screenCode = this.table[0].screens[0];
    }

    private createTable() {
        return [
            { branchCode: '118', screens: ['010', '020', '030', '040', '050', '060', '070', '080', '090'] },
            { branchCode: '002', screens: ['0110', '0120', '030', '040', '050', '060', '070', '080', '090'] }
        ];
    }

    public getScreens(branchCode: string) {
        const findResult = this.table.find(t => t.branchCode === branchCode);
        return (findResult === undefined) ? this.table[0] : findResult;
    }

    public changeBranchCode() {
        this.screenCode = this.getScreens(this.branchCode).screens[0];
        this.updateScreen();
    }

    public updateScreen() {

    }

}
