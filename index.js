import React from 'react';
import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {AccountProvider} from './src/context/account.provider';
import {PreferencesProvider} from './src/context/preferences.provider';

const AppContext = () => {
  return (
    <AccountProvider>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </AccountProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppContext);
