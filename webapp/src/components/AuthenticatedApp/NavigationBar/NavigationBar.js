import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getChannels } from '../../../controllers/channel';

import ListOptions from './ListOptions';
import CreateChannel from '../Channel/CreateChannel';
import Spinner from '../../../utils/Spinner';

import {
  SideBar,
  ButtonSideBar,
  HeaderSideBar,
  MainSideBar,
  FooterSideBar,
} from './NavigationBar.styled';

const NavigationBar = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldRefetchChannel, setShouldRefetchChannel] = useState(false);

  useEffect(() => {
    getChannels().then(data => setChannels(data.channels));
    setLoading(false);
    setShouldRefetchChannel(false);
  }, [shouldRefetchChannel]);

  return loading ? (
    <Spinner />
  ) : (
    <SideBar>
      <HeaderSideBar>
        <ListOptions />
        {/* <input /> */}
      </HeaderSideBar>

      <MainSideBar>
        <CreateChannel setShouldRefetchChannel={setShouldRefetchChannel} />
        {channels.map(channel => (
          <Link
            style={{ textDecoration: 'none' }}
            key={channel.id}
            to={`/channels/${channel.id}/messages`}
          >
            <ButtonSideBar active className="py-2 d-block">
              {`#${channel.name}`}
            </ButtonSideBar>
          </Link>
        ))}
      </MainSideBar>

      <FooterSideBar className="d-flex justify-content-center align-items-center">
        footer
      </FooterSideBar>
    </SideBar>
  );
};

export default NavigationBar;
