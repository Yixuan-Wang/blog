import { Link } from 'gatsby';
import React from 'react';

import Chip from '../components/Chip';

export default function ArticleFront({ article }) {
  const { title, date, category, tags, keywords } = article.frontmatter;
  const time = (
    <span>
      {date}
      {/* {post.frontmatter.date == post.fields.modifiedTime
        ? ''
        : ` → ${post.fields.modifiedTime}`} */}
    </span>
  );

  return (
    <>
      <h1 style={{ marginBottom: '0' }}>{title}</h1>
      <p style={{ marginTop: '.5em' }}>
        <time style={{ marginRight: '1em' }}>{time}</time>
        <span style={{ color: 'var(--clr-ac)', fontWeight: 'bold' }}>
          <Chip>
            <Link to={`../../categories/${category}`}>{category}</Link>
          </Chip>
        </span>
        <span>
          {tags?.map(tag => (
            <Chip key={tag}>
              <Link to={`../../categories/${category}`}>{`@${tag}`}</Link>
            </Chip>
          ))}
        </span>
        <span style={{ color: 'var(--clr-dm)' }}>
          {keywords?.map(keyword => (
            <Chip key={keyword}>{`#${keyword}`}</Chip>
          ))}
        </span>
      </p>
    </>
  );
}
