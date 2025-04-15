import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base-service";
import { StorageKeys } from "../shared/constants/storage-key";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    override url = '/authenticates';
    login(payload: any): Observable<any> {
        return this.post(`${this.url}/login`, payload);
    }
    //   logout(): Observable<any> {
    //     let token = localStorage.getItem(StorageKeys.TOKEN);
    //     return this.post('/logout', null, {}, '', headers);
    //   }
}