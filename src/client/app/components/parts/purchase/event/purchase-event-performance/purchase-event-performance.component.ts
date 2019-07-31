import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { SwiperComponent, SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { environment } from '../../../../../../environments/environment';
import { IScreeningEventWork, isSales, isScheduleStatusThreshold, isTicketedSeatScreeningEvent } from '../../../../../functions';

@Component({
    selector: 'app-purchase-event-performance',
    templateUrl: './purchase-event-performance.component.html',
    styleUrls: ['./purchase-event-performance.component.scss']
})
export class PurchaseEventPerformanceComponent implements OnInit {
    @ViewChild(SwiperComponent, { static: false }) public componentRef: SwiperComponent;
    @ViewChild(SwiperDirective, { static: true }) public directiveRef: SwiperDirective;
    @Input() public screeningWorkEvent: IScreeningEventWork;
    @Input() public readonly: boolean;
    @Output() public select = new EventEmitter<factory.chevre.event.screeningEvent.IEvent>();
    public moment: typeof moment = moment;
    public isScheduleStatusThreshold = isScheduleStatusThreshold;
    public isSales = isSales;
    public isTicketedSeatScreeningEvent = isTicketedSeatScreeningEvent;
    public swiperConfig: SwiperConfigInterface;
    public environment = environment;

    constructor() { }

    public ngOnInit() {
        this.swiperConfig = {
            spaceBetween: 0,
            slidesPerView: 7.5,
            // freeMode: true,
            breakpoints: {
                320: { slidesPerView: 2.5 },
                767: { slidesPerView: 2.5 },
                1024: { slidesPerView: 5.5 }
            },
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // }
        };
    }

    /**
     * リサイズ
     */
    public resize() {
        this.directiveRef.update();
    }

    /**
     * 予約数取得
     */
    public getAttendeeCapacity(type: 'maximum' | 'remaining', screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        const limitSeatNumber = (screeningEvent.workPerformed === undefined
            || screeningEvent.workPerformed.additionalProperty === undefined)
            ? undefined : screeningEvent.workPerformed.additionalProperty.find(a => a.name === 'limitSeatNumber');
        let remainingAttendeeCapacity = screeningEvent.remainingAttendeeCapacity;
        let maximumAttendeeCapacity = screeningEvent.maximumAttendeeCapacity;
        if (remainingAttendeeCapacity === undefined || maximumAttendeeCapacity === undefined) {
            return '?';
        }
        if (limitSeatNumber !== undefined && maximumAttendeeCapacity > Number(limitSeatNumber.value)) {
            // 作品追加特性（limitSeatNumber）で座席数制御
            remainingAttendeeCapacity = (remainingAttendeeCapacity < (maximumAttendeeCapacity - Number(limitSeatNumber.value)))
                ? 0 : remainingAttendeeCapacity - (maximumAttendeeCapacity - Number(limitSeatNumber.value));
            maximumAttendeeCapacity = Number(limitSeatNumber.value);
        }
        return (type === 'maximum') ? maximumAttendeeCapacity : remainingAttendeeCapacity;
    }

}
