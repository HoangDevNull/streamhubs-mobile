import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Text, Card, Badge } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const { width } = Dimensions.get('window');

const LeftItem = ({ uri }) => {
  const styles = useStyles();
  return (
    <Card style={styles.card}>
      <View style={[styles.imageContainer]}>
        <Image source={{ uri }} style={[styles.image]} />
        <View style={styles.backdrop}>
          <Badge size={8} style={styles.dot} />
          <Text style={styles.texBackdrop}> Live </Text>
        </View>
      </View>
    </Card>
  );
};

export default React.memo(LeftItem);

const useStyles = makeStyles((theme) => ({
  // Left
  card: {
    width: width * 0.4,
    height: 90,
    borderRadius: 15,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    padding: 16,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  backdrop: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: theme.colors.backdrop,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  dot: {
    alignSelf: 'center',
    marginRight: 3,
  },
  texBackdrop: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
}));
