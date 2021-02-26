import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Headline, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { FlatList } from 'react-native-gesture-handler';

import Player from '../common/Player';

const columnWidth = 110;

const Gaming = ({ navigation, theme }) => {
  const styles = useStyles();

  const _renderItem = ({ item, i }) => {
    return <Player />;
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
        data={[1, 2, 3]}
        keyExtractor={(id) => String(id)}
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
