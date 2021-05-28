# Liskov Substitution Principle (LSP)

_" Se $\phi(x)$ é uma propriedade demonstrável dos objetos $x$ de tipo $T$. Então $\phi(y)$ deve ser verdadeiro para objetos $y$ de tipo $S$ onde $S$ é um subtipo de $T$"._

Subtipos precisam ser substituíveis por seus tipo de base.

Suponha um programa que espera um tipo Animal, algo do tipo Cachorro (que herda de Animal) deve servir para o programa, assim como qualquer outro Animal.

---
## Exemplo proposto:

Continuando com o exemplo passado: Suponha que em `discount.ts`, na classe `NoDiscount` tivéssemos sobrescrito o método `calculate()` da super classe. De forma sutil estaríamos quebrando o LSP, pois em algum momento dentro do código haveria a necessidade de checar o tipo, mesmo esse tipo tendo herdado `Discount`, pois `NoDiscount` implementa do método `calculate()` de outra forma e com isso o tipo de retorno e/ou o comportamento esperado, podem não ser compatíveis.

<hr>

##### `discount.ts`
~~~ typescript
export abstract class Discount {
  protected discount = 0

  calculate(price: number): number {
    return price * (1 - this.discount)
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount: number = 0.5
}

export class TenPercentDiscount extends Discount {
  protected readonly discount: number = 0.1
}

export class NoDiscount extends Discount {
  calculate(price: number): number {
    return price
  }
}
~~~

Nesse caso o resultado seria o mesmo, mas como dito antes estaríamos quebrando o princípio de substituição de Liskov, de maneira bem sutil, sem violar a tipagem.
