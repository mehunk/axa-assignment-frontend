import styled from 'styled-components'
import { Spin } from 'antd'

const LoadingPage = styled.div`
  height: calc(100vh - 64px - 48px - 48px);
  display: flex;
  justify-content: center;
  align-items: center;
`

function PageLoading (): JSX.Element {
  return (
    <LoadingPage>
      <Spin size="large" />
    </LoadingPage>
  )
}

export default PageLoading
