import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';
import { StaffService } from 'src/app/services/staff.service';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
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

    constructor(
        private fb: FormBuilder,
        private projectService: ProjectService,
        private staffService: StaffService,
        private notifyService: NotificationService
    ) {
        this.formGroup = this.fb.group({
            projectName: ['', Validators.required],
            managerId: ['', Validators.required],
            projectMemIds: [[]],
            description: [''],
            deadlineDate: [new Date(), Validators.required]
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


        this.projectService.create(body).subscribe({
            next: (res) => {
                this.notifyService.success("Thêm dự án " + res.name + " thành công");
                this.reloadData.emit(true);
                this.isVisible = false;
            },
            error: (err) => {
                err.error.forEach((item: any) => {
                    this.notifyService.error(item);
                });
            }
        });
    }
}
