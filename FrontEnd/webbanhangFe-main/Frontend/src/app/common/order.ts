import {FormControl, Validators, ɵValue} from "@angular/forms";

export class Order {
  id!:number
  fullName!: ɵValue<FormControl<string | null>> | undefined
  phone!: ɵValue<FormControl<string | null>> | undefined
  address!: ɵValue<FormControl<string | null>> | undefined
  email!: ɵValue<FormControl<string | null>> | undefined
  totalPrice!: number
  quantity:any
  cartIndexs!: {}
}
