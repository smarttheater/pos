/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilService } from '../../../services';
import { CinerinoService } from '../../../services/cinerino.service';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() public isOpen: boolean;
    @Output() public close: EventEmitter<{}> = new EventEmitter();

    constructor(
        private cinerino: CinerinoService,
        private util: UtilService
    ) { }

    public ngOnInit() {
    }

    public signOut() {
        this.close.emit();
        this.util.openConfirm({
            title: '確認',
            body: 'ログアウトしますか？',
            cb: async () => {
                try {
                    await this.cinerino.getServices();
                    await this.cinerino.signOut();
                } catch (err) {
                    console.error(err);
                }
            }

        });

    }

}
