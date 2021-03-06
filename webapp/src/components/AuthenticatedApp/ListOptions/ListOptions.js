import React, { useContext, useState } from 'react';

import Dropdown from 'reactstrap/lib/Dropdown';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';

import { logout } from '../../../controllers/authentication';
import CurrentUserContext from '../../../context/CurrentUserContext';
import Profile from './Profile';
import { HeaderListOption, ButtonListOption } from './ListOptions.styled';
import SVGIcon from '../../../icon/SVGIcon';

const ListOptions = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleLogout = async () => {
    await logout().then(response => {
      if (response.ok) {
        setCurrentUser(null);
      }
    });
  };

  const toggle = () => setIsOpenDropDown(prevState => !prevState);

  return (
    <>
      <Dropdown isOpen={isOpenDropDown} toggle={toggle}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpenDropDown(!isOpenDropDown)}
          onKeyDown={e => {
            if (e.key === 'Enter') setIsOpenDropDown(!isOpenDropDown);
          }}
        >
          <div>
            <span className="text-white h6 ">ProjectName</span>
            &nbsp;
            <SVGIcon name="chevron-down" width={15} fill="#eee" />
          </div>
          <span>{currentUser.username}</span>
        </div>

        <DropdownMenu style={{ minWidth: 300, background: '#F8F8F8' }}>
          <HeaderListOption>
            <img
              src={currentUser.avatar_url}
              alt="profil utilisateur"
              width="40"
              className="mr-2"
            />
            <p>{currentUser.username}</p>
          </HeaderListOption>

          <ButtonListOption
            onClick={() => setIsOpenModal(!isOpenModal)}
            onKeyDown={e => e.key === 'Enter' && setIsOpenModal(!isOpenModal)}
          >
            Profil et compte
          </ButtonListOption>

          <ButtonListOption
            onClick={() => handleLogout()}
            onKeyDown={e => e.key === 'Enter' && handleLogout()}
          >
            Déconnexion
          </ButtonListOption>
        </DropdownMenu>
      </Dropdown>

      <Profile
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        currentUser={currentUser}
      />
    </>
  );
};
export default ListOptions;
