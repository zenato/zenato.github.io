import * as React from 'react'
import { graphql, HeadProps, PageProps } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PostListItem, { Post } from '../components/PostListItem'

interface PageContext {
  tag: string
}

const Tags: React.FC<PageProps<Queries.TagsQuery, PageContext>> = ({
  data: { site, allMarkdownRemark },
  location,
  pageContext,
}) => {
  const { tag } = pageContext
  const siteTitle = site?.siteMetadata?.title || ''
  const { nodes: posts, totalCount } = allMarkdownRemark

  return (
    <Layout location={location} title={siteTitle}>
      <div>
        "{tag}" 로 검색된 {totalCount}개의 게시물
      </div>
      <PostList>
        {posts?.map(post => (
          <PostListItem post={post as Post} />
        ))}
      </PostList>
    </Layout>
  )
}

const PostList = styled.ol`
  list-style: none;
`

export default Tags

export const Head = ({ pageContext }: HeadProps<Queries.TagsQuery, PageContext>) => (
  <Seo title={`"${pageContext.tag}" 검색 결과`} />
)

export const pageQuery = graphql`
  query Tags($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        id
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          tags
        }
      }
    }
  }
`
