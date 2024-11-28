import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
const URL= environment.apiUrl
const AUTH_API = 'http://localhost:8081/api/category';
const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root' //để service có thể được sử dụng trong toàn bộ ứng dụng
})
export class CategoryService {

  constructor(private  httpClient: HttpClient) { }

  getAll(): Observable<any>{
    return  this.httpClient.get(AUTH_API)
  }
  save(category: any, options?: any): Observable<any>{
    if(!options){
      options = httpOptions
    }
    return this.httpClient.post(AUTH_API, category, options)
  }

  update(category: any, id: any, options?: any): Observable<any>{
    if(!options){
      options = httpOptions
    }
    return this.httpClient.post(AUTH_API + "/update/" + id, category, options)
  }

  delete(id: any): Observable<any>{
    return this.httpClient.delete(AUTH_API + '/' + id, httpOptions)
  }
}
