import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Product} from "../../../common/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],

})
export class ShopComponent implements OnInit {
  @ViewChild('test', { static: true }) section: ElementRef | undefined;
  products: any
  idCate: string | undefined
  pageSize: any = 12
  totalCount: any
  currentPage: any = 1

  pagingData: any = {
    start: (this.currentPage - 1) * this.pageSize,
    limit: this.pageSize,
    sort: '',
    where: ''
  }
  fixedWidth: number = 500;
  fixedHeight: number = 500;
  categores :any= []
  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const categoryName = this.route.snapshot.paramMap.get('categoryName');
      this.pagingData.where = categoryName
      this.initData();
    })
    this.getcateGory();
  }

  scrollToSection() {
    debugger
    if (this.section) {
      this.section.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getcateGory(){
    this.categoryService.getAll().subscribe(res=>{
      this.categores=res;
      this.categores.unshift({ categoryName: 'Tất cả', id: '' });
    })
  }

  initData() {
    this.pagingData.start = (this.currentPage - 1) * this.pageSize
    let data = {
      productName: null,
      categoryId: this.idCate
    }
    this.productService.searchData(data).subscribe(res => {
      this.products = res
      this.totalCount = res.length
    })

  }

  onDataChange(event: any) {
    this.currentPage = event
    this.initData()
  }

  onClickCategory(category: any) {
    this.idCate = category.id;

    this.initData()
  }
}
