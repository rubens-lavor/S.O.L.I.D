# Interface Segregation Principle (ISP)

_""._

Princípio da segregação de interface

Os clientes não devem ser forçados a depender de interfaces que não utilizam

<hr>

**Alguns benefícios do ISP:**
-
-

---
## Exemplo proposto:

Seguindo a construção do exemplo do carrinho de compras, criamos uma interface chamada CustomerProtocol como mostrado abaixo:

`customer-protocol.ts`
~~~typescript
export interface CustomerProtocol {
  firstName: string
  lastName: string
  cpf: string
  cnpj: string
}
~~~

A ideia aqui é implementar um cliente que seja pessoa física e pessoa jurídica.


<hr>


##### `shopping-cart.ts`
~~~ typescript
~~~

---

##### `main.ts`
~~~ typescript

~~~

