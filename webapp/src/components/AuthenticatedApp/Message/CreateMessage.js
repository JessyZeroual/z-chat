import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../../context/CurrentUserContext';
import { postMessage } from '../../../controllers/message';

const CreateMessage = ({ channelId, setShouldRefetchMessages }) => {
  const { currentUser } = useContext(CurrentUserContext);
  let input;

  const handleSubmit = async e => {
    e.preventDefault();
    postMessage(input, currentUser, channelId)
      .then((input.value = ''))
      .then(setShouldRefetchMessages(true));
  };

  return (
    <form className="input-group mb-3 p-3" onSubmit={e => handleSubmit(e)}>
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
    </form>
  );
};

CreateMessage.propTypes = {
  channelId: PropTypes.string.isRequired,
  setShouldRefetchMessages: PropTypes.func.isRequired,
};

export default CreateMessage;
