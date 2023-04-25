interface Product {
  id: number
  name: string
  description: string | null
  deductible: number
  policyLimit: number
  vehicleTypeId: number
  premium: number
  days: number
}

type ProductMap = Record<number, Product>
