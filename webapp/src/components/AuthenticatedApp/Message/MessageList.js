import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../../utils/Spinner';
import useMessages from '../../../utils/useMessages';

import CreateMessage from './CreateMessage';
import MessageItem from './MessageItem';

import {
  MessageListWrapper,
  MessageListDivider,
  HeaderMessageList,
  MainMessageList,
  FooterMessageList,
  BadgeDate,
  MessageListEmpty,
} from './Message.styled';

const MessageList = ({ match, location }) => {
  const { channelId } = match.params;
  const { channelName } = location.state;
  const [loading, loadingMoreMessages, messages] = useMessages(channelId);

  return (
    <MessageListWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <HeaderMessageList className="d-flex justify-content-between">
            <p className="font-weight-bold p-3">{`#${channelName}`}</p>
          </HeaderMessageList>

          <MainMessageList id="mainMessageList">
            {Object.keys(messages).length ? (
              <>
                {Object.keys(messages).map(key => {
                  return (
                    <div key={key}>
                      <MessageListDivider>
                        <BadgeDate>{key}</BadgeDate>
                      </MessageListDivider>
                      {messages[key]
                        .map(message => {
                          return (
                            <MessageItem key={message.id} message={message} />
                          );
                        })
                        .reverse()}
                    </div>
                  );
                })}

                {loadingMoreMessages && (
                  <div className="text-center my-3">
                    <div className="spinner-border" role="status" />
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
        </>
      )}
    </MessageListWrapper>
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
