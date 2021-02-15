import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Chip from '../components/Chip';

function ArticleMeta({ time, taxonomies }) {
  const { category, tags, keywords } = taxonomies;

  return (
    <span className="subtitle" style={{ display: 'inline-block' }}>
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
    </span>
  );
}

ArticleMeta.propTypes = {
  time: PropTypes.string,
  taxonomies: PropTypes.shape({
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    keywords: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ArticleMeta;
