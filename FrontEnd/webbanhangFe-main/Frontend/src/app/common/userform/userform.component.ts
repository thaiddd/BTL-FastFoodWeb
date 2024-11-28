import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormMode} from "../../../assets/enum";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit, OnChanges {
  protected readonly FormMode = FormMode;
  @Input() isShow: any
  @Output() isShowChanged = new EventEmitter<any>();
  @Output() afterAdd = new EventEmitter<any>();
  @Output() afterUpdate = new EventEmitter<any>();

  @Input() mode: any

  @Input() data: any

  loading = false

  role = {
    ADMIN: false,
    USER: false,
    SELLER: false
  }

  constructor(private authservice: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initData()
  }

  initData = () => {
    this.role = {
      ADMIN: false,
      USER: false,
      SELLER: false
    }
    this.data.roles.filter((role: any) => {
      if(role.name ==  "ADMIN"){
        this.role.ADMIN = true
      }
      if(role.name ==  "USER"){
        this.role.USER = true
      }
      if(role.name ==  "SELLER"){
        this.role.SELLER = true
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  isShowChange(value: boolean) {
    this.isShow = value;
    this.isShowChanged.emit(this.isShow);
  }

  getData = () => {
    const role = [];
    if (this.role.ADMIN) role.push("ADMIN");
    if (this.role.SELLER) role.push("SELLER");
    if (this.role.USER) role.push("USER");
    return {
      username: this.data.username,
      password: this.data.password,
      email: this.data.email,
      fullName: this.data.fullName,
      address: this.data.address,
      role: role,
      phoneNumber: this.data.phoneNumber
    }
  }

  onSaveUser = () => {
    let data = this.getData()
    this.loading = true;
    if (this.mode == FormMode.Add) {
      this.authservice.addUser(data).subscribe(
        (response) => {
          this.isShowChange(false)
          this.afterAdd.emit();
        },
        (error) => {
          this.loading =false
          this.toastr.error('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
        }
      )
    }else {
      this.authservice.updateUser(data, this.data.id).subscribe(
        (response) => {
          this.isShowChange(false)
          this.afterUpdate.emit();
        },
        (error) => {
          this.loading =false
          this.toastr.error('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
        }
      )
    }
  }

}
