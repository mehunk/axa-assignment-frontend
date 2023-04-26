import { rest } from 'msw'

import vehicleTypes from './vehicle-types.json'
import products from './products.json'
import insuranceQuote from './insurance-quote.json'

const api = (path) => {
  return new URL(path, process.env.VITE_BASE_URL).toString()
}

export const handlers = [
  rest.get(api('/vehicle-types'), (req, res, ctx) => {
    return res(ctx.delay(100), ctx.json(vehicleTypes))
  }),

  rest.get(api('/vehicle-types/:vehicleTypeId/products'), (req, res, ctx) => {
    return res(ctx.json(products))
  }),

  rest.get(api('/insurance-quotes/:id'), (req, res, ctx) => {
    return res(ctx.delay(100), ctx.json(insuranceQuote))
  })
]
