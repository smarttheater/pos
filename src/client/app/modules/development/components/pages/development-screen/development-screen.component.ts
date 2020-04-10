import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { IScreen } from '../../../../../models';
import { CinerinoService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-development-screen',
    templateUrl: './development-screen.component.html',
    styleUrls: ['./development-screen.component.scss']
})
export class DevelopmentScreenComponent implements OnInit {
    public environment = getEnvironment();
    public theaterCode: string;
    public screenCode: string;
    public isLoading: Observable<boolean>;
    public screenData?: IScreen;
    public theaters: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom[];
    public screens: factory.chevre.place.screeningRoom.IPlace[];

    constructor(
        private store: Store<reducers.IState>,
        private cinerinoService: CinerinoService
    ) { }

    public async ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.theaters = [];
        this.screens = [];
        try {
            await this.cinerinoService.getServices();
            this.theaters = (await this.cinerinoService.place.searchMovieTheaters({})).data;
            this.theaterCode = this.theaters[0].branchCode;
            await this.changeTheater();
        } catch (error) {
            console.error(error);
        }
    }

    public async changeTheater() {
        this.screens = [];
        this.screens = (await this.cinerinoService.place.searchScreeningRooms({
            containedInPlace: { branchCode: { $eq: this.theaterCode } }
        })).data;
        this.screenCode = this.screens[0].branchCode;
    }

    public update() {
        const theaterCode = this.theaterCode;
        const screenCode = this.screenCode;
        this.theaterCode = '';
        this.screenCode = '';
        setTimeout(() => {
            this.theaterCode = theaterCode;
            this.screenCode = screenCode;
        }, 0);
    }

}
