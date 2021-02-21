import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Screen
import AppTabs from './AppTabs';
import Header from '../components/Header';
import Profile from '../components/Profile';

const AppStack = createStackNavigator();

export default () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        header: ({ route: name }) => <Header />,

        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
      }}
      initialRouteName="Main">
      <AppStack.Screen name="Main" component={AppTabs} />
      <AppStack.Screen name="Profile" component={Profile} />
    </AppStack.Navigator>
  );
};
