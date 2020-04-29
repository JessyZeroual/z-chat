import { useState, useEffect, useContext } from 'react';

import CurrentUserContext from '../context/CurrentUserContext';
import { getMessages, hasSeenMessage } from '../controllers/message';

import groupMessagesByDate from './groupMessagesByDate';

const useMessages = channelId => {
  const { currentUser } = useContext(CurrentUserContext);

  const LIMIT = 20;
  const HOSTNAME = window.location.hostname;
  const PORT = window.location.port;
  const HOST =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? `ws://${HOSTNAME}:8000/`
      : `wss://${HOSTNAME}:${PORT}/`;

  const [messages, setMessages] = useState([]);
  const [hasNextMessages, setHasNextMessages] = useState(true);
  const [messageWs, setMessageWs] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  const [offset, setOffset] = useState(0);

  const deleteMessage = async id => {
    const response = await fetch(`/api/messages/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    });
    if (response.ok) {
      setMessages(messages.filter(message => message.id !== id));
    }
  };

  const scrollToBottom = () => {
    const mainMessageList = document.getElementById('mainMessageList');
    if (mainMessageList)
      mainMessageList.scrollTop = mainMessageList.scrollHeight;
  };

  const handleScrollTop = value => {
    const mainMessageList = document.getElementById('mainMessageList');
    if (mainMessageList) mainMessageList.scrollTop = value;
  };

  const fetchMessages = async resetOffset => {
    const currentOffset = resetOffset ? 0 : offset + LIMIT;

    await getMessages(channelId, LIMIT, currentOffset).then(data => {
      if (!data.nextMessages.length) {
        setHasNextMessages(false);
      }

      if (resetOffset) {
        setMessages(data.messages);
        setHasNextMessages(true);
      } else {
        const exist =
          data.messages[0] &&
          messages.find(({ id }) => id === data.messages[0].id);

        if (!exist) {
          const newMessageList = messages.concat(data.messages);
          setMessages(newMessageList);
        }
      }
    });

    setLoading(false);
    setLoadingMoreMessages(false);
    setOffset(currentOffset);
    if (offset === 0) {
      scrollToBottom();
    } else {
      handleScrollTop(20);
    }
  };

  const handleScroll = e => {
    if (e.target.scrollTop === 0 && !loadingMoreMessages && hasNextMessages) {
      setLoadingMoreMessages(true);
      fetchMessages();
    }
  };

  useEffect(() => {
    const mainMessageList = document.getElementById('mainMessageList');
    if (mainMessageList) {
      mainMessageList.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainMessageList) {
        mainMessageList.removeEventListener('scroll', handleScroll);
      }
    };
  });

  useEffect(() => {
    fetchMessages({ resetOffset: true });
    // eslint-disable-next-line
  }, [channelId]);

  useEffect(() => {
    const messagesList = messages.filter(
      message => !message.seen_by.includes(currentUser.id)
    );
    hasSeenMessage(messagesList);
    // eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket(HOST);
    socket.onmessage = msg => {
      const event = JSON.parse(msg.data);
      if (event.type === 'MESSAGE_CREATED') setMessageWs(event.payload);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Number(channelId) === messageWs.channel_id) {
      setMessages([messageWs, ...messages]);
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [messageWs]);

  return [
    loading,
    loadingMoreMessages,
    groupMessagesByDate(messages),
    deleteMessage,
  ];
};

export default useMessages;
