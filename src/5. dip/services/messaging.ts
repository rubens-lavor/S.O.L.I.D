import { MessagingProtocol } from '../classes/interfaces/messaging-protocol'

export class Message implements MessagingProtocol {
  sendMessage(msg: string): void {
    console.log('Mensagem enviada: ', msg)
  }
}
