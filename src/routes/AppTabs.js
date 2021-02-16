import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const TabNavigator = createMaterialBottomTabNavigator();
import Home from '../components/Home';

export default () => {
  return (
    <TabNavigator.Navigator initialRouteName="Home">
      <TabNavigator.Screen name="Home" component={Home} />
    </TabNavigator.Navigator>
  );
};
