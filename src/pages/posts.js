import React from 'react';
import { graphql, Link } from 'gatsby';
import groupBy from 'lodash/groupBy';

import SEO from '../components/SEO';

import '../styles/pages/posts.scss';

export const query = graphql`
  query QueryListPosts {
    allMarkdownRemark(
      filter: { fields: { quarter: { eq: "posts" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "M/D")
            year: date(formatString: "Y")
            category
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

const ListPostsPage = ({ data }) => {
  const postsList = data.allMarkdownRemark.edges;
  const yearGroup = groupBy(postsList, ({ node }) => node.frontmatter.year);

  return (
    <div>
      <SEO title="文章" />
      <h1>文章</h1>
      {Object.keys(yearGroup)
        .sort((a, b) => b - a)
        .map(year => (
          <section key={year}>
            <h2>{year}</h2>
            <ul className="posts-group">
              {yearGroup[year].map(({ node }) => (
                <li key={node.id} className="posts-group-item">
                  <span className="posts-group-item-date">
                    {node.frontmatter.date}
                  </span>
                  <Link
                    className="posts-group-item-link"
                    to={`/${node.fields.slug}`}
                  >
                    {node.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
};

export default ListPostsPage;
