import React from 'react';
import PropTypes from 'prop-types';
import userProfile from '../../../img/userProfile.svg';

import { ImageWrapper } from './Message.styled';

const MessageItem = ({ message }) => {
  const createdAt = new Date(message.created_at);
  return (
    <div className="d-flex p-1 m-1">
      <ImageWrapper>
        <img src={userProfile} alt="profil utilisateur" width="50" />
      </ImageWrapper>
      <div>
        <b className="mr-2">{message.username}</b>
        <span className="text-muted">
          {`${createdAt.getHours()} h ${
            createdAt.getMinutes() < 10
              ? `0${createdAt.getMinutes()}`
              : createdAt.getMinutes()
          }`}
        </span>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    created_at: PropTypes.string,
    text: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default MessageItem;
