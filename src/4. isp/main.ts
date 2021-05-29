import { ShoppingCart } from './classes/shopping-cart'
import { Order } from './classes/order'
import { Message } from './services/message'
import { Persistency } from './services/persistency'
import { Product } from './classes/product'
import { NoDiscount } from './classes/discount'

//const fiftyPercentDiscount = new FiftyPercentDiscount()
//const tenPercentDiscount = new TenPercentDiscount()
const noDiscount = new NoDiscount()

const shoppingCart = new ShoppingCart(noDiscount)
const message = new Message()
const persistency = new Persistency()

const order = new Order(shoppingCart, message, persistency)

shoppingCart.addItem(new Product('Camiseta', 49.91))
shoppingCart.addItem(new Product('Caderno', 9.91))
shoppingCart.addItem(new Product('Lapis', 1.59))

console.log(shoppingCart.items)
console.log(shoppingCart.total())

console.log(shoppingCart.totalWithDiscount())

console.log(order.orderStatus)
order.checkout()
console.log(order.orderStatus)
