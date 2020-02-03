import React from 'react';
import {
  BrowserRouter as RouterAuthenticatedApp,
  Route,
  Switch,
} from 'react-router-dom';
import AppLayout from '../../style/AppLayout';
import SideBarNav from './NavigationBar/NavigationBar';
import Home from './Home';
import MessageList from './Message/MessageList';

const WorkSpace = () => (
  <RouterAuthenticatedApp>
    <AppLayout>
      <SideBarNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/channels/:channelId/messages" component={MessageList} />
      </Switch>
    </AppLayout>
  </RouterAuthenticatedApp>
);

export default WorkSpace;
