import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CurrentUserContext from '../../../../context/CurrentUserContext';

import { printDate } from '../../../../utils/formatDate';
import Spinner from '../../../../utils/Spinner';
import useMessages from '../../../../utils/useMessages';

import CreateMessage from '../CreateMessage/CreateMessage';
import MessageItem from '../MessageItem/MessageItem';

import {
  MessageListWrapper,
  MessageListDivider,
  MainMessageList,
  FooterMessageList,
  BadgeDate,
  MessageListEmpty,
} from './MessageList.styled';

const MessageList = ({ isSmallScreen }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const mainMessageList = useRef(null);
  const { channelId } = useParams();
  const [loading, loadingMoreMessages, daysWithMessages, deleteMessage] = useMessages(
    channelId
  );

  const messageListWrapper = useRef(null);

  return (
    <MessageListWrapper ref={messageListWrapper}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <MainMessageList id="mainMessageList" ref={mainMessageList}>
            {loadingMoreMessages && (
              <div className="text-center my-5">
                <div className="spinner-border" role="status" />
              </div>
            )}
            {daysWithMessages.length ? (
              <>
                {daysWithMessages
                  .map(dayWithMessages => (
                    <div key={dayWithMessages.day}>
                      <MessageListDivider>
                        <BadgeDate>{printDate(dayWithMessages.day)}</BadgeDate>
                      </MessageListDivider>
                      {dayWithMessages.messages
                        .map(message => (
                          <MessageItem
                            key={message.id}
                            message={message}
                            extraInfo={
                              message.extra_info
                                ? JSON.parse(message.extra_info)
                                : {}
                            }
                            isOwner={currentUser.id === message.user_id}
                            deleteMessage={deleteMessage}
                          />
                        ))
                        .reverse()}
                    </div>
                  ))
                  .reverse()}
              </>
            ) : (
              <MessageListEmpty>
                Start a discussion
                <span className="ml-2" role="img" aria-label="smile">
                  😁
                </span>
              </MessageListEmpty>
            )}
            <FooterMessageList
              messageListWrapperWidth={messageListWrapper.current.clientWidth}
              isSmallScreen={isSmallScreen}
            >
              <CreateMessage
                isSmallScreen={isSmallScreen}
                channelId={channelId}
              />
            </FooterMessageList>
          </MainMessageList>
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
