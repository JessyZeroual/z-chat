const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const getEarlierDate = numberDayBefore => {
  const date = new Date();
  date.setDate(date.getDate() - numberDayBefore);
  return date.toLocaleDateString();
};

export const printDate = date => {
  const dateNow = new Date();
  const dateToFormat = new Date(date);

  const dateFormated = `
  ${days[dateToFormat.getDay()]}, 
  ${months[dateToFormat.getMonth()]} 
  ${dateToFormat.getDate()}
  ${
    dateToFormat.getFullYear() !== dateNow.getFullYear()
      ? `, ${dateToFormat.getFullYear()}`
      : ''
  }
   `;

  switch (dateToFormat.toLocaleDateString()) {
    case getEarlierDate(0):
      return 'Today';
    case getEarlierDate(1):
      return 'Yesterday';
    case getEarlierDate(2):
      return `${days[dateToFormat.getDay()]}`;
    case getEarlierDate(3):
      return `${days[dateToFormat.getDay()]}`;
    case getEarlierDate(4):
      return `${days[dateToFormat.getDay()]}`;
    case getEarlierDate(5):
      return `${days[dateToFormat.getDay()]}`;
    case getEarlierDate(6):
      return `${days[dateToFormat.getDay()]}`;
    default:
      return dateFormated;
  }
};

export const getTimeFromDate = date => {
  const createdAt = new Date(date);

  return `${createdAt.getHours()} h ${
    createdAt.getMinutes() < 10
      ? `0${createdAt.getMinutes()}`
      : createdAt.getMinutes()
  }`;
};
