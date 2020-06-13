import React from 'react';
import PropTypes from 'prop-types';

import { BadgeNotificationStyled } from '../style/common.styled';

const BadgeNotification = ({ notification }) => (
  <BadgeNotificationStyled>
    {notification < 99 ? notification : '99+'}
  </BadgeNotificationStyled>
);

BadgeNotification.propTypes = {
  notification: PropTypes.number.isRequired,
};

export default BadgeNotification;
