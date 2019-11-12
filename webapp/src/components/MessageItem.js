import React from 'react';
import userProfile from '../img/userProfile.svg';

const MessageItem = props => {
  const message = props.message;
  return (
    <div className="bg-grey p-3">
      <div className="d-flex ">
        <img src={userProfile} alt="profil utilisateur" width="80" />
        <div className="ml-3">
          <p>userName {message.createdAt}</p>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
