import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/sdk';

@Component({
    selector: 'app-payment-select',
    templateUrl: './payment-select.component.html',
    styleUrls: ['./payment-select.component.scss'],
})
export class PaymentSelectComponent implements OnInit {
    @Input() public payments: {
        paymentAccepted: factory.chevre.seller.IPaymentAccepted;
        categoryCode: factory.chevre.categoryCode.ICategoryCode;
        selected: boolean;
        value: number;
    }[];
    @Input() public amount: number;
    @Output() public change: EventEmitter<{
        chargeAmount: number;
        isValid: boolean;
    }> = new EventEmitter();
    public paymentMethodType = factory.chevre.paymentMethodType;
    public chargeAmount = 0;

    constructor() {}

    public ngOnInit() {
        this.chargeAmount = 0;
    }

    /**
     * 決済方法選択
     */
    public async selectPaymentMethodType(
        paymentMethodType: factory.paymentMethodType
    ) {
        const findResult = this.payments.find(
            (p) => p.paymentAccepted.paymentMethodType === paymentMethodType
        );
        if (findResult === undefined) {
            return;
        }
        this.payments.forEach((p) => {
            if (p.paymentAccepted.paymentMethodType === paymentMethodType) {
                return;
            }
            p.selected = false;
            p.value = 0;
        });
        findResult.selected = !findResult.selected;
        if (!findResult.selected) {
            findResult.value = 0;
        }
        if (paymentMethodType === this.paymentMethodType.Cash) {
            this.chargeAmount = 0;
        }
        this.changeValue();
    }

    /**
     * 金額変更
     */
    public changeValue() {
        let total = 0;
        this.payments.forEach((p) => (total += Number(p.value)));
        const findReslt = this.payments.find(
            (p) =>
                p.paymentAccepted.paymentMethodType ===
                this.paymentMethodType.Cash
        );
        const cashValue = findReslt === undefined ? 0 : Number(findReslt.value);
        this.chargeAmount =
            total - this.amount < cashValue ? total - this.amount : cashValue;
        const isValid = !(
            this.chargeAmount >= 0 && total - this.chargeAmount === this.amount
        );
        this.change.emit({
            chargeAmount: this.chargeAmount,
            isValid,
        });
    }
}
