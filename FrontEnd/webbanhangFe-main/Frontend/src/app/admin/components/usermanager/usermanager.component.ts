import {Component, OnInit} from '@angular/core';
import {FormMode} from "../../../../assets/enum";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../common/user";

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css',
    '../../admin.component.css']
})
export class UsermanagerComponent implements OnInit {

  isShowForm = false
  formMode: any
  user = new User()
  public loading = false;
  users: any
  pageSize: number = 10;
  totalItems: number = 0;
  page: number = 0;
  constructor(private authservice: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initData()
  }

  onIsShowFormChange = (value: any) =>{
    this.isShowForm = value;
    this.user = new User()
  }

  initData = () => {
    this.loading = true

    this.authservice.getAllUsers().subscribe(
      (response) => {
        this.users = response
        this.totalItems=this.users.length
        this.paginateData()
        this.loading = false
      },
      (error) => {
        console.warn(error)
        this.loading = false
        this.toastr.error('Đã xảy ra lỗi', 'Máy chủ không phản hồi!');
      }
    )
  }

  onShowFormEdit = (userData: any ) => {
    this.user = userData
    this.formMode = FormMode.Edit
    this.isShowForm = true;
  }

  onShowFormAdd = () => {
    this.formMode = FormMode.Add
    this.isShowForm = true;
  }

  paginateData() {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.users = this.users.slice(start, end);
  }

  onChangePage(event: any) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.initData();
  }

  onAfterUpdateUser() {
    this.initData()
    this.toastr.success('Cập nhật thành công!', 'Success');
  }

  onAfterAddUser() {
    this.initData()
    this.toastr.success('Thêm thành công!', 'Success');
  }

  onDeleteUser(user: any) {
    let id = user.id;
    this.loading = true;
    this.authservice.deleteUser(id).subscribe(
      (response) => {
        this.loading = false;
        this.initData();
        this.toastr.success('Xóa thành công!', 'Success');
      },
      (error) => {
        this.loading = false;
        this.toastr.error('Có lỗi xảy ra!', 'False');
      }
    )
  }
}
