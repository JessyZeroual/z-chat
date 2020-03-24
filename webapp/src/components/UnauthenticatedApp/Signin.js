/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { signin, signupWithGoogle } from '../../controllers/authentication';

import CLIENT_ID_GOOGLE from '../../constants/clientIdGoogle';

import CurrentUserContext from '../../context/CurrentUserContext';

import brandGoogle from '../../img/brandGoogle.png';
import brandSignUp from '../../img/signUp.png';

import {
  Form,
  Input,
  Button,
  WrapperSignup,
} from './UnauthenticatedApp.styled';

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

        <Button type="submit">SIGN IN</Button>

        <p className="text-center my-3">Don't have account ?</p>

        <WrapperSignup>
          <GoogleLogin
            render={renderProps => (
              <Button
                width="190px"
                bgColor="white"
                color="grey"
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
            <Button width="190px" bgColor="white" color="grey">
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
