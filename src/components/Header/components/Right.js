import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Appbar, withTheme, Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useRoute, useNavigation } from '@react-navigation/native';

const Right = ({ theme: { colors } }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  const { text: mainColor } = colors;

  return (
    <>
      <Appbar.Action
        icon={({ size }) => (
          <Ionicons name="search-outline" size={size} color={mainColor} />
        )}
        onPress={_handleSearch}
      />
      <Appbar.Action
        icon={({ size }) => (
          <Ionicons name="mail-unread-outline" size={size} color={mainColor} />
        )}
        onPress={_handleMore}
      />
    </>
  );
};

export default withTheme(Right);

const styles = StyleSheet.create({});
