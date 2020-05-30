import React from 'react';
import PropTypes from 'prop-types';

import { BadgeNotificationStyled } from '../style/common.styled';

const BadgeNotification = ({ notificationByChannel }) => (
  <BadgeNotificationStyled>
    {notificationByChannel < 99 ? notificationByChannel : '99+'}
  </BadgeNotificationStyled>
);

BadgeNotification.propTypes = {
  notificationByChannel: PropTypes.number.isRequired,
};

export default BadgeNotification;
