import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as platform from 'platform';
import { Functions } from '../../../../../..';
import { getEnvironment } from '../../../../../../../environments/environment';

@Component({
    selector: 'app-order-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit {
    @Input() public order: factory.order.IOrder;
    public moment: typeof moment = moment;
    public eventOrders: Functions.Purchase.IEventOrder[];
    public environment = getEnvironment();
    public qrcode?: string;
    public getTransactionAgentIdentifier = Functions.Order.getTransactionAgentIdentifier;
    public platform = platform;
    public paymentMethodType = factory.paymentMethodType;
    public createOrderLink = Functions.Order.createOrderLink;

    constructor(
        public modal: BsModalRef,
        private elementRef: ElementRef
    ) { }

    public async ngOnInit() {
        const order = this.order;
        this.eventOrders = Functions.Purchase.order2EventOrders({ order: this.order });
        const element: HTMLElement = this.elementRef.nativeElement.querySelector('.scroll-vertical');
        setTimeout(() => {
            element.scrollTop = 0;
        }, 0);
        try {
            const isRegiGrow = order.paymentMethods.find(p => p.name === 'RegiGrow') !== undefined;
            const findResult = this.environment.PAYMENT_METHOD_CUSTOM.find(c => {
                return order.paymentMethods.find(p => {
                    return (p.typeOf === factory.paymentMethodType.Others
                        && p.name === c.category
                        && c.qrcode !== undefined);
                });
            });
            if (isRegiGrow
                || (findResult !== undefined && findResult.qrcode !== undefined)) {
                const qrcodeText = (isRegiGrow) ? this.environment.REGIGROW_QRCODE
                    : (findResult !== undefined && findResult.qrcode !== undefined) ? findResult.qrcode : '';
                this.qrcode = await Functions.Order.createCooperationQRCode({ order, qrcodeText });
            }
        } catch (error) {
            console.error(error);
        }
    }

}

