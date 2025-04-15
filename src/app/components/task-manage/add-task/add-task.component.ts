import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';
import { StaffService } from 'src/app/services/staff.service';
import { TaskService } from 'src/app/services/task.service';
import { UploadService } from 'src/app/services/upload.service';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
    @ViewChild('inputFile') inputFile!: ElementRef;

    _isVisible = false;
    @Input() set isVisible(value: boolean) {
        if (this._isVisible !== value) {
            this.formGroup.reset();
            this.selectedFiles = [];
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
        private taskService: TaskService,
        private uploadService: UploadService,
        private projectService: ProjectService,
        private staffService: StaffService,
        private notifyService: NotificationService
    ) {
        this.formGroup = this.fb.group({
            name: ['', Validators.required],
            projectId: [''],
            currentUserAssignId: ['', Validators.required],
            deadlineDate: [new Date(), Validators.required],
            description: ['', Validators.required]
        });
    }

    priorities = [
        { label: 'Cao', value: 'high' },
        { label: 'Trung bình', value: 'medium' },
        { label: 'Thấp', value: 'low' }
    ];

    statuses = [
        { label: 'Mới', value: 'new' },
        { label: 'Đang thực hiện', value: 'in-progress' },
        { label: 'Hoàn thành', value: 'completed' }
    ];
    projects: any[] = [];
    staffs: any[] = [];

    ngOnInit() {
        this.loadProjects();
        this.loadStaffFilter();
    }
    loadProjects(): void {
        this.projectService.getAll().subscribe({
            next: (response: any) => {
                this.projects = response.items.map((en: any) => ({ label: en.projectName, value: en.id }));
            }
        });
    }
    loadStaffFilter(): void {
        this.staffService.getAll().subscribe({
            next: (response: any) => {
                this.staffs.push(...response.items.map((en: any) => ({ label: 'Mã: ' + en.code + ' - ' + en.fullName, value: en.id })));
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
        let body = { ...this.formGroup.value };

        this.isVisible = false;
        this.taskService.create(body).subscribe({
            next: (res) => {
                this.notifyService.success("Thêm thành công công việc " + res.taskName);
                this.onUpload(res.id);
                this.reloadData.emit(true);
            },
            error: (err) => {
                err.error.errors.forEach((item: any) => {
                    this.notifyService.error(item);
                });
            }
        });
    }
    selectedFiles: File[] = [];
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.selectedFiles.push(...Array.from(input.files));
        }
    }
    onFileDelete(index: number): void {
        this.selectedFiles.splice(index, 1);
    }

    onUpload(taskId: string): void {
        if (this.selectedFiles.length === 0) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        this.selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        this.uploadService.uploadFile(formData, taskId).subscribe({
            next: (res) => {
                console.log('Upload successful', res);
            },
            error: (err) => {
                console.error('Upload error', err);
            }
        });
    }
}