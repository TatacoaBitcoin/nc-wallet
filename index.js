import React from 'react';
import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {BreezProvider} from './src/context/breez.provider';
import {AccountProvider} from './src/context/account.provider';
import {PreferencesProvider} from './src/context/preferences.provider';

const AppContext = () => {
  return (
    <BreezProvider>
      <AccountProvider>
        <PreferencesProvider>
          <App />
        </PreferencesProvider>
      </AccountProvider>
    </BreezProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppContext);
