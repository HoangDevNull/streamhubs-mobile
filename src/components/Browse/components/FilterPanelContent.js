import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { withTheme, RadioButton, Caption, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const filterOrderbyValues = [
  { label: 'Descending', value: 1 },
  { label: 'Ascending', value: 2 },
  { label: 'Suggestion', value: 3 },
];
const channelOrderbyValues = [
  { label: 'Descending', value: 1 },
  { label: 'Ascending', value: 2 },
  { label: 'Newest', value: 3 },
  { label: 'Suggestion', value: 4 },
];

const FilterPanelContent = ({ tabIndex, sortedValue, setSortedValue }) => {
  const styles = useStyles();
  const theme = useTheme();
  const [radios, setRadios] = useState(filterOrderbyValues);

  const onValueSortedChange = (newValue) => {
    setSortedValue(newValue);
  };

  useEffect(() => {
    if (tabIndex === 0) setRadios(filterOrderbyValues);
    if (tabIndex === 1) setRadios(channelOrderbyValues);
  }, [tabIndex]);

  const radioButtonGroup = React.useMemo(
    () => (
      <RadioButton.Group
        onValueChange={onValueSortedChange}
        value={sortedValue}>
        <View style={styles.radioGroup}>
          {radios.map((item) => (
            <RadioButton.Item
              key={item.value}
              label={item.label}
              value={item.value}
              style={styles.radioItem}
              labelStyle={styles.radioItemLabel}
              color={theme.colors.primary}
            />
          ))}
        </View>
      </RadioButton.Group>
    ),
    [sortedValue, tabIndex],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Caption style={styles.sortHeader}>Sort by</Caption>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {radioButtonGroup}
      </ScrollView>
    </SafeAreaView>
  );
};

export default withTheme(React.memo(FilterPanelContent));

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  radioItem: {
    marginHorizontal: 2,
    flexDirection: 'row-reverse',
    width: 150,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  radioItemLabel: {
    fontSize: 12,
  },
  sortHeader: {
    paddingHorizontal: 10,
  },
}));
