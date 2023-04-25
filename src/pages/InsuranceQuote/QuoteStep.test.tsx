import { render, screen } from '@/test-utils.tsx'

import QuoteStep from './QuoteStep'

describe('QuoteStep', () => {
  it('should render the QuoteStep component', () => {
    const { container } = render(<QuoteStep currentStep={1} />)
    const stepChildren = [...container.getElementsByClassName('ant-steps-item')]

    expect(screen.getByText('Basic')).toBeInTheDocument()
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
    expect(stepChildren[1]).toHaveClass('ant-steps-item-active')
  })
})
