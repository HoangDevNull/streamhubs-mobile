import React from 'react';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Button, IconButton, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SurfaceButton = ({ theme, icon, title, onPress }) => {
  const styles = useStyles();
  return (
    <>
      <Button
        onPress={onPress}
        style={styles.wrappButton}
        labelStyle={styles.buttonLable}
        contentStyle={styles.fullSizeBtn}
        uppercase={false}
        icon={({ size, color }) => (
          <Ionicons size={20} color={color} name={icon} />
        )}>
        {title}
      </Button>
      <IconButton
        color={theme.colors.primary}
        onPress={onPress}
        icon={() => (
          <Ionicons
            size={20}
            color={theme.colors.text}
            name="chevron-forward-outline"
          />
        )}
      />
    </>
  );
};

export default withTheme(React.memo(SurfaceButton));

const useStyles = makeStyles((theme) => ({
  surface: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 15,
  },
  wrappButton: {
    width: '85%',
  },
  fullSizeBtn: {
    justifyContent: 'flex-start',
  },
  buttonLable: {
    paddingLeft: 20,
    fontSize: 16,
    color: theme.colors.text,
  },
}));
