import { CustomerProtocol } from './interfaces/customer-protocol'

export class IndividualCustomer implements CustomerProtocol {
  firstName: string
  lastName: string
  cpf: string
  cnpj: string
}

export class EnterpriseCustomer implements CustomerProtocol {
  firstName: string
  lastName: string
  cpf: string
  cnpj: string
}
