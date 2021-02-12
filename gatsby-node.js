const { createPost } = require('./src/generators/create-post');
const { createSheet } = require('./src/generators/create-sheet');
const { createCategory } = require('./src/generators/create-category');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const slug = `${fileNode.sourceInstanceName}/${fileNode.name}`;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'quarter',
      value: fileNode.sourceInstanceName,
    });
    createNodeField({
      node,
      name: 'modifiedTime',
      value: fileNode.modifiedTime,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createPost({ graphql, actions }),
    createSheet({ graphql, actions }),
    createCategory({ graphql, actions }),
  ]);
};
