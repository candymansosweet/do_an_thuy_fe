import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UploadService extends BaseService {
    override url = '/uploads';
    uploadFile(payload: any, id: string): Observable<any> {
        return this.post(`${this.url}/upload/task/${id}`, payload,'blob');
    }
    deleteTaskFile(id: string): Observable<any> {
        return this.delete(`${this.url}/upload/task/`, id);
    }
}
