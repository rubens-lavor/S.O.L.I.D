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
~~~


A pergunta é: Esta classe está fazendo apenas uma coisa?
