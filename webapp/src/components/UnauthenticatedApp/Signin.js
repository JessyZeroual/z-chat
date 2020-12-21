/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { signin, signupWithGoogle } from '../../controllers/authentication';

import CLIENT_ID_GOOGLE from '../../constants/clientIdGoogle';

import CurrentUserContext from '../../context/CurrentUserContext';

import brandGoogle from '../../img/brandGoogle.svg';
import brandSignUp from '../../img/signup.svg';

import {
  Form,
  Input,
  Button,
  ButtonSubmit,
  WrapperSignup,
} from './UnauthenticatedApp.styled';

const Signin = () => {
  const { getCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  let email;
  let password;

  const handleSubmit = async e => {
    e.preventDefault();
    await signin(email.value, password.value).then(response => {
      if (response.ok) {
        getCurrentUser();
        email.value = '';
        password.value = '';
      } else {
        setErrorText('invalid email address or password');
      }
    });
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
        <span
          style={{ display: 'flex', justifyContent: 'center', color: 'red' }}
        >
          &nbsp;
          {errorText}
        </span>
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
        <ButtonSubmit type="submit">sign in</ButtonSubmit>
        <p className="text-center my-3">Don't have account ?</p>
        <WrapperSignup>
          <GoogleLogin
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img
                  style={{ width: 20 }}
                  className="mr-2"
                  src={brandGoogle}
                  alt="brand google"
                />
                Sign in with Google
              </Button>
            )}
            clientId={CLIENT_ID_GOOGLE}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="btn btn-outline-danger"
          />
          <p className="text-center mb-0">Or</p>
          <Link to="/signup">
            <Button>
              <img
                style={{ width: 20 }}
                className="mr-2"
                src={brandSignUp}
                alt="brand sign up"
              />
              Sign up now
            </Button>
          </Link>
        </WrapperSignup>
      </Form>
    </>
  );
};

export default Signin;
