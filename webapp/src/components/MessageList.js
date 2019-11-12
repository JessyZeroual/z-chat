import React, { useState, useEffect } from 'react';
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

const MessageList = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(true);
  const channelId = props.channelId;

  useEffect(() => {
    fetch(`/api/channels/${channelId}/messages`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        setShouldRefetchMessages(false);
      });
  }, [channelId, shouldRefetchMessages]);

  return (
    <Container>
      <HeaderMessageList className="d-flex justify-content-between">
        <p className="font-weight-bold p-3"># {props.currentChannel.name}</p>
      </HeaderMessageList>

      <MainMessageList>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {data.messages.length ? (
              data.messages.map(message => {
                return <MessageItem key={message.id} message={message} />;
              })
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
          channelId={channelId}
          setShouldRefetchMessages={setShouldRefetchMessages}
        />
      </FooterMessageList>
    </Container>
  );
};

export default MessageList;
