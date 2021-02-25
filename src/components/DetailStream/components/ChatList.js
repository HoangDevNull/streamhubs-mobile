import React from 'react';
import { View, TextInput } from 'react-native';
import { Text, withTheme, Colors } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';

const messages = [
  {
    id: 0,
    username: 'Federal28',
    color: 'purple400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 1,
    username: 'Bot',
    color: 'pink400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 2,
    username: 'seqhorse',
    color: 'red400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 3,
    username: 'emilyydovee',
    color: 'purple400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 4,
    username: 'Nasobi_origami',
    color: 'purple400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 5111412,
    username: 'Themarcjagger',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 5132,
    username: 'Themarcjagger',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 51244,
    username: 'Themarcjagger',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 51322,
    username: 'Themarcjagger',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 511,
    username: 'Themarcjagger',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 513,
    username: 'Themarcjagger',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 5211,
    username: 'Themarcjagger',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 2315,
    username: 'last1',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
  {
    id: 51,
    username: 'last2',
    color: 'blue400',
    message: ' Expo extends React Native and gives us all the tools we need',
  },
];

const ChatList = ({ theme }) => {
  const styles = useStyles();

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
          <Text>Chat Room</Text>{' '}
        </Text>
      </View>

      {/* List message  */}

      <FlatList
        keyExtractor={({ id }) => String(id)}
        data={messages}
        renderItem={_renderMessage}
      />
    </View>
  );
};

export default withTheme(ChatList);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    height: '100%',
  },
  banner: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 13,
    borderColor: theme.colors.surface,
    borderBottomWidth: 1,
  },
  message: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  username: {
    fontFamily: 'Inter-Bold',
  },
  content: {},
}));
