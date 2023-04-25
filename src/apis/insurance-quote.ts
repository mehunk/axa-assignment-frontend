import http from '@/vendors/axios.ts'

export async function getInsuranceQuote (insuranceQuoteId: number): Promise<InsuranceQuote> {
  const res = await http.get<InsuranceQuote>(`/insurance-quotes/${insuranceQuoteId}`)
  return res.data
}

export async function createInsuranceQuote (insuranceQuote: CreateInsuranceQuoteDto): Promise<InsuranceQuote> {
  const res = await http.post<InsuranceQuote>('/insurance-quotes', insuranceQuote)
  return res.data
}
