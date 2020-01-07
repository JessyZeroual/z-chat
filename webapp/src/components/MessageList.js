import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  HeaderMessageList,
  FooterMessageList,
  MainMessageList,
  MessageListEmpty,
} from '../style/styled';
import CreateMessage from './CreateMessage';
import MessageItem from './MessageItem';
import Spinner from './Spinner';

const MessageList = ({ currentChannel, currentUser, channelId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(true);

  useEffect(() => {
    fetch(`/api/channels/${channelId}/messages`)
      .then(res => res.json())
      .then(data => {
        setMessages(data.messages);
        setLoading(false);
        setShouldRefetchMessages(false);
      });
  }, [channelId, shouldRefetchMessages]);

  return (
    <Container>
      <HeaderMessageList className="d-flex justify-content-between">
        <p className="font-weight-bold p-3">{`#${currentChannel.name}`}</p>
      </HeaderMessageList>

      <MainMessageList>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {messages.length ? (
              messages.map(message => (
                <MessageItem key={message.id} message={message} />
              ))
            ) : (
              <MessageListEmpty>
                Start a discussion
                <span className="ml-2" role="img" aria-label="smile">
                  😁
                </span>
              </MessageListEmpty>
            )}
          </>
        )}
      </MainMessageList>

      <FooterMessageList>
        <CreateMessage
          currentUser={currentUser}
          channelId={channelId}
          setShouldRefetchMessages={setShouldRefetchMessages}
        />
      </FooterMessageList>
    </Container>
  );
};

MessageList.propTypes = {
  channelId: PropTypes.string.isRequired,
  currentChannel: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageList;
