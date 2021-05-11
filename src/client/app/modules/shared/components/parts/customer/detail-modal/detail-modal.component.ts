import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as platform from 'platform';
import { getEnvironment } from '../../../../../../../environments/environment';

@Component({
    selector: 'app-customer-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class CustomerDetailModalComponent implements OnInit {
    @Input() public customer: any;
    public moment = moment;
    public environment = getEnvironment();
    public platform = platform;

    constructor(
        public modal: BsModalRef,
        private elementRef: ElementRef
    ) { }

    public async ngOnInit() {
        const element: HTMLElement = this.elementRef.nativeElement.querySelector('.scroll-vertical');
        setTimeout(() => {
            element.scrollTop = 0;
        }, 0);
    }

}

