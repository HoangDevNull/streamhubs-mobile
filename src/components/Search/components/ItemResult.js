import React from 'react';
import { Text, Image } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { useNavigation } from '@react-navigation/native';

const ItemResult = ({ dataItem }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const dataValue = {
    name: '##Noname',
    banner: dataItem.banner ?? '',
  };
  const isChannel = dataItem.hasOwnProperty('channelName');
  dataValue.name = isChannel ? dataItem.channelName : dataItem.name;

  return (
    <TouchableRipple
      onPress={() => navigation.navigate('DetailStream', dataItem)}
      rippleColor="rgba(128,128,128, .5)">
      <Card.Title
        subtitle={dataValue.name}
        subtitleStyle={styles.subtitle}
        left={(props) => (
          <Image style={styles.image} source={{ uri: dataValue.banner }} />
        )}
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
  image: {
    width: 40,
    height: 40,
  },
  subtitle: {
    fontSize: 18,
  },
}));
