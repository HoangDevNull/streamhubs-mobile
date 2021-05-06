import React from 'react';
import { SafeAreaView, View, Image, useWindowDimensions } from 'react-native';
import { Headline, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import HeadSlider from './components/HeadSlider';
import CategoryBanner from '../common/CategoryBanner';

import { request, allCategoryUrl } from '../../services';

const columnWidth = 110;
const offset = 10;
const Discovery = ({ navigation, theme }) => {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    request(allCategoryUrl, 'POST', {
      page: 0,
      offset,
    })
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailCategory', item)}>
        <Image style={styles.categoryImage} source={{ uri: item.banner }} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={[styles.grid, styles.headText]}>
                Disc<Text style={styles.primaryText}>o</Text>very
              </Text>

              {/* Main */}
              <HeadSlider />
              <View style={[styles.grid]}>
                <Headline style={styles.headline}>Recommended For You</Headline>

                <CategoryBanner
                  data={data[Math.floor(Math.random() * data.length)] || {}}
                />
              </View>
            </View>
          </>
        }
        data={data}
        keyExtractor={({ id }) => String(id)}
        renderItem={_renderItem}
        numColumns={Math.floor(width / columnWidth)}
        key={width}
      />
    </SafeAreaView>
  );
};

export default withTheme(Discovery);

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
