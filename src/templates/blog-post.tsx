import * as React from 'react'
import { Link, graphql, PageProps, HeadFC } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import styled from 'styled-components'
import Seo from '../components/seo'
import Bio from '../components/bio'
import Layout from '../components/layout'
import TagList from '../components/TagList'

const Header = styled.header`
  margin-bottom: 3.5rem;
`

const Date = styled.small`
  display: inline-block;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-1);
`

const Footer = styled.footer`
  border-top: 1px solid var(--color-gray-900);
`

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}: PageProps<Queries.BlogPostBySlugQuery>) => {
  const siteTitle = site?.siteMetadata?.title || ''

  return (
    <Layout location={location} title={siteTitle}>
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <Header>
          <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
          <Date>{post?.frontmatter?.date}</Date>
          <TagList tags={post?.frontmatter?.tags || []} />
        </Header>
        <section dangerouslySetInnerHTML={{ __html: post?.html || '' }} itemProp="articleBody" />
        <Footer>
          <Bio />
        </Footer>
      </article>
      <Disqus
        config={{
          url: location.href,
          identifier: post?.id,
          title: post?.frontmatter?.title,
        }}
      />
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous?.fields?.slug!} rel="prev">
                ← {previous?.frontmatter?.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next?.fields?.slug!} rel="next">
                {next?.frontmatter?.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head: HeadFC<Queries.BlogPostBySlugQuery> = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post?.frontmatter?.title || ''}
      description={post?.frontmatter?.description || post?.excerpt || ''}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
