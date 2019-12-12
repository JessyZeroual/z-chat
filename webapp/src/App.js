import React from 'react';
import Authentification from './components/authentification/Authentification';
import WorkSpace from './components/WorkSpace';

const user = false;
export default function App() {
  return user ? <WorkSpace /> : <Authentification />;
}
