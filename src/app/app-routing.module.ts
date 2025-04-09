import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./components/work-manage/work-manage.module').then(m => m.WorkManageModule) },
            { path: 'project', loadChildren: () => import('./components/project-manage/project-manage.module').then(m => m.ProjectManageModule) },
            { path: 'staff', loadChildren: () => import('./components/staff-manage/staff-manage.module').then(m => m.StaffManageModule) },
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./system-components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./system-components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./system-components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
