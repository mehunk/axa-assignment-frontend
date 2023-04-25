import styled from 'styled-components'
import { Layout } from 'antd'

const { Header: AntdHeader } = Layout

const FixedHeader = styled(AntdHeader)`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
`

export default FixedHeader
