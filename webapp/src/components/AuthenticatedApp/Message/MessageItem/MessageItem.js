import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExtraInfo from '../ExtraInfo/ExtraInfo';

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
import getHost from '../../../../utils/getHost';
import SVGIcon from '../../../../icon/SVGIcon';

const MessageItem = ({ message, extraInfo, isOwner, deleteMessage }) => {
  const [avatar, setAvatar] = useState('');
  const HOST = getHost();

  useEffect(() => {
    const socket = new WebSocket(HOST);

    socket.onmessage = msg => {
      const event = JSON.parse(msg.data);
      if (
        event.type === 'AVATAR_URL_UPDATED' &&
        event.payload.userId === message.user_id
      )
        setAvatar(event.payload.avatar_url);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <MessageItemWrapper data-selector={`message-${message.id}`}>
      <AvatarMessageItem>
        <img src={avatar || message.avatar_url} alt="user Profile" width="50" />
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
                <SVGIcon name="trash" width={16} fill="#808080" />
              </ButtonOptionMessageItem>
            </OptionMessageItem>
          )}
        </HeaderMessageItem>

        <TextMessageItem>{message.text}</TextMessageItem>

        {extraInfo.title && <ExtraInfo extraInfo={extraInfo} />}
      </ContentMessageItem>
    </MessageItemWrapper>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    user_id: PropTypes.number,
    text: PropTypes.string,
    username: PropTypes.string,
    avatar_url: PropTypes.string,
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
