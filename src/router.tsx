import { createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import InsuranceQuote from './pages/InsuranceQuote/InsuranceQuote.tsx'
import InsuranceQuotePayment from './pages/InsuranceQuotePayment/InsuranceQuotePayment.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'insurance-quotes/new',
        element: <InsuranceQuote />
      },
      {
        path: 'insurance-quotes/:id/payment',
        element: <InsuranceQuotePayment />
      }
    ]
  }
])

export default router
