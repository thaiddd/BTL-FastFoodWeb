import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

//const cartUrl  = "'http://localhost:8081/api/cart'"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private  cartUrl  = 'http://localhost:8081/api/cart'
  constructor(private httpClient: HttpClient) { }

  createCart(cartRequest: any, options?: any): Observable<any>{
    if(!options){
      options = httpOptions
    }
    return this.httpClient.post(this.cartUrl, cartRequest, options)
  }
  getCart():Observable<any>{
    return this.httpClient.get(this.cartUrl,httpOptions)
  }

  deleteCartIndex(id: any):Observable<any>{
    return this.httpClient.delete(this.cartUrl + '/' + id, httpOptions)
  }

  updateCart(cart: any):Observable<any>{
    return this.httpClient.post(this.cartUrl + '/updateCart',cart, httpOptions)
  }
  getCartTrue(): Observable<any>{
    return this.httpClient.get(this.cartUrl+ '/getCart',httpOptions)
  }
}


