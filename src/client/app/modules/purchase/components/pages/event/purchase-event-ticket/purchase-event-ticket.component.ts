import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../../environments/environment';
import {
    changeTicketCount,
    getRemainingSeatLength,
    getTicketPrice,
    IScreeningEventWork,
    isTicketedSeatScreeningEvent,
    screeningEventsToWorkEvents
} from '../../../../../../functions';
import { IReservationTicket } from '../../../../../../models';
import { MasterService, PurchaseService, UserService, UtilService } from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';
import {
    PurchaseEventTicketModalComponent
} from '../../../../../shared/components/parts/purchase-event-ticket-modal/purchase-event-ticket-modal.component';

@Component({
    selector: 'app-purchase-event-ticket',
    templateUrl: './purchase-event-ticket.component.html',
    styleUrls: ['./purchase-event-ticket.component.scss']
})
export class PurchaseEventTicketComponent implements OnInit, OnDestroy {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public master: Observable<reducers.IMasterState>;
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public screeningWorkEvents: IScreeningEventWork[];
    public moment: typeof moment = moment;
    public getTicketPrice = getTicketPrice;
    public changeTicketCount = changeTicketCount;
    private updateTimer: any;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private utilService: UtilService,
        private translate: TranslateService,
        private purchaseService: PurchaseService,
        private masterService: MasterService,
        private userService: UserService,
        private modal: BsModalService
    ) { }

    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.error = this.store.pipe(select(reducers.getError));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.screeningWorkEvents = [];
        this.purchase.subscribe((purchase) => {
            if (purchase.transaction === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            this.getSchedule();
        }).unsubscribe();
    }

    public ngOnDestroy() {
        clearTimeout(this.updateTimer);
    }

    /**
     * 更新
     */
    private update() {
        if (this.updateTimer !== undefined) {
            clearTimeout(this.updateTimer);
        }
        const time = 600000; // 10 * 60 * 1000
        this.updateTimer = setTimeout(() => {
            this.getSchedule();
        }, time);
    }

    /**
     * スケジュール取得
     */
    public async getSchedule() {
        const user = await this.userService.getData();
        const purchase = await this.purchaseService.getData();
        const seller = user.seller;
        const scheduleDate = purchase.scheduleDate;
        if (seller === undefined || scheduleDate === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        try {
            await this.masterService.getSchedule({
                superEvent: {
                    locationBranchCodes:
                        (seller.location === undefined || seller.location.branchCode === undefined)
                            ? [] : [seller.location.branchCode]
                },
                startFrom: moment(scheduleDate).toDate(),
                startThrough: moment(scheduleDate).add(1, 'day').toDate()
            });
            const master = await this.masterService.getData();
            const screeningEvents = master.screeningEvents;
            this.screeningWorkEvents = screeningEventsToWorkEvents({ screeningEvents });
            this.update();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * スケジュール選択
     */
    public async selectSchedule(screeningEvent: factory.event.screeningEvent.IEvent) {
        const user = await this.userService.getData();
        const purchase = await this.purchaseService.getData();
        if (user.seller === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        if (purchase.authorizeSeatReservations.length > 0
            && !user.isPurchaseCart) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.event.ticket.alert.cart')
            });
            return;
        }
        this.purchaseService.selectSchedule(screeningEvent);
        try {
            await this.purchaseService.getScreeningEventOffers();
            await this.purchaseService.getTicketList(user.seller);
            this.openTicketList();
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: ''
            });
        }
    }

    /**
     * 券種表示
     */
    private async openTicketList() {
        this.purchase.subscribe((purchase) => {
            const screeningEvent = purchase.screeningEvent;
            const screeningEventTicketOffers = purchase.screeningEventTicketOffers;
            const screeningEventOffers = purchase.screeningEventOffers;
            this.modal.show(PurchaseEventTicketModalComponent, {
                class: 'modal-dialog-centered',
                initialState: {
                    screeningEventTicketOffers,
                    screeningEventOffers,
                    screeningEvent,
                    cb: (reservationTickets: IReservationTicket[]) => {
                        this.selectTicket(reservationTickets);
                    }
                }
            });
        }).unsubscribe();
    }

    /**
     * 券種選択
     */
    private async selectTicket(
        reservationTickets: IReservationTicket[]
    ) {
        if (reservationTickets.length > Number(getEnvironment().PURCHASE_ITEM_MAX_LENGTH)) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.ticket.alert.limit',
                    { value: getEnvironment().PURCHASE_ITEM_MAX_LENGTH }
                )
            });
            return;
        }
        try {
            await this.purchaseService.getScreeningEventOffers();
            const purchase = await this.purchaseService.getData();
            if (purchase.screeningEvent !== undefined
                && isTicketedSeatScreeningEvent(purchase.screeningEvent)) {
                const remainingSeatLength = getRemainingSeatLength(purchase.screeningEventOffers, purchase.screeningEvent);
                if (remainingSeatLength < reservationTickets.length) {
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: this.translate.instant('purchase.event.ticket.alert.getScreeningEventOffers')
                    });
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: ''
            });
        }

        try {
            await this.purchaseService.temporaryReservationFreeSeat(reservationTickets);
            this.utilService.openAlert({
                title: this.translate.instant('common.complete'),
                body: this.translate.instant('purchase.event.ticket.success.temporaryReservation')
            });
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.event.ticket.alert.temporaryReservation')
            });
        }
    }

    /**
     * 券種確定
     */
    public async onSubmit() {
        const purchase = await this.purchaseService.getData();
        const authorizeSeatReservations = purchase.authorizeSeatReservations;
        // チケット未選択判定
        if (authorizeSeatReservations.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.event.ticket.alert.unselected')
            });
            return;
        }
        // チケット枚数上限判定
        let itemCount = 0;
        authorizeSeatReservations.forEach(a => itemCount += a.object.acceptedOffer.length);
        if (itemCount > Number(getEnvironment().PURCHASE_ITEM_MAX_LENGTH)) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.ticket.alert.limit',
                    { value: Number(getEnvironment().PURCHASE_ITEM_MAX_LENGTH) }
                )
            });
            return;
        }
        this.router.navigate(['/purchase/payment']);
    }

    /**
     * カート削除確認
     */
    public removeItem(authorizeSeatReservation: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier>) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('purchase.event.cart.confirm.cancel'),
            cb: async () => {
                try {
                    const authorizeSeatReservations = [authorizeSeatReservation];
                    await this.purchaseService.cancelTemporaryReservations(authorizeSeatReservations);
                } catch (error) {
                    console.error(error);
                    this.router.navigate(['/error']);
                }
            }
        });
    }

}

