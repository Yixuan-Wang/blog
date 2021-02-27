import React from 'react';
import { Link } from 'gatsby';

import ArticleMeta from '../components/ArticleMeta';

export default function CardArticle({ article }) {
  const { title, date, category, tags, keywords } = article.frontmatter;
  const time = date;

  return (
    <section style={{ padding: '.25em .5em' }}>
      <h3 style={{ margin: '0' }}>
        <Link to={`/${article.fields.slug}`}>{title}</Link>
      </h3>
      <p style={{ margin: '0', paddingBottom: '.333em' }}>{article.excerpt}</p>
      <ArticleMeta time={time} taxonomies={{ category, tags, keywords }} />
    </section>
  );
}
