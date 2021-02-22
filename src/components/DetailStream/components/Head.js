import React from 'react';
import { View } from 'react-native';
import { Subheading, withTheme, IconButton, Button } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChipCustom from '../../common/ChipCustom';
const tags = [
  { id: 1, color: 'pink400', name: 'Chating' },
  { id: 2, color: 'green400', name: 'Gaming' },
  { id: 3, color: 'purple400', name: 'MOBA' },
];
const Head = ({ theme }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Subheading style={styles.fontBold}>
        Live from Kristin! Happy Monday ⚛️// Just Chatting ~
      </Subheading>
      <View style={styles.wrapTag}>
        <FlatList
          data={tags}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item: { color, name } }) => (
            <ChipCustom style={styles.chip} color={color} title={name} />
          )}
          horizontal={true}
        />
      </View>

      <View style={styles.wrapAction}>
        <View style={styles.wrapIconButton}>
          <IconButton
            icon={() => (
              <Ionicons name="planet-outline" color="#fff" size={22} />
            )}
            color={theme.colors.primary}
            size={30}
            onPress={() => console.log('Pressed')}
            style={styles.iconButton}
          />

          <IconButton
            icon={() => (
              <Ionicons name="notifications-outline" color="#fff" size={22} />
            )}
            color={theme.colors.primary}
            size={30}
            onPress={() => console.log('Pressed')}
            style={styles.iconButton}
          />

          <IconButton
            icon={() => (
              <Ionicons name="heart-outline" color="#fff" size={22} />
            )}
            color={theme.colors.primary}
            size={30}
            onPress={() => console.log('Pressed')}
            style={styles.iconButton}
          />
        </View>

        <Button
          style={styles.subcribeButton}
          icon={() => <Ionicons name="play-outline" color="#fff" size={22} />}
          mode="contained">
          Subscribe
        </Button>
      </View>
    </View>
  );
};

export default withTheme(Head);

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  wrapTag: {
    marginTop: 15,
    marginBottom: 20,
  },
  wrapAction: {
    flexDirection: 'row',
  },
  wrapIconButton: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    maxWidth: 180,
    marginRight: 'auto',
  },
  iconButton: {
    borderRadius: 15,
    backgroundColor: '#3A3A41',
    margin: 0,
  },
  subcribeButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 15,
  },
}));
