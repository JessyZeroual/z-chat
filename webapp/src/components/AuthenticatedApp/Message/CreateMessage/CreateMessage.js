import React from 'react';
import PropTypes from 'prop-types';
import { postMessage } from '../../../../controllers/message';

import { FormCreateMessage } from './CreateMessage.styled';

const CreateMessage = ({ channelId, isSmallScreen }) => {
  let input;

  const handleSubmit = async e => {
    e.preventDefault();
    postMessage(input, channelId).then((input.value = ''));
  };

  return (
    <FormCreateMessage
      isSmallScreen={isSmallScreen}
      className="input-group"
      onSubmit={e => handleSubmit(e)}
    >
      <input
        id="exampleInputEmail1"
        ref={node => {
          input = node;
        }}
        type="text"
        className="form-control"
        placeholder="Write a message"
        aria-label="Write a message"
        autoComplete="off"
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
};

export default CreateMessage;
