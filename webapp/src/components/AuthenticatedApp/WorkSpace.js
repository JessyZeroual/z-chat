import React from 'react';
import {
  BrowserRouter as RouterAuthenticatedApp,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Layout from './Layouts/Layout';
import MessageList from './Message/MessageList';

const WorkSpace = () => (
  <RouterAuthenticatedApp>
    <Switch>
      <Redirect exact from="/" to="/channels/1/messages" />
      <Route path="/channels/:channelId/messages">
        <Layout>
          <MessageList />
        </Layout>
      </Route>
    </Switch>
  </RouterAuthenticatedApp>
);

export default WorkSpace;
