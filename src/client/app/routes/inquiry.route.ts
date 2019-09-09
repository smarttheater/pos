import { AuthGuardService } from '../canActivates';
import { SettingGuardService } from '../canActivates/setting-guard.service';
import {
    BaseComponent,
    InquiryConfirmComponent,
    InquiryInputComponent,
    InquiryPrintComponent
} from '../components/pages';

/**
 * 照会ルーティング
 */
export const route = {
    path: 'inquiry',
    component: BaseComponent,
    canActivate: [AuthGuardService, SettingGuardService],
    children: [
        { path: 'input', component: InquiryInputComponent },
        { path: 'confirm', component: InquiryConfirmComponent },
        { path: 'print', component: InquiryPrintComponent }
    ]
};
