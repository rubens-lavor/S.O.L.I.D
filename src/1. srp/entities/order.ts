import { OrderStatus } from './interfaces/order-status'
import { Message } from '../services/message'
import { ShoppingCart } from './shopping-cart'
import { Persistency } from '../services/persistency'

export class Order {
  private _orderStatus: OrderStatus = 'open'

  constructor(
    private readonly cart: ShoppingCart,
    private readonly message: Message,
    private readonly persistency: Persistency,
  ) {}
  /*Dessa forma estamos ferindo o princípio de inversão de dependência*/

  get orderStatus(): OrderStatus {
    return this._orderStatus
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('seu carrinho está vazio')
      return
    }

    this._orderStatus = 'closed'
    this.message.sendMessage(
      `Seu pedido com total de ${this.cart.total()} foi recebido`,
    )
    this.persistency.saveOrder()
    this.cart.clear()
  }
}
