import { ShoppingCart } from './classes/shopping-cart'
import { Order } from './classes/order'
import { Message } from './services/messaging'
import { Persistency } from './services/persistency'
import { Product } from './classes/product'
import { NoDiscount } from './classes/discount'
import { IndividualCustomer, EnterpriseCustomer } from './classes/customer'

//const fiftyPercentDiscount = new FiftyPercentDiscount()
//const tenPercentDiscount = new TenPercentDiscount()
const noDiscount = new NoDiscount()

const shoppingCart = new ShoppingCart(noDiscount)
const message = new Message()
const persistency = new Persistency()
const individualCustomer = new IndividualCustomer(
  'lucas',
  'josé',
  '000.000.000-00',
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const enterpriseCustomer = new EnterpriseCustomer(
  'Empresa X Ltda',
  'numero-cnpj',
)

const order = new Order(shoppingCart, message, persistency, individualCustomer)

shoppingCart.addItem(new Product('Camiseta', 49.91))
shoppingCart.addItem(new Product('Caderno', 9.91))
shoppingCart.addItem(new Product('Lapis', 1.59))

console.log(shoppingCart.items)
console.log(shoppingCart.total())

console.log(shoppingCart.totalWithDiscount())

console.log(order.orderStatus)
order.checkout()
console.log(order.orderStatus)
