import { render, screen, renderHook, userEvent, waitFor } from '@/test-utils.tsx'
import { Form, type FormInstance } from 'antd'
import { vi, type Mock } from 'vitest'
import dayjs from 'dayjs'

import vehicleTypes from '@mocks/vehicle-types.json'
import BasicForm from './BasicForm'

const initFields = [
  {
    name: 'vehicleTypeId',
    value: ''
  },
  {
    name: 'productId',
    value: ''
  },
  {
    name: 'customerName',
    value: ''
  },
  {
    name: 'customerPhone',
    value: ''
  },
  {
    name: 'customerEmail',
    value: ''
  },
  {
    name: 'customerAge',
    value: ''
  },
  {
    name: 'vehicleModel',
    value: ''
  },
  {
    name: 'licensePlate',
    value: ''
  },
  {
    name: 'startDate',
    value: ''
  }
]

describe('BasicForm', () => {
  let form: FormInstance
  let onChange: Mock
  let onNextStep: Mock

  beforeEach(() => {
    ({ result: { current: [form] } } = renderHook(() => Form.useForm()))
    onChange = vi.fn()
    onNextStep = vi.fn()
  })

  it('renders the form', () => {
    render(
      <BasicForm
        form={form}
        fields={initFields}
        vehicleTypes={vehicleTypes}
        onChange={onChange}
        onNextStep={onNextStep}
      />
    )

    expect(screen.getByLabelText('Vehicle Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText('Vehicle Model')).toBeInTheDocument()
    expect(screen.getByLabelText('License Plate')).toBeInTheDocument()
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument()
  })

  it('validates the form', async () => {
    render(
      <BasicForm
        form={form}
        fields={initFields}
        vehicleTypes={vehicleTypes}
        onChange={onChange}
        onNextStep={onNextStep}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText('Please select a vehicle type!')).toBeInTheDocument()
    expect(screen.getByText('Please input your name!')).toBeInTheDocument()
    expect(screen.getByText('Please input your phone number!')).toBeInTheDocument()
    expect(screen.getByText('Please input your email address!')).toBeInTheDocument()
    expect(screen.getByText('Please input your age!')).toBeInTheDocument()
    expect(screen.getByText('Please input your vehicle model!')).toBeInTheDocument()
    expect(screen.getByText('Please input your license plate!')).toBeInTheDocument()
    expect(screen.getByText('Please select the start date for the insurance quote!')).toBeInTheDocument()
    // TODO: fix this test
    expect(onNextStep).not.toHaveBeenCalled()
  })

  it('calls onChange when the form changes', async () => {
    render(
      <BasicForm
        form={form}
        fields={initFields}
        vehicleTypes={vehicleTypes}
        onChange={onChange}
        onNextStep={onNextStep}
      />
    )

    await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
    expect(onChange).toHaveBeenCalled()
  })

  it('calls onNextStep when the form is valid and the Next button is clicked', async () => {
    const fields = [
      {
        name: 'vehicleTypeId',
        value: 1
      },
      {
        name: 'productId',
        value: 2
      },
      {
        name: 'customerName',
        value: '1'
      },
      {
        name: 'customerPhone',
        value: '2'
      },
      {
        name: 'customerEmail',
        value: '3@163.com'
      },
      {
        name: 'customerAge',
        value: 4
      },
      {
        name: 'vehicleModel',
        value: '5'
      },
      {
        name: 'licensePlate',
        value: '6'
      },
      {
        name: 'startDate',
        value: dayjs().add(1, 'day')
      }
    ]
    form.validateFields = vi.fn().mockResolvedValue(undefined)

    render(
      <BasicForm
        form={form}
        fields={fields}
        vehicleTypes={vehicleTypes}
        onChange={onChange}
        onNextStep={onNextStep}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() => { expect(onNextStep).toHaveBeenCalled() })
  })
})
