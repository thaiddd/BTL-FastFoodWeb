import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private  baseUrl1 = 'http://localhost:8081/api/payment'

  constructor(
    private httpClient: HttpClient
  ) { }

  payment(paymentDTO: any):Observable<any>{
    return this.httpClient.post(this.baseUrl1 + '/createpayment',paymentDTO,httpOptions)
  }
}
