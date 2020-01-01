import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import SlackLogo from '../../img/slackLogo.png';

import { Container } from './Authentification.styled';

const Authentification = ({ getCurrentUser }) => {
  return (
    <Container>
      <img src={SlackLogo} alt="Slack logo" className="mr-2" />
      <Router>
        <Route
          path="/"
          component={() => <Signin getCurrentUser={getCurrentUser} />}
        />
        <Route exact path="/signup" component={Signup} />
        <Redirect to="/" />
      </Router>
    </Container>
  );
};

Authentification.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
};

export default Authentification;
