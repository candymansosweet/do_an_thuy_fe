import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Quản lý công việc',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Danh sách công việc',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Danh sách dự án',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/project']
                    },
                    {
                        label: 'Danh sách nhân sự',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/staff']
                    }
                ]
            },
        ];
    }
}
