import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import Emote from './Emote';
import { debounce } from 'lodash';

const initMsgState = {
  text: '',
  emotes: [],
};

const ChatInput = ({ theme }) => {
  const styles = useStyles();
  const user = useSelector((state) => state.user);
  const channel = useSelector((state) => state.detailStream);
  const socket = useSelector((state) => state.socket.socketInstance);
  const [message, setMessage] = React.useState(initMsgState);
  const [openEmote, setOpenEmote] = React.useState(false);

  const _handleSelectEmote = (item) => {
    const { id } = item;
    const emoteLength = `${id}`.length;
    let { text, emotes } = Object.assign(message);
    const msgLength = text.length || 0;
    emotes = [...emotes, `${id}:${msgLength}-${emoteLength + 1}`];
    const newMessage = {
      text: text + id + ` `,
      emotes,
    };
    setMessage(newMessage);
  };

  const _handleChangeText = (x) => {
    const { emotes } = message;

    setMessage({
      text: x,
      emotes,
    });
  };

  const _sendMessage = () => {
    let { text, emotes } = message;
    if (!text) {
      return;
    }

    // Check if have emotes but user already delele it so remove that emote from message
    if (emotes.length > 0) {
      emotes = emotes.filter((emote) => {
        const id = emote.split(':')[0];
        return text.includes(id);
      });
    }
    const payload = {
      id: Date.now(),
      username: user?.username,
      color: user?.userProfile?.color,
      message: { text, emotes },
      endPoint: channel?.endPoint,
    };

    socket.emit('newMessage', payload);
    setMessage(initMsgState);
    Keyboard.dismiss();
    setOpenEmote(false);
  };
  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 10, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={[theme.colors.disabled, theme.colors.disabled]}
          style={styles.wrapInput}>
          <TextInput
            value={message?.text}
            onChangeText={_handleChangeText}
            placeholderTextColor={theme.colors.placeholder}
            placeholder="Send a message"
            style={styles.input}
            onFocus={() => setOpenEmote(false)}
          />
          <IconButton
            icon={() => (
              <Ionicons
                name="happy-outline"
                color={openEmote ? theme.colors.primary : '#fff'}
                size={26}
              />
            )}
            color={theme.colors.primary}
            size={20}
            onPress={() => {
              Keyboard.dismiss();
              setOpenEmote(!openEmote);
            }}
          />
        </LinearGradient>
        <IconButton
          icon={() => <Feather name="send" color="#fff" size={26} />}
          color={theme.colors.primary}
          size={32}
          onPress={_sendMessage}
        />
      </View>
      <Emote open={openEmote} onSelect={_handleSelectEmote} />
    </>
  );
};

export default withTheme(ChatInput);

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapInput: {
    flex: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    height: 42,
  },
}));
