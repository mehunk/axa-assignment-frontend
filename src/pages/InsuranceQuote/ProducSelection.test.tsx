import { vi } from 'vitest'
import { render, screen, userEvent } from '@/test-utils.tsx'

import products from '@mocks/products.json'
import ProductSelection from './ProductSelection.tsx'

describe('ProductSelection', () => {
  it('should display product options', () => {
    render(
      <ProductSelection
        products={products}
        selectedProductId={3}
        onSelectProduct={vi.fn()}
        onNextStep={vi.fn()}
      />
    )

    expect(screen.getByText('basic')).toBeInTheDocument()
    expect(screen.getByText('premium')).toBeInTheDocument()
    expect(screen.getByText('empire')).toBeInTheDocument()
  })

  it('should call the onSelectProduct and onNextStep', async () => {
    const onSelectProduct = vi.fn()
    const onNextStep = vi.fn()
    render(
      <ProductSelection
        products={products}
        selectedProductId={3}
        onSelectProduct={onSelectProduct}
        onNextStep={onNextStep}
      />
    )

    await userEvent.click(screen.getByText('basic'))
    expect(onSelectProduct).toHaveBeenCalledWith(1)
    await userEvent.click(screen.getByText('Next'))
    expect(onNextStep).toHaveBeenCalled()
  })
})
