interface InsuranceQuoteFormFieldData {
  name: string | number | Array<string | number>
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

interface InsuranceQuote {
  id: number
  policyNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAge: number
  vehicleModel: string
  licensePlate: string
  startDate: string
  endDate: string
  vehicleTypeId: number
  productId: number
  paid: boolean
}

type CreateInsuranceQuoteDto = Omit<InsuranceQuote, 'id' | 'endDate' | 'policyNumber' | 'paid'>
