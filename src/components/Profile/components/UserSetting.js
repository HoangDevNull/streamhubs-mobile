import * as React from 'react';
import { Menu, Portal } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { openUserSetting } from '../../../redux/actions/gui';
import { Modalize } from 'react-native-modalize';
import { logout, setTheme } from '../../../redux/actions/user';

import Security from './Security';
import UpdateUserProfile from './UpdateUserProfile';

const DATA = [
  {
    id: '1',
    title: 'Security',
    icon: 'shield-outline',
  },
  {
    id: '2',
    title: 'Toggle theme',
    icon: 'water-outline',
  },
  {
    id: '3',
    title: 'Update user profile',
    icon: 'ios-pencil-outline',
  },
  {
    id: '4',
    title: 'Change chat color',
    icon: 'chatbubbles-outline',
  },
  {
    id: '5',
    title: 'Logout',
    icon: 'exit-outline',
  },
];

const UserSetting = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { open, theme } = useSelector((state) => ({
    open: state.gui.openUserSetting,
    theme: state.user.theme,
  }));
  const containerRef = React.useRef(null);
  const [openSecurity, setOpenSecurity] = React.useState(false);
  const [openUpdateProfile, setOpenUpdateProfile] = React.useState(false);
  const [openUpdateChatColor, setOpenUpdateChatColor] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      containerRef.current?.open();
    } else {
      containerRef.current?.close();
    }
  }, [open]);

  const _hideUserSetting = () => dispatch(openUserSetting(false));

  const _handleSettingPress = (action) => {
    switch (action) {
      case 'Security':
        // dispatch(openUserSetting(false));
        setOpenSecurity(true);
        break;
      case 'Toggle theme':
        dispatch(setTheme(theme.includes('dark') ? 'light' : 'dark'));
        dispatch(openUserSetting(false));
        break;
      case 'Update user profile':
        // dispatch(openUserSetting(false));
        setOpenUpdateProfile(true);
        break;
      case 'Logout':
        dispatch(logout());
        dispatch(openUserSetting(false));
        break;

      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <Menu.Item
      style={styles.button}
      icon={({ size, color }) => (
        <Ionicons color={color} name={item.icon} size={size} />
      )}
      onPress={() => _handleSettingPress(item.title)}
      title={item.title}
    />
  );

  return (
    <Portal>
      <Modalize
        modalStyle={styles.modal}
        modalHeight={320}
        onClosed={_hideUserSetting}
        ref={containerRef}
        flatListProps={{
          data: DATA,
          renderItem: renderItem,
          keyExtractor: (item) => item.id,
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: (
            <>
              <Security
                open={openSecurity}
                onClose={() => setOpenSecurity(false)}
              />
              <UpdateUserProfile
                open={openUpdateProfile}
                onClose={() => setOpenUpdateProfile(false)}
              />
            </>
          ),
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
    paddingLeft: 20,
    paddingTop: 20,
  },
  button: {
    marginVertical: 6,
    alignItems: 'flex-start',
    maxWidth: 'auto',
    marginRight: 10,
  },
}));
