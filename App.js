import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Welcome, Register, Recovery, Settings} from './src/screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const firstUse = false;

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
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
