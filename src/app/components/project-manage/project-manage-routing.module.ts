import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManageComponent } from './project-manage.component';

const routes: Routes = [
        {
            path: '',
            data: { breadcrumb: 'Danh sách dự án' },
            component: ProjectManageComponent
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManageRoutingModule { }
