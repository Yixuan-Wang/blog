require('dotenv').config({
  path: `.env`,
}); // Used in source-issues

const { sourceIssues } = require('./src/generators/source-issues');

const { createArticle } = require('./src/generators/create-article');
const { createCategory } = require('./src/generators/create-category');

exports.sourceNodes = sourceIssues;

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const parentNode = getNode(node.parent);
    let quarter, modifiedTime, slug;
    if (parentNode.internal.type === `File`) {
      quarter = parentNode.sourceInstanceName;
      modifiedTime = parentNode.modifiedTime;
      slug = `${quarter}/${parentNode.name}`
    } else if (parentNode.internal.type === `Issues`) {
      quarter = parentNode.quarter;
      modifiedTime = parentNode.lastEditedAt;
      slug = `${quarter}/${parentNode.title}`
    }
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'quarter', value: quarter });
    createNodeField({ node, name: 'modifiedTime', value: modifiedTime });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createArticle({ graphql, actions }, 'posts'),
    createArticle({ graphql, actions }, 'sheets'),
    createArticle({ graphql, actions }, 'talks'),
    createCategory({ graphql, actions }),
  ]);
};
