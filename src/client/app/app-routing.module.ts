/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getEnvironment } from '../environments/environment';
import { ErrorModule } from './modules/error/error.module';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'purchase',
        loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'inquiry',
        loadChildren: () => import('./modules/inquiry/inquiry.module').then(m => m.InquiryModule)
    },
    {
        path: 'admission',
        loadChildren: () => import('./modules/admission/admission.module').then(m => m.AdmissionModule)
    },
    {
        path: 'order',
        loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
    },
    {
        path: 'reservation',
        loadChildren: () => import('./modules/reservation/reservation.module').then(m => m.ReservationModule)
    },
    {
        path: 'tasks',
        loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)
    },
    {
        path: 'development',
        loadChildren: () => import('./modules/development/development.module').then(m => m.DevelopmentModule)
    },
    {
        path: 'setting',
        loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule)
    },
    {
        path: '',
        loadChildren: () => ErrorModule
    },
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: !getEnvironment().production }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
