import React from 'react';
import { View } from 'react-native';
import { Subheading, Text, Button } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { Easing } from 'react-native-reanimated';

import ChipCustom from '../../common/ChipCustom';
import UserAvatar from '../../common/UserAvatar';

const tags = [
  { id: 1, color: 'pink400', name: 'Chating' },
  { id: 2, color: 'green400', name: 'Gaming' },
  { id: 3, color: 'purple400', name: 'MOBA' },
];

const { Value } = Animated;

const position = new Value(1);

const CollapseInfo = ({ open = true, isPortrait }) => {
  const styles = useStyles();

  React.useEffect(() => {
    if (open) {
      // show
      Animated.timing(position, {
        duration: 400,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      }).start();
    } else {
      // hide
      Animated.timing(position, {
        duration: 400,
        toValue: 0,
        easing: Easing.inOut(Easing.ease),
      }).start();
    }
  }, [open]);

  const height = Animated.interpolate(position, {
    inputRange: [0, 1],
    outputRange: [0, 125],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const opacity = Animated.interpolate(position, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          !isPortrait && styles.rootLandscape,
          { height: height, opacity },
        ]}>
        <View style={styles.wrapper}>
          <UserAvatar size={32} />

          <View style={styles.titleWrapper}>
            <Subheading style={styles.fontBold}>Ninja</Subheading>
            <Text numberOfLines={2}>Live from Kristin! Happy Monday ⚛️</Text>
          </View>

          <View style={styles.subcribeButton}>
            <Button
              icon={() => (
                <Ionicons name="heart-outline" color="#fff" size={18} />
              )}
              labelStyle={styles.subcribeButtonText}
              uppercase={false}
              compact
              mode="contained">
              Subscribe
            </Button>
          </View>
        </View>

        <View style={styles.wrapTag}>
          <FlatList
            data={tags}
            keyExtractor={({ id }) => String(id)}
            renderItem={({ item: { color, name } }) => (
              <ChipCustom style={styles.chip} color={color} title={name} />
            )}
            horizontal={true}
          />
        </View>
      </Animated.View>
    </>
  );
};

export default React.memo(CollapseInfo);

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
  rootLandscape: {
    position: 'absolute',
    bottom: 0,
  },
  container: {
    paddingHorizontal: 15,
    width: '100%',
    // backgroundColor: theme.colors.surface,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 10,
    marginTop: -6,
  },
  subcribeButton: {
    marginLeft: 5,
  },
  subcribeButtonText: {
    fontSize: 12,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  wrapTag: {
    marginTop: 15,
    paddingLeft: 42,
  },
}));
