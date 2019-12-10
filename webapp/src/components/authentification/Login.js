import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button } from './Authentification.styled';

const Login = () => {
  return (
    <>
      <Form>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>sign in</Button>
      </Form>
      <p>
        not a member? &nbsp;
        <Link to="/signup">Sign up now</Link>
      </p>
    </>
  );
};

export default Login;
