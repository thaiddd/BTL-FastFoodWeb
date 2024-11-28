import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
// import {DialogData} from "../dialog-login-request/dialog-login-request.component";
import {CartService} from "../../../services/cart/cart.service";
import {CartItem} from "../../../common/cart-item";

@Component({
  selector: 'app-delete-cart-index',
  templateUrl: './delete-cart-index.component.html',
  styleUrls: ['./delete-cart-index.component.css']
})
export class DeleteCartIndexComponent implements OnInit {

  cartItems: CartItem[] = [];

  // @Output() dataDialog = new EventEmitter<void>();


  constructor(
    private dialogRef: MatDialogRef<DeleteCartIndexComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cartIndexId: any, cartItems: any},
    private router: Router,
    private  cartService: CartService,
    // private location: Location
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onDelete(): void{

    console.log(this.data.cartItems)
    this.cartService.deleteCartIndex(this.data.cartIndexId).subscribe(
      data => {
        // console.log(data)
      }
    )
    this.cartService.getCart().subscribe(
      data => {
        this.data.cartItems = data
        console.log(data)
      }
    )
    console.log(this.data.cartItems)
    this.dialogRef.close(this.cartItems)
  }
}
