import React from 'react';
import { graphql, Link } from 'gatsby';

// import Icon from '../components/Icon';
import SEO from '../components/SEO';

export const query = graphql`
  query QueryIndex {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

const IndexPage = ({ data }) => (
  <>
    <SEO title="" />
    <h1>{data.site.siteMetadata.title}</h1>
    <p>
      <span style={{ fontStyle: 'italic' }}>
        {data.site.siteMetadata.description}
      </span>
      <br />
      <span>
        As о(U+043E&nbsp;
        <span style={{ fontVariant: 'all-small-caps' }}>
          CYRILLIC SMALL LETTER O
        </span>
        ) is not o(U+006F&nbsp;
        <span style={{ fontVariant: 'all-small-caps' }}>
          LATIN SMALL LETTER O
        </span>
        ).
      </span>
    </p>
    <p>
      <Link to="/posts/">文章</Link> <br />
      <Link to="/sheets/">清单</Link>
    </p>
  </>
);

export default IndexPage;
