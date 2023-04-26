import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const StyledMain = styled(Layout.Content)`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
`

const StyledMainContent = styled.div`
  margin: 24px;
  min-height: calc(100vh - 64px - 48px);
  background-color: #fff;
  padding: 24px;
`

const queryClient = new QueryClient()

function Main(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledMain>
        <StyledMainContent>
          <Outlet />
        </StyledMainContent>
      </StyledMain>
    </QueryClientProvider>
  )
}

export default Main
