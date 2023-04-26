import { Layout, App as AntdApp } from 'antd'

import Header from '@/layouts/Header/Header'
import Main from '@/layouts/Main/Main'

function App (): JSX.Element {
  return (
    <AntdApp>
      <Layout>
        <Header />
        <Main />
      </Layout>
    </AntdApp>
  )
}

export default App
