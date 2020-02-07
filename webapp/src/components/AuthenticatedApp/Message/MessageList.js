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
  const [loading, setLoading] = useState(true);
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 3;

  const node = useRef();

  // if (node.current) {
  //   console.log('top', node.current.scrollTop);
  //   console.log('bottom', node.current.scrollTop + node.current.offsetHeight);
  //   console.log('node', node);
  // }

  useEffect(() => {
    setOffset(0);
  }, [channelId]);

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages(channelId, limit, offset).then(data => {
        if (offset === 0) {
          setMessages(data.messages);
        } else {
          const newMessageList = messages.concat(data.messages);
          setMessages(newMessageList);
        }
      });

      setLoading(false);
      setShouldRefetchMessages(false);
    };

    fetchMessages();
  }, [channelId, shouldRefetchMessages, offset]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MessageListWrapper>
          <HeaderMessageList className="d-flex justify-content-between">
            <p className="font-weight-bold p-3">{`#${channelName}`}</p>
          </HeaderMessageList>

          <MainMessageList ref={node}>
            {messages.length ? (
              <>
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={() => setOffset(offset + 3)}>load more</button>
                {messages.map(message => (
                  <MessageItem key={message.id} message={message} />
                ))}
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
