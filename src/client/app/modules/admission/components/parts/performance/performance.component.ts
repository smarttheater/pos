import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-admission-performance',
    templateUrl: './performance.component.html',
    styleUrls: ['./performance.component.scss']
})
export class AdmissionPerformanceComponent implements OnInit {

    @Input() public performance: Models.Purchase.Performance;
    @Output() public select = new EventEmitter<factory.chevre.event.screeningEvent.IEvent>();
    public moment = moment;
    public environment = getEnvironment();

    constructor() { }

    public ngOnInit() {
    }

}
