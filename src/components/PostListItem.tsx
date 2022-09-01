import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import TagList from './TagList'

export interface Post {
  fields: {
    slug: string | null
  } | null
  frontmatter: {
    title: string | null
    date: string | null
    description: string | null
    tags: (string | null)[] | null
  } | null
}

interface Props {
  post: Post
}

const Date = styled.small`
  display: inline-block;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-1);
`

const PostListItem = ({ post }: Props) => {
  return (
    <article className="post-list-item" itemScope itemType="http://schema.org/Article">
      <header>
        <h2>
          <Link to={post.fields?.slug!} itemProp="url">
            {post?.frontmatter?.title}
          </Link>
        </h2>
        <Date>{post.frontmatter?.date}</Date>
        <TagList tags={post.frontmatter?.tags || []} />
      </header>
      <section>{post.frontmatter?.description}</section>
    </article>
  )
}

export default PostListItem
