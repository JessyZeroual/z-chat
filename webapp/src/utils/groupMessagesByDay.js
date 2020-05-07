const getDay = date => {
  return date.slice(0, 10);
};

const getDaysWithMessages = messages =>
  messages.reduce((daysWithMessages, message) => {
    const day = getDay(message.created_at);
    const dayWithMessages = daysWithMessages.find(item => item.day === day);
    if (!dayWithMessages) {
      daysWithMessages.push({
        day,
        messages: [message],
      });
    } else {
      dayWithMessages.messages.push(message);
    }
    return daysWithMessages;
  }, []);

export default getDaysWithMessages;
