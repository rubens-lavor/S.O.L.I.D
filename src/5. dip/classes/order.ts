import { OrderStatus } from './interfaces/order-status'
import { CustomerOrder } from './interfaces/customer-protocol'
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol'
import { MessagingProtocol } from './interfaces/messaging-protocol'
import { PersistencyProcotol } from './interfaces/persistency-protocol'

export class Order {
  private _orderStatus: OrderStatus = 'open'

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly message: MessagingProtocol,
    private readonly persistency: PersistencyProcotol,
    private readonly customer: CustomerOrder,
  ) {}

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
      `Seu pedido com total de ${this.cart.totalWithDiscount()} foi recebido`,
    )
    this.persistency.saveOrder()
    this.cart.clear()

    console.log(
      'O cliente é: ',
      this.customer.getName(),
      this.customer.getIdNumber(),
    )
  }
}
