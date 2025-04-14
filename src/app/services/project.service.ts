import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProjectService extends BaseService {
    override url = '/projects';

    GetStatusTasks(id: string| null): Observable<any> {
        return this.get(`${this.url}/GetStatusTasks/${id}`);
    }
}