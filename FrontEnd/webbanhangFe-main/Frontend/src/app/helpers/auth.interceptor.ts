import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';
//xử lý các request HTTP trước khi chúng được gửi đến server.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.token.getToken();

    if(token != null){
      authRequest = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY,'Bearer ' + token)});
    }

    return next.handle(authRequest);
  }
}

export const authInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
];
//Tự động thêm token vào header của mọi HTTP request
// Thực hiện xác thực người dùng với server
// Áp dụng cơ chế Bearer token authentication
// Giúp bảo mật các API calls từ ứng dụng
