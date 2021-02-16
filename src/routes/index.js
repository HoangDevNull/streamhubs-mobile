import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import Home from '../screen/Stack/Home';
import Login from '../screen/Stack/Login';

const Stack = createStackNavigator();

const noHeaderOpntion = {
  header: () => null,
};
export default () => {
  // Stack
  const StackNavigator = () => (
    <Stack.Navigator screenOptions={noHeaderOpntion} initialRouteName="Login">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Home} />
    </Stack.Navigator>
  );

  // Drawer

  // Tab navigator

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
