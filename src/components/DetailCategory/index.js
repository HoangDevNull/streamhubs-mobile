import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { FlatList } from 'react-native-gesture-handler';

import { authRequest, channelByCatUrl } from '../../services';

import Player from '../common/Player';
import CategoryBanner from '../common/CategoryBanner';
import { useSelector } from 'react-redux';

const columnWidth = 110;

const DetailCategory = ({ route, navigation, theme }) => {
  const styles = useStyles();
  const access_token = useSelector((state) => state.user.access_token);
  const [data, setData] = React.useState([]);
  const [pages, setPages] = React.useState({
    page: 0,
    total: 0,
  });

  React.useEffect(() => {
    if (route.params) {
      const payload = {
        categoryID: route.params.id,
        page: 0,
        offset: 10,
      };
      authRequest(channelByCatUrl, 'POST', access_token, payload)
        .then(({ data: { results, total } }) => {
          setData(results);
          setPages({
            page: 0,
            total: total,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [route.params, access_token]);

  const _renderItem = ({ item }) => {
    return <Player channel={item} />;
  };

  const category = route.params;
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <View style={[styles.grid]}>
                <CategoryBanner data={category} />
              </View>
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

export default withTheme(DetailCategory);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  grid: {
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
