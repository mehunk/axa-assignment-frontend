import { render, screen } from '@/test-utils.tsx'

import product from '@mocks/product.json'
import ProductOption from './ProductOption'

describe('ProductOption', () => {
  it('renders correctly', () => {
    render(<ProductOption product={product} />)

    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(`$${product.premium}`)).toBeInTheDocument()
    expect(screen.getByText(`deductible $${product.deductible}`)).toBeInTheDocument()
    expect(screen.getByText(`policy limit $${product.policyLimit}`)).toBeInTheDocument()
    expect(screen.getByText(`${product.days} days`)).toBeInTheDocument()
    expect(screen.getByTestId('product-option')).toHaveStyle('box-shadow: 0 0 8px 0 rgba(0,0,0,0.1)')
  })

  it('can highlight the selected product', () => {
    render(<ProductOption product={product} selected={true} />)

    expect(screen.getByTestId('product-option')).toHaveStyle('box-shadow: 0 0 0 2px #1890ff')
  })
})
