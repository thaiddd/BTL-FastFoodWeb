import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppResponse} from "../../common/app-response";
import {Product} from "../../common/product";

const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private  baseUrl1 = 'http://localhost:8081/api/product'

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<AppResponse<Product[]>>{
      return  this.httpClient.get<AppResponse<Product[]>>(this.baseUrl1)
  }

  getProduct(theProductId: number): Observable<AppResponse<Product[]>>{
    const productUrl = `${this.baseUrl1}/${theProductId}`
    return this.httpClient.get<AppResponse<Product[]>>(productUrl)
  }

  getAll(): Observable<any>{
    return  this.httpClient.get(this.baseUrl1)
  }

  save(product: any, options?: any): Observable<any>{
    if(!options){
      options = httpOptions
    }
    return this.httpClient.post(this.baseUrl1, product, options)
  }

  update(product: any, id: any, options?: any): Observable<any>{
    if(!options){
      options = httpOptions
    }
    return this.httpClient.post(this.baseUrl1 + "/update/" + id, product, options)
  }

  delete(id: any): Observable<any>{
    return this.httpClient.delete(this.baseUrl1 + '/' + id, httpOptions)
  }

  getPaging(pagingData: any): Observable<any>{
    return this.httpClient.post(this.baseUrl1+'/paging', pagingData)
  }

  searchData(data: any): Observable<any>{
    return this.httpClient.post(this.baseUrl1+'/searchProduct', data)
  }
}
