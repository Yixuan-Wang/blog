import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import ArticleFront from '../components/ArticleFront';

export default function Post({ data }) {
  const post = data.markdownRemark;

  return (
    <>
      <SEO title={post.frontmatter.title} type="article" />
      <ArticleFront article={post} />
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        category
        tags
        keywords
      }
      fields {
        modifiedTime(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
