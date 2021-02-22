import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Extrapolate } from 'react-native-reanimated';

const Tabs = ({ onPress, tabOffset, ...props }) => {
  const styles = useStyles();

  const translateX = tabOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateXRever = tabOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacityOdd = tabOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacityEven = tabOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route, i) => {
        return (
          <TouchableOpacity key={i} onPress={() => onPress(i)}>
            <View>
              <Text style={[styles.tabButton]}>{route.title}</Text>
            </View>
            <Animated.View
              style={[
                styles.tabIndicator,
                {
                  transform: [
                    {
                      translateX: i % 2 === 0 ? translateX : translateXRever,
                    },
                  ],
                  opacity: i % 2 === 0 ? opacityEven : opacityOdd,
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;

const useStyles = makeStyles((theme) => ({
  tabBar: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tabButton: {
    height: 'auto',
    padding: 0,
    fontFamily: 'Inter-Bold',
    marginHorizontal: 15,
    paddingBottom: 5,
  },
  tabIndicator: {
    width: '70%',
    alignSelf: 'center',
    height: 3,
    backgroundColor: theme.colors.primary,
  },
}));
