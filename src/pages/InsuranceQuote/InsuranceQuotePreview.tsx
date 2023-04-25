import { Button, Form } from 'antd'
import type { FormInstance } from 'antd'

interface Props {
  vehicleType: VehicleType
  product: Product
  form: FormInstance
  loading: boolean
  onSubmit: () => void
}

function InsuranceQuotePreview ({ vehicleType, product, form, onSubmit, loading }: Props): JSX.Element {
  const items = [
    {
      label: 'Vehicle Type',
      value: vehicleType.name
    },
    {
      label: 'Customer Name',
      value: form.getFieldValue('customerName')
    },
    {
      label: 'Customer Phone',
      value: form.getFieldValue('customerPhone')
    },
    {
      label: 'Customer Mail',
      value: form.getFieldValue('customerEmail')
    },
    {
      label: 'Customer Age',
      value: form.getFieldValue('customerAge')
    },
    {
      label: 'Vehicle Model',
      value: form.getFieldValue('vehicleModel')
    },
    {
      label: 'License Plate',
      value: form.getFieldValue('licensePlate')
    },
    {
      label: 'Start Date',
      value: form.getFieldValue('startDate').format('YYYY-MM-DD')
    },
    {
      label: 'Deductible',
      value: product.deductible
    },
    {
      label: 'Policy Limit',
      value: product.policyLimit
    },
    {
      label: 'Premium',
      value: product.premium
    }
  ]
  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: 600 }}
    >
      {items.map((item) => (
        <Form.Item key={item.label} label={item.label}>
          <span className="ant-form-text">
            {item.value}
          </span>
        </Form.Item>
      ))}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default InsuranceQuotePreview
