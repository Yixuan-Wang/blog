const path = require('path');

exports.createCategory = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // eslint-disable-next-line prettier/prettier
  const result = await graphql(`#graphql
    query QueryCreateCategory {
      allMarkdownRemark {
        group(field: frontmatter___category) {
          category: fieldValue
          nodes {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  const categoryGroups = result.data.allMarkdownRemark.group;
  let categories = {};

  categoryGroups.forEach(({ category, nodes }) => {
    let tagSet = new Set();
    nodes.forEach(({ frontmatter }) => {
      frontmatter?.tags.forEach(tag => {
        tagSet.add(tag);
      });
    });
    categories[category] = [...tagSet];
    createPage({
      path: `categories/${category}`,
      component: path.resolve(`./src/templates/category.js`),
      context: {
        category,
      },
    });
  });
};
