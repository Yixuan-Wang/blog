import React from 'react';
import { graphql, Link } from 'gatsby';

import SEO from '../components/SEO';
import '../styles/templates/category.scss';

export default function Category({ pageContext, data }) {
  const { category } = pageContext;
  const tagGroup = data.allMarkdownRemark.group;
  const tags = data.allMarkdownRemark.tags;

  return (
    <>
      <SEO title={category} />
      <h1>{category}</h1>
      <section>
        <div className="tags-group">
          {tags.map(tag => {
            return (
              <span key={tag} className="tags-group-item">
                <a
                  className="tags-group-item-link"
                  href={`#${tag}`}
                >
                  @{tag}
                </a>
              </span>
            );
          })}
        </div>
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
                    to={`/${fields.slug}`}
                  >
                    {frontmatter.title}
                  </Link>
                  <span className="posts-group-item-chips">
                    {frontmatter.keywords && frontmatter?.keywords.map((keyword) => (
                      <span key={keyword} style={{color: `var(--clr-dm)`}}>
                        #{keyword}
                      </span>
                    ))}
                  </span>
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
            keywords
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
