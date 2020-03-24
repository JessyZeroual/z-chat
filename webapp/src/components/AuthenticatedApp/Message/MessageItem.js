import React from 'react';
import PropTypes from 'prop-types';
import userProfile from '../../../img/userProfile.svg';

const MessageItem = ({ message }) => {
  const createdAt = new Date(message.created_at);
  return (
    <div className="bg-grey p-3">
      <div className="d-flex">
        <img src={userProfile} alt="profil utilisateur" width="80" />
        <div className="ml-3">
          <div className="d-flex">
            <b className="mr-2">{message.username}</b>
            <span className="text-muted">
              {`${createdAt.getHours()} h ${
                createdAt.getMinutes() < 10
                  ? `0${createdAt.getMinutes()}`
                  : createdAt.getMinutes()
              }`}
            </span>
          </div>
          <p>{message.text}</p>
        </div>
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
