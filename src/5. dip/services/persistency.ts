import { PersistencyProcotol } from '../classes/interfaces/persistency-protocol'

export class Persistency implements PersistencyProcotol {
  saveOrder(): void {
    console.log('Pedido salvo com sucesso')
  }
}
