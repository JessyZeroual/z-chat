import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from './UnauthenticatedApp.styled';

const Signup = () => {
  let username;
  let email;
  let password;

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    await ((username.value = ''), (email.value = ''), (password.value = ''));

    if (response.ok) {
      console.log('res ok');
    } else {
      console.log('res error');
    }
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
