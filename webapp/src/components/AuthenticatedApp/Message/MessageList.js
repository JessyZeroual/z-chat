import React from 'react';
import PropTypes from 'prop-types';

import useMessages from '../../../utils/useMessages';

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
  const [loading, messages, hasNextMessages] = useMessages(channelId);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MessageListWrapper>
          <HeaderMessageList className="d-flex justify-content-between">
            <p className="font-weight-bold p-3">{`#${channelName}`}</p>
          </HeaderMessageList>

          <MainMessageList id="mainMessageList">
            {messages.length ? (
              <>
                {messages.map(message => (
                  <MessageItem key={message.id} message={message} />
                ))}

                {loading && hasNextMessages && (
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
            <CreateMessage channelId={channelId} />
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
