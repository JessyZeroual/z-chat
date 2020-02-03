import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { signin } from '../../controllers/authentification';

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
      <p>
        not a member? &nbsp;
        <Link to="/signup">Sign up now</Link>
      </p>
    </>
  );
};

export default Signin;
