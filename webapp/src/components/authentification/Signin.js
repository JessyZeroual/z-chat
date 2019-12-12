import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button } from './Authentification.styled';

const Signin = () => {
  let email;
  let password;

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }).then(((email.value = ''), (password.value = '')));
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
