type CartItem = {
  name: string
  price: number
}

export class ShoppingCart {
  private readonly _items: CartItem[] = []

  addItem(item: CartItem): void {
    this._items.push(item)
  }

  removeItem(index: number): void {
    this._items.splice(index, 1)
  }
}
