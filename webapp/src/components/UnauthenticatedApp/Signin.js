import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { signin, signupWithGoogle } from '../../controllers/authentication';

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
    const { profileObj } = res;
    if (profileObj)
      await signupWithGoogle(
        profileObj.googleId,
        profileObj.email,
        profileObj.givenName
        // profileObj.familyName,
        // profileObj.imageUrl
      ).then(response => {
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
          clientId="321308208015-8a24oiv0d2jkc0lgmhhl7grbbpanc73d.apps.googleusercontent.com"
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
