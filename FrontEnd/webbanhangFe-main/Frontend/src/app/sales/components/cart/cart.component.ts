import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../common/cart-item";
import {CartService} from "../../../services/cart/cart.service";
import {Product} from "../../../common/product";
import {CartRequest} from "../../../common/cart-request";
import {DialogLoginRequestComponent} from "../dialog-login-request/dialog-login-request.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCartIndexComponent} from "../delete-cart-index/delete-cart-index.component";
import {Cart} from "../../../common/cart";
import {Router} from "@angular/router";
import {DataServiceService} from "../../../services/data-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart = new Cart()
  cartItems: CartItem[] = [];
  product: Product[] = [];
  totalQuantity: number = 0;
  value: number = 0;
  cartRequest: CartRequest = new CartRequest()
  quantity: number = 0;
  productid: number = 0;
  fixedWidth: number = 50; // Chiều rộng cố định (đơn vị px)
  fixedHeight: number = 50;
  totalPrice: number = 0;
  allComplete: boolean = false;
  constructor(private cartService: CartService,
              private dialog: MatDialog,
              private router: Router,
              private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listCartDetails();

  }

  async listCartDetails() {
    // get a handle to the cart items
   await this.cartService.getCart().subscribe(
      data => {
        this.cartItems = data.cartIndexs
        this.cart = data
      }
    )
    setTimeout(()=>this.countToTalPrice(this.cart), 100)
    setTimeout(()=>this.updateAllComplete(), 150)
  }

  async onInputChange(value: any, event : any){
    if (event.target.value > 0 && event.target.value < 10) {
      this.cartRequest.productId =  value.product.id
      this.cartRequest.quantity =  event.target.value
     await  this.cartService.createCart(this.cartRequest).subscribe(
        data =>{
          console.log(data)
        }
      )
      // cập nhật lại
      setTimeout(()=> this.listCartDetails(),100)
    }else if (event.target.value >= 10){
      this.toastr.info("Số lượng tối đa là 9")
    } else {
      this.openDialog(value.id)
    }
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteCartIndexComponent, {
      width: '250px',
      data: {cartIndexId: id, cartItems: this.cartItems}
    });

    dialogRef.afterClosed().subscribe(result => {
       this.listCartDetails()
       this.countToTalPrice(this.cart)
       window.location.reload();
       this.toastr.success("Xóa thành công")
    });
  }

  updateAllComplete() {
    this.allComplete = this.cart.cartIndexs != null && this.cart.cartIndexs.every(t => t.state);
    this.countToTalPrice(this.cart)
  }
  someComplete(): boolean {
    if (this.cart.cartIndexs == null) {
      return false;
    }
    return this.cart.cartIndexs.filter(t => t.state).length > 0 && !this.allComplete;
  }

  async setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.cart.cartIndexs == null) {
      return;
    }
    this.cart.cartIndexs.forEach(t => (t.state = completed));
    await this.cartService.updateCart(this.cart).subscribe(
      data => {
        console.log(data)
      }
    )
    this.countToTalPrice(this.cart)
  }

  countToTalPrice(cart: any){
    this.totalPrice = 0
    for (let i = 0; i < this.cart.cartIndexs.length; i++) {
          if(this.cart.cartIndexs[i].state == true){
            this.totalPrice += this.cart.cartIndexs[i].totalPrice
          }
    }
  }
  async flagFuntion(cartIndexs: any){
    for (let i = 0; i < this.cart.cartIndexs.length; i++) {
      if(this.cart.cartIndexs[i].id === cartIndexs.id){
        this.cart.cartIndexs[i].state = !cartIndexs.state
      }
    }

    this.updateAllComplete()
   await this.cartService.updateCart(this.cart).subscribe(
      data => {
        console.log(data)
      }
    )
    setTimeout(()=> this.listCartDetails(),100)

    this.countToTalPrice(this.cart)
  }

  checkout():void{
    if(this.allComplete==false){
      this.toastr.warning("Vui lòng tích chọn thông tin giỏ hàng")
    }else {
      this.router.navigate(['/checkout']);
    }
  }
}
