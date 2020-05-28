import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Collapse from 'reactstrap/lib/Collapse';

import ButtonSideBar from './ButtonSideBar';
import ListOptions from '../../ListOptions/ListOptions';
import CreateChannel from '../../Channel/CreateChannel';
import SVGIcon from '../../../../icon/SVGIcon';

import {
  SideBarStyled,
  ButtonCreateChannel,
  ButtonDropdownChannel,
  HeaderSideBar,
  MainSideBar,
  WrapperChannels,
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
  const [isOpenChannelList, setIsOpenChannelList] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClick = channel => {
    history.push(`/channels/${channel.id}/messages`);
    if (isSmallScreen) setIsOpenSideBar(false);
  };

  return (
    <SideBarStyled isOpenSideBar={isOpenSideBar} isSmallScreen={isSmallScreen}>
      <HeaderSideBar>
        <ListOptions />
      </HeaderSideBar>

      <MainSideBar>
        <WrapperChannels>
          <ButtonDropdownChannel
            onClick={() => setIsOpenChannelList(!isOpenChannelList)}
          >
            {isOpenChannelList ? (
              <SVGIcon name="caret-down" width={12} fill="#fff" />
            ) : (
              <SVGIcon name="caret-right" width={12} fill="#fff" />
            )}
            &nbsp;Channels
          </ButtonDropdownChannel>

          <ButtonCreateChannel
            className="ml-auto"
            onClick={() => setIsOpenModal(!isOpenModal)}
          >
            <SVGIcon name="plus" width={18} fill="#eee" />
          </ButtonCreateChannel>
        </WrapperChannels>
        <CreateChannel
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
          setShouldRefetchChannel={setShouldRefetchChannel}
        />

        <Collapse isOpen={isOpenChannelList}>
          {channels.map(channel => (
            <ButtonSideBar
              key={channel.id}
              channel={channel}
              handleClick={handleClick}
            />
          ))}
        </Collapse>
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
