import { keyBy } from 'lodash-es'
import { useState } from 'react'
import styled from 'styled-components'
import { Form, App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'

import { getVehicleTypes, getProducts } from '@/apis/vehicle-type.ts'
import { createInsuranceQuote } from '@/apis/insurance-quote.ts'
import QuoteStep from './QuoteStep.tsx'
import BasicForm from './BasicForm.tsx'
import ProductSelection from './ProductSelection.tsx'
import InsuranceQuotePreview from './InsuranceQuotePreview.tsx'
import { InsuranceQuoteCurrentStep } from '@/constants/insurance-quote-step.ts'

const StyledInsuranceQuote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const initFields = [
  'vehicleTypeId',
  'productId',
  'customerName',
  'customerPhone',
  'customerEmail',
  'customerAge',
  'vehicleModel',
  'licensePlate',
  'startDate'
].map((name) => ({
  name,
  value: ''
}))

function InsuranceQuote (): JSX.Element {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState<InsuranceQuoteCurrentStep>(0)
  const [fields, setFields] = useState<InsuranceQuoteFormFieldData[]>(initFields)
  const selectedVehicleTypeId = form.getFieldValue('vehicleTypeId')
  const selectedProductId = form.getFieldValue('productId')
  const { data: vehicleTypes } = useQuery({
    queryKey: ['vehicleTypes'],
    queryFn: getVehicleTypes,
    initialData: []
  })
  const { data: products } = useQuery({
    queryKey: ['products', selectedVehicleTypeId],
    queryFn: async () => await getProducts(selectedVehicleTypeId),
    initialData: [],
    enabled: Boolean(selectedVehicleTypeId)
  })
  const vehicleMap = keyBy(vehicleTypes, 'id')
  const productMap = keyBy(products, 'id')

  const mutation = useMutation({
    mutationFn: createInsuranceQuote,
    onSuccess: (data) => {
      void message.success('Insurance quote created successfully!')
      navigate(`/insurance-quotes/${data.id}/payment`)
    }
  })

  const onSubmit = (): void => {
    const createInsuranceQuoteDto: Partial<CreateInsuranceQuoteDto> = {
      startDate: form.getFieldValue('startDate').format('YYYY-MM-DD')
    }

    ;['vehicleTypeId',
      'productId',
      'customerName',
      'customerPhone',
      'customerEmail',
      'customerAge',
      'vehicleModel',
      'licensePlate'
    ].forEach((key) => {
      createInsuranceQuoteDto[key as keyof (CreateInsuranceQuoteDto)] = form.getFieldValue(key)
    })

    mutation.mutate(createInsuranceQuoteDto as CreateInsuranceQuoteDto)
  }

  return (
    <StyledInsuranceQuote>
      <QuoteStep currentStep={currentStep}/>
      {currentStep === InsuranceQuoteCurrentStep.Basic && (
        <BasicForm
          vehicleTypes={vehicleTypes}
          form={form}
          fields={fields}
          onChange={(fields) => {
            setFields(fields)
          }}
          onNextStep={() => {
            setCurrentStep(1)
          }}
        />
      )}
      {
        currentStep === InsuranceQuoteCurrentStep.ProductSelection && (
          <ProductSelection
            products={products}
            selectedProductId={selectedProductId}
            onSelectProduct={(productId) => {
              form.setFieldsValue({ productId })
              // manually trigger re-render
              setFields([...fields])
            }}
            onNextStep={() => {
              setCurrentStep(2)
            }}
          />
        )
      }
      {
        currentStep === InsuranceQuoteCurrentStep.Preview && Boolean(selectedVehicleTypeId) && Boolean(selectedProductId) && (
          <InsuranceQuotePreview
            form={form}
            vehicleType={vehicleMap[selectedVehicleTypeId]}
            product={productMap[selectedProductId]}
            loading={mutation.isLoading}
            onSubmit={onSubmit}
          />
        )
      }
    </StyledInsuranceQuote>
  )
}

export default InsuranceQuote
