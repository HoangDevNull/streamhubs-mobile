import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const Center = () => {
  const route = useRoute();
  const show = route?.name.includes('Setting');
  return (
    <Appbar.Content titleStyle={styles.root} title={show ? 'Hoang Pham' : ''} />
  );
};

export default React.memo(Center);

const styles = StyleSheet.create({
  root: {
    textAlign: 'center',
    width: '100%',
  },
});
