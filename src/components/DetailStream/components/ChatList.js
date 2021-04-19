import React from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { Text, withTheme, Colors } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';

const strSplice = function (str, start, length, replacement) {
  return str.substr(0, start) + replacement + str.substr(start + length);
};

const htmlStyles = (color, theme) => ({
  div: {
    flexDirection: 'row',
  },
  b: {
    color: Colors[color],
  },
  span: {
    color: theme.colors.text,
    flexDirection: 'row',
  },
  img: {
    width: 25,
    height: 25,
    flexDirection: 'row',
  },
});
const ChatList = ({ theme }) => {
  const styles = useStyles();
  const [messages, setMessages] = React.useState([]);
  const socket = useSelector((state) => state.socket.socketInstance);

  React.useEffect(() => {
    socket.on('newMessageFS', (message) => {
      const msg = [...messages];
      msg.push(message);
      console.log({ msg, message });
      setMessages(msg);
    });

    return () => {
      socket.off('newMessageFS');
    };
  }, [socket, messages]);

  const _renderMessage = ({ item: { username, color, message } }) => {
    let { text, emotes } = Object.assign(message);
    let content = text;
    const stringReplacements = [];
    if (emotes.length > 0) {
      for (const emote of emotes) {
        const [id, position] = emote.split(':');
        const url = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`;
        const pos = position.split('-');
        const start = parseInt(pos[0], 10);
        const emoteLength = parseInt(pos[1], 10);
        const stringToReplace = text.substr(start, emoteLength);
        stringReplacements.push({
          stringToReplace: stringToReplace,
          replacement: `<img src="${url}">`,
        });
      }
      content = stringReplacements.reduce(
        (acc, { stringToReplace, replacement }) => {
          return acc.split(stringToReplace).join(replacement);
        },
        text,
      );
    }
    return (
      <View style={styles.message}>
        <HTML
          source={{
            html: `<div><b>${username}: </b> <span>${content}</span> </div>`,
          }}
          contentWidth={100}
          tagsStyles={htmlStyles(color, theme)}
        />
      </View>
    );
  };

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
  image: { width: 20, height: 20 },
}));
