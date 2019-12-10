import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import SlackIcon from '../img/slack.png';
import Home from './Home';
import MessageList from './MessageList';
import CreateChannel from './CreateChannel';
import Spinner from './Spinner';

import {
  SideBar,
  ButtonSideBar,
  HeaderSideBar,
  MainSideBar,
  FooterSideBar,
} from '../style/styled';

const styles = {
  background: '#000',
  width: '2px',
  cursor: 'col-resize',
  height: '100%',
};

const SideBarNav = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldRefetchChannel, setShouldRefetchChannel] = useState(false);

  // TODO: voir si il est possible de stocker la requête
  // et passer en parametre l'url le chargment et la data pour ne pas dupliquer
  useEffect(() => {
    fetch('/api/channels/')
      .then(res => res.json())
      .then(data => {
        setChannels(data.channels);
        setLoading(false);
        setShouldRefetchChannel(false);
      });
  }, [shouldRefetchChannel]);

  return loading ? (
    <Spinner />
  ) : (
    <SplitPane
      split="vertical"
      minSize={150}
      defaultSize={220}
      resizerStyle={styles}
    >
      <SideBar>
        <HeaderSideBar className="d-flex justify-content-center align-items-center">
          <Link className="text-white" to="/">
            <img src={SlackIcon} alt="Slack logo" className="mr-2" />
            Slack-Clone
          </Link>
        </HeaderSideBar>

        <CreateChannel setShouldRefetchChannel={setShouldRefetchChannel} />

        <MainSideBar>
          {channels.map(channel => (
            <ButtonSideBar key={channel.id}>
              <Link
                className=" p-3 text-white d-block"
                key={channel.id}
                to={`/channels/${channel.id}/messages`}
              >
                {`#${channel.name}`}
              </Link>
            </ButtonSideBar>
          ))}
        </MainSideBar>

        <FooterSideBar className="d-flex justify-content-center align-items-center">
          footer
        </FooterSideBar>
      </SideBar>

      <Route
        path="/channels/:channelId/messages"
        render={props => {
          const currentChannel = channels.find(
            ({ id }) => id.toString() === props.match.params.channelId
          );
          return (
            <MessageList
              channelId={props.match.params.channelId}
              currentChannel={currentChannel}
            />
          );
        }}
      />
    </SplitPane>
  );
};

SideBarNav.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
      channelId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SideBarNav;
