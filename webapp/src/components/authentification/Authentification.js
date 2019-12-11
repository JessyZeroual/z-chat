import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import SlackLogo from '../../img/slackLogo.png';

import { Container } from './Authentification.styled';

const Authentification = () => {
  return (
    <Container>
      <img src={SlackLogo} alt="Slack logo" className="mr-2" />
      <Router>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Router>
    </Container>
  );
};

export default Authentification;
