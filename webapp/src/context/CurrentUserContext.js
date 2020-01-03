import React from 'react';

const CurrentUserContext = React.createContext({});

export const CurrentUserProvider = CurrentUserContext.Provider;
export const CurrentUserConsumer = CurrentUserContext.Consumer;
export default CurrentUserContext;
