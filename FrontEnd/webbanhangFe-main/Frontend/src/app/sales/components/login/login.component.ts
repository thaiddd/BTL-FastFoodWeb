import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form: any = {
  //   username: null,
  //   password: null
  // };
  // returnUrl: string;
  isLoggedIn = false; // login thanh cong
  isLoginFailed = false; // that bai
  errorMessage = '';
  roles: string[]= []

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required), // bat buoc
    password: new FormControl('', Validators.required)
  })
  constructor(private  authService: AuthService, // xac thuc
              private  tokenStorage: TokenStorageService, // luu tru token
              private  formBuilder:  FormBuilder,
              private  router: Router, // dieu huong
              private toastr: ToastrService,
              private route: ActivatedRoute // lay tt token hien tai
              // private location: Location
  ) {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
    // da co token thi login thanh cong
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void{
    // const previousUrl = this.location.getState()['url']
    // const returnUrl = this.router.url;
    const returnUrl = sessionStorage.getItem('returnUrl') || '/';
    // const returnUrll = this.returnUrl

    // lay gt tu form
    const loginRequest = this.loginForm.value
    // goi service login
    this.authService.login(loginRequest).subscribe(
      (response) => {
        // this.tokenStorage.saveToken(response.accessToken)
          console.log(response)
          this.tokenStorage.saveToken(response.token)
          this.tokenStorage.saveUser(response)
          // this.router.navigate(['/'])
          this.toastr.success("Đăng nhập thành công")
          this.router.navigateByUrl(returnUrl);

      },
      (error) => {
          this.toastr.error('Sai thông tin tài khoản, mật khẩu', 'Đăng nhập không thành công!');
      }
    )
  }

  reloadPage(): void {
    window.location.reload();
  }

}
