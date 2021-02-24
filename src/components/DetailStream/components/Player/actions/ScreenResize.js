import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

import Orientation from 'react-native-orientation-locker';

const ScreenResize = ({ isPortraitScreen, style }) => {
  const _toggleScreenOrientation = () => {
    if (isPortraitScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <IconButton
      icon={() => (
        <Ionicons
          name={isPortraitScreen ? 'expand-outline' : 'crop-outline'}
          size={22}
          color="#fff"
        />
      )}
      size={33}
      color="#fff"
      onPress={_toggleScreenOrientation}
      style={style}
    />
  );
};

export default React.memo(ScreenResize);
