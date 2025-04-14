import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'mergeObjectName',
})
export class MergeObjectNamePipe implements PipeTransform {
  constructor() {}
  transform(objectList: any[]): string {
    if (!Array.isArray(objectList)) return '';
    return objectList.map(s => s.fullName).join(', ');
  }
}
