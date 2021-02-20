import * as React from 'react';
import { View } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const UserSetting = () => (
  <Portal.Host>
    <View>
      <Text>Content of the app</Text>
    </View>
  </Portal.Host>
);

export default UserSetting;

const useStyles = makeStyles((theme) => ({}));
