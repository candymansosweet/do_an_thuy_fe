import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Column } from 'src/app/models/table-column';


@Component({
    selector: 'app-project-manage',
    templateUrl: './project-manage.component.html',
    styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {
    columns: Column[] = [
        { field: 'projectName', header: 'Tên dự án', type: 'text' },
        { field: 'managerName', header: 'Người quản lý', type: 'text' },
        { field: 'staffs', header: 'Thành viên', type: 'listObject' },
        { field: 'description', header: 'Mô tả', type: 'text' },
        { field: 'deadlineDate', header: 'Ngày hết hạn', type: 'date' },
        { field: 'actions', header: 'Thao tác', type: 'button' }
    ];

    isAddProjectVisible = false;
    isEditProjectVisible = false;
    isShowComfirmDelete = false;
    selectedRow: any;
    projectList: any[] = [];
    titleDelete = '';

    constructor(
        private projectService: ProjectService,
        private notifyService: NotificationService
    ) { }

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects() {
        this.projectService.getAll().subscribe({
            next: (res) => {
                this.projectList = res.items;
            },
            error: (err) => {
                this.notifyService.error('Không thể lấy thông tin dự án');
            }
        });
    }

    onReloadData(event: any) {
        if (event) {
            this.loadProjects();
        }
    }

    onAddProjectVisibleChange(value: any) {
        this.isAddProjectVisible = value;
    }

    onEditProjectVisibleChange(value: any) {
        this.isEditProjectVisible = value;
    }

    onDelete(rowData: any) {
        this.selectedRow = { ...rowData };
        this.isShowComfirmDelete = true;
        this.titleDelete = 'Bạn có muốn xóa dự án ' + rowData.name + ' không?';
    }

    deleteProject() {
        this.projectService.deleteById(this.selectedRow.id).subscribe({
            next: (res) => {
                this.onReloadData(true);
                this.notifyService.success('Xóa dự án ' + this.selectedRow.name + ' thành công');
            },
            error: (err) => {
                this.notifyService.error('Không thể xóa dự án');
            }
        });
    }

    onEdit(rowData: any) {
        this.selectedRow = { ...rowData };
        console.log(this.selectedRow);

        this.isEditProjectVisible = true;
    }

    onSelectedRowChange(rowData: any) {
        this.selectedRow = { ...rowData };
    }
}
