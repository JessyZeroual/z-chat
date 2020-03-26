import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FixedBottom } from 'react-fixed-bottom';

import Spinner from '../../../utils/Spinner';
import useMessages from '../../../utils/useMessages';

import CreateMessage from './CreateMessage';
import MessageItem from './MessageItem';

import {
  MessageListWrapper,
  MessageListDivider,
  MainMessageList,
  FooterMessageList,
  BadgeDate,
  MessageListEmpty,
} from './Message.styled';

const MessageList = ({ isSmallScreen }) => {
  const { channelId } = useParams();
  const [loading, loadingMoreMessages, messages, offset] = useMessages(
    channelId
  );

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    const mainMessageList = document.getElementById('mainMessageList');
    if (mainMessageList)
      mainMessageList.scrollTop = messagesEndRef.current.scrollHeight;
  };

  useEffect(() => {
    if (offset === 0) {
      scrollToBottom();
    } else {
      const mainMessageList = document.getElementById('mainMessageList');
      if (mainMessageList) mainMessageList.scrollTop = 500;
    }
    // eslint-disable-next-line
  }, [messages]);

  return (
    <MessageListWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <MainMessageList ref={messagesEndRef} id="mainMessageList">
            {Object.keys(messages).length ? (
              <>
                {Object.keys(messages)
                  .map(key => {
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
                  })
                  .reverse()}

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
          <FixedBottom offset={0}>
            <FooterMessageList>
              <CreateMessage
                scrollToBottom={scrollToBottom}
                isSmallScreen={isSmallScreen}
                channelId={channelId}
              />
            </FooterMessageList>
          </FixedBottom>
        </>
      )}
    </MessageListWrapper>
  );
};

MessageList.propTypes = {
  isSmallScreen: PropTypes.bool,
};

MessageList.defaultProps = {
  isSmallScreen: null,
};

export default MessageList;
