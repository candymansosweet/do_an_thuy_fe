import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Service } from "./service";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService extends Service {
  url: string = '';
  search(data: any): Observable<any> {
    return this.post(`${this.url}/Search`, data);
  }
  getAll(params?: any): Observable<any> {
    return this.get(this.url, params);
  }
  getById(id: any): Observable<any> {
    return this.get(`${this.url}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.post(this.url, data);
  }
  update(data: any): Observable<any> {
    return this.put(`${this.url}`, data);
  }
  deleteById(id: any): Observable<any> {
    return this.delete(`${this.url}/`, id);
  }
}
