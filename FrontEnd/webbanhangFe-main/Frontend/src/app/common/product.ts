import {Category} from "./category";
import {Brand} from "./brand";

export class Product {
  id: number | any
  imageUrl: string | any = ""
  productName: string | any = ""
  price: number | any = 0
  sex: string | any = ""
  color: string | any = ""
  quantity: number | any = 10
  description: string | any = ""
  category: Category | any
  brand: Brand | any;
}
