import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';
import { StaffService } from 'src/app/services/staff.service';
import { TaskService } from 'src/app/services/task.service';
import { Constant } from 'src/app/shared/constants/constants';
import { StorageKeys } from 'src/app/shared/constants/storage-key';
import { AuthStateService } from 'src/app/shared/system-services/auth-state.service';

@Component({
    selector: 'app-task-manage',
    templateUrl: './task-manage.component.html',
    styleUrls: ['./task-manage.component.scss']
})
export class TaskManageComponent implements OnInit, AfterViewInit {
    filterValue = {
        status: '',
        projectId: '',
        name: '',
        currentUserAssignId: '',
        pageSize: 10,
        pageIndex: 1
    }
    taskList: any[] = [];

    isAddTaskVisible = false;
    TASK_STATUS: any[] = [{ label: 'Tất cả', value: '' }, ...Constant.TASK_STATUS];
    lstStaffFilter: any[] = [
        { label: 'Tất cả', value: '' },
    ]
    projects: any[] = [{ label: 'Tất cả', value: '' }];

    isDetailTaskVisible = false;
    constructor(
        private taskService: TaskService,
        private projectService: ProjectService,
        private staffService: StaffService,
        private notifyService: NotificationService,
        private route: ActivatedRoute,
        private router: Router,
        private authStateService: AuthStateService
    ) {
        this.authStateService.subscribe((auth: any) => {
            this.userId = auth.staffId;
        });
        this.lstStaffFilter.push({ label: 'Của tôi', value: this.userId });
    }
    userId = '';
    ngAfterViewInit(): void {
        // this.filterValue = {...this.filterValue, projectId: this.projectId};
                // this.filterValue.projectId = this.projectId;

    }

    ngOnInit(): void {

        this.onFilter();
        this.loadStaffFilter();
        this.loadStatusTasks();
        this.loadProjects();
    }

    loadTasks(): void {
        this.taskService.getAll().subscribe({
            next: (response: any) => {
                this.taskList = response.items.map((en: any) => ({
                    ...en,
                    deadlineDate: en.deadlineDate ? new Date(en.deadlineDate) : null,
                    isOverdue: en.deadlineDate ? en.deadlineDate < new Date() : false
                }));
                console.log(this.taskList);

            },
            error: (error) => {
                this.notifyService.error('Có lỗi khi tải danh sách công việc');
            }
        });
    }
    loadStaffFilter(): void {
        this.staffService.getAll().subscribe({
            next: (response: any) => {
                this.lstStaffFilter.push(...response.items.map((en: any) => ({ label: en.fullName, value: en.id })));
            }
        });
    }
    projectId = '';
    statusTasks: any = {
        notStarted: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0
    };
    loadStatusTasks(): void {
        this.projectService.GetStatusTasks({projectId: this.filterValue.projectId}).subscribe({
            next: (response: any) => {
                this.statusTasks = response;
            }
        });
    }
    loadProjects(): void {
        this.projectService.getAll().subscribe({
            next: (response: any) => {
                this.projects.push(...response.items.map((en: any) => ({ label: en.projectName, value: en.id })));
                this.filterValue.projectId =  localStorage.getItem(StorageKeys.PROJECT_ID) || '';
            }
        });
    }
    onReloadData(event: any) {
        if (event) {
            this.onFilter();
            this.loadStatusTasks();
        }
    }
    onAddTaskVisibleChange(event: any) {
        this.isAddTaskVisible = event;
    }
    changeProject(){
        // localStorage.setItem(StorageKeys.PROJECT_ID, this.filterValue.projectId);
        // this.filterValue.projectId =
            // this.router.navigate(['/task', this.filterValue.projectId]);
            this.onFilter();
            this.loadStatusTasks();
        // }
        // else{
        //     this.router.navigate(['']);
        //     this.filterValue.projectId = '';
        //     this.onFilter();
        //     this.loadStatusTasks();
        // }
    }
    onFilter() {
        console.log(event);

        this.taskService.getAll(
            { ...this.filterValue }
        ).subscribe({
            next: (response: any) => {
                this.taskList = response.items.map((en: any) => ({
                    ...en,
                    deadlineDate: en.deadlineDate ? new Date(en.deadlineDate) : null,
                }));
                console.log(this.taskList);

            },
            error: (error) => {
                this.notifyService.error('Có lỗi khi tải danh sách công việc');
            }
        });
    }
    taskId: any;
    onDetailTaskVisibleChange(event: any) {
        this.isDetailTaskVisible = event;
    }
    showDetailTask(task: any) {
        this.taskId = task.id;
        console.log(this.taskId);
        this.isDetailTaskVisible = true;
    }
}