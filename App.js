import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Home, Welcome, Register, Recovery, Settings} from './src/screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const firstUse = true;

  return (
    <NavigationContainer>
      {firstUse ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: 'Register'}}
          />
          <Stack.Screen
            name="Recovery"
            component={Recovery}
            options={{title: 'Recovery'}}
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
              tabBarLabel: 'Home',
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
              tabBarLabel: 'Settings',
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: ({color, size}) => (
                <Icon name="cog" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
