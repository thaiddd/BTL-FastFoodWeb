export class Cart {
  id!: number
  // completed!: boolean
  totalPrice!: number
  user!: any
  cartIndexs!: [
    {
      quantity: number
      id: number
      state: boolean,
      totalPrice: number
      product: {
        productName: String
        imageUrl: String
      }
    }
  ]
}
