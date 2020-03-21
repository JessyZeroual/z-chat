// eslint-disable-next-line import/prefer-default-export
export const signin = async (email, password) => {
  const response = await fetch('/api/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response;
};

export const signup = async (username, email, password) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  return response;
};

export const signupWithGoogle = async tokenId => {
  const response = await fetch('/api/signupWithGoogle', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tokenId,
    }),
  });

  return response;
};

export const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response;
};
