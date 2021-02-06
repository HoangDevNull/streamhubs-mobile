import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Home = ({title, navigation}) => {
  return (
    <View style={styles.root}>
      <Text>{title}</Text>

      <View style={styles.wrap_button}>
        <Button
          title="Watch stream ?"
          onPress={() => navigation.navigate('preview')}
        />
        <Button
          title="Go stream ?"
          onPress={() => navigation.navigate('stream')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap_button: {
    width,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
