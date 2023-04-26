import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Result, Button } from 'antd'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import PageLoading from '@/components/PageLoading/PageLoading.tsx'
import { getInsuranceQuote } from '@/apis/insurance-quote.ts'

const StyledInsuranceQuotePayment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function InsuranceQuotePayment(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  return InsuranceQuotePaymentCell({ insuranceQuoteId: parseInt(id as string) })
}

export function InsuranceQuotePaymentCell({
  insuranceQuoteId
}: {
  insuranceQuoteId: number
}): JSX.Element {
  const [paid, setPaid] = useState<boolean>(false)
  const {
    isLoading,
    isError,
    data: insuranceQuote
  } = useQuery({
    queryKey: ['insuranceQuote'],
    queryFn: async () => await getInsuranceQuote(insuranceQuoteId)
  })

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, something went wrong."
      />
    )
  }

  return (
    <StyledInsuranceQuotePayment>
      {paid ? (
        <Result
          status="success"
          title="Successfully Paid for Insurance Quote!"
          subTitle={`Policy number: ${insuranceQuote.policyNumber}. Your insurance quote is about to take effect, please wait.`}
        />
      ) : (
        <Button
          type="primary"
          onClick={() => {
            setPaid(true)
          }}
        >
          Fake Pay
        </Button>
      )}
    </StyledInsuranceQuotePayment>
  )
}

export default InsuranceQuotePayment
