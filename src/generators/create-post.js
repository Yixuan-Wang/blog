const path = require('path');

exports.createPost = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query QueryCreatePost {
      allMarkdownRemark(filter: { fields: { quarter: { eq: "posts" } } }) {
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

  const postsEdges = result.data.allMarkdownRemark.edges;
  postsEdges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.fields.slug,
        quarter: node.fields.quarter,
      },
    });
  });
};
