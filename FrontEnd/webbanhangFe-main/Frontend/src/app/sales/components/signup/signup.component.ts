import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor( private authService: AuthService,
               private toastr: ToastrService,
               private router: Router,
               private fb: FormBuilder,

  ) {}

  ngOnInit(): void {
      this.signupForm = this.fb.group({
          fullname : ['',[Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          username: new FormControl('',Validators.required),
          password: new FormControl('', Validators.required)
      })
  }

  onSubmit(): void{

    // if (this.signupForm.invalid){
    //   return;
    // }
    // const firstname = this.signupForm.get('firstname')?.value;
    // const lastname = this.signupForm.get('lastName')?.value;
    // const email = this.signupForm.get('firstName')?.value;
    // const username = this.signupForm.get('email')?.value;
    // const password = this.signupForm.get('passWord')?.value;

    const user = this.signupForm.value;

    this.authService.signup(user)
      .subscribe(
      // handle successful signup
        (response) => {
         this.toastr.success('Đăng Kí Thành Công');
         this.router.navigate(['/login'])
        },  (error) => {
          this.toastr.error('Vui lòng kiểm tra lại thông tin !');
        }
       //handle signup error
       //  (error) => {
       //    console.log(error);
       //  }
    )
  }
}
