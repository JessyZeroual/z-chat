import { useState, useEffect } from 'react';
import { getMessages } from '../controllers/message';
import groupMessagesByDate from './groupMessagesByDate';

const useMessages = channelId => {
  const LIMIT = 10;

  const [messages, setMessages] = useState([]);
  const [hasNextMessages, setNextMessages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchMessages = async resetOffset => {
    const currentOffset = resetOffset ? 0 : offset + LIMIT;

    await getMessages(channelId, LIMIT, currentOffset).then(data => {
      if (!data.nextMessages.length) {
        setNextMessages(false);
      }

      if (resetOffset) {
        setMessages(data.messages);
        setNextMessages(true);
      } else {
        const newMessageList = messages.concat(data.messages);
        setMessages(newMessageList);
      }
    });

    setLoading(false);
    setOffset(currentOffset);
  };

  const handleScroll = e => {
    if (e.target.scrollTop === 0 && !loading && hasNextMessages) {
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

  return [loading, groupMessagesByDate(messages), hasNextMessages];
};

export default useMessages;
