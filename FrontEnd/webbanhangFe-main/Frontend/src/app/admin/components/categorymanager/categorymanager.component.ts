import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {ToastrService} from "ngx-toastr";
import {FormMode} from "../../../../assets/enum";
import {Category} from "../../../common/category";

@Component({
  selector: 'app-categorymanager',
  templateUrl: './categorymanager.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class CategorymanagerComponent implements OnInit {
  loading = false
  categores: any
  isShowForm = false
  formMode = FormMode.Add
  categorySelected = new Category()
  pageSize: number = 10;
  totalItems: number = 0;
  page: number = 0;

  constructor(private categoryService: CategoryService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initData()
  }

  onIsShowChange(value: boolean) {
    this.isShowForm = value
    this.categorySelected = new Category()
  }

  initData = () => {
    this.loading = true
    this.categoryService.getAll().subscribe((response) => {
        this.categores = response;
        this.totalItems = this.categores.length
        this.loading = false
        this.paginateData();
      },
      (error) => {
        this.loading = false
        this.toastr.error('Không thể kết nối đến server', 'Đã có lỗi xảy ra!');
      })
  }

  paginateData() {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.categores = this.categores.slice(start, end);
  }

  onEditCategory(item: any) {
    this.categorySelected = item
    this.formMode = FormMode.Edit
    this.isShowForm = true
  }

  onChangePage(event: any) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.initData();
  }

  onDeleteCategory(item: any) {
    let id = item.id;
    this.loading = true;
    this.categoryService.delete(id).subscribe(
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

  onAddCategory() {
    this.formMode = FormMode.Add
    this.isShowForm = true
  }

  onAfterAddCategory() {
    this.initData()
    this.toastr.success('Thêm thành công!', 'Success');
  }

  onAfterEditCategory() {
    this.initData()
    this.toastr.success('Cập nhật thành công!', 'Success');
  }
}
