import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screen
import AppTabs from './AppTabs';
import Header from '../components/Header';

const AppStack = createStackNavigator();

export default () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
      initialRouteName="Main">
      <AppStack.Screen name="Main" component={AppTabs} />
    </AppStack.Navigator>
  );
};
