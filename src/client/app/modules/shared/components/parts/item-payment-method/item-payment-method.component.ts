import { Component, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Functions } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ChangeLanguagePipe } from '../../../../shared/pipes/change-language.pipe';

@Component({
    selector: 'app-item-payment-method',
    templateUrl: './item-payment-method.component.html',
    styleUrls: ['./item-payment-method.component.scss']
})
export class ItemPaymentMethodComponent implements OnInit {
    @Input() public paymentMethods: factory.order.IPaymentMethod[];
    public paymentMethodType = factory.paymentMethodType;
    public environment = getEnvironment();
    public moment = moment;

    constructor(
        private translate: TranslateService,
    ) { }

    public ngOnInit() {
    }

    public getPaymentMethodLabel(paymentMethod: factory.order.IPaymentMethod) {
        if (paymentMethod.typeOf === factory.chevre.paymentMethodType.Account) {
            return this.translate.instant('common.paymentMethodTypes.account.label');
        } else if (paymentMethod.typeOf === factory.chevre.paymentMethodType.Cash) {
            return this.translate.instant('common.paymentMethodTypes.cash.label');
        } else if (paymentMethod.typeOf === factory.chevre.paymentMethodType.CreditCard) {
            return this.translate.instant('common.paymentMethodTypes.creditCard.label');
        } else if (paymentMethod.typeOf === factory.chevre.paymentMethodType.EMoney) {
            return this.translate.instant('common.paymentMethodTypes.eMoney.label');
        } else if (paymentMethod.typeOf === factory.chevre.paymentMethodType.MGTicket) {
            return this.translate.instant('common.paymentMethodTypes.mgTicket.label');
        } else if (paymentMethod.typeOf === factory.chevre.paymentMethodType.MovieTicket) {
            return this.translate.instant('common.paymentMethodTypes.movieTicket.label');
        } else if (paymentMethod.typeOf === factory.chevre.paymentMethodType.Others
            && paymentMethod.name === 'Others') {
            return this.translate.instant('common.paymentMethodTypes.others.label');
        } else if (paymentMethod.typeOf === factory.chevre.paymentMethodType.Others
            && paymentMethod.name === 'RegiGrow') {
            return this.translate.instant('common.paymentMethodTypes.regiGrow.label');
        } else {
            const lang = Functions.Purchase.getCustomPaymentMethodTypeName({
                typeOf: <factory.chevre.paymentMethodType>paymentMethod.typeOf,
                category: paymentMethod.name
            });
            return new ChangeLanguagePipe(this.translate).transform(lang);
        }
    }

}
