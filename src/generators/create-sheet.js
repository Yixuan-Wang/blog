const path = require('path');

exports.createSheet = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query QueryCreateSheet {
      allMarkdownRemark(filter: { fields: { quarter: { eq: "sheets" } } }) {
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

  const sheetsEdges = result.data.allMarkdownRemark.edges;
  sheetsEdges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/sheet.js`),
      context: {
        slug: node.fields.slug,
        quarter: node.fields.quarter,
      },
    });
  });
};
