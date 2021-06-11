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
    selector: 'app-reservation-condition',
    templateUrl: './reservation-condition.component.html',
    styleUrls: ['./reservation-condition.component.scss'],
})
export class ReservationConditionComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public error: Observable<string | null>;
    public moment = moment;
    public reservationStatus = factory.chevre.reservationStatusType;
    public environment = getEnvironment();
    public conditions: Models.Reservation.IReservationSearchConditions;
    @ViewChild('reservationDateFrom', { static: true })
    private reservationDateFrom: BsDatepickerDirective;
    @ViewChild('reservationDateThrough', { static: true })
    private reservationDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true })
    private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true })
    private eventStartDateThrough: BsDatepickerDirective;
    @Output() public changeConditions =
        new EventEmitter<Models.Reservation.IReservationSearchConditions>();
    @Input() public name: string;
    @Input() public reservationDateValidation?: boolean;

    constructor(
        private store: Store<reducers.IReservationState>,
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
        this.conditions.id = (<HTMLInputElement>(
            document.getElementById('id')
        )).value;
        this.conditions.reservationNumber = (<HTMLInputElement>(
            document.getElementById('reservationNumber')
        )).value;
        this.changeConditions.emit(this.conditions);
    }

    /**
     * 検索条件クリア
     */
    public clear() {
        this.conditions = {
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1,
        };
        if (this.reservationDateValidation) {
            const now = moment().toDate();
            const today = moment(moment(now).format('YYYYMMDD'));
            this.conditions.reservationDateFrom = moment(today)
                .add(-4, 'month')
                .toDate();
            this.conditions.reservationDateThrough = moment(today).toDate();
        }
        // iOS bugfix
        (<HTMLInputElement>document.getElementById('id')).value = '';
        (<HTMLInputElement>document.getElementById('reservationNumber')).value =
            '';
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
            this.reservationDateFrom,
            this.reservationDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough,
        ]);
    }
}
