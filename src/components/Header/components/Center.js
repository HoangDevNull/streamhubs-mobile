import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Center = () => {
  const route = useRoute();
  const show = route?.name.includes('Profile');
  const username = useSelector((state) => state?.user?.username);
  return (
    <Appbar.Content titleStyle={styles.root} title={show ? username : ''} />
  );
};

export default React.memo(Center);

const styles = StyleSheet.create({
  root: {
    textAlign: 'center',
    width: '100%',
  },
});
