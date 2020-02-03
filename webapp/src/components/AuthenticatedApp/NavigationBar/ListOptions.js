import React, { useContext } from 'react';

import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { logout } from '../../../controllers/authentification';
import CurrentUserContext from '../../../context/CurrentUserContext';
import userProfile from '../img/userProfile.svg';

const ListOptions = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleLogout = async () => {
    await logout().then(response => {
      if (response.ok) {
        setCurrentUser(null);
      }
    });
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
            onClick={() => handleLogout()}
            onKeyPress={() => handleLogout()}
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

export default ListOptions;
