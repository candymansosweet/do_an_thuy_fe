import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountService extends BaseService {
    override url = '/accounts';
}