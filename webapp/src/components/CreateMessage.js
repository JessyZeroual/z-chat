import React from 'react';
import PropTypes from 'prop-types';

const CreateMessage = ({ channelId, setShouldRefetchMessages }) => {
  let input;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input.value,
        channelId,
      }),
    })
      .then((input.value = ''))
      .then(setShouldRefetchMessages(true));
  };

  return (
    <form className="input-group mb-3 p-3" onSubmit={(e) => handleSubmit(e)}>
      <input
        ref={(node) => {
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
    </form>
  );
};

CreateMessage.propTypes = {
  channelId: PropTypes.string.isRequired,
  setShouldRefetchMessages: PropTypes.func.isRequired,
};

export default CreateMessage;
