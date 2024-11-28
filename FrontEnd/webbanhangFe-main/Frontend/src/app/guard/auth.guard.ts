import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { // bao ve route

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.isLoggedIn;
    if (currentUser) {
      // Người dùng đã đăng nhập, cho phép truy cập
      return true;
    }
    // chua login thi chuyen huong sang
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }


}
