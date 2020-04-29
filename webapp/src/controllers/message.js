export const postMessage = (input, channelId) => {
  return fetch('/api/messages', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: input.value,
      channelId,
    }),
  });
};

export const hasSeenMessage = messages => {
  return fetch(`/api/messages`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
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

export const getMessagesNotSeenByChannel = channelId => {
  return fetch(`/api/messagesNotSeen/${channelId}`)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
