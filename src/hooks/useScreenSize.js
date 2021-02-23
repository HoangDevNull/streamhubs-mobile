import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Orientation from 'react-native-orientation-locker';

export function useScreenSize() {
  const [size, setSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    orientation: Orientation.getInitialOrientation(),
  });

  useEffect(() => {
    const handleChange = ({ window: { width, height } }) => {
      Orientation.getDeviceOrientation((o) => {
        setSize({ width: width, height: height, orientation: o });
      });
    };

    Dimensions.addEventListener('change', handleChange);
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return size;
}
