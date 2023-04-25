import { render, screen, userEvent } from '@/test-utils.tsx'

import InsuranceQuotePayment from './InsuranceQuotePayment.tsx'

describe('InsuranceQuotePayment', () => {
  it('renders correctly', async () => {
    render(<InsuranceQuotePayment />)

    expect(await screen.findByText('Fake Pay')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Fake Pay'))

    expect(await screen.findByText('Successfully Paid for Insurance Quote!')).toBeInTheDocument()
  })
})
