import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManageComponent } from './account-manage.component';

const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Danh sách tài khoản' },
        component: AccountManageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManageRoutingModule { }
