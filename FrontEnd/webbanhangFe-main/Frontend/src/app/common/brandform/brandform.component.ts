import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormMode} from "../../../assets/enum";
import {BrandService} from "../../services/brand/brand.service";
@Component({
  selector: 'app-brandform',
  templateUrl: './brandform.component.html',
  styleUrls: ['./brandform.component.css']
})
export class BrandformComponent implements OnInit {
  protected readonly FormMode = FormMode;
  @Input() mode: any
  @Input() isShow:any
  @Output() isShowChange = new EventEmitter<any>();
  @Output() afterAdd = new EventEmitter<any>();
  @Output() afterEdit = new EventEmitter<any>();

  loading = false
  // Category region
  @Input() data : any

  constructor(private  brandService: BrandService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSaveBrand(): void {
    let data = this.getData()
    this.loading = true
    if (this.mode == FormMode.Add) {
      this.brandService.save(data).subscribe(
        (response) => {
          this.onIsShowChange(false)
          this.afterAdd.emit()
          this.loading = false
        },
        (error) => {
          this.toastr.success('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
          this.loading = false
        }
      )
    }else {
      this.brandService.update(data, this.data.id).subscribe(
        (response) => {
          this.onIsShowChange(false)
          this.afterEdit.emit()
          this.loading = false
        },
        (error) => {
          this.toastr.success('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
          this.loading = false
        }
      )
    }
  }

  getData = () => {
    return {
      brandName: this.data.brandName,
      description: this.data.description
    }
  }

  onIsShowChange = (value: boolean) => {
    this.isShow = value
    this.isShowChange.emit(this.isShow)
  }
}
