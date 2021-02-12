/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../components/TheHeader';

import '../styles/layouts/layout.scss';
import Footer from '../components/TheFooter';

const TheLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query QueryTheLayout {
      site {
        siteMetadata {
          title
          quarter
        }
      }
    }
  `);

  return (
    <div>
      <div className="layout">
        <Header
          siteTitle={data.site.siteMetadata.title}
          quarter={data.site.siteMetadata.quarter}
        />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

TheLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TheLayout;
