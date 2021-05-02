import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { ActivityIndicator, Menu, Portal } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';

import { authRequest, streamerFollowedURL } from '../../../services';

import UserAvatar from '../../common/UserAvatar';

const offset = 10;

const SubcribedUser = ({ open, closeModal }) => {
  const styles = useStyles();
  const { height } = useWindowDimensions('window');
  const containerRef = React.useRef(null);
  const access_token = useSelector((state) => state.user.access_token);

  const [loading, setLoading] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [pages, setPage] = React.useState({ page: 0, total: 0 });

  React.useEffect(() => {
    if (open) {
      setLoading(true);
      containerRef.current?.open();
      const fetchUser = authRequest(streamerFollowedURL, 'POST', access_token, {
        page: 0,
        offset,
      });
      fetchUser
        .then((res) => {
          const { results, total } = res.data;
          console.log('run', results);
          setData(results);
          setPage({ page: 1, total });
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setLoading(false);
        });
    } else {
      containerRef.current?.close();
    }
  }, [open, access_token]);

  const renderItem = ({ item }) => (
    <Menu.Item
      style={styles.button}
      icon={({ size, color }) => (
        <UserAvatar
          size={35}
          src={item?.userProfile?.avatar || null}
          onPress={null}
        />
      )}
      onPress={() => console.log('Press')}
      title={item.username}
    />
  );

  return (
    <Portal>
      <Modalize
        modalStyle={styles.modal}
        modalHeight={height - 300}
        onClosed={() => closeModal()}
        ref={containerRef}
        flatListProps={{
          data: data,
          renderItem: renderItem,
          keyExtractor: (item) => String(item.id),
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: (
            <>{loading && <ActivityIndicator animating={true} />}</>
          ),
        }}
      />
    </Portal>
  );
};

export default SubcribedUser;

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
