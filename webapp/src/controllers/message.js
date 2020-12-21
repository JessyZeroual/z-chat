export const postMessage = (text, channelId) => {
  return fetch('/api/messages', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      channelId,
    }),
  });
};

export const hasSeenMessage = channelId => {
  return fetch(`/api/messages`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channelId,
    }),
  });
};

export const getMessages = (channelId, limit, offset) => {
  return fetch(`/api/channels/${channelId}/${limit}/${offset}/messages`)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const getNotificationsByChannels = () => {
  return fetch(`/api/notifications`)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
