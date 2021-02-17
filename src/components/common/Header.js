import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const { width } = Dimensions.get('window');
const Header = ({ theme }) => {
  const _handleBack = () => console.log('Back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header
      style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <View style={styles.leftAction}>
        <Appbar.Action
          icon={({ size }) => (
            <EvilIcons
              name="chevron-left"
              size={size + 3}
              color={theme.colors.text}
            />
          )}
          onPress={_handleBack}
        />
      </View>

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
    width: width,
    elevation: 0,
  },
  leftAction: {
    flex: 1,
  },
});
