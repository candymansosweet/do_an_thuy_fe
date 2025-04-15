import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { StaffService } from 'src/app/services/staff.service';
import { Constant } from 'src/app/shared/constants/constants';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-edit-staff',
    templateUrl: './edit-staff.component.html',
    styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent {
    _isVisible = false;
    @Input() set isVisible(value: boolean) {
        if (this._isVisible !== value) {
            this._isVisible = value;
            this.isVisibleChange.emit(value);
            if (value) {
                this.initData();
            }
        }
    }
    get isVisible(): boolean {
        return this._isVisible;
    }
    @Output() isVisibleChange = new EventEmitter<boolean>();
    @Output() reloadData = new EventEmitter<boolean>();

    @Input() id: string = '';

    formGroup: FormGroup;
    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
        private notifyService: NotificationService
    ) {
        this.formGroup = this.fb.group({
            code: ['', Validators.required],
            fullName: ['', Validators.required],
            position: ['', Validators.required],
            department: ['', Validators.required],
            email: ['', [Validators.email]]
        });
    }

    positions = [...Constant.POSITION];
    departments = [...Constant.DEPARTMENT];

    initData() {
        if (this.id) {
            this.staffService.getById(this.id).subscribe({
                next: (res) => {
                    this.formGroup.patchValue(res);
                },
                error: (err) => {
                    this.notifyService.error('Không thể lấy thông tin nhân viên');
                }
            });
        }
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
        let body = { id: this.id, ...this.formGroup.value };

        this.staffService.update(body).subscribe({
            next: (res) => {
                this.notifyService.success("Cập nhật thành công nhân sự " + res.fullName);
                this.isVisible = false;
                this.reloadData.emit(true);
            },
            error: (err) => {
                err.error.Errors.forEach((item: any)=>{
                    this.notifyService.error(item);
                  })
            }
        });
    }
}
