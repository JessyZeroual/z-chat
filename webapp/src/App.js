import React, { useState, useEffect } from 'react';
import { CurrentUserProvider } from './context/CurrentUserContext';
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

  return (
    <CurrentUserProvider value={setCurrentUser}>
      {currentUser ? (
        <WorkSpace currentUser={currentUser} setCurrentUser={setCurrentUser} />
      ) : (
        <Authentification getCurrentUser={getCurrentUser} />
      )}
    </CurrentUserProvider>
  );
};

export default App;
