import getDaysWithMessages from './groupMessagesByDay';

const messages = [
  { id: 1, created_at: '2020-04-29T07:17:43.489Z', text: 'Hello' },
  { id: 2, created_at: '2020-04-29T10:17:43.489Z', text: 'Bonjour' },
  { id: 3, created_at: '2020-04-30T11:17:43.489Z', text: 'Buongiorno' },
  { id: 4, created_at: '2020-04-30T12:17:43.489Z', text: 'Buenos dias' },
  { id: 5, created_at: '2020-04-30T13:17:43.489Z', text: 'Hallo' },
];

const daysWithMessages = [
  {
    day: '2020-04-29',
    messages: [
      { id: 1, created_at: '2020-04-29T07:17:43.489Z', text: 'Hello' },
      { id: 2, created_at: '2020-04-29T10:17:43.489Z', text: 'Bonjour' },
    ],
  },
  {
    day: '2020-04-30',
    messages: [
      { id: 3, created_at: '2020-04-30T11:17:43.489Z', text: 'Buongiorno' },
      { id: 4, created_at: '2020-04-30T12:17:43.489Z', text: 'Buenos dias' },
      { id: 5, created_at: '2020-04-30T13:17:43.489Z', text: 'Hallo' },
    ],
  },
];

describe('groupMessagesByDay', () => {
  it('returns messages grouped by day', () => {
    expect(getDaysWithMessages(messages)).toEqual(daysWithMessages);
  });
});
