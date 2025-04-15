import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StaffService } from 'src/app/services/staff.service';
import { Roles } from 'src/app/shared/constants/roles';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
    _isVisible = false;
    _id: string = '';
    staffList: any[] = [];
    roleList: any[] = [...Roles.ROLE_VALUE];

    @Input() set isVisible(value: boolean) {
        if (this._isVisible !== value) {
            this._isVisible = value;
            this.isVisibleChange.emit(value);
            if (value && this._id) {
                this.loadAccountDetail();
            }
        }
    }
    get isVisible(): boolean {
        return this._isVisible;
    }

    @Input() set id(value: string) {
        this._id = value;
        if (this._isVisible && value) {
            this.loadAccountDetail();
        }
    }

    @Output() isVisibleChange = new EventEmitter<boolean>();
    @Output() reloadData = new EventEmitter<boolean>();

    formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
        private accountService: AccountService,
        private notifyService: NotificationService
    ) {
        this.formGroup = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            password: ['', Validators.required],
            staffId: ['', Validators.required],
            role: [0],
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
                    label: item.fullName
                }));
            },
            error: (err) => {
                this.notifyService.error('Không thể lấy danh sách nhân viên');
            }
        });
    }

    loadAccountDetail() {
        this.accountService.getById(this._id).subscribe({
            next: (res) => {
                this.formGroup.patchValue({
                    id: res.id,
                    name: res.name,
                    staffId: res.staffId,
                    role: res.role,
                    password: res.password
                });
            },
            error: (err) => {
                this.notifyService.error('Không thể lấy thông tin tài khoản');
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
        let body = {...this.formGroup.value};

        this.accountService.update(body).subscribe({
            next: (res) => {
                this.notifyService.success("Cập nhật tài khoản " + res.name + " thành công");
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
