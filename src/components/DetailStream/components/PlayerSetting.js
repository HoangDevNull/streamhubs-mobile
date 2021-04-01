import * as React from 'react';
import { Title, Menu, Portal, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modalize } from 'react-native-modalize';
import { openSetting, setResolution } from '../../../redux/actions/player';

const DATA = [
  {
    id: '1',
    title: 'Auto',
  },
  {
    id: '2',
    title: '1080p60',
  },
  {
    id: '3',
    title: '720p60',
  },
  {
    id: '4',
    title: '480p',
  },
  {
    id: '5',
    title: '360p',
  },
];

const PlayerSetting = ({ theme }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { open, resolution } = useSelector((state) => ({
    open: state.player.openSetting,
    resolution: state.player.resolution,
  }));
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      containerRef.current?.open();
    } else {
      containerRef.current?.close();
    }
  }, [open]);

  const _hidePlayerSetting = () => dispatch(openSetting(false));

  const _handleSettingPress = (action) => {
    switch (action) {
      case '1080p60':
        dispatch(setResolution('1080'));
        break;
      case '720p60':
        dispatch(setResolution('720'));
        break;
      case '480p':
        dispatch(setResolution('480'));
        break;
      case '360p':
        dispatch(setResolution('360'));
        break;
      default:
        dispatch(setResolution('auto'));
        break;
    }
    dispatch(openSetting(false));
  };

  const renderItem = ({ item }) => (
    <>
      <Menu.Item
        style={styles.button}
        // icon={({ size, color }) =>
        //   item.title.toLowerCase().includes(resolution) ? (
        //     <Ionicons color={color} name="checkmark-outline" size={size} />
        //   ) : null
        // }
        onPress={() => _handleSettingPress(item.title)}
        title={item.title}
      />
      {item.title.toLowerCase().includes(resolution) && (
        <Ionicons
          style={styles.checkIcon}
          color={theme.colors.text}
          name="checkmark-outline"
          size={26}
        />
      )}
    </>
  );

  const renderHeader = () => {
    return <Title> Change resolution</Title>;
  };

  return (
    <Portal>
      <Modalize
        modalStyle={styles.modal}
        modalHeight={420}
        onClosed={_hidePlayerSetting}
        ref={containerRef}
        flatListProps={{
          data: DATA,
          ListHeaderComponent: renderHeader,
          renderItem: renderItem,
          keyExtractor: (item) => item.id,
          showsVerticalScrollIndicator: false,
        }}
      />
    </Portal>
  );
};

export default withTheme(PlayerSetting);

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
    marginLeft: -10,
  },
  checkIcon: {
    position: 'absolute',
    right: 20,
    top: 17,
  },
}));
