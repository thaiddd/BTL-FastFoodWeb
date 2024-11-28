import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
const AUTH_API = 'http://localhost:8081/api/brand';
const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private  httpClient: HttpClient) { }
  getAll(): Observable<any>{
    return  this.httpClient.get(AUTH_API)
  }
  save(brand: any, options?: any): Observable<any>{
    if(!options){
      options = httpOptions
    }
    return this.httpClient.post(AUTH_API, brand, options)
  }

  update(brand: any, id: any, options?: any): Observable<any>{
    if(!options){
      options = httpOptions
    }
    return this.httpClient.post(AUTH_API + "/update/" + id, brand, options)
  }

  delete(id: any): Observable<any>{
    return this.httpClient.delete(AUTH_API + '/' + id, httpOptions)
  }
}
