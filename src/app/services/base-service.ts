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
  getAll(): Observable<any> {
    return this.get(this.url);
  }
  getById(id: any): Observable<any> {
    return this.get(`${this.url}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.post(this.url, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.put(`${this.url}`, data);
  }
  deleteById(id: any): Observable<any> {
    return this.delete(`${this.url}/`, id);
  }
}
