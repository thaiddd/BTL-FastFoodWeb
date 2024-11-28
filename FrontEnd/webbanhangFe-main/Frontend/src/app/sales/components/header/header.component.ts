import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {BrandService} from "../../../services/brand/brand.service";
import {CartService} from "../../../services/cart/cart.service";
import {CartItem} from "../../../common/cart-item";
import {Cart} from "../../../common/cart";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart: Cart = new Cart()
  cartItems: CartItem[] = [];
  hasUser?: boolean
  isAdmin?: boolean = false
  categores !: []
  brands !: []
  searchText: any;
  constructor(private tokenService: TokenStorageService,
              private userService: AuthService,
              private  router: Router,
              private categoryService: CategoryService,
              private brandService: BrandService,
              private toastr: ToastrService,
              private cartService: CartService

  ) { }

  ngOnInit(): void {
    let token = this.tokenService.getToken()
    this.hasUser = token != null
    this.checkRole()
    this.initCategory().then(r => {console.log(r)})
    this.listCartDetails()
  }

  logout() {
    this.router.navigate(['/login']).then((r) => {
      this.tokenService.signOut()
    })
  }

  checkRole() {
    if (this.hasUser){
      let currentUser = this.tokenService.getUser()
      let roles = currentUser.roles
      if (roles.includes("ADMIN")) this.isAdmin = true
      console.log(this.isAdmin)
    }
  }

  async initCategory(): Promise<void> {
    await this.categoryService.getAll().subscribe((response) => {
      this.categores = response;
    })
  }

  doDelete(item:any){
    debugger
   this.cartService.deleteCartIndex(item).subscribe(res=>{
     this.toastr.success("Xóa thành công")
     this.listCartDetails();
   })
  }

  onSearch() {
    this.router.navigate(['/shop/'+this.searchText])
  }

  async listCartDetails() {
    // get a handle to the cart items
    await this.cartService.getCart().subscribe(
      data => {
        this.cartItems = data.cartIndexs
        this.cart = data
      }
    )
  }
}
