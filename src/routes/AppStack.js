import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Screen
import AppTabs from './AppTabs';
import Header from '../components/Header';
import Setting from '../components/Setting';

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
      <AppStack.Screen name="Setting" component={Setting} />
    </AppStack.Navigator>
  );
};
