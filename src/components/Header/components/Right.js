import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Appbar, withTheme, Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useRoute } from '@react-navigation/native';
import UserSetting from './UserSetting';

const Right = ({ theme: { colors } }) => {
  const { name } = useRoute();

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  const { text: mainColor } = colors;

  if (name.includes('Setting')) {
    return (
      <Appbar.Action
        icon={({ size }) => (
          <Ionicons name="settings-outline" size={size} color={mainColor} />
        )}
        onPress={_handleSearch}
      />
    );
  }
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
      <UserSetting />
    </>
  );
};

export default withTheme(React.memo(Right));

const styles = StyleSheet.create({});
