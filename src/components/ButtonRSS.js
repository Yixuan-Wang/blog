import React from 'react';
import Icon from './Icon';

function ButtonRSS({ className = '' }) {
  return (
    <a className={className}>
      <Icon iconName="rss" />
    </a>
  );
}

export default ButtonRSS;
