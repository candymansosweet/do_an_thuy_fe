import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthStateService } from '../shared/system-services/auth-state.service';
import { Roles } from '../shared/constants/roles';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    role: any;
    constructor(private authState: AuthStateService) {
        this.authState.subscribe((user: any) => {
            this.role = user.role;
        });
    }
    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Quản lý công việc',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Danh sách công việc',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/']
                    },
                    {
                        label: 'Danh sách dự án',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/project']
                    },
                    {
                        label: 'Danh sách nhân sự',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/staff']
                    },
                ]
            },
            {
                label: 'Quản lý hệ thống',
                icon: 'pi pi-home',
                visible: this.role === Roles.ADMIN,
                items: [
                    {
                        label: 'Quản lý tài khoản',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account']
                    },
                ]
            },
        ];
    }
}
