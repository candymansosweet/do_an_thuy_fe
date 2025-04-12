import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-staff-manage',
    templateUrl: './staff-manage.component.html',
    styleUrls: ['./staff-manage.component.scss']
})
export class StaffManageComponent implements OnInit {
    columns: Column[] = [
        { field: 'fullName', header: 'Họ và tên' },
        { field: 'position', header: 'Chức danh' },
        { field: 'department', header: 'Phòng ban' },
        { field: 'email', header: 'Email' },
        { field: 'actions', header: 'Thao tác' }
    ];

    isAddStaffVisible = false;
    isEditStaffVisible = false;
    onAddStaffVisibleChange(value: any) {
        this.isAddStaffVisible = value;
    }
    onEditStaffVisibleChange(value: any) {
        this.isEditStaffVisible = value;
    }
    first: number = 0;

    rows: number = 10;
    constructor(
        private staffService: StaffService,
        private notifyService: NotificationService
    ) { }

    ngOnInit(): void {
        this.staffService.getAll().subscribe({
            next: (res) => {
                this.staffList = res.items;
            },
            error: (err) => {
                this.notifyService.error('Không thể lấy thông tin nhân viên');

            }
        })
    }
    onReloadData(event: any) {
        if (event) {
            this.staffService.getAll().subscribe({
                next: (res) => {
                    this.staffList = res.items;
                },
                error: (err) => {
                    this.notifyService.error('Không thể lấy thông tin nhân viên');

                }
            })
        }
    }
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
    titleDelete = '';
    onDelete(rowData: any) {
        this.selectedRow = { ...rowData };
        this.isShowComfirmDelete = true;
        this.titleDelete = 'Bạn có muốn xóa nhân sự ' + rowData.fullName + ' không?';
    }
    deleteStaff() {
        this.staffService.deleteById(this.selectedRow.id).subscribe({
            next: (res) => {
                this.onReloadData(true);
                this.notifyService.success('Xóa nhân sự ' + this.selectedRow.fullName + ' thành công');
            },
            error: (err) => {
                this.notifyService.error('Không thể xóa nhân sự');
            }
        })
    }
    isShowComfirmDelete = false;
    onEdit(rowData: any) {
        this.selectedRow = { ...rowData };
        this.isEditStaffVisible = true;
    }
    selectedRow: any;
    // handleRowSelect() {
    //     console.log(this.selectedRow);
    // }
    staffList: any[] = [];
}
