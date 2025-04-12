import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { StaffService } from 'src/app/services/staff.service';
import { Constant } from 'src/app/shared/constants/constants';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-add-staff',
    templateUrl: './add-staff.component.html',
    styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
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

    positions = [...Constant.POSITION]; // Define your positions array
    departments = [...Constant.DEPARTMENT]; // Define your departments array


    ngOnInit() {

    }

    onCancel() {
        this.isVisible = false;
    }

    onSave() {
        let valid = CheckValidatorForm(this.formGroup);
        if (!valid) {
            // alert("Vui lòng nhập đầy đủ thông tin");
          this.notifyService.error("Vui lòng nhập đầy đủ thông tin");
          return;
        }
        let body = {...this.formGroup.value};
        // console.log(body);

        this.isVisible = false;
        this.staffService.create(body).subscribe({
            next: (res) => {
              this.notifyService.success("Thêm thành thành công nhân sự " + res.fullName);
              this.reloadData.emit(true);

            },
            error: (err) => {
              err.error.errors.forEach((item: any)=>{
                this.notifyService.error(item);
              })
            }
          })
    }

}
