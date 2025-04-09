import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StaffService extends BaseService {
    override url = '/staffs';
    updateStaff(data: any): Observable<any> {
        return this.put(`${this.url}`, data);
    }
}