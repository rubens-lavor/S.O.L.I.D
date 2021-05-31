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
