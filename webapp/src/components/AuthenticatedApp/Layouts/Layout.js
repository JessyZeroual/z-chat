import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import useWindowSize from '../../../utils/useWindowSize';
import { getChannels } from '../../../controllers/channel';

import SideBar from '../NavigationBar/SideBar/SideBar';
import TopBar from '../NavigationBar/TopBar/TopBar';
import ToggleSideBarByScreenSize from '../../../utils/ToggleSideBarByScreenSize';
import { widescreenMinimumWidth } from '../../../constants/style-constants';
import Spinner from '../../../utils/Spinner';
import { LayoutStyled, Container } from './Layout.styled';

const Layout = ({ children }) => {
  const { channelId } = useParams();

  const [width] = useWindowSize();
  const [channels, setChannels] = useState([]);
  const [shouldRefetchChannel, setShouldRefetchChannel] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  useEffect(() => {
    getChannels().then(data => setChannels(data.channels));
    setShouldRefetchChannel(false);
  }, [shouldRefetchChannel]);

  useEffect(() => {
    ToggleSideBarByScreenSize(isOpenSideBar, width, setIsOpenSideBar);
    // eslint-disable-next-line
  }, [width]);

  const isSmallScreen = width < widescreenMinimumWidth;

  const currentChannel = channels.find(({ id }) => id === Number(channelId));

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { isSmallScreen })
  );

  return channels.length ? (
    <LayoutStyled>
      <SideBar
        channels={channels}
        setShouldRefetchChannel={setShouldRefetchChannel}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
        isSmallScreen={isSmallScreen}
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
