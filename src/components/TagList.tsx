import { Link } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  tags: readonly (string | null)[]
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* height: 2.6rem; */
  padding: 0.5rem 0;
`

const TagItem = styled(Link)`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  background-color: var(--color-gray-900);
  color: var(--color-primary);
  border-radius: 0.8rem;
  text-decoration: none;
  & + & {
    margin-left: 0.3rem;
  }
`

const TagList = ({ tags }: Props) => {
  return (
    <Container>
      {tags.map(tag => (
        <TagItem to={`/tags/${tag}`}>{tag}</TagItem>
      ))}
    </Container>
  )
}

export default TagList
