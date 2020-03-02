import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { getMessages } from '../../../controllers/message';

import CreateMessage from './CreateMessage';
import MessageItem from './MessageItem';
import Spinner from '../../../utils/Spinner';

import {
  MessageListWrapper,
  HeaderMessageList,
  FooterMessageList,
  MainMessageList,
  MessageListEmpty,
} from './Message.styled';

const MessageList = ({ match, location }) => {
  const { channelId } = match.params;
  const { channelName } = location.state;
  const [messages, setMessages] = useState([]);
  const [nextMessages, setNextMessages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadMoreMessage, setLoadMoreMessage] = useState(false);
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const mainMessageList = useRef();

  const fetchMessages = async () => {
    await getMessages(channelId, limit, offset).then(data => {
      if (data.nextMessages.length === 0) {
        setNextMessages(false);
      }

      if (offset === 0) {
        setMessages(data.messages);
      } else {
        const newMessageList = messages.concat(data.messages);
        setMessages(newMessageList);
      }
    });

    setLoading(false);
    setShouldRefetchMessages(false);
    setLoadMoreMessage(false);
  };

  const handleScroll = e => {
    if (e.target.scrollTop === 0 && !loadMoreMessage) {
      setLoadMoreMessage(true);
    }
  };

  useEffect(() => {
    if (mainMessageList.current) {
      mainMessageList.current.addEventListener('scroll', handleScroll);
    }
  });

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [channelId, shouldRefetchMessages, offset]);

  useEffect(() => {
    if (loadMoreMessage && nextMessages) {
      setOffset(offset + limit);
    }
    // eslint-disable-next-line
  }, [loadMoreMessage]);

  useEffect(() => {
    setOffset(0);
  }, [channelId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MessageListWrapper>
          <HeaderMessageList className="d-flex justify-content-between">
            <p className="font-weight-bold p-3">{`#${channelName}`}</p>
          </HeaderMessageList>

          <MainMessageList ref={mainMessageList}>
            {messages.length ? (
              <>
                {messages.map(message => (
                  <MessageItem key={message.id} message={message} />
                ))}
                {loadMoreMessage && nextMessages && (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <MessageListEmpty>
                Start a discussion
                <span className="ml-2" role="img" aria-label="smile">
                  😁
                </span>
              </MessageListEmpty>
            )}
          </MainMessageList>

          <FooterMessageList>
            <CreateMessage
              channelId={channelId}
              setShouldRefetchMessages={setShouldRefetchMessages}
              mainMessageList={
                mainMessageList.current && mainMessageList.current
              }
            />
          </FooterMessageList>
        </MessageListWrapper>
      )}
    </>
  );
};

MessageList.propTypes = {
  channelId: PropTypes.string,
  channelName: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
      channelId: PropTypes.string.isRequired,
    }),
  }),

  location: PropTypes.shape({
    state: PropTypes.shape({
      channelName: PropTypes.string.isRequired,
    }),
  }),
};

MessageList.defaultProps = {
  match: null,
  location: null,
  channelId: null,
  channelName: null,
};

export default MessageList;
