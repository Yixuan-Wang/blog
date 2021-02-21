import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import CardFriend from '../components/CardFriend';

export const query = graphql`
  fragment Friends on Issues {
    childYaml {
      friends {
        avatar
        blog
        link
        name
      }
    }
  }
  query QueryFriends {
    issues(title: { eq: "friends" }) {
      ...Friends
    }
  }
`;

const Friends = ({ data }) => {
  const { friends } = data.issues.childYaml;
  return (
    <div>
      <SEO title="朋友" />
      <h1 className="title">朋友</h1>
      <p className="subtitle">
        申请添加友链在{' '}
        <a
          href="https://github.com/Yixuan-Wang/blog-contents/issues/2#issue-comment-box"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yixuan-Wang/blog-contents #2
        </a>{' '}
        下评论即可🤗~！
      </p>
      <div>
        {friends.map(friend => (
          <CardFriend key={friend.name} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
