import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = "http://localhost:8081/api/order"
  constructor(private httpClient: HttpClient) {

  }

  createOrder(order: any): Observable<any>{
    return this.httpClient.post(this.url, order, httpOptions)
  }

  getAll(data:any): Observable<any>{
    return  this.httpClient.post(this.url+'/findOrder',data);
  }

  getByUserId(id: any): Observable<any>{
    return this.httpClient.get(this.url+'/user/'+id)
  }

  finish(id: any): Observable<any>{
    return this.httpClient.get(this.url+'/finish/'+id)
  }

  revoke(id: any): Observable<any>{
    return this.httpClient.get(this.url+'/revoke/'+id)
  }
  getOrderById(id: any):Observable<any>{
    return this.httpClient.get(this.url + '/'+ id)
  }
}
