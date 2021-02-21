import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/card-friend.scss';

function CardFriend({ friend }) {
  const { name, avatar, link, blog } = friend;

  return (
    <div className="card-friend">
      <a
        className="card-friend-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="card-friend-avatar" src={avatar} />
      </a>
      <a
        className="card-friend-name"
        href={blog}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    </div>
  );
}

CardFriend.propTypes = {
  friend: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    link: PropTypes.string,
    blog: PropTypes.string,
  }),
};

export default CardFriend;
