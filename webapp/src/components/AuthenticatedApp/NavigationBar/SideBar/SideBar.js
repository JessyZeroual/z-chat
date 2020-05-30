import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  isOpenSideBar,
  isSmallScreen,
  notificationByChannel,
}) => {
  const [isOpenChannelList, setIsOpenChannelList] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
            aria-label="Right Align"
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
          <ul className="m-0 p-0">
            <li>
              {channels.map(channel => (
                <ButtonSideBar
                  key={channel.id}
                  channel={channel}
                  notificationByChannel={
                    notificationByChannel.find(m => m.channel_id === channel.id)
                      ? notificationByChannel
                      : []
                  }
                />
              ))}
            </li>
          </ul>
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
  notificationByChannel: PropTypes.arrayOf(
    PropTypes.shape({
      channel_id: PropTypes.number,
      count: PropTypes.string,
    })
  ).isRequired,
  setShouldRefetchChannel: PropTypes.func.isRequired,
  isOpenSideBar: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};

export default SideBar;
