import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';
import { StaffService } from 'src/app/services/staff.service';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {
    _isVisible = false;
    _id: string = '';
    staffList: any[] = [];

    @Input() set isVisible(value: boolean) {
        if (this._isVisible !== value) {
            this._isVisible = value;
            this.isVisibleChange.emit(value);
            if (value && this._id) {
                this.loadProjectDetail();
            }
        }
    }
    get isVisible(): boolean {
        return this._isVisible;
    }

    @Input() set id(value: string) {
        this._id = value;
        if (this._isVisible && value) {
            this.loadProjectDetail();
        }
    }

    @Output() isVisibleChange = new EventEmitter<boolean>();
    @Output() reloadData = new EventEmitter<boolean>();

    formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private projectService: ProjectService,
        private staffService: StaffService,
        private notifyService: NotificationService
    ) {
        this.formGroup = this.fb.group({
            id: [''],
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

    loadProjectDetail() {
        this.projectService.getById(this._id).subscribe({
            next: (res) => {
                this.formGroup.patchValue({
                    id: res.id,
                    projectName: res.projectName,
                    managerId: res.managerId,
                    projectMemIds: res.staffs.map((item: any) => item.id),
                    description: res.description,
                    deadlineDate: new Date(res.deadlineDate)
                });
            },
            error: (err) => {
                this.notifyService.error('Không thể lấy thông tin dự án');
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

        this.projectService.update(body).subscribe({
            next: (res) => {
                this.notifyService.success("Cập nhật dự án " + res.name + " thành công");
                this.reloadData.emit(true);
                this.isVisible = false;
            },
            error: (err) => {
                err.error.errors.forEach((item: any) => {
                    this.notifyService.error(item);
                });
            }
        });
    }
}
