import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../services/order/order.service";
import {OrderResponse} from "../../../common/order-response";
import {Product} from "../../../common/product";

@Component({
  selector: 'app-orderconfirmed',
  templateUrl: './orderconfirmed.component.html',
  styleUrls: ['./orderconfirmed.component.css']
})
export class OrderconfirmedComponent implements OnInit {

   order: OrderResponse = new OrderResponse()
  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router
  ){ }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder(){
    const theOrderId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService.getOrderById(theOrderId).subscribe(
      data => {
           this.order = data
      }
    )
  }

  backhome() {
    this.router.navigate(['/'])
  }
}
