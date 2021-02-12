import React from 'react';
import { graphql, Link } from 'gatsby';

import SEO from '../components/SEO';

export default function Category({ pageContext, data }) {
  const { category } = pageContext;
  const tagGroup = data.allMarkdownRemark.group;
  const tags = data.allMarkdownRemark.tags;

  return (
    <>
      <SEO title={category} />
      <h1>{category}</h1>
      <section>
        <ul className="posts-group">
          {tags.map(tag => {
            return (
              <li key={tag} className="posts-group-item">
                <a
                  className="posts-group-item-link"
                  href={`#${tag}`}
                  style={{ color: `var(--clr-ac)` }}
                >
                  {tag}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
      {tagGroup.map(({ tag, nodes }) => (
        <section key={tag}>
          <h2 id={tag}>{tag}</h2>
          <ul className="posts-group">
            {nodes.map(({ frontmatter, fields }) => {
              return (
                <li key={fields.slug} className="posts-group-item">
                  <Link
                    className="posts-group-item-link"
                    to={`../../${fields.slug}`}
                  >
                    {frontmatter.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}

export const query = graphql`
  query($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      tags: distinct(field: frontmatter___tags)
      group(field: frontmatter___tags) {
        tag: fieldValue
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
