import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import './i18n.config';
import {Home, Welcome, Register, Recovery, Settings} from './src/screens';
import {useAccountState} from './src/context/account.provider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const {seedWords} = useAccountState();
  const {t} = useTranslation();
  const firstUse = true;

  console.log(seedWords);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {firstUse ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
                title: t('navigation.accountsetupflow.welcome'),
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{title: t('navigation.accountsetupflow.register')}}
            />
            <Stack.Screen
              name="Recovery"
              component={Recovery}
              options={{title: t('navigation.accountsetupflow.recovery')}}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: t('navigation.mainflow.home'),
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color, size}) => (
                  <Icon name="wallet" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarLabel: t('navigation.mainflow.settings'),
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color, size}) => (
                  <Icon name="cog" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
