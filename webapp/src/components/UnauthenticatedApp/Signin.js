import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { signin, signupWithGoogle } from '../../controllers/authentication';

import CLIENT_ID_GOOGLE from '../../constants/clientIdGoogle';

import CurrentUserContext from '../../context/CurrentUserContext';

import { Form, Input, Button } from './UnauthenticatedApp.styled';

const Signin = () => {
  const { getCurrentUser } = useContext(CurrentUserContext);
  let email;
  let password;

  const handleSubmit = async e => {
    e.preventDefault();
    await signin(email.value, password.value).then(response => {
      if (response.ok) {
        getCurrentUser();
      }
    });
    await ((email.value = ''), (password.value = ''));
  };

  const responseGoogle = async res => {
    const { tokenId } = res;
    if (tokenId)
      await signupWithGoogle(tokenId).then(response => {
        if (response.ok) {
          getCurrentUser();
        }
      });
  };

  return (
    <>
      <Form onSubmit={e => handleSubmit(e)}>
        <Input
          ref={node => {
            email = node;
          }}
          type="email"
          placeholder="email"
        />
        <Input
          ref={node => {
            password = node;
          }}
          type="password"
          placeholder="password"
        />
        <Button type="submit">sign in</Button>
      </Form>
      <div>
        <GoogleLogin
          clientId={CLIENT_ID_GOOGLE}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          className="btn btn-outline-danger"
        />
        or
        <Link to="/signup">Sign up now</Link>
      </div>
    </>
  );
};

export default Signin;
