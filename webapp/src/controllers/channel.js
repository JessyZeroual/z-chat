// eslint-disable-next-line import/prefer-default-export
export const postChannel = name => {
  return fetch('/api/channels', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  });
};

export const getChannel = channelId => {
  return fetch(`/api/channels/${channelId}`)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
export const getChannels = () => {
  return fetch(`/api/channels/`)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
