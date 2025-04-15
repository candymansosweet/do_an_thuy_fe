export class Constant {
    public static readonly POSITION = [
        {
            label: 'Nhân viên',
            value: 0
        },
        {
            label: 'Quản lý',
            value: 1
        },
        {
            label: 'Lãnh đạo',
            value: 2
        }
    ]
    public static readonly ROLE_SYSTEM_LABEL = [
        {
            label: 'Quản trị viên',
            value: 0
        },
        {
            label: 'Nhân viên',
            value: 5
        },
    ]
    public static readonly DEPARTMENT = [
        {
            label: 'Phòng kỹ thuật',
            value: 0
        },
        {
            label: 'Phòng triển khai',
            value: 1
        },
        {
            label: 'Phòng kinh doanh',
            value: 2
        },
        {
            label: 'Phòng cố vấn',
            value: 3
        },
        {
            label: 'Phòng hành chính nhân sự tổng hợp',
            value: 4
        }
    ];
    public static readonly TASK_STATUS_VALUE = {
        NOT_START: 0,
        IN_PROGRESS: 1,
        COMPLETED: 2,
        OVERDUE: 3
    };
    public static readonly TASK_STATUS = [
        {
            label: 'Chưa làm',
            value: 0
        },
        {
            label: 'Đang làm',
            value: 1
        },
        {
            label: 'Hoàn thành',
            value: 2
        },
        // {
        //     label: 'Quá hạn',
        //     value: 3
        // }
    ]
}