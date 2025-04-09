import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkManageComponent } from './work-manage.component';

const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Danh sách công việc' },
        component: WorkManageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkManageRoutingModule { }
