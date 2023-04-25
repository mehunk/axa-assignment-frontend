import styled from 'styled-components'
import FixedHeader from '@/components/FixedHeader/FixedHeader'

const LogoPlaceholder = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.2);
`

function Header (): JSX.Element {
  return (
    <FixedHeader>
      <LogoPlaceholder />
    </FixedHeader>
  )
}

export default Header
