export interface Payments {
  id: string
  date: string
  company: string
  operationArea: string
  category: string
  thirdParty: string
  operationValue: number
  paymentStatus: string
  incomeOrExpense: string
  paymentMethod: string
  hasBudget: boolean
  invoiceUrl: any
  supportUrl: any
  traceability: Traceability[]
}

export interface Traceability {
  user: string
  date: string
  note: string
}
