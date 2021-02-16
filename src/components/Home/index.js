import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Headline,
  withTheme,
  Text,
  Paragraph,
  Subheading,
  Caption,
  Surface,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Home = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface>
        <Button mode="contained" onPress={handleLogout}>
          Đăng xuất
        </Button>
        <Headline>Headline</Headline>
        <Text>Tiếng việt có dậu nè</Text>
        <Paragraph>Paragraph</Paragraph>
        <Subheading>Subheading</Subheading>
        <Caption>Caption</Caption>
      </Surface>
    </View>
  );
};

export default withTheme(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
