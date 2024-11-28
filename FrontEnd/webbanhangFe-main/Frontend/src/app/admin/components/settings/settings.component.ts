import { Component, OnInit } from '@angular/core';
import {User} from "../../../common/user";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../../admin.component.css',
              'settings.component.css']
})
export class SettingsComponent implements OnInit {
  loading = false
  id: any
  user = new User()
  uploadedImage !: File
  imgUrl: any
  constructor(private tokenService: TokenStorageService,
              private userService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    debugger
    this.getSessionUser()
    this.getCurrentUser()
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.uploadedImage);

    reader.onload = () => {
      this.imgUrl = reader.result;
    };
  }
  getSessionUser = () => {
    let user = this.tokenService.getUser();
    this.id = user.id
  }

  getCurrentUser = () => {
    this.loading = true
    this.userService.getById(this.id).subscribe(
      (response) => {
        this.user = response
        this.imgUrl = "http://localhost:8081/image/" + response.imageUrl
        console.log(this.imgUrl)
        this.loading = false
      },
      (error) => {
        this.toastr.error('Không thể kết nối đến server', 'Đã xảy ra lỗi!');
        this.loading = false
      }
    )
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
    debugger
    let data = new FormData();
    data.append("fullName", this.user.fullName);
    data.append("username", this.user.username);
    data.append("email", this.user.email);
    data.append("address", this.user.address);
    data.append("phoneNumber", this.user.phoneNumber);
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

}
