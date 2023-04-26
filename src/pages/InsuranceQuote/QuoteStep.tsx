import styled from 'styled-components'
import { Steps } from 'antd'
import type { InsuranceQuoteCurrentStep } from '@/constants/insurance-quote-step.ts'

const StyledSteps = styled(Steps)`
  max-width: 1024px;
  margin-bottom: 60px;
`

interface Props {
  currentStep: InsuranceQuoteCurrentStep
}

function QuoteStep({ currentStep }: Props): JSX.Element {
  const items = [
    {
      title: 'Basic',
      description: 'Basic information'
    },
    {
      title: 'Product',
      description: 'Product selection'
    },
    {
      title: 'Preview',
      description: 'Form Preview'
    }
  ]

  return <StyledSteps current={currentStep} items={items} />
}

export default QuoteStep
