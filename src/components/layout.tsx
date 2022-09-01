import * as React from 'react'
import styled from 'styled-components'
import TopNav from './TopNav'

type Props = {
  title: string
  location: Location
  children: React.ReactNode
}

const Layout = ({ title, location, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <TopNav title={title} />

      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <Footer>
          <span className="shell">Yeongjin Lee #</span> Code with me.
          <span className="cursor">_</span>
        </Footer>
      </div>
    </div>
  )
}

const Footer = styled.footer`
  .shell {
    color: var(--color-text-light);
  }
  .cursor {
    color: #0f0;
    font-weight: var(--fontWeight-bold);
  }
`

export default Layout
