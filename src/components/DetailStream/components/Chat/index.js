import React from 'react';
import { View } from 'react-native';
import { withTheme, Text } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatInput from './ChatInput';

const tags = [
  { id: 1, color: 'pink400', name: 'Chating' },
  { id: 2, color: 'green400', name: 'Gaming' },
  { id: 3, color: 'purple400', name: 'MOBA' },
];
const Chat = ({ theme }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.messWrapper}>
        <Text> Hello word</Text>
      </View>

      <ChatInput />
    </View>
  );
};

export default withTheme(Chat);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messWrapper: {
    padding: 15,
    flex: 1,
  },
}));
