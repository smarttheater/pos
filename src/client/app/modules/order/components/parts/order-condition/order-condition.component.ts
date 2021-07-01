import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import {
    BsDatepickerContainerComponent,
    BsDatepickerDirective,
    BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-order-condition',
    templateUrl: './order-condition.component.html',
    styleUrls: ['./order-condition.component.scss'],
})
export class OrderConditionComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public moment = moment;
    public orderStatus = factory.orderStatus;
    public paymentMethodType = factory.paymentMethodType;
    public itemOfferedType: 'EventReservation' | 'ProgramMembership';
    public limit: number;
    public conditions: Models.Order.Search.IOrderSearchConditions;
    public environment = getEnvironment();
    public connectionType = Models.Util.Printer.ConnectionType;
    @ViewChild('orderDateFrom', { static: true })
    private orderDateFrom: BsDatepickerDirective;
    @ViewChild('orderDateThrough', { static: true })
    private orderDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true })
    private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true })
    private eventStartDateThrough: BsDatepickerDirective;
    @Output() public changeConditions =
        new EventEmitter<Models.Order.Search.IOrderSearchConditions>();
    @Input() public name: string;
    @Input() public orderDateValidation?: boolean;
    @Input() public paymentTypes: factory.chevre.categoryCode.ICategoryCode[];

    constructor(
        private store: Store<reducers.IOrderState>,
        private localeService: BsLocaleService
    ) {}

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.clear();
    }

    /**
     * 検索
     */
    public async submit() {
        // iOS bugfix
        Object.keys(this.conditions).forEach((key) => {
            if (key === 'confirmationNumber' || key === 'orderNumber') {
                this.conditions[key] = (<HTMLInputElement>(
                    document.getElementById(key)
                )).value;
                return;
            }
            if (
                key === 'familyName' ||
                key === 'givenName' ||
                key === 'email' ||
                key === 'telephone'
            ) {
                this.conditions.customer[key] = (<HTMLInputElement>(
                    document.getElementById(key)
                )).value;
                return;
            }
        });
        this.changeConditions.emit(this.conditions);
    }

    /**
     * 検索条件クリア
     */
    public clear() {
        this.conditions = {
            confirmationNumber: '',
            orderNumber: '',
            customer: {
                id: '',
                familyName: '',
                givenName: '',
                email: '',
                telephone: '',
            },
            orderStatus: '',
            itemOfferedType: 'EventReservation',
            paymentMethodType: '',
            posId: '',
            page: 1,
        };
        if (this.orderDateValidation) {
            const now = moment().toDate();
            const today = moment(moment(now).format('YYYYMMDD'));
            this.conditions.orderDateFrom = moment(today)
                .add(-4, 'month')
                .toDate();
            this.conditions.orderDateThrough = moment(today).toDate();
        }
        // iOS bugfix
        Object.keys(this.conditions).forEach((key) => {
            if (document.getElementById(key) === null) {
                return;
            }
            (<HTMLInputElement>document.getElementById(key)).value = '';
        });
    }

    /**
     * DatePicker設定
     */
    public setDatePicker() {
        this.user
            .subscribe((user) => {
                this.localeService.use(user.language);
            })
            .unsubscribe();
    }

    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    public onShowPicker(container: BsDatepickerContainerComponent) {
        Functions.Util.iOSDatepickerTapBugFix(container, [
            this.orderDateFrom,
            this.orderDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough,
        ]);
    }
}
