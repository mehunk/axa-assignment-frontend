import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import FixedHeader from '@/components/FixedHeader/FixedHeader'

const LogoPlaceholder = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.2);
`

function Header(): JSX.Element {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <FixedHeader>
      <LogoPlaceholder />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        items={[
          {
            key: '/insurance-quotes/new',
            label: 'Insurance Quote'
          }
        ]}
        onClick={({ key }) => navigate(key)}
      />
    </FixedHeader>
  )
}

export default Header
