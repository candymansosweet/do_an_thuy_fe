import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from '../constants/constants';

@Pipe({
    name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  constructor() {}

    transform(value: number): string {
        console.log(value);
        const status = Constant.TASK_STATUS.find(item => item.value == value);
        console.log(status);
        return status ? status.label : '';
    }
}