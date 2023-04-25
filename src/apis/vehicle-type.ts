import http from '@/vendors/axios.ts'

export async function getVehicleTypes (): Promise<VehicleType[]> {
  const res = await http.get<VehicleType[]>('/vehicle-types')
  return res.data
}

export async function getProducts (vehicleTypeId: number): Promise<Product[]> {
  const res = await http.get<Product[]>(`/vehicle-types/${vehicleTypeId}/products`)
  return res.data
}
