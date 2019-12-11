import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from './Authentification.styled';

const Signup = () => {
  let username;
  let email;
  let password;
  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
      }),
    }).then(((username.value = ''), (email.value = ''), (password.value = '')));
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
        <Button>sign up</Button>
      </Form>
      <p>
        you are a member? &nbsp;
        <Link to="/">Connect</Link>
      </p>
    </>
  );
};

export default Signup;
