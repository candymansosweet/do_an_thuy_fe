import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StaffService } from 'src/app/services/staff.service';
import { Roles } from 'src/app/shared/constants/roles';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent {
    _isVisible = false;
    @Input() set isVisible(value: boolean) {
        if (this._isVisible !== value) {
            this.formGroup.reset();
            this._isVisible = value;
            this.isVisibleChange.emit(value);
        }
    }
    get isVisible(): boolean {
        return this._isVisible;
    }
    @Output() isVisibleChange = new EventEmitter<boolean>();
    @Output() reloadData = new EventEmitter<boolean>();

    formGroup: FormGroup;
    staffList: any[] = [];
    roleList: any[] = [...Roles.ROLE_VALUE];

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
        private accountService: AccountService,
        private notifyService: NotificationService
    ) {
        this.formGroup = this.fb.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            staffId: [[]],
            role: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.loadStaffs();
    }

    loadStaffs() {
        this.staffService.getAll().subscribe({
            next: (res) => {
                this.staffList = res.items.map((item: any) => ({
                    value: item.id,
                    label: 'Mã: ' + item.code + ' - ' + item.fullName
                }));
            },
            error: (err) => {
                this.notifyService.error('Không thể lấy danh sách nhân viên');
            }
        });
    }

    onCancel() {
        this.isVisible = false;
    }

    onSave() {
        let valid = CheckValidatorForm(this.formGroup);
        if (!valid) {
            this.notifyService.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        let body = {
            ...this.formGroup.value,
        };


        this.accountService.create(body).subscribe({
            next: (res) => {
                this.notifyService.success("Thêm tài khoản " + res.name + " thành công");
                this.reloadData.emit(true);
                this.isVisible = false;
            },
            error: (err) => {
                err.error.Errors.forEach((item: any)=>{
                    this.notifyService.error(item);
                  })
            }
        });
    }
}
