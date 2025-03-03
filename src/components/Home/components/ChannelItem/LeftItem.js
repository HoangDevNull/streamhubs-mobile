import React from 'react';
import { View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import LiveBadge from '../../../common/LiveBadge';
const LeftItem = ({ uri, uriFallBack }) => {
  const styles = useStyles();
  const [imgUri, setImgUri] = React.useState(uri);
  return (
    <Card style={styles.card}>
      <View style={[styles.imageContainer]}>
        <Image
          source={{
            uri: imgUri.includes('?')
              ? imgUri
              : imgUri + '?time=' + new Date().getTime(),
          }}
          onError={() => setImgUri(uriFallBack)}
          style={[styles.image]}
        />
        <LiveBadge backdrop position="bottom" />
      </View>
    </Card>
  );
};

export default React.memo(LeftItem);

const useStyles = makeStyles((theme) => ({
  // Left
  card: {
    width: 160,
    height: 90,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
