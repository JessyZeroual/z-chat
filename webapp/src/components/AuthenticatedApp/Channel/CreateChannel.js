import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { postChannel } from '../../../controllers/channel';

import { ButtonSideBarStyled } from '../NavigationBar/SideBar/SideBar.styled';

const CreateChannel = ({ setShouldRefetchChannel }) => {
  const [formOpen, setFormOpen] = useState(false);
  let input;

  const handleSubmit = e => {
    e.preventDefault();

    postChannel(input.value)
      .then(setFormOpen(false))
      .then(setShouldRefetchChannel(true));
  };

  return (
    <div>
      {!formOpen ? (
        <ButtonSideBarStyled
          className="d-flex align-items-center py-2"
          onKeyDown={() => setFormOpen(!formOpen)}
          onClick={() => setFormOpen(!formOpen)}
        >
          Chaînes
          <i className="fas fa-plus-circle ml-auto p-2" />
        </ButtonSideBarStyled>
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
