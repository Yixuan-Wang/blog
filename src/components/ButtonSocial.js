import React from 'react';
import Icon from './Icon';

function ButtonSocial({ socialName, href, className = '' }) {
  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon iconName={`social-${socialName}`} />
    </a>
  );
}

export default ButtonSocial;
