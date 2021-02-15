import React from 'react';

import ArticleMeta from '../components/ArticleMeta';

export default function ArticleFront({ article }) {
  const { title, date, category, tags, keywords } = article.frontmatter;

  return (
    <>
      <h1 className="title" style={{ marginBottom: '0' }}>
        {title}
      </h1>
      <ArticleMeta
        className="subtitle"
        time={date}
        taxonomies={{ category, tags, keywords }}
      />
    </>
  );
}
