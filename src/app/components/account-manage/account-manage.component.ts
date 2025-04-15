import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Column } from 'src/app/models/table-column';
import { AccountService } from 'src/app/services/account.service';
import { Constant } from 'src/app/shared/constants/constants';

@Component({
    selector: 'app-account-manage',
    templateUrl: './account-manage.component.html',
    styleUrls: ['./account-manage.component.scss']
})
export class AccountManageComponent implements OnInit {
    columns: Column[] = [
        { field: 'name', header: 'Tên tài khoản', type: 'text' },
        { field: 'role', header: 'Vai trò', type: 'text' },
        { field: 'createdDate', header: 'Ngày tạo', type: 'date' },
        { field: 'actions', header: 'Thao tác', type: 'button' }
    ];

    isAddAccountVisible = false;
    isEditAccountVisible = false;

    onAddAccountVisibleChange(value: any) {
        this.isAddAccountVisible = value;
    }

    onEditAccountVisibleChange(value: any) {
        this.isEditAccountVisible = value;
    }

    first: number = 0;
    rows: number = 10;

    constructor(
        private accountService: AccountService,
        private notifyService: NotificationService
    ) { }

    ngOnInit(): void {
        this.loadAccounts();
    }

    loadAccounts() {
        this.accountService.getAll().subscribe({
            next: (res) => {
                this.accountList = res.items.map((item: any) => {
                    return {
                        ...item,
                        role: Constant.ROLE_SYSTEM_LABEL.find((en: any) => en.value === item.role)?.label || ''
                    }
                });
            },
            error: (err) => {
                this.notifyService.error('Không thể lấy thông tin tài khoản');
            }
        });
    }

    onReloadData(event: any) {
            this.loadAccounts();
    }

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    titleDelete = '';
    onDelete(rowData: any) {
        this.selectedRow = { ...rowData };
        this.isShowComfirmDelete = true;
        this.titleDelete = 'Bạn có muốn xóa tài khoản ' + rowData.username + ' không?';
    }

    deleteAccount() {
        this.accountService.deleteById(this.selectedRow.id).subscribe({
            next: (res) => {
                this.onReloadData(true);
                this.notifyService.success('Xóa tài khoản ' + this.selectedRow.username + ' thành công');
            },
            error: (err) => {
                this.notifyService.error('Không thể xóa tài khoản');
            }
        });
    }

    isShowComfirmDelete = false;
    onEdit(rowData: any) {
        this.selectedRow = { ...rowData };
        this.isEditAccountVisible = true;
    }

    onSelectedRowChange(rowData: any) {
        this.selectedRow = { ...rowData };
    }

    selectedRow: any;
    accountList: any[] = [];
}
