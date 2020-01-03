import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import userProfile from '../img/userProfile.svg';
import CurrentUserContext from '../context/CurrentUserContext';

const ListOptions = ({ currentUser }) => {
  const setCurrentUser = useContext(CurrentUserContext);
  const logout = async () => {
    const response = await fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      setCurrentUser(null);
    }
  };

  return (
    <>
      <div id="PopoverLegacy">
        <div>
          <span className="text-white h5 ">ProjectName</span>
          &nbsp;
          <i className="fas fa-chevron-down fa-xs" />
        </div>
        {currentUser.username}
      </div>
      <UncontrolledPopover
        style={{ minWidth: 300 }}
        trigger="legacy"
        placement="bottom"
        target="PopoverLegacy"
      >
        <PopoverHeader className="d-flex align-items-center">
          <img
            src={userProfile}
            alt="profil utilisateur"
            width="50"
            className="mr-2"
          />
          <p>{currentUser.username}</p>
        </PopoverHeader>
        <PopoverBody className="px-4">
          <div
            onClick={() => console.log('Go to profile !')}
            onKeyPress={() => console.log('Go to profile !')}
            role="button"
            tabIndex="0"
          >
            Profil et compte
          </div>

          <div
            onClick={() => logout()}
            onKeyPress={() => logout()}
            role="button"
            tabIndex="0"
            className="text-danger"
          >
            Déconnexion
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
};

ListOptions.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListOptions;
