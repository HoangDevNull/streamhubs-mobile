import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, withTheme, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ theme }) => {
  const _handleBack = () => console.log('Back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header
      style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <Appbar.Content
        title={
          <IconButton
            icon={() => (
              <Ionicons
                name="chevron-back"
                size={24}
                color={theme.colors.text}
              />
            )}
            size={24}
            onPress={_handleBack}
          />
        }
      />
      <Appbar.Action
        icon={({ size, color }) => (
          <Ionicons name="search-outline" size={size} color={color} />
        )}
        onPress={_handleSearch}
      />
      <Appbar.Action
        icon={({ size, color }) => (
          <Ionicons name="notifications-outline" size={size} color={color} />
        )}
        onPress={_handleMore}
      />
    </Appbar.Header>
  );
};

export default withTheme(Header);

const styles = StyleSheet.create({
  root: {
    elevation: 0,
  },
});
