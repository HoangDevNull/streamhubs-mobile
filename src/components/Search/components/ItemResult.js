import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, TouchableRipple } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const ItemResult = ({ dataItem }) => {
  const { isChannel, name, banner } = dataItem;
  const styles = useStyles();
  return (
    <TouchableRipple
      onPress={() => console.log('Pressed')}
      rippleColor="rgba(128,128,128, .5)">
      <Card.Title
        title={name ?? '##Noname'}
        left={(props) => <Avatar.Icon {...props} icon={banner} />}
        right={(props) => (
          <Text style={isChannel ? styles.channelLabel : null}></Text>
        )}
        rightStyle={styles.channelLabelParent}
      />
    </TouchableRipple>
  );
};

export default ItemResult;

const useStyles = makeStyles((theme) => ({
  channelLabel: {
    borderRadius: 10,
    backgroundColor: 'red',
    width: 12,
    height: 12,
    opacity: 0.7,
  },
  channelLabelParent: {
    marginRight: 20,
  },
}));
