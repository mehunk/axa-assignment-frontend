import dayjs from 'dayjs'
import { Button, DatePicker, Form, Input, Select, InputNumber } from 'antd'
import type { FormInstance } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'

interface Props {
  form: FormInstance
  fields: InsuranceQuoteFormFieldData[]
  vehicleTypes: VehicleType[]
  onChange: (fields: InsuranceQuoteFormFieldData[]) => void
  onNextStep: () => void
}

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current < dayjs().endOf('day')
}

function BasicForm ({ onChange, fields, onNextStep, form, vehicleTypes }: Props): JSX.Element {
  const nextStep = async (): Promise<void> => {
    try {
      await form.validateFields()
    } catch (_) {
      return
    }
    onNextStep()
  }

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: 600 }}
      autoComplete="off"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields)
      }}
    >
      <Form.Item
        label="Vehicle Type"
        name="vehicleTypeId"
        rules={[{ required: true, message: 'Please select a vehicle type!' }]}
      >
        <Select
          style={{ width: 120 }}
          options={vehicleTypes.map((vehicleType) => ({
            label: vehicleType.name,
            value: vehicleType.id
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Name"
        name="customerName"
        rules={[
          { required: true, message: 'Please input your name!' },
          { max: 20, message: 'Name must be up to 20 characters!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="customerPhone"
        rules={[
          { required: true, message: 'Please input your phone number!' },
          { max: 20, message: 'Phone number must be up to 20 characters!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="customerEmail"
        rules={[
          { required: true, message: 'Please input your email address!' },
          { type: 'email', message: 'Please input a valid email address!' },
          { max: 50, message: 'Email address must be up to 50 characters!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Age"
        name="customerAge"
        rules={[
          { required: true, message: 'Please input your age!' },
          { type: 'number', min: 18, max: 100, message: 'Age must be between 18 and 100!' }
        ]}
      >
        <InputNumber min={18} max={100} />
      </Form.Item>

      <Form.Item
        label="Vehicle Model"
        name="vehicleModel"
        rules={[
          { required: true, message: 'Please input your vehicle model!' },
          { max: 50, message: 'Vehicle model must be up to 50 characters!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="License Plate"
        name="licensePlate"
        rules={[
          { required: true, message: 'Please input your license plate!' },
          { max: 50, message: 'License plate must be up to 20 characters!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Start Date"
        name="startDate"
        rules={[{ required: true, message: 'Please select the start date for the insurance quote!' }]}
      >
        <DatePicker disabledDate={disabledDate} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={nextStep}>
          Next
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BasicForm
