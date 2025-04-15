import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProjectService extends BaseService {
    override url = '/projects';

    GetStatusTasks(data: any): Observable<any> {
        return this.post(`${this.url}/GetStatusTasks`, data);
    }
}