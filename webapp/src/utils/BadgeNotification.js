import React from 'react';
import PropTypes from 'prop-types';

import { BadgeNotificationStyled } from '../style/common.styled';

const BadgeNotification = ({ messagesNotSeen }) => (
  <BadgeNotificationStyled>
    {messagesNotSeen < 99 ? messagesNotSeen : '99+'}
  </BadgeNotificationStyled>
);

BadgeNotification.propTypes = {
  messagesNotSeen: PropTypes.number.isRequired,
};

export default BadgeNotification;
