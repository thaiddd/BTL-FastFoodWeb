import {Product} from "./product";
import {Brand} from "./brand";

export class CartItem {
  id: string | any
  name: string | any
  imageUrl: string | any
  unitPrice: number | any
  quantity: number | any
  product: Product | any
  brand:  Brand | any
  totalPrice: number | any
  state!: Boolean;
  constructor(product: Product) {
    this.id = product.id
    this.name = product.productName
    this.imageUrl = product.imageUrl
    this.unitPrice = product.price
    this.quantity = 1
  }
}
