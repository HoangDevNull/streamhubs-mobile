import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screen/Home';
import PreviewScreen from './screen/Preview';
import StreamScreen from './screen/Stream';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} title="Home Screen" />}
        </Stack.Screen>
        <Stack.Screen name="preview" component={PreviewScreen} />
        <Stack.Screen name="stream" title="test" component={StreamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero_text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    flex: 1,
  },
});
