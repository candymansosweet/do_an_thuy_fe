import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffManageComponent } from './staff-manage.component';

const routes: Routes = [
        {
            path: '',
            data: { breadcrumb: 'Danh sách nhân sự' },
            component: StaffManageComponent
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffManageRoutingModule { }
