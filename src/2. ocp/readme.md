# Open Closed Principle (OCP)

_"Entidades devem estar abertas para extensão, mas fechadas para modificação"._

Em outras palavras uma classe, por exemplo, pode ter seu comportamento alterado quando necessário, mas sem alteração do seu código fonte já existente. Assim o código original permanece intacto e confiável enquanto as novas funcionalidades são implementadas através de extensibilidade, que pode ser por meio de herança, interface e composição.


<hr>

**Alguns benefícios do OCP:**
- Extensibilidade;
- Abstração.

---
## Exemplo proposto:

Usando o exemplo passado do carrinho de compras, imaginei que teríamos uma semana de promoções e que agora a cada dia um valor diferente de desconto poderia ser aplicado.


Para isso criamos um método em `ShoppingCart`, chamando `totalWithDiscount()` como a cada dia um desconto diferente é aplicado, não seria interessante ficar o tempo todo modificando esse método de acordo com o valor do desconto. Faríamos o oposto que o princípio nos diz.


A estratégia usada foi criar uma classe abstrata chamada `Discount`, com um método, também abstrato, `calculate()`.

Em seguinda criar classes concretas de descontos que herdam `Descount` e injetar o objeto dessas classes no constructor da `ShoppingCart`.

Dessa forma o método `totalWithDiscount()` só precisa chamar o `calculate()` do objeto tipo `Descount` foi foi injetado.



<hr>

##### `discount.ts`
~~~ typescript
export abstract class Discount {
  abstract calculate(value: number): number
}

export class FiftyPercentDiscount extends Discount {
  private readonly discount: number = 0.5
  calculate(price: number): number {
    return price * (1 - this.discount)
  }
}

export class TenPercentDiscount extends Discount {
  private readonly discount: number = 0.1
  calculate(price: number): number {
    return price * (1 - this.discount)
  }
}

export class NoDiscount extends Discount {
  calculate(price: number): number {
    return price
  }
}
~~~
---

##### `shopping-cart.ts`
~~~ typescript
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

~~~

---

##### `main.ts`
~~~ typescript
import { ShoppingCart } from './classes/shopping-cart'
import { Order } from './classes/order'
import { Message } from './services/message'
import { Persistency } from './services/persistency'
import { Product } from './classes/product'
import { NoDiscount } from './classes/discount'

// const fiftyPercentDiscount = new FiftyPercentDiscount()
// const tenPercentDiscount = new TenPercentDiscount()
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
~~~

Este princípio nos atenta para um melhor design, tornando o software mais extensível e facilitando sua evolução sem afetar a qualidade do que já está desenvolvido.

Para contornar o problema utilizamos um Design Pattern da GoF, chamado Strategy.
