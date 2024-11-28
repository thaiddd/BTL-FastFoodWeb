import { Component, OnInit } from '@angular/core';
import {Category} from "../../../common/category";
import {FormMode} from "../../../../assets/enum";
import {BrandService} from "../../../services/brand/brand.service";
import {ToastrService} from "ngx-toastr";
import {Brand} from "../../../common/brand";

@Component({
  selector: 'app-brandmanager',
  templateUrl: './brandmanager.component.html',
  styleUrls: ['./brandmanager.component.css',
    './../../admin.component.css']
})
export class BrandmanagerComponent implements OnInit {
  loading = false
  brands: any
  isShowForm = false
  formMode = FormMode.Add
  brandSelected = new Brand()
  constructor(private brandService: BrandService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initData()
  }
  onIsShowChange(value: boolean) {
    this.isShowForm = value
    this.brandSelected = new Brand()
  }

  initData = () => {
    this.loading = true
    this.brandService.getAll().subscribe((response) => {
        this.brands = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this.toastr.success('Không thể kết nối đến server', 'Đã có lỗi xảy ra!');
      })
  }

  onEditCategory(item: any) {
    this.brandSelected = item
    this.formMode = FormMode.Edit
    this.isShowForm = true
  }

  onDeleteCategory(item: any) {
    let id = item.id;
    this.loading = true;
    this.brandService.delete(id).subscribe(
      (response) => {
        this.initData()
        this.toastr.success('Xóa thành công', 'Success!');
        this.loading = false
      },
      (error) => {
        this.toastr.error('Không thể kết nối đến server', 'Đã xảy ra lỗi!');
        this.loading = false
      }
    )
  }

  onAddBrand() {
    this.formMode = FormMode.Add
    this.isShowForm = true
  }

  onAfterAddBrand() {
    this.initData()
    this.toastr.success('Thêm thành công!', 'Success');
  }

  onAfterEditBrand() {
    this.initData()
    this.toastr.success('Cập nhật thành công!', 'Success');
  }
}
