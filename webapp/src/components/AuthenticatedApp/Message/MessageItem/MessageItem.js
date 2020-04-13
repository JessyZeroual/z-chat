import React from 'react';
import PropTypes from 'prop-types';
import ExtraInfo from '../ExtraInfo/ExtraInfo';
import userProfile from '../../../../img/userProfile.svg';

import {
  AvatarMessageItem,
  MessageItemWrapper,
  ContentMessageItem,
  HeaderMessageItem,
  TextMessageItem,
  OptionMessageItem,
  ButtonOptionMessageItem,
} from './MessageItem.styled';

import { getTimeFromDate } from '../../../../utils/formatDate';

const MessageItem = ({ message, extraInfo, isOwner, deleteMessage }) => (
  <MessageItemWrapper data-selector={`message-${message.id}`}>
    <AvatarMessageItem>
      <img src={userProfile} alt="user Profile" width="50" />
    </AvatarMessageItem>

    <ContentMessageItem>
      <HeaderMessageItem>
        <b className="mr-2">{message.username}</b>
        <span className="text-muted">
          {getTimeFromDate(message.created_at)}
        </span>
        {isOwner && (
          <OptionMessageItem>
            <ButtonOptionMessageItem
              onClick={() => deleteMessage(message.id)}
              data-selector="message-delete-button"
            >
              <i className="fas fa-trash-alt" />
            </ButtonOptionMessageItem>
          </OptionMessageItem>
        )}
      </HeaderMessageItem>

      <TextMessageItem>{message.text}</TextMessageItem>

      {extraInfo.title && <ExtraInfo extraInfo={extraInfo} />}
    </ContentMessageItem>
  </MessageItemWrapper>
);

MessageItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    text: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,

  extraInfo: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
  }),

  isOwner: PropTypes.bool.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

MessageItem.defaultProps = {
  extraInfo: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default MessageItem;
