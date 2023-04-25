interface VehicleType {
  id: number
  name: string
  description: string
}

type VehicleTypeMap = Record<number, VehicleType>
