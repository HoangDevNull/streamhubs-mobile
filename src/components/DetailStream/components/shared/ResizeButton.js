import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

import Orientation from 'react-native-orientation-locker';

const ResizeButton = ({ isPortrait, style }) => {
  const _toggleScreenOrientation = () => {
    if (isPortrait) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <IconButton
      icon={() => (
        <Ionicons
          name={isPortrait ? 'expand-outline' : 'crop-outline'}
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

export default React.memo(ResizeButton);
