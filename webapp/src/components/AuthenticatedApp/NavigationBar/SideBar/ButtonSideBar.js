import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BadgeNotification from '../../../../utils/BadgeNotification';

import { ButtonSideBarStyled } from './SideBar.styled';

const ButtonSideBar = ({ channel, notificationByChannel }) => {
  const notification = notificationByChannel.find(
    notif => notif.channel_id === channel.id
  );

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={`/channels/${channel.id}/messages`}
    >
      <ButtonSideBarStyled
        hasNotification={notification && Number(notification.count) > 0}
      >
        {`# ${channel.name}`}
        {notification && (
          <BadgeNotification notification={Number(notification.count)} />
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

  notificationByChannel: PropTypes.arrayOf(
    PropTypes.shape({
      channel_id: PropTypes.number,
      count: PropTypes.string,
    })
  ).isRequired,
};

export default ButtonSideBar;
