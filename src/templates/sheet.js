import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import ArticleFront from '../components/ArticleFront';

export default function Sheet({ data }) {
  const sheet = data.markdownRemark;

  return (
    <>
      <SEO title={sheet.frontmatter.title} type="article" />
      <ArticleFront article={sheet} />
      <article dangerouslySetInnerHTML={{ __html: sheet.html }} />
    </>
  );
}

export const query = graphql`
  query QueryCreateSheet($slug: String!) {
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
