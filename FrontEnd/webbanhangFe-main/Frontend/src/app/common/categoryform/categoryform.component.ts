import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {CategoryService} from "../../services/category.service";
import {ToastrService} from "ngx-toastr";
import {FormMode} from "../../../assets/enum";

@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrls: ['./categoryform.component.css']
})
export class CategoryformComponent implements OnInit {
  protected readonly FormMode = FormMode;
  @Input() mode: any
  @Input() isShow:any
  @Output() isShowChange = new EventEmitter<any>();
  @Output() afterAdd = new EventEmitter<any>();
  @Output() afterEdit = new EventEmitter<any>();

  loading = false
  // Category region
  uploadedImage !: File
  @Input() data : any

  constructor(private  categoryService: CategoryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSaveCategory(): void {
    const  httpOptions = {
      headers: new HttpHeaders()
    }
    let data = this.getData()
    this.loading = true
    if (this.mode == FormMode.Add) {
      this.categoryService.save(data, httpOptions).subscribe(
        (response) => {
          this.onIsShowChange(false)
          this.afterAdd.emit()
          this.loading = false
        },
        (error) => {
          this.toastr.error('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
          this.loading = false
        }
      )
    }else {
      this.categoryService.update(data, this.data.id, httpOptions).subscribe(
        (response) => {
          this.onIsShowChange(false)
          this.afterEdit.emit()
          this.loading = false
        },
        (error) => {
          this.toastr.error('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
          this.loading = false
        }
      )
    }
  }

  getData = () => {
    let data = new FormData();
    data.append("categoryName", this.data.categoryName);
    data.append("description", this.data.description);

    return data
  }

  onImageUpload(event: any) {
    debugger
    this.uploadedImage = event.target.files[0];
  }

  onIsShowChange = (value: boolean) => {
    this.isShow = value
    this.isShowChange.emit(this.isShow)
  }

}
