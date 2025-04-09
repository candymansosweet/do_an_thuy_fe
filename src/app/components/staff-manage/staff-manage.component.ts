import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

interface Staff {
    fullName: string;
    position: string;
    department: string;
    email: string;
}

@Component({
    selector: 'app-staff-manage',
    templateUrl: './staff-manage.component.html',
    styleUrls: ['./staff-manage.component.scss']
})
export class StaffManageComponent implements OnInit {
    first: number = 0;

    rows: number = 10;
    constructor(private staffService: StaffService) { }

    ngOnInit(): void {
        this.staffService.getAll().subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
    staffList: Staff[] = [
        {
            fullName: 'Lê Thanh Thủy',
            position: 'Quản lý',
            department: 'Kỹ thuật phần mềm',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Nguyễn Thị Thủy',
            position: 'Nhân viên',
            department: 'Kế toán tổng hợp',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Hoàng Thanh Thảo',
            position: 'Nhân viên',
            department: 'Hành chính nhân sự',
            email: 'Hoangthanhthao239@gmail.com'
        },
        {
            fullName: 'Lê Thanh Thủy',
            position: 'Quản lý',
            department: 'Kỹ thuật phần mềm',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Nguyễn Thị Thủy',
            position: 'Nhân viên',
            department: 'Kế toán tổng hợp',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Hoàng Thanh Thảo',
            position: 'Nhân viên',
            department: 'Hành chính nhân sự',
            email: 'Hoangthanhthao239@gmail.com'
        },
        {
            fullName: 'Lê Thanh Thủy',
            position: 'Quản lý',
            department: 'Kỹ thuật phần mềm',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Nguyễn Thị Thủy',
            position: 'Nhân viên',
            department: 'Kế toán tổng hợp',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Hoàng Thanh Thảo',
            position: 'Nhân viên',
            department: 'Hành chính nhân sự',
            email: 'Hoangthanhthao239@gmail.com'
        },
        {
            fullName: 'Lê Thanh Thủy',
            position: 'Quản lý',
            department: 'Kỹ thuật phần mềm',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Nguyễn Thị Thủy',
            position: 'Nhân viên',
            department: 'Kế toán tổng hợp',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Hoàng Thanh Thảo',
            position: 'Nhân viên',
            department: 'Hành chính nhân sự',
            email: 'Hoangthanhthao239@gmail.com'
        },
        {
            fullName: 'Lê Thanh Thủy',
            position: 'Quản lý',
            department: 'Kỹ thuật phần mềm',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Nguyễn Thị Thủy',
            position: 'Nhân viên',
            department: 'Kế toán tổng hợp',
            email: 'lethanhthuy0912@gmail.com'
        },
        {
            fullName: 'Hoàng Thanh Thảo',
            position: 'Nhân viên',
            department: 'Hành chính nhân sự',
            email: 'Hoangthanhthao239@gmail.com'
        }
    ];
}
