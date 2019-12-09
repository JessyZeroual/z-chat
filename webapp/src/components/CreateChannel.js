import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonSideBar } from '../style/styled';

const CreateChannel = ({ setShouldRefetchChannel }) => {
  const [formOpen, setFormOpen] = useState(false);
  let input;

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/channels', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: input.value,
      }),
    })
      .then(setFormOpen(false))
      .then(setShouldRefetchChannel(true));
  };

  return (
    <div>
      {!formOpen ? (
        <ButtonSideBar
          onKeyDown={() => setFormOpen(!formOpen)}
          onClick={() => setFormOpen(!formOpen)}
        >
          <i className="p-3 fas fa-plus-circle" />
          Add channel
        </ButtonSideBar>
      ) : (
        <form className="d-flex" onSubmit={e => handleSubmit(e)}>
          <input
            ref={node => {
              input = node;
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className="form-control"
          />
          <button
            type="button"
            className="btn btn-danger"
            onKeyDown={() => setFormOpen(!formOpen)}
            onClick={() => setFormOpen(!formOpen)}
          >
            X
          </button>
        </form>
      )}
    </div>
  );
};

CreateChannel.propTypes = {
  setShouldRefetchChannel: PropTypes.func.isRequired,
};

export default CreateChannel;
