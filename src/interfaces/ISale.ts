export interface Sale {
  id?: string
  name: string
  description: string
  totalPrice?: number
  items?: SaleItem[]
}

export interface SaleItem {
  id?: string
  quantity: number
  price: number
  productId?: string
}
