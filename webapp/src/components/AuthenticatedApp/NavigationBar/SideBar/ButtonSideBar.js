import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMessagesNotSeenByChannel } from '../../../../controllers/message';

import CurrentUserContext from '../../../../context/CurrentUserContext';
import BadgeNotification from '../../../../utils/BadgeNotification';
import getHost from '../../../../utils/getHost';

import { ButtonSideBarStyled } from './SideBar.styled';

const ButtonSideBar = ({ channel }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [messagesNotSeen, setMessagesNotSeen] = useState(0);

  const HOST = getHost();

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
    <Link
      style={{ textDecoration: 'none' }}
      to={`/channels/${channel.id}/messages`}
    >
      <ButtonSideBarStyled active={messagesNotSeen > 0}>
        {`# ${channel.name}`}
        {messagesNotSeen > 0 && (
          <BadgeNotification messagesNotSeen={messagesNotSeen} />
        )}
      </ButtonSideBarStyled>
    </Link>
  );
};

ButtonSideBar.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default ButtonSideBar;
