import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import {
  Text,
  withTheme,
  Checkbox,
  RadioButton,
  Headline,
  Caption,
  useTheme,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { authRequest, channelFilter, categoryFilter } from '../../../services';
import { ScrollView } from 'react-native-gesture-handler';

const defaultSortedPayload = {
  tags: [0],
  orderBy: 1,
  page: 0,
  offset: 10,
};

const filterAndSortAPI = async (accessToken, tabIndex, bodyData) => {
  const url = tabIndex === 1 ? channelFilter : categoryFilter;
  const payload = { ...defaultSortedPayload, ...bodyData };
  console.log('PAYLOAD: ', payload);
  console.log('Access token: ', accessToken);
  console.log('URL: ', url);
  return await authRequest(url, 'POST', accessToken, payload);
};

const filterOrderbyValues = [
  { label: 'Ascending', value: 1 },
  { label: 'Descending', value: 2 },
  { label: 'Suggestion', value: 3 },
];
const channelOrderbyValues = [
  { label: 'Ascending', value: 1 },
  { label: 'Descending', value: 2 },
  { label: 'Newest', value: 3 },
  { label: 'Suggestion', value: 3 },
];

const FilterPanelContent = ({ tabIndex, onDataBinding }) => {
  const styles = useStyles();
  const theme = useTheme();
  const accessToken = useSelector((state) => state.user?.access_token);

  const [sortedValue, setSortedValue] = useState(1);
  const [radios, setRadios] = useState(filterOrderbyValues);

  const onValueSortedChange = (newValue) => {
    setSortedValue(newValue);
  };

  useEffect(() => {
    if (tabIndex === 0) setRadios(filterOrderbyValues);
    if (tabIndex === 1) setRadios(channelOrderbyValues);
    return () => {
      setSortedValue(1);
    };
  }, [tabIndex]);

  useEffect(() => {
    (async () => {
      const bodyData = { orderBy: sortedValue };
      await filterAndSortAPI(accessToken, tabIndex, bodyData)
        .then((response) => {
          onDataBinding(response);
        })
        .catch((error) => {
          console.log('Filter & sort ERROR: ', error);
          alert('Somethings wrong!!!');
        });
    })();
  }, [sortedValue]);

  return (
    <SafeAreaView style={styles.container}>
      <Caption style={styles.sortHeader}>Sort by</Caption>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default withTheme(FilterPanelContent);

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
