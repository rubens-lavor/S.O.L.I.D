type CartItem = {
  name: string
  price: number
}

type OrderStatus = 'open' | 'closed'

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = []
  private _orderStatus: OrderStatus = 'open'

  addItem(item: CartItem): void {
    this._items.push(item)
  }

  removeItem(index: number): void {
    this._items.splice(index, 1)
  }

  get items(): Readonly<CartItem[]> {
    return this._items
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus
  }

  total(): number {
    return this._items.reduce((total, next) => total + next.price, 0)
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('seu carrinho está vazio')
      return
    }

    this._orderStatus = 'closed'
    this.sendMessage(`Seu pedido com total de ${this.total()} foi recebido`)
    this.saveOrder()
    this.clear()
  }

  clear(): void {
    console.log('Carrinho de compras foi esvaziado')
    this._items.length = 0
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso')
  }

  sendMessage(msg: string): void {
    console.log('Mensagem enviada: ', msg)
  }

  isEmpty(): boolean {
    return this._items.length === 0
  }
}

const shoppingCartLegacy = new ShoppingCartLegacy()
shoppingCartLegacy.addItem({ name: 'Camiseta', price: 49.91 })
shoppingCartLegacy.addItem({ name: 'Caderno', price: 9.91 })
shoppingCartLegacy.addItem({ name: 'Lapis', price: 1.59 })

console.log(shoppingCartLegacy.items)
console.log(shoppingCartLegacy.total())
console.log(shoppingCartLegacy.orderStatus)
shoppingCartLegacy.checkout()
console.log(shoppingCartLegacy.orderStatus)
