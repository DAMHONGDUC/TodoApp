import React from 'react';

export const AuthContext = React.createContext({
  handleAfterSignIn: () => {},
  handleAfterSignOut: () => {},
});

export const USER_ID = 'USER_ID';
