import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import Player from '../common/Player';
import { authRequest, filterChannelUrl } from '../../services';

const columnWidth = 110;

const Gaming = ({ navigation, theme }) => {
  const styles = useStyles();
  const access_token = useSelector((state) => state.user.access_token);
  const [data, setData] = React.useState([]);
  const [pages, setPages] = React.useState({
    page: 0,
    total: 0,
  });
  React.useEffect(() => {
    if (!access_token) {
      return;
    }
    const payload = { tags: [], orderBy: 4, page: 0, offset: 10 };
    authRequest(filterChannelUrl, 'POST', access_token, payload)
      .then(({ data: { results, total } }) => {
        setData(results);
        setPages({
          page: 0,
          total: total,
        });
      })
      .catch((err) => console.log(err));
  }, [access_token]);

  const _renderItem = ({ item, i }) => {
    return <Player channel={item} />;
  };
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={[styles.grid, styles.headText]}>
                Gam<Text style={styles.primaryText}>i</Text>ng
              </Text>

              {/* Main */}
            </View>
          </>
        }
        data={data}
        keyExtractor={({ id }) => String(id)}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
};

export default withTheme(Gaming);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  grid: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  headText: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Inter-Black',
    fontSize: 34,
    letterSpacing: 1.5,
  },
  pinkText: {
    fontFamily: 'Inter-Black',
    color: theme.colors.notification,
  },
  primaryText: {
    fontFamily: 'Inter-Black',
    color: theme.colors.primary,
  },
  categoryImage: {
    width: columnWidth,
    height: 140,
    marginVertical: 15,
    marginLeft: 15,
    borderRadius: 13,
    resizeMode: 'cover',
  },
  headline: {
    fontFamily: 'Inter-Black',
  },
}));
