import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../../context/CurrentUserContext';
import { postMessage } from '../../../controllers/message';

import { FormCreateMessage } from './Message.styled';

const CreateMessage = ({ channelId, isSmallScreen, scrollToBottom }) => {
  const { currentUser } = useContext(CurrentUserContext);
  let input;

  const handleSubmit = async e => {
    e.preventDefault();
    postMessage(input, currentUser, channelId).then((input.value = ''));
    scrollToBottom();
  };

  return (
    <FormCreateMessage
      isSmallScreen={isSmallScreen}
      className="input-group"
      onSubmit={e => handleSubmit(e)}
    >
      <input
        ref={node => {
          input = node;
        }}
        type="text"
        className="form-control"
        placeholder="Write a message"
      />
      <div className="input-group-append">
        <button type="submit" className="btn btn-success">
          Send
        </button>
      </div>
    </FormCreateMessage>
  );
};

CreateMessage.propTypes = {
  channelId: PropTypes.string.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  scrollToBottom: PropTypes.func.isRequired,
};

export default CreateMessage;
