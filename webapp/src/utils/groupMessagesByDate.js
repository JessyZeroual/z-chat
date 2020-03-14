import printDate from './printDate';

const groupMessagesByDate = messages => {
  const messagesGrouped = messages.reduce((accumulator, currentValue) => {
    const date = printDate(currentValue.created_at);
    accumulator[date] = [...(accumulator[date] || []), currentValue];
    return accumulator;
  }, {});

  return messagesGrouped;
};
export default groupMessagesByDate;
