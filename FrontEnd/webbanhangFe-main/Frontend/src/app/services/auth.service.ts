import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

const AUTH_API = 'http://localhost:8081/api/auth/';
const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  public redirectUrl!: string ;

  constructor(private  httpClient: HttpClient,
              private router: Router
  ) { }

  login(loginRequest: any): Observable<any>{
    return this.httpClient.post(AUTH_API + 'signin',loginRequest, httpOptions).pipe(
    )
  }

  signup(user: any): Observable<any>{
    return this.httpClient.post(AUTH_API + 'signup', user, httpOptions)
  }

  getAllUsers(): Observable<any>{
    return this.httpClient.get(AUTH_API, httpOptions)
  }

  addUser(user: any): Observable<any>{
    return this.httpClient.post(AUTH_API + "add", user, httpOptions)
  }

  updateUser(user: any,id: any, options?: any): Observable<any> {
    let myOptions = options == null? httpOptions : options
    return  this.httpClient.post(AUTH_API + "update/" + id, user, myOptions)
  }

  updateProfile(user: any,id: any, options?: any): Observable<any> {
    return  this.httpClient.post(AUTH_API + "profile/" + id, user, options)
  }

  deleteUser(id: any): Observable<any> {
    return this.httpClient.delete(AUTH_API + id, httpOptions)
  }

  getById(id: any): Observable<any>{
    return this.httpClient.get(AUTH_API + id, httpOptions)
  }

  getUser(): Observable<any>{
    return this.httpClient.get(AUTH_API + 'getUser', httpOptions)
  }
}
