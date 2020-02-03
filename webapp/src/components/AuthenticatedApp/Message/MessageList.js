import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getMessages } from '../../../controllers/message';
import { getChannel } from '../../../controllers/channel';

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

const MessageList = ({ match }) => {
  const { channelId } = match.params;
  const [currentChannel, setCurrentChannel] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldRefetchMessages, setShouldRefetchMessages] = useState(true);

  useEffect(() => {
    const fetchCurrentChannelAndMessages = async () => {
      await getChannel(channelId).then(data => setCurrentChannel(data.channel));
      await getMessages(channelId).then(data => setMessages(data.messages));

      await setLoading(false);
      await setShouldRefetchMessages(false);
    };

    fetchCurrentChannelAndMessages();
  }, [channelId, shouldRefetchMessages]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MessageListWrapper>
          <HeaderMessageList className="d-flex justify-content-between">
            <p className="font-weight-bold p-3">{`#${currentChannel.name}`}</p>
          </HeaderMessageList>

          <MainMessageList>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
      channelId: PropTypes.string.isRequired,
    }),
  }),
};

MessageList.defaultProps = {
  match: null,
  channelId: null,
};

export default MessageList;
