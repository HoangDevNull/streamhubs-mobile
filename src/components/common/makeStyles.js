import { useMemo } from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export function makeStyles(styleArgs) {
  return function useStyles(props) {
    const theme = useTheme();

    let styles = null;

    if (typeof styleArgs === 'function') {
      styles = styleArgs(theme, props);
    } else {
      styles = styleArgs;
    }

    return useMemo(() => StyleSheet.create(styles), [styles]);
  };
}
