import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import useWindowSize from '../../../utils/useWindowSize';
import { getChannels } from '../../../controllers/channel';
import { getNotificationsByChannels } from '../../../controllers/message';
import CurrentUserContext from '../../../context/CurrentUserContext';

import SideBar from '../NavigationBar/SideBar/SideBar';
import TopBar from '../NavigationBar/TopBar/TopBar';
import ToggleSideBarByScreenSize from '../../../utils/ToggleSideBarByScreenSize';
import { widescreenMinimumWidth } from '../../../constants/style-constants';
import Spinner from '../../../utils/Spinner';
import getHost from '../../../utils/getHost';
import { LayoutStyled, Container } from './Layout.styled';

const Layout = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { channelId } = useParams();
  const HOST = getHost();

  const [channels, setChannels] = useState([]);
  const [shouldRefetchChannel, setShouldRefetchChannel] = useState(false);
  const [notificationByChannel, setNotificationByChannel] = useState([]);

  const [width] = useWindowSize();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  useEffect(() => {
    getNotificationsByChannels().then(data => {
      setNotificationByChannel(data.notificationByChannel);
    });
  }, []);

  useEffect(() => {
    getChannels().then(data => setChannels(data.channels));
    setShouldRefetchChannel(false);
  }, [shouldRefetchChannel]);

  useEffect(() => {
    ToggleSideBarByScreenSize(isOpenSideBar, width, setIsOpenSideBar);
    // eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    const socket = new WebSocket(HOST);

    socket.onmessage = msg => {
      const event = JSON.parse(msg.data);
      if (
        event.type === 'MESSAGE_CREATED' &&
        !event.payload.seen_by.includes(currentUser.id)
      ) {
        getNotificationsByChannels().then(data => {
          setNotificationByChannel(data.notificationByChannel);
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  const isSmallScreen = width < widescreenMinimumWidth;

  const currentChannel = channels.find(({ id }) => id === Number(channelId));

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      isSmallScreen,
      setIsOpenSideBar,
      notificationByChannel,
      setNotificationByChannel,
    })
  );

  return channels.length ? (
    <LayoutStyled>
      <SideBar
        channels={channels}
        setShouldRefetchChannel={setShouldRefetchChannel}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
        isSmallScreen={isSmallScreen}
        notificationByChannel={notificationByChannel}
      />
      <Container>
        <TopBar
          currentChannelName={currentChannel.name}
          setIsOpenSideBar={setIsOpenSideBar}
          isOpenSideBar={isOpenSideBar}
          isSmallScreen={isSmallScreen}
        />
        {childrenWithProps}
      </Container>
    </LayoutStyled>
  ) : (
    <Spinner />
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
