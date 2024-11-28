import { Component, OnInit } from '@angular/core';
import {Product} from "../../../common/product";
import {ProductService} from "../../../services/product/product.service";
// import {CartService} from "../../../services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartItem} from "../../../common/cart-item";
import {CartService} from "../../../services/cart/cart.service";
import {CartRequest} from "../../../common/cart-request";
import {TokenStorageService} from "../../../services/token-storage.service";
import {ToastrService} from "ngx-toastr";
import { Location } from '@angular/common';
import {DialogLoginRequestComponent} from "../dialog-login-request/dialog-login-request.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
  currentUrl!: string;
  animal!: string;
  name!: string;
  product: Product = new Product();
  value: number = 1;
  cartRequest: CartRequest = new CartRequest()
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private toastr: ToastrService,
    private  dialog: MatDialog,
  ) {
    this.currentUrl = this.route.snapshot.url.join('/');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data.content;
      }
    )
  }

  addToCart() {
    // const theCartItem = new CartItem(this.product);
    // this.cartService.addToCart(theCartItem);
    sessionStorage.setItem('returnUrl', this.currentUrl)
    if(this.tokenService.getToken() == null){
      this.openDialog()
      this.toastr.warning("Đăng nhập để thực hiện")
    }else{
      this.cartRequest.productId  = this.product.id
      this.cartRequest.quantity    = this.value
      console.log(this.cartRequest)
      this.cartService.createCart(this.cartRequest).subscribe(
        value1 => (console.log(value1))
      )
      // this.router.navigate(['/cart'])
      this.toastr.success("Thêm vào giỏ hàng thành công")
      window.location.reload();
    }
  }

  onInputOnchange(value : any){
      console.log(value)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginRequestComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
