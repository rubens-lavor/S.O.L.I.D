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

~~~typescript
export interface CustomerProtocol {
  firstName: string
  lastName: string
  cpf: string
  cnpj: string
}
~~~

A ideia aqui é implementar um cliente que seja pessoa física ou pessoa jurídica.

As classes ficam dessa forma:

~~~ typescript
export class IndividualCustomer implements CustomerProtocol{
  firstName: string
  lastName: string
  cpf: string
  cnpj: string

  constructor(firstName: string, lastName: string, cpf: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.cpf = cpf
    this.cnpj = ''
  }
}
~~~

~~~ typescript
export class EnterpriseCustomer implements CustomerProtocol{
  firstName: string
  lastName: string
  cpf: string
  cnpj: string

  constructor(firstName: string, lastName: string, cnpj: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.cnpj = cnpj
    this.cpf = ''
  }
}
~~~

Veja que tanto `IndividualCustomer` como `EnterpriseCustomer` estão sendo forçadas a implementar atributos que não são compatíveis com que se espera.
Uma empresa não tem CPF, assim como uma pessoa física não tem CNPJ.

Classes não devem ser forçadas a depender de interfaces que não utilizam.

A solução é muito simples: basta excluir a interface `CustomerProtocol` e criar duas interfaces mais específicas e enxutas.

~~~ typescript
export interface IndividualCustomerProtocol {
  firstName: string
  lastName: string
  cpf: string
}
~~~

~~~ typescript
export interface EnterpriseCustomerProtocol {
  name: string
  cnpj: string
}
~~~

Dessa forma a classe `IndividualCustomer` implementa `IndividualCustomerProtocol` e a classe `EnterpriseCustomer` implementa `EnterpriseCustomerProtocol`

##### `    `
~~~ typescript
export class IndividualCustomer implements IndividualCustomerProtocol {
  firstName: string
  lastName: string
  cpf: string

  constructor(firstName: string, lastName: string, cpf: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.cpf = cpf
  }
}
~~~

~~~ typescript
export class EnterpriseCustomer implements EnterpriseCustomerProtocol {
  name: string
  cnpj: string

  constructor(name: string, cnpj: string) {
    this.name = name
    this.cnpj = cnpj
  }
}
~~~

