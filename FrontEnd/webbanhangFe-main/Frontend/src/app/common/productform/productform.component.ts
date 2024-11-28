import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormMode} from "../../../assets/enum";
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product/product.service";
import {ToastrService} from "ngx-toastr";
import {HttpHeaders, JsonpClientBackend} from "@angular/common/http";
import {BrandService} from "../../services/brand/brand.service";
import {Category} from "../category";
import {Brand} from "../brand";

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {
  @Input() mode: any
  @Input() isShow: any
  @Input() data: any

  @Output() isShowChange = new EventEmitter<any>()
  @Output() afterAdd = new EventEmitter<any>()
  @Output() afterEdit = new EventEmitter<any>()

  loading = false
  uploadedImage !: File;
  fixedWidth: number = 500; // Chiều rộng cố định (đơn vị px)
  fixedHeight: number = 500;
  categores: any
  categorySelected: any


  protected readonly FormMode = FormMode;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initCategory()
    this.uploadedImage = this.data.imageUrl
    console.log(this.data.imageUrl)
  }

  onIsShowChange(b: boolean) {
    this.isShow = b
    this.isShowChange.emit(this.isShow)
  }

  onSaveProduct = () => {
    const httpOptions = {
      headers: new HttpHeaders("")
    }
    let data = this.getData()
    this.loading = true
    if (this.mode == FormMode.Add) {
      if (data.quantity < 0 || data.price < 0) {
        this.toastr.error('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
        this.loading = false
      } else {
        this.productService.save(data, httpOptions).subscribe(
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
      }
    } else {
      if (data.quantity < 0 || data.price < 0) {
        this.toastr.error('Dữ liệu không hợp lệ', 'Đã xảy ra lỗi!');
        this.loading = false
      } else {
        this.productService.update(data, this.data.id, httpOptions).subscribe(
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
  }

  getData = () => {

    let data = {
      productName: this.data.productName,
      categoryId: this.categorySelected,
      quantity: this.data.quantity,
      price: this.data.price,
      description: this.data.description,
      image: this.uploadedImage,
    }

    return data
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;

      };
      reader.readAsDataURL(file);
    }
  }


  initCategory = () => {
    this.loading = true
    this.categoryService.getAll().subscribe(
      (response) => {
        this.categores = response
        this.loading = false
        if (this.data.category) {
          this.categorySelected = this.data.category.id;

        } else {
          this.categorySelected = this.categores[0].id
        }
      },
      (error) => {
        this.toastr.error('Máy chủ không phản hồi!', 'Đã xảy ra lỗi');
        this.loading = false
      }
    )

  }


  get description() {
    return this.data.description
  }

  set description(v) {
    try {
      this.data.description = v
    } catch (e) {
      console.log('error occored while you were typing the JSON');
    }
  }

  protected readonly JsonpClientBackend = JsonpClientBackend;
}
