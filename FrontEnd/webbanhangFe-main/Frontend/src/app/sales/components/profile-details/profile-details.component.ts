import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CategoryService} from "../../../services/category.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../common/user";
import {OrderService} from "../../../services/order/order.service";

const  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  tabIndex = 1
  categores !: []
  // Category region
  uploadedImage !: File;
  // End Category region
  loading = false
  id: any
  user = new User()
  orders: any = []
  constructor(private  httpClient: HttpClient,
              private  formBuilder:  FormBuilder,
              private  categoryService: CategoryService,
              private tokenService: TokenStorageService,
              private userService: AuthService,
              private toastr: ToastrService,
              private orderService: OrderService) {
  }
  ngOnChanges(): void {
  }
  ngOnInit(): void {


    // this.initCategory().then()

    this.getSessionUser()

  }

  getOrdersByUser() {
    this.orderService.getByUserId(this.id).subscribe(
      (response) => {
        this.orders = response
        console.log(response)
      }
    )
  }

  onFinish(id: any) {
    this.loading = true
    this.orderService.finish(id).subscribe(
      (response) => {
        this.loading = false
        this.toastr.success('Hoàn thành đơn hàng thàng công', 'Success!');
        this.getOrdersByUser()
      },
      (error) => {
        this.loading = false
        this.toastr.error('Không thể kết nối đến server', 'Đã có lỗi xảy ra!');
      }
    )
  }

  getSessionUser = () => {
    let user = this.tokenService.getUser();
    this.id = user.id
    this.getCurrentUser()
    this.getOrdersByUser()
  }

  getCurrentUser = () => {
    this.loading = true
    this.userService.getById(this.id).subscribe(
      (response) => {
        this.user = response
        this.loading = false
      },
      (error) => {
        this.toastr.error('Không thể kết nối đến server', 'Đã xảy ra lỗi!');
        this.loading = false
      }
    )
  }

  ngDoCheck(): void {


  }

  onSaveUser = () => {
    this.loading = true;
    const  httpOptions = {
      headers: new HttpHeaders()
    }
    let formData = this.getData()
    this.userService.updateProfile(formData, this.id, httpOptions).subscribe(
      (response) => {
        this.toastr.success('Cập nhật thành công', 'Success!');
        this.getCurrentUser()
        this.loading = false
      },
      (error) => {
        this.toastr.error('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
        this.loading = false
      }
    )
  }

  getData = () => {
    let data = new FormData();
    data.append("fullName", this.user.fullName);
    data.append("username", this.user.username);
    data.append("email", this.user.email);
    data.append("address", this.user.address);
    data.append("phoneNumber", this.user.phoneNumber);
    data.append("password", this.newPassword);
    if (this.user.sex){
      data.append("sex", this.user.sex);
    }
    if (this.user.birthDate){
      data.append("birthDate", this.user.birthDate);
    }

    if (this.uploadedImage){
      data.append("avatar", this.uploadedImage)
    }
    return data
  }

  // saveCategory(): void {
  //   let me = this;
  //   const  httpOptions = {
  //     headers: new HttpHeaders()
  //   }
  //   let formData = new FormData();
  //   formData.append('categoryName', this.categoryForm.get('categoryName')?.value);
  //   formData.append('description', this.categoryForm.get('description')?.value);
  //   formData.append('image', this.uploadedImage);
  //   this.categoryService.save(formData, httpOptions).subscribe((response) => {
  //     console.log(response)
  //     alert("Thêm thành công")
  //     this.categoryForm.reset();
  //   });
  // }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  // async initCategory(): Promise<void> {
  //   await this.categoryService.getAll().subscribe((response) => {
  //     this.categores = response;
  //   })
  // }
  newPassword: any;
}
