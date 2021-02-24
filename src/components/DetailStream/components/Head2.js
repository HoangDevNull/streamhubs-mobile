import React from 'react';
import { View } from 'react-native';
import { Subheading, withTheme, Text, Banner } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChipCustom from '../../common/ChipCustom';
import UserAvatar from '../../common/UserAvatar';
const tags = [
  { id: 1, color: 'pink400', name: 'Chating' },
  { id: 2, color: 'green400', name: 'Gaming' },
];
const Head = ({ theme }) => {
  const styles = useStyles();
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <Banner
        style={styles.root}
        contentStyle={styles.container}
        visible={visible}
        actions={[
          {
            icon: () => (
              <Ionicons name="planet-outline" color="#fff" size={22} />
            ),
            mode: 'contained',
            color: '#3A3A41',
            onPress: () => console.log('press'),
          },
          {
            icon: () => (
              <Ionicons name="notifications-outline" color="#fff" size={22} />
            ),
            mode: 'contained',
            color: '#3A3A41',
            onPress: () => console.log('press'),
          },
          {
            icon: () => (
              <Ionicons name="heart-outline" color="#fff" size={22} />
            ),
            mode: 'contained',
            color: '#3A3A41',
            onPress: () => console.log('press'),
          },
          {
            icon: () => <Ionicons name="star-outline" color="#fff" size={20} />,
            label: 'Subscribe',
            mode: 'contained',
            uppercase: false,
            onPress: () => console.log('press'),
            style: {
              flex: 1,
              maxWidth: 130,
              marginLeft: 'auto',
              alignSelf: 'center',
            },
          },
        ]}
        // icon={({ size }) => (
        //   <UserAvatar style={{ marginTop: 5.5 }} size={37} />
        // )}
      >
        <Subheading style={styles.fontBold}>
          Live from Kristin! Happy Monday ⚛️// Just Chatting ~ {'\n'} {'\n'}
        </Subheading>

        <FlatList
          data={tags}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item: { color, name } }) => (
            <ChipCustom style={styles.chip} color={color} title={name} />
          )}
          horizontal={true}
        />
      </Banner>
    </>
  );
};

export default withTheme(Head);

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
  root: {
    backgroundColor: theme.colors.background,
  },
  container: {
    marginLeft: -6,
  },
  contentWrapper: {},
}));
