const path = require('path');

exports.createArticle = async ({ graphql, actions }, quarter) => {
  const { createPage } = actions;

  // eslint-disable-next-line prettier/prettier
  const result = await graphql(`#graphql
    query QueryCreateArticles {
      allMarkdownRemark(filter: { fields: { quarter: { eq: "${quarter}" } } }) {
        edges {
          node {
            fields {
              slug
              quarter
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);
  const articlesEdges = result.data.allMarkdownRemark.edges;
  articlesEdges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/${quarter.slice(0, -1)}.js`),
      context: {
        slug: node.fields.slug,
        quarter: node.fields.quarter,
      },
    });
  });
};
