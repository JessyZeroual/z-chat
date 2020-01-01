import React, { useState, useEffect } from 'react';
import Authentification from './components/authentification/Authentification';
import WorkSpace from './components/WorkSpace';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    const response = await fetch('/api/getcurrentuser', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });

    if (response.ok) {
      const user = await response.json();
      setCurrentUser(user);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) {
    return 'Loading…';
  }

  return currentUser ? (
    <WorkSpace currentUser={currentUser} />
  ) : (
    <Authentification getCurrentUser={getCurrentUser} />
  );
};

export default App;
