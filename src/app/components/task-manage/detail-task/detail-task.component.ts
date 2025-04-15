import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';
import { UploadService } from 'src/app/services/upload.service';
import { Constant } from 'src/app/shared/constants/constants';
import { CheckValidatorForm } from 'src/app/shared/validators/checkValidatorForm';

@Component({
    selector: 'app-detail-task',
    templateUrl: './detail-task.component.html',
    styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {
    @ViewChild('inputFile') inputFile!: ElementRef;

    _isVisible = false;
    @Input() set isVisible(value: boolean) {
        if (this._isVisible !== value) {
            this._isVisible = value;
            this.isVisibleChange.emit(value);
        }
    }
    get isVisible(): boolean {
        return this._isVisible;
    }
    @Output() isVisibleChange = new EventEmitter<boolean>();
    @Output() reloadData = new EventEmitter<boolean>();

    TASK_STATUS_VALUE = {...Constant.TASK_STATUS_VALUE};

    _taskId: any;
    @Input() set taskId(value: any) {
        if (value) {
            this._taskId = value;
            this.loadTask();
        }
    }
    get taskId(): any {
        return this._taskId;
    }
    task: any;

    constructor(
        private taskService: TaskService,
        private notifyService: NotificationService,
        private uploadService: UploadService
    ) {
    }
    ngOnInit(): void {
    }
    loadTask() {
        console.log(this.taskId);

        this.taskService.getById(this.taskId).subscribe({
            next: (response: any) => {
                this.task = {...response, deadlineDate: response.deadlineDate ? new Date(response.deadlineDate) : null};
                console.log(this.task.files);

            }
        });
    }
    startTask() {
        var data = {
            id: this.task.id,
            name: this.task.name,
            status: Constant.TASK_STATUS_VALUE.IN_PROGRESS
        }
        this.taskService.update(data).subscribe({
            next: (response: any) => {
                this.task.status = Constant.TASK_STATUS_VALUE.IN_PROGRESS;
                console.log(response);
                this.reloadData.emit(true);
            }
        });
    }
    completeTask(){
        var data = {
            id: this.task.id,
            name: this.task.name,
            status: Constant.TASK_STATUS_VALUE.COMPLETED
        }
        this.taskService.update(data).subscribe({
            next: (response: any) => {
                console.log(response);
                this.task.status = Constant.TASK_STATUS_VALUE.COMPLETED;
                this.reloadData.emit(true);
            }
        });
    }
    isShowComfirmDelete = false;
    titleDelete = 'Bạn có chắc chắn muốn xóa công việc này không?';
    deleteStaff() {
        this.taskService.deleteById(this.task.id).subscribe({
            next: (response: any) => {
                console.log(response);
                this.isShowComfirmDelete = false;
                this.isVisible = false;
                this.reloadData.emit(true);
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }
    selectedFiles: File[] = [];
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
          this.selectedFiles = Array.from(input.files);
        }
        this.onUploadFile();
      }
      onUploadFile(): void {
        if (this.selectedFiles.length === 0) {
          alert('Please select at least one file.');
          return;
        }

        const formData = new FormData();
        this.selectedFiles.forEach(file => {
          formData.append('files', file);
        });

        this.uploadService.uploadFile(formData, this.task.id).subscribe({
          next: (res: any) => {
            console.log('Upload successful:', res);
            this.loadTask();
          },
          error: (err: any) => console.error('Upload error:', err),
        });
      }
      openFile(fileUrl: string) {
        this.uploadService.openFile(fileUrl);
      }
      onFileDelete(fileId: string) {
        this.uploadService.deleteTaskFile(fileId).subscribe({
            next: (response: any) => {
                console.log(response);
                this.loadTask();
            }
        });
      }
}
