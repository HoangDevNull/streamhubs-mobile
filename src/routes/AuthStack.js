import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// Screen
import Login from '../components/Login';
import Register from '../components/Register';
import StartScreen from '../components/StartScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
      }}
      initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
