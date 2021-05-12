import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const SearchBar = ({ searchValue, onChange }) => {
  const onChangeSearch = (query) => onChange(query);
  const styles = useStyles();
  return (
    <Searchbar
      placeholder="Type channel or category"
      onChangeText={onChangeSearch}
      value={searchValue}
      style={styles.searchBar}
    />
  );
};

export default SearchBar;
const useStyles = makeStyles((theme) => ({
  searchBar: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
}));
