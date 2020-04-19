import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getMessagesNotSeenByChannel } from '../../../../controllers/message';
import BadgeNotification from '../../../../utils/BadgeNotification';

import { ButtonSideBarStyled } from './SideBar.styled';

const ButtonSideBar = ({ channel, handleClick }) => {
  const [messagesNotSeen, setMessagesNotSeen] = useState(0);

  getMessagesNotSeenByChannel(channel.id).then(data => {
    setMessagesNotSeen(data.messages.length);
  });

  return (
    <ButtonSideBarStyled
      onClick={() => handleClick(channel)}
      active={messagesNotSeen > 0}
    >
      {`#${channel.name}`}
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
