import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, Colors } from 'react-native-paper';

const ChipCustom = ({ color, title }) => {
  return (
    <View style={[styles.category, { backgroundColor: Colors[color] }]}>
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
    color: '#fff',
    textAlign: 'center',
  },
});
