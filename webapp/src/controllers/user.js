/* eslint-disable import/prefer-default-export */
export const updateAvatarProfile = async formData => {
  const response = await fetch('/api/user/upload', {
    method: 'PATCH',
    body: formData,
  });

  return response;
};
