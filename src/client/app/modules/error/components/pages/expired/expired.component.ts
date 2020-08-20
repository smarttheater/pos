import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../../../../services';

@Component({
    selector: 'app-expired',
    templateUrl: './expired.component.html',
    styleUrls: ['./expired.component.scss']
})
export class ExpiredComponent implements OnInit {

    constructor(
        private actionService: ActionService
    ) { }

    public ngOnInit() {
        this.actionService.purchase.delete();
    }

}
