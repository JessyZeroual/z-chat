import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { getMessagesNotSeenByChannel } from '../../../../controllers/message';

import CurrentUserContext from '../../../../context/CurrentUserContext';
import BadgeNotification from '../../../../utils/BadgeNotification';

import { ButtonSideBarStyled } from './SideBar.styled';

const ButtonSideBar = ({ channel, handleClick }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [messagesNotSeen, setMessagesNotSeen] = useState(0);

  const HOSTNAME = window.location.hostname;
  const PORT = window.location.port;
  const HOST =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? `ws://${HOSTNAME}:8000/`
      : `wss://${HOSTNAME}:${PORT}/`;

  useEffect(() => {
    const socket = new WebSocket(HOST);

    socket.onmessage = msg => {
      const event = JSON.parse(msg.data);

      if (
        event.type === 'MESSAGE_CREATED' &&
        channel.id === event.payload.channel_id &&
        !event.payload.seen_by.includes(currentUser.id)
      ) {
        setMessagesNotSeen(messagesNotSeen + 1);
      }
    };
    // eslint-disable-next-line
  }, []);

  getMessagesNotSeenByChannel(channel.id).then(data => {
    setMessagesNotSeen(Number(data.messagesNotSeenByChannel[0].count));
  });

  return (
    <ButtonSideBarStyled
      onClick={() => handleClick(channel)}
      active={messagesNotSeen > 0}
    >
      {`# ${channel.name}`}
      {messagesNotSeen > 0 && (
        <BadgeNotification messagesNotSeen={messagesNotSeen} />
      )}
    </ButtonSideBarStyled>
  );
};

ButtonSideBar.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ButtonSideBar;
