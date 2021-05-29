import { CartItem } from './interfaces/cart-item'
import { Discount } from './discount'

export class ShoppingCart {
  private readonly _items: CartItem[] = []

  constructor(private readonly discount: Discount) {}

  addItem(item: CartItem): void {
    this._items.push(item)
  }

  removeItem(index: number): void {
    this._items.splice(index, 1)
  }

  get items(): Readonly<CartItem[]> {
    return this._items
  }

  total(): number {
    return this._items.reduce((total, next) => total + next.price, 0)
  }

  totalWithDiscount(): number {
    return this.discount.calculate(this.total())
  }

  clear(): void {
    console.log('Carrinho de compras foi esvaziado')
    this._items.length = 0
  }

  isEmpty(): boolean {
    return this._items.length === 0
  }
}
