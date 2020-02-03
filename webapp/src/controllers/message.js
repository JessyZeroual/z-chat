// eslint-disable-next-line import/prefer-default-export
export const postMessage = (input, currentUser, channelId) => {
  return fetch('/api/messages', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: input.value,
      userId: currentUser.id,
      channelId,
    }),
  });
};

export const getMessages = channelId => {
  return fetch(`/api/channels/${channelId}/messages`)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
