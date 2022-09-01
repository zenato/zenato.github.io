import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import PostListItem, { Post } from '../components/PostListItem'

const BlogIndex = ({ data, location }: PageProps<Queries.AllPostsQuery>) => {
  const siteTitle = data.site?.siteMetadata?.title || ''
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>등록된 게시물이 없습니다</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ listStyle: `none` }}>
        {posts?.map(post => (
          <PostListItem post={post as Post} />
        ))}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo />

export const pageQuery = graphql`
  query AllPosts {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
