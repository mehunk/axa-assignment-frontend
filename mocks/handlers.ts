import { rest } from 'msw'

import vehicleTypes from './vehicle-types.json'
import products from './products.json'
import insuranceQuote from './insurance-quote.json'

export const handlers = [
  rest.get('http://localhost:3000/vehicle-types', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json(vehicleTypes)
    )
  }),

  rest.get('http://localhost:3000/vehicle-types/:vehicleTypeId/products', (req, res, ctx) => {
    return res(
      ctx.json(products)
    )
  }),

  rest.get('http://localhost:3000/insurance-quotes/:id', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json(insuranceQuote)
    )
  })
]
