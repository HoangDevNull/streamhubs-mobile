import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import Login from '../components/Login';
import Register from '../components/Register';

const Stack = createStackNavigator();

const noHeaderOpntion = {
  header: () => null,
};
export default () => {
  return (
    <Stack.Navigator screenOptions={noHeaderOpntion} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
