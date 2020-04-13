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
    getRemainingSeatLength,
    IScreeningEventWork,
    screeningEventsToWorkEvents
} from '../../../../../../functions';
import { IReservation, Performance } from '../../../../../../models';
import { MasterService, PurchaseService, UserService, UtilService } from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';
import {
    PurchaseEventTicketModalComponent
} from '../../../../../shared/components/parts/purchase/event/ticket-modal/ticket-modal.component';

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
    public environment = getEnvironment();
    private updateTimer: any;
    public screeningEventSeats: factory.chevre.place.seat.IPlaceWithOffer[];

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
        try {
            const user = await this.userService.getData();
            const purchase = await this.purchaseService.getData();
            const theater = user.theater;
            const scheduleDate = purchase.scheduleDate;
            if (theater === undefined || scheduleDate === undefined) {
                throw new Error('theater === undefined || scheduleDate === undefined').message;
            }
            const screeningEvents = await this.masterService.getSchedule({
                superEvent: { locationBranchCodes: [theater.branchCode] },
                startFrom: moment(scheduleDate).toDate(),
                startThrough: moment(scheduleDate).add(1, 'day').toDate()
            });
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
        const purchase = await this.purchaseService.getData();
        if (purchase.seller === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        if (purchase.authorizeSeatReservations.length > 0
            && !this.environment.PURCHASE_CART) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.event.ticket.alert.cart')
            });
            return;
        }
        try {
            await this.purchaseService.getScreeningEvent(screeningEvent);
            this.screeningEventSeats = await this.purchaseService.getScreeningEventSeats();
            await this.purchaseService.getTicketList({ seller: purchase.seller });
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
            const screeningEventSeats = this.screeningEventSeats;
            const authorizeSeatReservations = purchase.authorizeSeatReservations;
            this.modal.show(PurchaseEventTicketModalComponent, {
                class: 'modal-dialog-centered modal-lg',
                initialState: {
                    screeningEventTicketOffers,
                    screeningEventSeats,
                    screeningEvent,
                    authorizeSeatReservations,
                    cb: (params: {
                        reservations: IReservation[];
                        additionalTicketText?: string;
                    }) => {
                        this.selectTicket(params);
                    }
                }
            });
        }).unsubscribe();
    }

    /**
     * 券種選択
     */
    private async selectTicket(params: {
        reservations: IReservation[];
        additionalTicketText?: string;
    }) {
        const reservations = params.reservations;
        const additionalTicketText = params.additionalTicketText;
        if (reservations.length > Number(this.environment.PURCHASE_ITEM_MAX_LENGTH)) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.ticket.alert.limit',
                    { value: this.environment.PURCHASE_ITEM_MAX_LENGTH }
                )
            });
            return;
        }
        try {
            this.screeningEventSeats = await this.purchaseService.getScreeningEventSeats();
            const purchase = await this.purchaseService.getData();
            if (purchase.screeningEvent !== undefined
                && new Performance(purchase.screeningEvent).isTicketedSeat()) {
                const remainingSeatLength = getRemainingSeatLength({
                    screeningEventSeats: this.screeningEventSeats,
                    screeningEvent: purchase.screeningEvent,
                    authorizeSeatReservations: purchase.authorizeSeatReservations
                });
                if (remainingSeatLength < reservations.length) {
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: this.translate.instant('purchase.event.ticket.alert.getScreeningEventSeats')
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
            await this.purchaseService.temporaryReservation({
                reservations,
                additionalTicketText,
                screeningEventSeats: this.screeningEventSeats
            });
            this.utilService.openAlert({
                title: this.translate.instant('common.complete'),
                body: this.translate.instant('purchase.event.ticket.success.temporaryReservation')
            });
            this.purchaseService.unsettledDelete();
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('purchase.event.ticket.alert.temporaryReservation')}</p>
                <div class="p-3 bg-light-gray select-text text-left">
                    <code>${JSON.stringify(error)}</code>
                </div>`
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
        if (itemCount > Number(this.environment.PURCHASE_ITEM_MAX_LENGTH)) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.ticket.alert.limit',
                    { value: Number(this.environment.PURCHASE_ITEM_MAX_LENGTH) }
                )
            });
            return;
        }
        this.router.navigate(['/purchase/payment']);
    }

    /**
     * カート削除確認
     */
    public removeItem(
        authorizeSeatReservation: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>
    ) {
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

