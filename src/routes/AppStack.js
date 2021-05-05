import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Screen
import AppTabs from './AppTabs';
import Header from '../components/Header';
import Profile from '../components/Profile';
import DetailStream from '../components/DetailStream';
import CommingSoon from '../components/CommingSoon';
import LiveStream from '../components/LiveStream';
import DetailCategory from '../components/DetailCategory';

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
      <AppStack.Screen name="CommingSoon" component={CommingSoon} />
      <AppStack.Screen name="DetailCategory" component={DetailCategory} />
      <AppStack.Screen
        options={{ header: () => null }}
        name="DetailStream"
        component={DetailStream}
      />
      <AppStack.Screen
        options={{ header: () => null }}
        name="LiveStream"
        component={LiveStream}
      />
    </AppStack.Navigator>
  );
};
