import React from 'react';
import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {AccountProvider} from './src/context/account.provider';

const AppContext = () => {
  return (
    <AccountProvider>
      <App />
    </AccountProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppContext);
