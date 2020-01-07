import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import Home from './Home';
import MessageList from './MessageList';
import ListOptions from './ListOptions';
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

const SideBarNav = ({ currentUser }) => {
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
        <HeaderSideBar>
          <ListOptions currentUser={currentUser} />
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

      {/* TODO: voir si on peut mettre le switch dans un fichier à part */}
      <Switch>
        <Route exact path="/" component={Home} />

        <Route
          path="/channels/:channelId/messages"
          render={props => {
            const currentChannel = channels.find(
              ({ id }) => id.toString() === props.match.params.channelId
            );
            return (
              <MessageList
                currentUser={currentUser}
                currentChannel={currentChannel}
                channelId={props.match.params.channelId}
              />
            );
          }}
        />
      </Switch>
    </SplitPane>
  );
};

SideBarNav.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
      channelId: PropTypes.string.isRequired,
    }).isRequired,
  }),

  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

SideBarNav.defaultProps = {
  match: null,
};

export default SideBarNav;
