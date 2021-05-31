# Interface Segregation Principle (ISP)

Clientes não devem ser forçados a depender de interfaces que não utilizam.

Em outras palavras, o principio prega que uma interface não deve forçar uma classe a implementar coisas que ela não irá utilizar.

Abaixo será apresentado um exemplo discutido inicialmente na aula, para expor problemas e algumas incoerências que uma interface muito grande pode gerar.

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

Para o nosso exemplo é importate também que as classes tenham métodos `get` para o nome e para o número de identificação, seja ele CPF ou CNPJ. E para isso vamos criar mais uma interface.

~~~ typescript
export interface CustomerOrder {
  getName(): string
  getIdNumber(): string
}
~~~

Agora fazemos as classes `IndividualCustomer` e `EnterpriseCustomer` implementarem também a `CustomerOrder`

E, finalmente, assim temos os arquios:

##### `customer-protocol.ts`
~~~ typescript
export interface CustomerOrder {
  getName(): string
  getIdNumber(): string
}

export interface IndividualCustomerProtocol {
  firstName: string
  lastName: string
  cpf: string
}

export interface EnterpriseCustomerProtocol {
  name: string
  cnpj: string
}
~~~


##### `customer.ts`
~~~ typescript
import {
  IndividualCustomerProtocol,
  EnterpriseCustomerProtocol,
  CustomerOrder,
} from './interfaces/customer-protocol'


export class IndividualCustomer implements IndividualCustomerProtocol, CustomerOrder {
  firstName: string
  lastName: string
  cpf: string

  constructor(firstName: string, lastName: string, cpf: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.cpf = cpf
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`
  }
  getIdNumber(): string {
    return this.cpf
  }

}

export class EnterpriseCustomer implements EnterpriseCustomerProtocol, CustomerOrder {
  name: string
  cnpj: string

  constructor(name: string, cnpj: string) {
    this.name = name
    this.cnpj = cnpj
  }

  getName(): string {
    return this.name
  }
  getIdNumber(): string {
    return this.cnpj
  }

}
~~~
