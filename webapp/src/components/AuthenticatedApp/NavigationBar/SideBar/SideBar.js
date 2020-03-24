import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import ListOptions from './ListOptions';
import CreateChannel from '../../Channel/CreateChannel';

import {
  SideBarStyled,
  ButtonSideBar,
  HeaderSideBar,
  MainSideBar,
  FooterSideBar,
} from './SideBar.styled';

const SideBar = ({
  channels,
  setShouldRefetchChannel,
  setIsOpenSideBar,
  isOpenSideBar,
  isSmallScreen,
}) => {
  const history = useHistory();

  const handleClick = channel => {
    history.push(`/channels/${channel.id}/messages`);
    if (isSmallScreen) setIsOpenSideBar(false);
  };

  return (
    <SideBarStyled isOpenSideBar={isOpenSideBar} isSmallScreen={isSmallScreen}>
      <HeaderSideBar>
        <ListOptions />
        {/* <input /> */}
      </HeaderSideBar>

      <MainSideBar>
        <CreateChannel setShouldRefetchChannel={setShouldRefetchChannel} />
        {channels.map(channel => (
          <ButtonSideBar
            key={channel.id}
            onClick={() => handleClick(channel)}
            active
            className="py-2 d-block"
          >
            {`#${channel.name}`}
          </ButtonSideBar>
        ))}
      </MainSideBar>
      <FooterSideBar>Footer</FooterSideBar>
    </SideBarStyled>
  );
};

SideBar.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      created_at: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  setShouldRefetchChannel: PropTypes.func.isRequired,
  setIsOpenSideBar: PropTypes.func.isRequired,
  isOpenSideBar: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};

export default SideBar;
