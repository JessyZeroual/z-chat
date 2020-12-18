/* eslint-disable import/prefer-default-export */
export const updateAvatarProfile = async formData => {
  const response = await fetch('/api/upload/avatar', {
    method: 'PATCH',
    body: formData,
  });

  return response;
};

export const updateUser = username => {
  return fetch(`/api/user`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  });
};
