import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from './Icon';

import '../styles/components/header.scss';

function Header({ siteTitle = ``, quarter }) {
  return (
    <header>
      <nav className="header-title">
        <Link className="header-link-title" to="/">
          {siteTitle}
        </Link>
      </nav>
      <nav className="header-tray">
        {quarter.map(quarter => (
          <Link
            key={quarter}
            className="header-link-quarter"
            to={`/${quarter}/`}
          >
            <Icon iconName={`quarter-${quarter}`} />
          </Link>
        ))}
      </nav>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  quarter: PropTypes.arrayOf(PropTypes.string),
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
