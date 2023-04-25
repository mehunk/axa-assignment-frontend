import styled from 'styled-components'
import { Col, Row, Button } from 'antd'

import ProductOption from '@/components/ProductOption/ProductOption.tsx'

const Title = styled.h2`
  margin-bottom: 32px;
  font-size: 2rem;
`

const NextStepButton = styled(Button)`
  margin-top: 32px;
`

interface Props {
  products: Product[]
  selectedProductId: number | null
  onSelectProduct: (productId: number) => void
  onNextStep: () => void
}

function ProductSelection ({ products, selectedProductId, onSelectProduct, onNextStep }: Props): JSX.Element {
  return (
    <>
      <Title>Please select a product</Title>
      <Row gutter={16}>
        {
          products.map((product) => (
            <Col
              span={8}
              key={product.id}
            >
              <div onClick={() => { onSelectProduct(product.id) }}>
                <ProductOption
                  product={product}
                  selected={product.id === selectedProductId}
                />
              </div>
            </Col>
          ))
        }
      </Row>
      <NextStepButton
        type="primary"
        onClick={onNextStep}
        disabled={selectedProductId === null}
      >
        Next
      </NextStepButton>
    </>
  )
}

export default ProductSelection
