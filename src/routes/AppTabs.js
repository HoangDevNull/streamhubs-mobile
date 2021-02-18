import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from '../components/Home';
import Discovery from '../components/Discovery';
import Browse from '../components/Browse';
import Gaming from '../components/Gaming';

const TabNavigator = createMaterialBottomTabNavigator();

export default () => {
  const theme = useTheme();
  const styles = useStyles();
  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      shifting={true}
      screenOptions={{
        title: null,
      }}
      barStyle={styles.root}
      activeColor={theme.colors.primary}>
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                color={color}
                size={24.3}
                name={focused ? 'heart' : 'heart-outline'}
              />
              <View style={[styles.line, focused && styles.active]} />
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                color={color}
                size={24.3}
                name={focused ? 'compass' : 'compass-outline'}
              />
              <View style={[styles.line, focused && styles.active]} />
            </View>
          ),
        }}
        name="Discovery"
        component={Discovery}
      />
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                color={color}
                size={24.3}
                name={focused ? 'radio' : 'radio-outline'}
              />
              <View style={[styles.line, focused && styles.active]} />
            </View>
          ),
        }}
        name="Browse"
        component={Browse}
      />
      <TabNavigator.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                color={color}
                size={24.3}
                name={focused ? 'game-controller' : 'game-controller-outline'}
              />
              <View style={[styles.line, focused && styles.active]} />
            </View>
          ),
        }}
        name="Gaming"
        component={Gaming}
      />
    </TabNavigator.Navigator>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.background,
  },
  wrapIcon: {
    flex: 1,
  },
  line: {
    position: 'absolute',
    left: 2,
    bottom: -5,
    width: 20,
    height: 3,
    borderRadius: 3 / 2,
  },
  active: {
    backgroundColor: theme.colors.primary,
  },
}));
