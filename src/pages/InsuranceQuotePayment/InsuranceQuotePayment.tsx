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

function InsuranceQuotePayment (): JSX.Element {
  const params = useParams<{ id: string }>()
  const [paid, setPaid] = useState<boolean>(false)
  const { isLoading, isSuccess, data: insuranceQuote } = useQuery({
    queryKey: ['insuranceQuote'],
    queryFn: async () => await getInsuranceQuote(+(params.id as string))
  })

  if (isLoading) {
    return <PageLoading />
  }

  if (isSuccess) {
    return (
      <StyledInsuranceQuotePayment>
        {paid
          ? (
          <Result
            status="success"
            title="Successfully Paid for Insurance Quote!"
            subTitle={`Policy number: ${insuranceQuote.policyNumber}. Your insurance quote is about to take effect, please wait.`}
          />
            )
          : <Button type="primary" onClick={() => { setPaid(true) }}>Fake Pay</Button>
        }

      </StyledInsuranceQuotePayment>
    )
  } else {
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, something went wrong."
    />
  }
}

export default InsuranceQuotePayment
