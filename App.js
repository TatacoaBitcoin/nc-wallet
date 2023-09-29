import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import './i18n.config';
import {
  Home,
  Welcome,
  Register,
  Recovery,
  Settings,
  SendLightning,
  Receive,
  Scanner,
} from './src/screens';
import {useAccountState} from './src/context/account.provider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainFlow = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabFlow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendLightning"
        component={SendLightning}
        options={{
          title: t('navigation.mainflow.send'),
        }}
      />
      <Stack.Screen
        name="Receive"
        component={Receive}
        options={{
          title: t('navigation.mainflow.receive'),
        }}
      />
    </Stack.Navigator>
  );
};

const AccountSetupFlow = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
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
  );
};

const TabFlow = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        indicatorStyle: {
          width: 0,
          height: 0,
          elevation: 0,
        },
        tabBarStyle: {
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          backgroundColor: 'lightgray',
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarIconStyle: {
          color: 'red',
        },
        tabBarActiveTintColor: 'purple',
      }}>
      <Tab.Screen
        name="Wallet"
        component={Home}
        options={{
          tabBarLabel: t('navigation.tabflow.wallet'),
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
          tabBarLabel: t('navigation.tabflow.settings'),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const {account} = useAccountState();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {account ? <MainFlow /> : <AccountSetupFlow />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
