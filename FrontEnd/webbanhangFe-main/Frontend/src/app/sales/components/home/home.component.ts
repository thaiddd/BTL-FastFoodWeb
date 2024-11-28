import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any

  pageSize: any = 12
  totalCount: any
  currentPage: any = 1
  fixedWidth: number = 300;
  fixedHeight: number = 300;
  pagingData: any = {
    start: (this.currentPage - 1) * this.pageSize,
    limit: this.pageSize,
    sort: '',
    where: ''
  }
  constructor(private productService: ProductService) { }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this.pagingData.start = (this.currentPage - 1) * this.pageSize
    let data ={
      productName:null,
      categoryId:null
    }
    this.productService.searchData(data).subscribe(res=>{
      this.products = res
      this.totalCount=res.length
    })
  }

  onDataChange(event: any) {
    this.currentPage = event
    this.initData()
  }


}
