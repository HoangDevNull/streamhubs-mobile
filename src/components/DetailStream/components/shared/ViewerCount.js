import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge, Text } from 'react-native-paper';

import { View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const ViewerCount = ({ style, viewer }) => {
  const styles = useStyles();
  return (
    <View style={style}>
      <View style={styles.gridRow}>
        <Badge size={10} style={styles.dot} />
        <Text style={styles.fontBold}> LIVE </Text>
      </View>
      <View style={styles.gridRow}>
        <Ionicons name="people-outline" size={22} color="#fff" />
        <Text style={styles.fontBold}> {viewer} </Text>
      </View>
    </View>
  );
};

export default React.memo(ViewerCount);

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  dot: {
    alignSelf: 'center',
    marginRight: 3,
  },
}));
