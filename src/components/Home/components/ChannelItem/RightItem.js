import React from 'react';
import { View, FlatList } from 'react-native';
import { Paragraph, Subheading } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import ChipCustom from '../../../common/ChipCustom';

const RigthItem = ({ data }) => {
  const styles = useStyles();

  const _renderItem = ({ item: { color, name }, i }) => (
    <ChipCustom color={color} title={name} />
  );

  const { title, username, categories } = data;

  return (
    <View style={styles.rightContainer}>
      <Subheading style={styles.title}>{username}</Subheading>

      <Paragraph numberOfLines={1} style={styles.paragraph}>
        {title}
      </Paragraph>
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
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Inter-Bold',
  },
  paragraph: {
    marginBottom: 18,
    // marginTop: 5.5,
  },
}));
