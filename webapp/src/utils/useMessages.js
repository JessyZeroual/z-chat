import { useState, useEffect } from 'react';

import { getMessages } from '../controllers/message';
import groupMessagesByDate from './groupMessagesByDate';

const useMessages = channelId => {
  const LIMIT = 10;

  const HOSTNAME = window.location.hostname;
  const PORT = window.location.port;
  const HOST =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? `ws://${HOSTNAME}:8000/`
      : `ws://${HOSTNAME}:${PORT}/`;

  const [messages, setMessages] = useState([]);
  const [hasNextMessages, setHasNextMessages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  const [offset, setOffset] = useState(0);

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
    const socket = new WebSocket(HOST);

    socket.onmessage = msg => {
      const event = JSON.parse(msg.data);

      if (
        event.type === 'MESSAGE_CREATED' &&
        Number(channelId) === event.payload.channel_id
      ) {
        setMessages([event.payload, ...messages]);
      }
    };
  });

  return [loading, loadingMoreMessages, groupMessagesByDate(messages)];
};

export default useMessages;
