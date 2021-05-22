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

  get items(): Readonly<CartItem[]> {
    return this._items
  }
}

const shoppingCart = new ShoppingCart()
shoppingCart.addItem({ name: 'Camiseta', price: 49.9 })
shoppingCart.addItem({ name: 'Caderno', price: 9.9 })
shoppingCart.addItem({ name: 'Lapis', price: 1.59 })

console.log(shoppingCart.items)
