import React from 'react';
import { View, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';
import { getScreen } from '../../../utils/function';

import Animated, {
  Extrapolate,
  timing,
  Easing,
  Value,
} from 'react-native-reanimated';
const AnimVal = new Value(0);

const Item = ({ uri, onSelect }) => {
  const styles = useStyles();

  return (
    <TouchableHighlight onPress={onSelect} style={styles.item}>
      <Image source={{ uri }} style={styles.image} />
    </TouchableHighlight>
  );
};

const columnWidth = 60;
const Emotes = ({ open, onSelect }) => {
  const styles = useStyles();

  React.useEffect(() => {
    timing(AnimVal, {
      duration: 200,
      toValue: open ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [open]);

  const renderItem = ({ item }) => (
    <Item {...item} onSelect={() => onSelect(item)} />
  );

  //   Animation
  const height100 = AnimVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
    extrapolate: Extrapolate.CLAMP,
  });

  //    Caculate column
  const { isPortrait, width } = getScreen(Dimensions);
  const truthWidth = isPortrait ? width : width * 0.25;
  const numOfColumn = Math.floor(truthWidth / columnWidth);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: height100,
        },
      ]}>
      <FlatList
        ListHeaderComponent={<Text>Emotes</Text>}
        ListHeaderComponentStyle={styles.listHeader}
        columnWrapperStyle={styles.row}
        style={styles.flatlist}
        keyExtractor={({ id }) => String(id)}
        data={Array.from(Array(50).keys()).map((i) => ({
          uri: `https://static-cdn.jtvnw.net/emoticons/v2/${
            i + 4
          }/default/dark/1.0`,
          id: i,
        }))}
        renderItem={renderItem}
        numColumns={numOfColumn}
        key={numOfColumn}
      />
    </Animated.View>
  );
};

export default React.memo(Emotes);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingVertical: 10,
    backgroundColor: theme.colors.background,
  },
  item: {
    width: columnWidth,
    height: columnWidth,
  },
  image: {
    width: 35,
    height: 35,
  },
  listHeader: {
    marginBottom: 8,
  },
  row: {
    justifyContent: 'space-around',
  },
}));
