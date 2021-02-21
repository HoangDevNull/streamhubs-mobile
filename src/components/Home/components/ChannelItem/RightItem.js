import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Title, Caption, Colors } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const RigthItem = ({ data }) => {
  const styles = useStyles();

  const _renderItem = ({ item: { color, name }, i }) => (
    <View style={[styles.category, { backgroundColor: Colors[color] }]}>
      <Caption style={styles.categoryText}>#{name}</Caption>
    </View>
  );

  const { title, username, categories } = data;

  return (
    <View style={styles.rightContainer}>
      <Title style={styles.title}>{username}</Title>

      <Text numberOfLines={1} style={styles.paragraph}>
        {title}
      </Text>
      <FlatList
        data={categories}
        keyExtractor={({ id }) => String(id)}
        renderItem={_renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(RigthItem);

const useStyles = makeStyles((theme) => ({
  // Right
  rightContainer: {
    flex: 100,
    marginTop: -5,
  },
  title: {
    fontFamily: 'Inter-Bold',
  },
  paragraph: {
    fontFamily: 'Inter-Light',
    marginBottom: 10,
    marginTop: 2.5,
  },
  category: {
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryText: {
    color: '#fff',
    textAlign: 'center',
  },
}));
