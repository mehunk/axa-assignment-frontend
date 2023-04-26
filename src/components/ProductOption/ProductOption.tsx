import styled from 'styled-components'
import { Typography } from 'antd'

interface Props {
  product: Product
  selected?: boolean
}

interface OptionProps {
  selected: boolean
}

const Option = styled.div<OptionProps>`
  height: 500px;
  width: 400px;
  border-radius: 8px;
  box-shadow: ${(props: OptionProps) =>
    props.selected ? '0 0 0 2px #1890ff' : '0 0 8px 0 rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
`

const OptionHeader = styled.div`
  height: 200px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e9e9e9;
`

const OptionBody = styled.div`
  height: 300px;
  padding: 16px;
`

function ProductOption({ product, selected = false }: Props): JSX.Element {
  return (
    <Option selected={selected} data-testid="product-option">
      <OptionHeader>
        <Typography.Title level={3}>{product.name}</Typography.Title>
        <Typography.Title level={2}>${product.premium}</Typography.Title>
        <Typography.Text>
          <span>deductible ${product.deductible}</span>·
          <span>policy limit ${product.policyLimit}</span>·
          <span>{product.days} days</span>
        </Typography.Text>
      </OptionHeader>
      <OptionBody>Detail Description</OptionBody>
    </Option>
  )
}

export default ProductOption
