import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskService extends BaseService {
    override url = '/tasks';
}