import React from 'react';
import {
  BrowserRouter as RouterUnauthenticatedApp,
  Route,
  Redirect,
} from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import ZchatLogo from '../../img/zchatLogo.svg';

import { Container } from './UnauthenticatedApp.styled';

const UnAuthenticatedApp = () => {
  return (
    <Container>
      <img
        style={{ maxWidth: 350 }}
        src={ZchatLogo}
        alt="Zchat logo"
        className="mr-2"
      />
      <RouterUnauthenticatedApp>
        <Route exact path="/" component={() => <Signin />} />
        <Route exact path="/signup" component={Signup} />
        <Redirect to="/" />
      </RouterUnauthenticatedApp>
    </Container>
  );
};

export default UnAuthenticatedApp;
