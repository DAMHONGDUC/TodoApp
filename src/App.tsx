import React from 'react';
import RootNavigation from 'navigation/root-navigation';
import {store} from 'redux/store';
import {Provider} from 'react-redux';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
