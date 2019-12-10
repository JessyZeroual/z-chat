import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from './Authentification.styled';

const Signup = () => {
  return (
    <>
      <Form>
        <Input type="text" placeholder="username" />
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
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
