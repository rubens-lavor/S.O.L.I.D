# Single Responsibility Principle (SRP)


_“Uma classe deve ter um, e somente um, motivo para ser modificada”_

E se a classe só tem um motivo para ser modificada, certamente ela só deve ter uma única responsabilidade.


**E qual seria essa responsabilidade?**

Dentre os inumeros exemplos, podemos citar:

- regras de negócio
- persistencia
- mensageria
- validação


**Alguns benefícios do SRP:**

- Complexidade do código reduzida, mais explícita e direta;
- Facilitação da legibilidade;
- Redução de acoplamento;
- Código limpo e testável;
- Facilidade de evolução;
- Coesão das classes.


Palavra importante para esse princípio: **Coesão**.

Uma classe pode ser considerada coesa quando a mesma utiliza seus atributos dentro do seus métodos.

---
## Exemplo proposto:

Carrinho de compras, a classe contém um array de itens e status de compra como atributos. Além de métodos como adicinar um item, remover, finalizar compra e afins.

### Código Inicial:
~~~ typescript
type CartItem = {
  name: string
  price: number
}

type OrderStatus = 'open' | 'closed'

export class ShoppingCart {
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

// client code

const shoppingCart = new ShoppingCart()
shoppingCart.addItem({ name: 'Camiseta', price: 49.91 })
shoppingCart.addItem({ name: 'Caderno', price: 9.91 })
shoppingCart.addItem({ name: 'Lapis', price: 1.59 })

console.log(shoppingCart.items)
console.log(shoppingCart.total())
console.log(shoppingCart.orderStatus)
shoppingCart.checkout()
console.log(shoppingCart.orderStatus)
~~~

A pergunta é: Esta classe tem apenas uma responsabilidade?

Não! Veja que essa classe estava por exemplo salvando a ordem de comprar.

---

### Após a refatoração:

main.ts
~~~ typescript
import { ShoppingCart } from './entities/shopping-cart'
import { Order } from './entities/order'
import { Message } from './services/message'
import { Persistency } from './services/persistency'
import { Product } from './entities/product'

const shoppingCart = new ShoppingCart()
const message = new Message()
const persistency = new Persistency()

const order = new Order(shoppingCart, message, persistency)

shoppingCart.addItem(new Product('Camiseta', 49.91))
shoppingCart.addItem(new Product('Caderno', 9.91))
shoppingCart.addItem(new Product('Lapis', 1.59))

console.log(shoppingCart.items)
console.log(shoppingCart.total())

console.log(order.orderStatus)
order.checkout()
console.log(order.orderStatus)
~~~

shopping-cart.ts
~~~ typescript
import { CartItem } from './interfaces/cart-item'

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

  total(): number {
    return this._items.reduce((total, next) => total + next.price, 0)
  }

  clear(): void {
    console.log('Carrinho de compras foi esvaziado')
    this._items.length = 0
  }

  isEmpty(): boolean {
    return this._items.length === 0
  }
~~~

product.ts
~~~ typescript
import { CartItem } from './interfaces/cart-item'

export class Product implements CartItem {
  constructor(public name: string, public price: number) {}
}
~~~

order.ts

**IMPORTANTE:**
Há um problema aqui, pois Order depende de classes concretas, quando deveria depender de abstações (interfaces). Assim o código fica muito acoplado, veja que Order depende
de objetos específicos, como por exemplo um determinado carrinho de compras, quando deveria depeder qualquer carrinho de compras. Isso fere o princípio da inversão de dependencia, o "D" do SOLID.

~~~ typescript
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
~~~


cart-item.ts
~~~ typescript
export interface CartItem {
  name: string
  price: number
}
~~~

order-status.ts
~~~ typescript
export type OrderStatus = 'open' | 'closed'
~~~

message.ts
~~~ typescript
export class Message {
  sendMessage(msg: string): void {
    console.log('Mensagem enviada: ', msg)
  }
}
~~~

persistency.ts
~~~ typescript
export class Persistency {
  saveOrder(): void {
    console.log('Pedido salvo com sucesso')
  }
}
~~~
