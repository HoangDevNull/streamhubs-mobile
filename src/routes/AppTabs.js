import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabNavigator = createMaterialBottomTabNavigator();

import { useTheme } from 'react-native-paper';
import Home from '../components/Home';
import Discover from '../components/Discover';
import Browse from '../components/Browse';
import Gaming from '../components/Gaming';

export default () => {
  const theme = useTheme();
  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      shifting={false}
      // sceneAnimationEnabled={false}
      barStyle={{ backgroundColor: theme.colors.background }}
      activeColor={theme.colors.primary}>
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              size={20}
              name={focused ? 'heart' : 'heart-outline'}
            />
          ),
          title: 'Followed',
        }}
        name="Home"
        component={Home}
      />
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              size={20}
              name={focused ? 'compass' : 'compass-outline'}
            />
          ),
        }}
        name="Discover"
        component={Discover}
      />
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              size={20}
              name={focused ? 'easel' : 'easel-outline'}
            />
          ),
        }}
        name="Browse"
        component={Browse}
      />
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              size={20}
              name={focused ? 'game-controller' : 'game-controller-outline'}
            />
          ),
        }}
        name="Gaming"
        component={Gaming}
      />
    </TabNavigator.Navigator>
  );
};
