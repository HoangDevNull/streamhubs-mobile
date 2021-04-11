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
  // const socket = useSelector((state) => state.socket.socketInstance);

  // React.useEffect(() => {
  //   socket.on('newMsgFromServer', (message) => {
  //     console.log({ message });
  //   });
  //   return () => {
  //     socket.off('newMsgFromServer');
  //   };
  // }, [socket]);

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
        <Text>
          <Text>Chatting</Text>{' '}
        </Text>
      </View>

      {/* List message  */}

      <FlatList
        ref={(ref) => (chatRef = ref)}
        // onContentSizeChange={() => chatRef.scrollToEnd({ animated: false })}
        keyExtractor={({ id }) => String(id)}
        data={messages}
        renderItem={_renderMessage}
        ListFooterComponent={<View style={styles.mb20} />}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.5}
        inverted
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default withTheme(ChatList);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    // height: '100%',
  },
  contentContainer: {
    flexDirection: 'column-reverse',
  },
  banner: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 13,
    borderColor: theme.colors.surface,
    borderBottomWidth: 1,
  },
  message: {
    flex: 1,
  },
  username: {
    fontFamily: 'Inter-Bold',
  },
  content: {},
  mb20: {
    marginBottom: 20,
  },
}));
