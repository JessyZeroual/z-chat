import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { signup, signin } from '../../controllers/authentication';
import CurrentUserContext from '../../context/CurrentUserContext';

import { Form, Input, Button } from './UnauthenticatedApp.styled';

const Signup = () => {
  const { getCurrentUser } = useContext(CurrentUserContext);

  let username;
  let email;
  let password;

  const handleSubmit = async e => {
    e.preventDefault();
    await signup(username.value, email.value, password.value).then(response => {
      if (response.ok) {
        signin(email.value, password.value).then(_response => {
          if (_response.ok) {
            getCurrentUser();
          }
        });
      }
    });

    await ((username.value = ''), (email.value = ''), (password.value = ''));
  };

  return (
    <>
      {/* TODO: validation */}
      <Form onSubmit={e => handleSubmit(e)}>
        <Input
          ref={node => {
            username = node;
          }}
          type="text"
          placeholder="username"
        />
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
        <Button type="submit">sign up</Button>
      </Form>
      <p>
        you are a member? &nbsp;
        <Link to="/">Connect</Link>
      </p>
    </>
  );
};

export default Signup;
