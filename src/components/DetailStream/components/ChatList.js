import React from 'react';
import { View, TextInput } from 'react-native';
import { Text, withTheme, Colors } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const ChatList = ({ theme }) => {
  const styles = useStyles();
  const [messages, setMessages] = React.useState([]);
  const socket = useSelector((state) => state.socket.socketInstance);

  React.useEffect(() => {
    socket.on('newMessageFS', (message) => {
      const msgs = [...messages, message];
      setMessages(msgs);
    });

    return () => {
      socket.off('newMessageFS');
    };
  }, [socket, messages]);

  const _renderMessage = ({ item: { username, color, message } }) => (
    <View style={styles.message}>
      <Text>
        <Text style={[styles.username, { color: Colors[color] }]}>
          {username}
        </Text>
        {':  '}
        <Text style={styles.content}>{message}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.title}>
          <Text>Wellcome to chat room</Text>{' '}
        </Text>
      </View>

      {/* List message  */}
      <FlatList
        keyExtractor={({ id }) => String(id)}
        data={messages}
        renderItem={_renderMessage}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.5}
        inverted
        contentContainerStyle={styles.contentContainer}
        style={styles.flatList}
      />
    </View>
  );
};

export default withTheme(ChatList);

const useStyles = makeStyles((theme) => ({
  container: { flex: 1 },
  contentContainer: { flexDirection: 'column-reverse', paddingBottom: 20 },
  flatList: { marginBottom: 8, marginHorizontal: 8 },
  banner: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 12,
    borderColor: theme.colors.surface,
    borderBottomWidth: 1,
  },
  title: { paddingLeft: 8 },
  message: { flex: 1 },
  username: { fontFamily: 'Inter-Bold' },
  content: {},
}));
