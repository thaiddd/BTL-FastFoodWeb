import {Component, OnInit} from '@angular/core';
import {Product} from "../../../common/product";
import {FormMode} from "../../../../assets/enum";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['../../admin.component.css']
})
export class ProductmanagerComponent implements OnInit {
  products: any
  productSelected = new Product()
  loading = false
  isShowForm = false
  formMode = FormMode.Add
  pageSize: number = 10;
  totalItems: number = 0;
  page: number = 0;
  fixedWidth: number = 100; // Chiều rộng cố định (đơn vị px)
  fixedHeight: number = 100;
  constructor(private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData = () => {
    this.loading = true
    this.productService.getAll().subscribe(
      (response) => {
        this.products = response
        this.totalItems=this.products.length
        this.paginateData()
        this.loading = false
      },
      (error) => {
        this.loading = false
        this.toastr.error('Đã xảy ra lỗi', 'Máy chủ không phản hồi!');
      }
    )
  }

  paginateData() {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.products = this.products.slice(start, end);
  }

  onChangePage(event: any) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.initData();
  }


  onIsShowFormChange(value: boolean) {
    this.isShowForm = value
    this.productSelected = new Product()
  }

  onEditProduct(item: any) {
    this.productSelected = item
    this.formMode = FormMode.Edit
    this.isShowForm = true
  }

  onAddProduct() {
    this.formMode = FormMode.Add
    this.isShowForm = true
  }

  onAfterEdit() {
    this.initData()
    this.toastr.success('Cập nhật thành công!', 'Success');
  }

  onAfterAdd() {
    this.initData()
    this.toastr.success('Thêm thành công!', 'Success');
  }

  onDelete(item: any) {
    let id = item.id;
    this.loading = true;
    this.productService.delete(id).subscribe(
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

}
