import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

interface Props {
  title: string
}

const Container = styled.nav`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--color-gray-900);
`

const TopNav = ({ title }: Props) => {
  return (
    <Container>
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    </Container>
  )
}

export default TopNav
