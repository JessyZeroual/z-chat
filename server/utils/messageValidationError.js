const getCleanPassword = password => {
  if (password.length >= 8) {
    return password;
  }
  throw new Error('Password must contain at least 8 characters.');
};
const getCleanEmail = email => {
  const re = /\S+@\S+\.\S+/;
  const validEmail = re.test(email);
  if (validEmail) {
    return email;
  }
  throw new Error('Invalid email address');
};
const getCleanUsername = username => {
  if (username.trim().length >= 3) {
    return username;
  }
  throw new Error('the username must contain 3 characters minimum');
};

module.exports = {
  getCleanPassword,
  getCleanEmail,
  getCleanUsername,
};
