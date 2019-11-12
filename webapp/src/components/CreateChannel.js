import React, { useState } from 'react';
import { ButtonSideBar } from '../style/styled';

const CreateChannel = props => {
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
      .then(props.setShouldRefetchChannel(true));
  };

  return (
    <div>
      {!formOpen ? (
        <div onClick={() => setFormOpen(!formOpen)} className="text-white">
          <ButtonSideBar>
            <i className="p-3 fas fa-plus-circle"></i>Add channel
          </ButtonSideBar>
        </div>
      ) : (
        <form className="d-flex" onSubmit={e => handleSubmit(e)}>
          <input
            ref={node => {
              input = node;
            }}
            autoFocus
            className="form-control"
          />
          <span
            className="btn btn-danger"
            onClick={() => setFormOpen(!formOpen)}
          >
            X
          </span>
        </form>
      )}
    </div>
  );
};

export default CreateChannel;
