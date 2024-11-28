import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Cart} from "../../../common/cart";
import {DataServiceService} from "../../../services/data-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../common/user";
import {CartService} from "../../../services/cart/cart.service";
import {PaymentService} from "../../../services/payment/payment.service";
import {PaymentDTO} from "../../../common/payment-dto";
import {Order} from "../../../common/order";
import {OrderService} from "../../../services/order/order.service";
import {REGEX_PATERN} from "../../../services/ReGEX_PATERN/REGEX_PATERN";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  id!: number
  order: Order = new Order()
  payment: PaymentDTO = new PaymentDTO()
  cart: Cart = new Cart()
  user: User = new User()
  selectedValue = "tienmat";
  //vnpay = "vpay"
  tienmat = "tienmat"
  checkOutForm!: FormGroup;


  // checkOutForm = new FormGroup({
  //   fullName: [null,[Validators.required]],
  //   phone: new FormControl('', Validators.required),
  //   address: new FormControl('',Validators.required),
  //   email: new FormControl(`${this.user.email}`, Validators.required),
  // })

  constructor(private router: Router,
              private authService: AuthService,
              private cartService: CartService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private payService: PaymentService,
              private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(data => {
      this.user = data
    })
    this.buildForm();
    this.checkOutForm.value.email = this.user.email
    this.cartService.getCartTrue().subscribe(
      data => {
        this.cart.cartIndexs = data.cartIndexs
        this.cart.totalPrice = data.totalPrice
        this.cart.user = data.user
      }
    )
  }

  buildForm() {
    this.checkOutForm = this.fb.group({
      fullName: [null, [Validators.required]],
      phone: [null, [Validators.maxLength(20), Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$"),Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.maxLength(100), Validators.pattern(REGEX_PATERN.EMAIL),Validators.required]]
    });
  }

  onFormSubmit() {
    if (this.checkOutForm.invalid) {
      this.toastr.warning("Vui lòng nhập đầy đủ thông tin !")
    } else {
      this.order.totalPrice = this.cart.totalPrice
      this.order.fullName = this.checkOutForm.controls['fullName'].value
      this.order.email = this.checkOutForm.controls['email'].value
      this.order.phone = this.checkOutForm.controls['phone'].value
      this.order.address = this.checkOutForm.controls['address'].value

      if (this.selectedValue == 'tienmat') {
        this.orderService.createOrder(this.order).subscribe(
          data => {

            this.router.navigateByUrl(`/order-confirmed/${data.id}`)
            this.id = data.id
          }
        )

      }
    }
  }

  selectPayment() {
    //if (this.selectedValue == 'vpay') {
      this.selectedValue = "tienmat"
    //} else {
      //this.selectedValue = 'vpay'
      this.payment.amount = this.cart.totalPrice
      this.payment.bankCode = 'NCB'

      this.payService.payment(this.payment).subscribe(
        data => {
          console.log(data)
          window.open(data.url)
        }
      )
    }
  }

