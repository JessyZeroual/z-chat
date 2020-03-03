import { useState, useEffect } from 'react';
import { getMessages } from '../controllers/message';

const useMessages = (channelId, mainMessageList) => {
  const limit = 10;

  const [messages, setMessages] = useState([]);
  const [nextMessages, setNextMessages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadMoreMessage, setLoadMoreMessage] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchMessages = async resetOffset => {
    const newOffset = resetOffset ? 0 : offset + limit;

    await getMessages(channelId, limit, newOffset).then(data => {
      if (data.nextMessages.length === 0) {
        setNextMessages(false);
      }

      if (resetOffset) {
        setMessages(data.messages);
      } else {
        const newMessageList = messages.concat(data.messages);
        setMessages(newMessageList);
      }
    });

    setLoading(false);
    setLoadMoreMessage(false);
    setOffset(newOffset);
  };

  const handleScroll = e => {
    if (e.target.scrollTop === 0 && !loadMoreMessage && nextMessages) {
      setLoadMoreMessage(true);
      fetchMessages();
    }
  };

  useEffect(() => {
    if (mainMessageList.current) {
      mainMessageList.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainMessageList.current) {
        mainMessageList.current.removeEventListener('scroll', handleScroll);
      }
    };
  });

  useEffect(() => {
    fetchMessages({ resetOffset: true });
  }, [channelId]);

  return [loading, messages, loadMoreMessage, nextMessages];
};

export default useMessages;
