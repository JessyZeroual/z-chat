/* eslint-disable import/prefer-default-export */
export const updateAvatarProfile = async formData => {
  const response = await fetch('/api/upload/avatar', {
    method: 'PATCH',
    body: formData,
  });

  return response;
};
