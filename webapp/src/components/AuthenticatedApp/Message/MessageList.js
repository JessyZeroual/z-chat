import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import FixedBottom from 'react-fixed-bottom';

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

const MessageList = () => {
  const { channelId } = useParams();
  const [loading, loadingMoreMessages, messages] = useMessages(channelId);

  return (
    <MessageListWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
          <FixedBottom offset={20}>
            <FooterMessageList>
              <CreateMessage channelId={channelId} />
            </FooterMessageList>
          </FixedBottom>
        </>
      )}
    </MessageListWrapper>
  );
};

MessageList.propTypes = {
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
};

export default MessageList;
