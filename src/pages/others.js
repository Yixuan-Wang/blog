import React from 'react';
import { graphql, Link } from 'gatsby';

import SEO from '../components/SEO';

export const query = graphql`
  query QueryListOthers {
    categoriesPages: allSitePage(
      filter: { context: { category: { ne: null } } }
    ) {
      nodes {
        context {
          category
        }
      }
    }
  }
`;

const ListOthersPage = ({ data }) => {
  const { categoriesPages } = data;
  const categories = categoriesPages.nodes.map(node => node.context.category);
  return (
    <div>
      <SEO title="其他" />
      <h1 className="title">其他</h1>
      <section>
        <h2>辅助页</h2>
        <ul className="posts-group">
          <li className="posts-group-item">
            <Link to="/about">关于</Link>
          </li>
          <li className="posts-group-item">
            <Link to="/friends">朋友</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>类别</h2>
        <ul className="posts-group">
          {categories.map(category => (
            <li key={category} className="posts-group-item">
              <Link to={`/categories/${category}`}>@{category}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ListOthersPage;
