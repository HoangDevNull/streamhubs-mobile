import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import {
  withTheme,
  Caption,
  useTheme,
  Button,
  Colors,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const defaultTags = (length, existTags) =>
  Array(length)
    .fill(false)
    .map((it, id) => existTags.includes(id));

const FilterPanelContent = ({ pickerItems, payload, setPayload, onClose }) => {
  const styles = useStyles();
  const theme = useTheme();
  const tags = useSelector((state) => state.user.tags);

  const [tagsMode, setTagsMode] = useState(
    defaultTags(tags.length || 0, payload.tags || []),
  );
  const [selectedPayload, setSelectedPayload] = useState(payload);

  const onPickerChange = (itemValue, itemIndex) => {
    setSelectedPayload((prev) => ({ ...prev, orderBy: itemValue }));
  };

  const onTagPress = (id) => {
    let tags = tagsMode;
    tags[id] = !tags[id];
    setTagsMode([...tags]);
  };

  const onApply = () => {
    setPayload(selectedPayload);
    onClose();
  };

  const onClear = () => {
    setPayload({ tags: [], orderBy: 1, page: 0 });
    onClose();
  };

  useEffect(() => {
    setSelectedPayload((prev) => ({
      ...prev,
      tags: tagsMode.flatMap((it, id) => (it === true ? id : [])),
    }));
  }, [tagsMode]);

  const PickerItem = React.useCallback(
    () => (
      <Picker
        selectedValue={selectedPayload.orderBy}
        onValueChange={onPickerChange}
        style={styles.pickerParent}
        dropdownIconColor={theme.colors.text}>
        {pickerItems.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
    ),
    [],
  );

  const TagItem = React.useCallback(
    () =>
      tags.map((tag) => (
        <Button
          key={tag.id}
          mode={tagsMode[tag.id] ? 'contained' : 'outlined'}
          compact
          onPress={() => onTagPress(tag.id)}
          color={Colors[tag.color]}
          style={styles.tagItem}>
          <Caption style={styles.categoryText} numberOfLines={1}>
            #{tag.name}
          </Caption>
        </Button>
      )),
    [tagsMode],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Caption style={styles.sortHeader}>Sort by</Caption>
      <View style={styles.viewPicker}>
        <PickerItem />
      </View>
      <Caption style={styles.sortHeader}>Filter by tags</Caption>
      <View style={styles.tagsContainer}>
        <TagItem />
      </View>
      <Button mode="contained" onPress={onApply} style={styles.buttonApply}>
        Apply
      </Button>
      <Button mode="outlined" onPress={onClear} style={styles.buttonClear}>
        Clear
      </Button>
    </SafeAreaView>
  );
};

export default withTheme(React.memo(FilterPanelContent));

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 10,
  },
  viewPicker: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 4,
  },
  pickerParent: {
    color: theme.colors.text,
  },
  sortHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    alignSelf: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  buttonApply: {
    marginVertical: 20,
  },
  buttonClear: {},
}));
