import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, Colors } from 'react-native-paper';

const ChipCustom = ({ color, title, style }) => {
  return (
    <View style={[styles.category, style, { backgroundColor: Colors[color] }]}>
      <Caption style={styles.categoryText}>#{title}</Caption>
    </View>
  );
};

export default React.memo(ChipCustom);

const styles = StyleSheet.create({
  category: {
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryText: {
    alignSelf: 'center',
    color: '#fff',
    textAlign: 'center',
  },
});
