import React from 'react';
import { graphql, Link } from 'gatsby';

import '../styles/pages/index.scss';

import SEO from '../components/SEO';
import CardArticle from '../components/CardArticle';
import CardFriend from '../components/CardFriend';

export const query = graphql`
  fragment Article on MarkdownRemark {
    id
    excerpt
    fields {
      slug
    }
    frontmatter {
      tags
      keywords
      title
      category
      date(formatString: "YYYY/MM/DD")
    }
  }
  query QueryIndex {
    site {
      siteMetadata {
        title
        description
      }
    }
    recentPosts: allMarkdownRemark(
      limit: 3
      filter: { fields: { quarter: { eq: "posts" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...Article
      }
    }
    recentSheets: allMarkdownRemark(
      limit: 1
      filter: { fields: { quarter: { eq: "sheets" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...Article
      }
    }
    recentTalks: allMarkdownRemark(
      limit: 3
      filter: { fields: { quarter: { eq: "talks" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...Article
      }
    }
    friends: issues(title: { eq: "friends" }) {
      ...Friends
    }
  }
`;

const IndexPage = ({ data }) => {
  const { siteMetadata } = data.site;
  return (
    <>
      <SEO title="" />
      <h1 className="title">{siteMetadata.title}</h1>
      <p className="subtitle description">{siteMetadata.description}</p>
      <section className="index-block">
        <h2 id="recent-posts">最近的文章</h2>
        {data.recentPosts.nodes.map(article => (
          <CardArticle key={article.id} article={article} />
        ))}
        <span className="index-link-more">
          <Link to="/posts/">全部…</Link>
        </span>
      </section>
      <section className="index-block">
        <h2 id="recent-sheets">最近的清单</h2>
        {data.recentSheets.nodes.map(article => (
          <CardArticle key={article.id} article={article} />
        ))}
        <span className="index-link-more">
          <Link to="/sheets/">全部…</Link>
        </span>
      </section>
      <section className="index-block">
        <h2 id="recent-talks">最近的言论</h2>
        {data.recentTalks.nodes.map(article => (
          <CardArticle key={article.id} article={article} />
        ))}
        <span className="index-link-more">
          <Link to="/talks/">全部…</Link>
        </span>
      </section>
      <section className="index-block">
        <h2 id="friends">朋友</h2>
        <div className="index-block-friends">
          {data.friends.childYaml.friends.map(friend => (
            <CardFriend key={friend.name} friend={friend} />
          ))}
        </div>
        <span className="index-link-more">
          <Link to="/friends">更多…</Link>
        </span>
      </section>
    </>
  );
};

export default IndexPage;
