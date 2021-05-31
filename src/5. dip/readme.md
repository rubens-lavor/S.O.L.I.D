# Dependency Inversion Principle (DIP)

Módulos de alto nível não devem deender de módulos de baixo nível. Ambos devem depender de abstrações.

Dependa de abstrações, não de implementações.

Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

Classes de baixo nível são classes que executam tarefas (os detalhes)

Classes de baixo nível são classes que gerenciam as classes de baixo nível.

**Quando maior o nível de abstração, maior é o nível da classe.**

**Quanto mais detalhes de implementção uma classe tiver, consequentemente menor é o seu nível**

---
## Exemplo proposto:

Voltando à classe `Order`. Na primeira refatoração, no diretório correspondente ao [Single Responsibility Principle](src/../../1.%20srp) foi indicado que a classe `Order` estava ferindo o princípio de inversão de dependência, pois ela dependia de classes concretas (naquele momento eram: `ShoppingCart`, `Messaging`, `Persistency`) injetadas via construtor.

Ou seja uma classe alto nível dependendo de classes concretas de baixo nível.

Sabemos que: devemos depender de abstrações, não de implementações.


Isso está gerando um problema de acomplamento, até o momento a classe `Order` e suas dependencias, "andam juntas".

Ao criar teste a necessidade de abstrair essas dependencias (resolver o problema de acoplamento) se torna latente.

~~~typescript
export class Order {

  constructor(
    private readonly cart: ShoppingCart,
    private readonly message: Messaging,
    private readonly persistency: Persistency,
    private readonly customer: CustomerOrder,
  ) {}

  // ...
}
~~~
O construtor da classe `Order` está assim, uma observação é que `CustomerOrder` é uma interface, então essa dependência está correta.

Primeiro precisamos fazer com que `ShoppingCart`, `Messaging`, `Persistency` dependam de interfaces, isso é muito simples, basta copiar a assinatura dos métodos e criar a interface correspondente:

##### `shopping-cart-protocol.ts`
~~~ typescript
import { CartItem } from './cart-item'

export interface ShoppingCartProtocol {
  items: Readonly<CartItem[]>
  addItem(item: CartItem): void
  removeItem(index: number): void
  total(): number
  totalWithDiscount(): number
  clear(): void
  isEmpty(): boolean
}
~~~

##### `messaging-protocol.ts`
~~~ typescript
export interface MessagingProtocol {
  sendMessage(msg: string): void
}
~~~

##### `persistency-protocol.ts`
~~~ typescript
export interface PersistencyProcotol {
  saveOrder(): void
}
~~~

**Assim temos:**

##### `shopping-cart.ts`
~~~ typescript
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol'

export class ShoppingCart implements ShoppingCartProtocol {

  // ...
}
~~~

##### `messaging.ts`
~~~ typescript
import { MessagingProtocol } from '../classes/interfaces/messaging-protocol'

export class Message implements MessagingProtocol {

  // ...
}
~~~

##### `persistency.ts`
~~~ typescript
import { PersistencyProcotol } from '../classes/interfaces/persistency-protocol'

export class Persistency implements PersistencyProcotol {

  // ...
}
~~~

No corpo das classes concretras nada muda, a sutileza está no contrato que uma interface impõe à classe que a implementa.

E finalmente fazendo `Order` depender das inteterfaces criadas

~~~typescript
export class Order {

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly message: MessagingProtocol,
    private readonly persistency: PersistencyProcotol,
    private readonly customer: CustomerOrder,
  ) {}

  // ...
}
~~~
