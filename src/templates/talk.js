import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import ArticleFront from '../components/ArticleFront';

export default function Talk({ data }) {
  const talk = data.markdownRemark;

  return (
    <>
      <SEO title={talk.frontmatter.title} type="article" />
      <ArticleFront article={talk} />
      <article dangerouslySetInnerHTML={{ __html: talk.html }} />
    </>
  );
}

export const query = graphql`
  query QueryCreateTalk($slug: String!) {
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
