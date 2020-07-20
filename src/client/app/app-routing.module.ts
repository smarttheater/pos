/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isProduction } from '../environments/environment';
import { ErrorModule } from './modules/error/error.module';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'purchase',
        loadChildren: () => import('./modules/purchase/purchase.module')
            .then(m => m.PurchaseModule)
            .catch(() => location.reload())
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module')
            .then(m => m.AuthModule)
            .catch(() => location.reload())
    },
    {
        path: 'inquiry',
        loadChildren: () => import('./modules/inquiry/inquiry.module')
            .then(m => m.InquiryModule)
            .catch(() => location.reload())
    },
    {
        path: 'admission',
        loadChildren: () => import('./modules/admission/admission.module')
            .then(m => m.AdmissionModule)
            .catch(() => location.reload())
    },
    {
        path: 'order',
        loadChildren: () => import('./modules/order/order.module')
            .then(m => m.OrderModule)
            .catch(() => location.reload())
    },
    {
        path: 'reservation',
        loadChildren: () => import('./modules/reservation/reservation.module')
            .then(m => m.ReservationModule)
            .catch(() => location.reload())
    },
    {
        path: 'development',
        loadChildren: () => import('./modules/development/development.module')
            .then(m => m.DevelopmentModule)
            .catch(() => location.reload())
    },
    {
        path: 'setting',
        loadChildren: () => import('./modules/setting/setting.module')
            .then(m => m.SettingModule)
            .catch(() => location.reload())
    },
    {
        path: '',
        loadChildren: () => ErrorModule
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: !isProduction }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
