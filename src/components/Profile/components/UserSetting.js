import * as React from 'react';
import { Button, Portal, Text } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { useDispatch, useSelector } from 'react-redux';

import { openUserSetting } from '../../../redux/actions/gui';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

const DATA = [
  {
    id: '1',
    title: 'Security',
  },
  {
    id: '2',
    title: 'Toggle theme',
  },
  {
    id: '3',
    title: 'Update user profile ',
  },
  {
    id: '4',
    title: 'Logout',
  },
];

const UserSetting = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.gui.openUserSetting);
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      containerRef.current?.open();
    } else {
      containerRef.current?.close();
    }
  }, [open]);

  const _hideUserSetting = () => dispatch(openUserSetting(false));

  const _handleSettingPress = (id) => {
    console.log(id);
  };

  const renderItem = ({ item }) => (
    <Button
      uppercase={false}
      onPress={() => _handleSettingPress(item.id)}
      style={styles.button}>
      {item.title}
    </Button>
  );

  return (
    <Portal>
      <Modalize
        modalStyle={styles.modal}
        modalHeight={250}
        onClosed={_hideUserSetting}
        ref={containerRef}
        flatListProps={{
          data: DATA,
          renderItem: renderItem,
          keyExtractor: (item) => item.id,
          showsVerticalScrollIndicator: false,
        }}
      />
    </Portal>
  );
};

export default UserSetting;

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  button: {
    marginVertical: 6,
    alignItems: 'flex-start',
    flex: 1,
  },
}));
