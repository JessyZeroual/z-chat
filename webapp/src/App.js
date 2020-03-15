import React, { useState, useEffect } from 'react';
import { CurrentUserProvider } from './context/CurrentUserContext';
import UnauthenticatedApp from './components/UnauthenticatedApp/UnauthenticatedApp';
import WorkSpace from './components/AuthenticatedApp/WorkSpace';
import Spinner from './utils/Spinner';

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
    return <Spinner />;
  }

  const contextValue = {
    setCurrentUser,
    currentUser,
    getCurrentUser,
  };

  return (
    <CurrentUserProvider value={contextValue}>
      {currentUser ? <WorkSpace /> : <UnauthenticatedApp />}
    </CurrentUserProvider>
  );
};

export default App;
